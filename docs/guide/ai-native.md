---
title: AI-Native Features
description: Comprehensive guide to glide-mq's 7 AI-native primitives - usage tracking, streaming, suspend/resume, budget caps, fallback chains, dual-axis rate limiting, and vector search.
---

# AI-Native Features

glide-mq is built for AI workloads. Beyond standard queue operations, it ships 7 primitives purpose-built for LLM pipelines, agent loops, RAG systems, and content moderation flows.

## Table of Contents

- [Usage Tracking](#usage-tracking)
- [Token Streaming](#token-streaming)
- [Suspend / Resume (Human-in-the-Loop)](#suspend--resume)
- [Budget Caps](#budget-caps)
- [Fallback Chains](#fallback-chains)
- [Dual-Axis Rate Limiting (RPM + TPM)](#dual-axis-rate-limiting)
- [Vector Search](#vector-search)
- [Per-Job Lock Duration](#per-job-lock-duration)

---

## Usage Tracking

Track model, token counts, cost, and latency for every AI job. Data is persisted to the job hash and emitted as a `usage` event on the events stream.

### Reporting usage from a processor

```typescript
const worker = new Worker('inference', async (job) => {
  const result = await openai.chat.completions.create({
    model: 'gpt-5.4',
    messages: [{ role: 'user', content: job.data.prompt }],
  });

  await job.reportUsage({
    model: 'gpt-5.4',
    provider: 'openai',
    inputTokens: result.usage.prompt_tokens,
    outputTokens: result.usage.completion_tokens,
    costUsd: 0.0035,
    latencyMs: Date.now() - job.processedOn!,
    cached: false,
  });

  return { content: result.choices[0].message.content };
}, { connection });
```

### Reading usage from a completed job

```typescript
const job = await queue.getJob('42');
if (job?.usage) {
  console.log(`Model: ${job.usage.model}`);
  console.log(`Tokens: ${job.usage.inputTokens} in, ${job.usage.outputTokens} out`);
  console.log(`Cost: $${job.usage.costUsd}`);
}
```

### Aggregating usage across a flow

```typescript
const usage = await queue.getFlowUsage(parentJobId);
// {
//   totalInputTokens: 1250,
//   totalOutputTokens: 340,
//   totalCostUsd: 0.012,
//   jobCount: 4,
//   models: { 'gpt-5.4': 3, 'gpt-4.1-nano': 1 }
// }
```

### The `JobUsage` interface

```typescript
interface JobUsage {
  model?: string;        // e.g. 'gpt-5.4', 'claude-sonnet-4-20250514'
  provider?: string;     // e.g. 'openai', 'anthropic'
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;  // auto-computed if not provided
  costUsd?: number;
  latencyMs?: number;
  cached?: boolean;
}
```

`totalTokens` is automatically computed as `inputTokens + outputTokens` when not explicitly provided.

---

## Token Streaming

Stream LLM output tokens to consumers in real time via per-job Valkey streams. Each job gets its own stream key (`glide:{queueName}:jstream:{jobId}`).

### Producer side (inside the processor)

```typescript
const worker = new Worker('chat', async (job) => {
  const stream = await openai.chat.completions.create({
    model: 'gpt-5.4',
    messages: [{ role: 'user', content: job.data.prompt }],
    stream: true,
  });

  for await (const chunk of stream) {
    const token = chunk.choices[0]?.delta?.content ?? '';
    if (token) {
      await job.stream({ t: token });
    }
  }
  // Signal end-of-stream
  await job.stream({ t: '', done: '1' });

  return { completed: true };
}, { connection });
```

### Consumer side (reading the stream)

```typescript
// Non-blocking read (XRANGE)
const entries = await queue.readStream(jobId, { count: 100 });
for (const entry of entries) {
  process.stdout.write(entry.fields.t);
}

// Long-polling read (XREAD BLOCK) - for real-time consumers
let lastId: string | undefined;
while (true) {
  const entries = await queue.readStream(jobId, {
    lastId,
    block: 5000,  // block up to 5 seconds
    count: 50,
  });
  for (const entry of entries) {
    lastId = entry.id;
    if (entry.fields.done === '1') return;
    process.stdout.write(entry.fields.t);
  }
}
```

Each chunk is a flat `Record<string, string>` appended via XADD. Common patterns:

- `{ t: 'token text' }` - a text token
- `{ t: '', done: '1' }` - end-of-stream marker
- `{ type: 'tool_call', name: 'search', args: '{"q":"valkey"}' }` - structured events

---

## Suspend / Resume

Pause a job to wait for an external signal - human approval, webhook callback, or async third-party response. The job moves to `suspended` state until `queue.signal()` re-activates it.

### Suspending from a processor

```typescript
const worker = new Worker('moderation', async (job) => {
  // Check if we were resumed with signals
  if (job.signals.length > 0) {
    const signal = job.signals[0];
    if (signal.data.action === 'approve') {
      return { status: 'approved', by: signal.data.reviewer };
    }
    return { status: 'rejected', reason: signal.data.reason };
  }

  // First run: generate content and suspend for review
  const draft = await generateDraft(job.data);
  await job.suspend({
    reason: 'awaiting-human-review',
    timeout: 3600_000,  // auto-fail after 1 hour
  });
}, { connection });
```

### Sending a signal to resume

```typescript
// From an API endpoint, webhook handler, or admin panel
const resumed = await queue.signal(jobId, 'review', {
  action: 'approve',
  reviewer: 'alice@example.com',
});
// resumed: true if the job was in suspended state, false otherwise
```

### Checking suspension status

```typescript
const info = await queue.getSuspendInfo(jobId);
// {
//   reason: 'awaiting-human-review',
//   suspendedAt: 1709654400000,
//   timeout: 3600000,
//   signals: []
// }
```

### Signal interface

```typescript
interface SignalEntry {
  name: string;       // e.g. 'approve', 'reject'
  data: any;          // arbitrary payload
  receivedAt: number; // epoch ms
}
```

### How it works

1. `job.suspend()` throws `SuspendError` - the worker moves the job to `suspended` state.
2. The job hash stores `suspendReason`, `suspendedAt`, and `suspendTimeout`.
3. `queue.signal()` appends a signal entry and re-queues the job to the stream.
4. On re-entry, `job.signals` contains all signals delivered while suspended.
5. If `timeout` is set and no signal arrives within the window, the job is auto-failed.

---

## Budget Caps

Cap total token usage or USD cost across all jobs in a flow. When the budget is exceeded, remaining jobs either fail or pause depending on the `onExceeded` policy.

### Setting a budget on a flow

```typescript
import { FlowProducer } from 'glide-mq';

const flow = new FlowProducer({ connection });
const node = await flow.add(
  {
    name: 'rag-pipeline',
    queueName: 'ai',
    data: { query: 'How does glide-mq work?' },
    children: [
      { name: 'embed', queueName: 'ai', data: { step: 'embed' } },
      { name: 'search', queueName: 'ai', data: { step: 'search' } },
      { name: 'generate', queueName: 'ai', data: { step: 'generate' } },
    ],
  },
  { budget: { maxTotalTokens: 2000, maxCostUsd: 0.05, onExceeded: 'fail' } },
);
```

### Reading budget state

```typescript
const budget = await queue.getFlowBudget(parentJobId);
// {
//   maxTotalTokens: 2000,
//   maxCostUsd: 0.05,
//   usedTokens: 1450,
//   usedCost: 0.032,
//   exceeded: false,
//   onExceeded: 'fail'
// }
```

### The `BudgetOptions` interface

```typescript
interface BudgetOptions {
  maxTotalTokens?: number;  // hard cap on total tokens
  maxCostUsd?: number;      // hard cap on total USD cost
  onExceeded?: 'pause' | 'fail';  // default: 'fail'
}
```

Budget enforcement works with `job.reportUsage()` - each job's reported tokens and cost are accumulated against the flow's budget key.

---

## Fallback Chains

Define an ordered list of model/provider alternatives that are tried automatically on retryable failure. The processor reads `job.currentFallback` to know which model to use on each retry.

### Defining fallbacks on a job

```typescript
await queue.add('llm-query', {
  prompt: 'Explain message queues.',
  primaryModel: 'gpt-5.4',
}, {
  attempts: 4,  // 1 original + 3 fallbacks
  backoff: { type: 'fixed', delay: 1000 },
  fallbacks: [
    { model: 'gpt-4.1-nano', provider: 'openai' },
    { model: 'claude-sonnet-4-20250514', provider: 'anthropic' },
    { model: 'gemini-2.5-pro', provider: 'google' },
  ],
});
```

### Using fallbacks in the processor

```typescript
const worker = new Worker('llm-query', async (job) => {
  const fallback = job.currentFallback;
  // fallbackIndex=0: original attempt (currentFallback is undefined)
  // fallbackIndex=1: first retry (currentFallback = fallbacks[0])
  // fallbackIndex=2: second retry (currentFallback = fallbacks[1])

  const model = fallback ? fallback.model : job.data.primaryModel;
  const result = await callLLM(model, job.data.prompt);

  await job.reportUsage({
    model: result.model,
    inputTokens: result.inputTokens,
    outputTokens: result.outputTokens,
  });

  return { content: result.text, model };
}, { connection });
```

### How it works

- `fallbackIndex` starts at 0 (original request). On each retry, it increments.
- `job.currentFallback` returns `fallbacks[fallbackIndex - 1]`, or `undefined` for the original attempt.
- Each fallback entry can carry arbitrary `metadata` for custom routing logic.
- Fallback chains compose with standard retry/backoff configuration.
- The chain length determines maximum retries - if `fallbacks` has 3 entries, set `attempts: 4` (1 original + 3 fallbacks).

---

## Dual-Axis Rate Limiting

Enforce both RPM (requests per minute) and TPM (tokens per minute) limits to comply with LLM provider rate limits. Standard `limiter` controls RPM. The new `tokenLimiter` controls TPM.

### Configuring dual-axis limiting

```typescript
const worker = new Worker('inference', processor, {
  connection,
  concurrency: 10,

  // RPM: max 60 requests per minute
  limiter: { max: 60, duration: 60_000 },

  // TPM: max 100,000 tokens per minute
  tokenLimiter: {
    maxTokens: 100_000,
    duration: 60_000,
    scope: 'both',  // 'queue' | 'worker' | 'both'
  },
});
```

### Reporting tokens for TPM tracking

```typescript
const worker = new Worker('inference', async (job) => {
  const result = await callLLM(job.data.prompt);

  // Report tokens so the limiter can track consumption
  await job.reportTokens(result.totalTokens);

  return result;
}, { connection, tokenLimiter: { maxTokens: 50_000, duration: 60_000 } });
```

### Scope options

| Scope | Behavior |
|-------|----------|
| `'queue'` | Shared Valkey counter across all workers. Accurate but adds 1 RTT per job. |
| `'worker'` | In-memory counter per worker instance. Zero overhead, but each worker enforces independently. |
| `'both'` (default) | Local check first, then Valkey. Best of both - fast path when under limit, accurate enforcement when near capacity. |

When either RPM or TPM is exceeded, the worker pauses fetching new jobs until the window resets. Jobs already in progress are not interrupted.

---

## Vector Search

Search jobs by vector similarity using Valkey Search. Create an index over job hashes, store embeddings via `job.storeVector()`, then query with `queue.vectorSearch()`.

See the dedicated [Vector Search guide](./vector-search) for full details.

### Quick example

```typescript
// Create an index with a vector field
await queue.createJobIndex({
  vectorField: {
    name: 'embedding',
    dimensions: 1536,
    algorithm: 'HNSW',
    distanceMetric: 'COSINE',
  },
});

// Store a vector on a job
const job = await queue.add('document', { title: 'Queue Fundamentals' });
await job.storeVector('embedding', myEmbeddingVector);

// Search by similarity
const results = await queue.vectorSearch(queryVector, {
  k: 10,
  filter: '@state:{completed}',
});
for (const { job, score } of results) {
  console.log(`${job.name}: ${score}`);
}
```

---

## Per-Job Lock Duration

Override the worker-level lock duration for individual jobs. This is critical for AI workloads where inference latency varies widely - embedding calls finish in 1-2 seconds while large model generation can take 30-60 seconds.

```typescript
// Fast embedding job - 5 second lock
await queue.add('embed', { text: 'hello' }, {
  lockDuration: 5_000,
});

// Slow generation job - 60 second lock
await queue.add('generate', { prompt: 'Write a novel...' }, {
  lockDuration: 60_000,
});
```

The lock duration controls:
- **Heartbeat frequency**: the worker sends a heartbeat every `lockDuration / 2`.
- **Stall detection threshold**: jobs without a heartbeat within `lockDuration` are reclaimed.

Without per-job lock, you must set the worker's `lockDuration` to accommodate the slowest job, which degrades stall detection for fast jobs.

---

## Combining Primitives

These primitives compose naturally. A single pipeline can use:

- **Fallback chains** for model resilience
- **Usage tracking** to monitor costs
- **Budget caps** to prevent runaway spending
- **Token streaming** for real-time output
- **Suspend/resume** for human-in-the-loop checkpoints
- **Per-job lock** to match timeouts to model latency
- **TPM limiting** to respect provider rate limits

```typescript
// RAG pipeline with all primitives
const node = await flow.add({
  name: 'rag',
  queueName: 'ai',
  data: { query: 'How does it work?' },
  children: [
    {
      name: 'embed',
      queueName: 'ai',
      data: { step: 'embed' },
      opts: { lockDuration: 5_000 },
    },
    {
      name: 'generate',
      queueName: 'ai',
      data: { step: 'generate' },
      opts: {
        lockDuration: 60_000,
        fallbacks: [
          { model: 'gpt-4.1-nano', provider: 'openai' },
          { model: 'claude-sonnet-4-20250514', provider: 'anthropic' },
        ],
        attempts: 3,
        backoff: { type: 'exponential', delay: 2000 },
      },
    },
  ],
}, { budget: { maxTotalTokens: 5000, onExceeded: 'fail' } });
```

See [Examples: AI Pipelines](/examples/ai-pipelines) for complete, runnable examples.
