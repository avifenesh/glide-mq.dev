---
title: AI Pipeline Examples
description: RAG pipelines, agent loops, content moderation, model failover, streaming, budget caps, and framework integrations with Vercel AI SDK and LangChain.
---

# AI Pipeline Examples

Real-world AI examples combining glide-mq's AI-native primitives. Each example is a self-contained TypeScript file in the `examples/` directory. Most require an `OPENROUTER_API_KEY` environment variable for LLM access.

## Table of Contents

- [RAG Pipeline](#rag-pipeline)
- [AI Agent Loop](#ai-agent-loop)
- [Content Pipeline](#content-pipeline)
- [Model Failover](#model-failover)
- [Token Streaming](#token-streaming)
- [Budget Cap](#budget-cap)
- [TPM Throttle](#tpm-throttle)
- [Human Approval](#human-approval)
- [Usage Tracking](#usage-tracking)
- [Embedding Pipeline](#embedding-pipeline)
- [Agent Memory (Vector Search)](#agent-memory)
- [Adaptive Timeout](#adaptive-timeout)
- [Search Dashboard](#search-dashboard)
- [Vercel AI SDK Integration](#vercel-ai-sdk)
- [LangChain Integration](#langchain)

---

## RAG Pipeline

**File:** `examples/rag-pipeline.ts`

Combines multiple AI primitives in a retrieval-augmented generation flow:

1. **Embed** query (fast model, short lock)
2. **Vector search** (simulated retrieval)
3. **Generate** response (large model, streaming, long lock)

Parent aggregates results. Budget caps the entire flow.

```typescript
const node = await flow.add({
  name: 'rag',
  queueName: QUEUE,
  data: { step: 'aggregate', query },
  children: [
    { name: 'embed', queueName: QUEUE, data: { step: 'embed', query },
      opts: { lockDuration: 5_000 } },
    { name: 'search', queueName: QUEUE, data: { step: 'search', query },
      opts: { lockDuration: 5_000 } },
    { name: 'generate', queueName: QUEUE,
      data: { step: 'generate', query, context: docs },
      opts: { lockDuration: 60_000 } },
  ],
}, { budget: { maxTotalTokens: 1000 } });
```

**Primitives used:** usage tracking, streaming, budget caps, per-job lock, FlowProducer

---

## AI Agent Loop

**File:** `examples/ai-agent-loop.ts`

ReAct-style agent with a plan/execute/observe loop. Each iteration makes an LLM call with tool use, tracks usage, and optionally suspends for human input.

```typescript
const worker = new Worker(QUEUE, async (job) => {
  const { task, history = [], iteration = 0 } = job.data;

  // Check for human signal on resume
  if (job.signals.length > 0) {
    const sig = job.signals[0];
    // Continue with human's answer as context
  }

  // Plan -> Execute -> Observe loop
  const planResult = await chat(model, [...history, { role: 'user', content: task }]);
  await job.reportUsage({ model: planResult.model, ... });
  // ...
}, { connection, tokenLimiter: { maxTokens: 1000, duration: 60_000 } });
```

**Primitives used:** suspend/resume, fallbacks, usage tracking, TPM limiter

---

## Content Pipeline

**File:** `examples/content-pipeline.ts`

Content moderation pipeline with classification, human review, and AI-powered polishing:

1. **Classify** content (fast model)
2. **Moderate** - suspend for human review if borderline
3. **Polish** - generate polished version (streaming, with fallback models)

Budget cap prevents excessive generation costs.

**Primitives used:** suspend/resume, streaming, fallbacks, budget caps, usage tracking

---

## Model Failover

**File:** `examples/model-failover.ts`

Primary model is unavailable, automatically falls back through a chain of alternatives. The processor reads `job.currentFallback` on each retry.

```typescript
await queue.add('llm-query', {
  prompt: 'Explain message queues in one sentence.',
  primaryModel: 'nonexistent-model-v99',
}, {
  attempts: 4,
  backoff: { type: 'fixed', delay: 1000 },
  fallbacks: [
    { model: 'meta-llama/llama-3.3-8b-instruct:free', provider: 'meta' },
    { model: 'google/gemma-3-4b-it:free', provider: 'google' },
    { model: 'qwen/qwen3-4b:free', provider: 'qwen' },
  ],
});
```

**Primitives used:** fallback chains, usage tracking

---

## Token Streaming

**File:** `examples/token-streaming.ts`

Stream LLM output tokens to a consumer in real time via per-job Valkey streams.

```typescript
// Producer side
for await (const chunk of streamChat(model, messages)) {
  if (chunk.type === 'token') {
    await job.stream({ t: chunk.content });
  } else {
    await job.stream({ t: '', done: '1' });
  }
}

// Consumer side
const entries = await queue.readStream(jobId, { lastId, block: 5000 });
for (const entry of entries) {
  process.stdout.write(entry.fields.t);
}
```

**Primitives used:** token streaming, usage tracking

---

## Budget Cap

**File:** `examples/budget-cap.ts`

Prevent a runaway AI agent from burning through token budget. A flow with 5 child jobs has a budget of 200 total tokens. After 3-4 jobs, the budget is exceeded and remaining jobs fail.

```typescript
const node = await flow.add({
  name: 'budget-parent',
  queueName: QUEUE,
  data: {},
  children: [
    { name: 'task-1', queueName: QUEUE, data: { prompt: '...' } },
    { name: 'task-2', queueName: QUEUE, data: { prompt: '...' } },
    // ... more children
  ],
}, { budget: { maxTotalTokens: 200, onExceeded: 'fail' } });
```

**Primitives used:** budget caps, usage tracking, FlowProducer

---

## TPM Throttle

**File:** `examples/tpm-throttle.ts`

Batch AI processing with provider rate limit compliance. The worker is configured with a token limiter (300 tokens per 10s window). After the first few jobs consume the budget, processing pauses until the window resets.

```typescript
const worker = new Worker(QUEUE, async (job) => {
  const result = await chat(model, messages, 30);
  await job.reportTokens(result.totalTokens);
  return { tokens: result.totalTokens };
}, {
  connection,
  tokenLimiter: { maxTokens: 300, duration: 10_000 },
});
```

**Primitives used:** dual-axis rate limiting (TPM), usage tracking

---

## Human Approval

**File:** `examples/human-approval.ts`

AI generates a customer email reply, human approves before sending. On rejection, the AI generates a new draft.

```typescript
// Generate draft and suspend
await job.suspend({ reason: 'awaiting-review' });

// Resume with signal
await queue.signal(jobId, 'review', { action: 'approve', draft: '...' });
```

**Primitives used:** suspend/resume, usage tracking

---

## Usage Tracking

**File:** `examples/usage-tracking.ts`

Demonstrates `job.reportUsage()` with model, tokens, cost, and latency. Shows per-job inspection and flow-level aggregation.

**Primitives used:** usage tracking, flow usage aggregation

---

## Embedding Pipeline

**File:** `examples/embedding-pipeline.ts`

Generates embeddings for a batch of documents using an LLM, stores vectors on jobs, and tracks usage.

**Primitives used:** usage tracking, per-job lock, vector storage

---

## Agent Memory

**File:** `examples/agent-memory.ts`

Vector search over job history - store embeddings from past agent interactions and retrieve relevant context for new queries.

**Primitives used:** vector search, `storeVector()`, `vectorSearch()`

---

## Adaptive Timeout

**File:** `examples/adaptive-timeout.ts`

Per-job lock duration based on expected model latency. Fast models get short locks for quick stall detection; slow models get long locks to avoid false stalls.

```typescript
await queue.add('embed', data, { lockDuration: 5_000 });
await queue.add('generate', data, { lockDuration: 60_000 });
```

**Primitives used:** per-job lock duration

---

## Search Dashboard

**File:** `examples/search-dashboard.ts`

Creates a Valkey Search index with TAG, NUMERIC, and VECTOR fields over job hashes. Demonstrates filtering, full-text search, and KNN vector queries.

**Primitives used:** `createJobIndex()`, `vectorSearch()`, `storeVector()`

---

## Vercel AI SDK

**File:** `examples/with-vercel-ai-sdk.ts`

Use the Vercel AI SDK (`generateText`, `streamText`) inside a glide-mq worker for durable, retryable AI inference. Token usage is reported from the AI SDK response.

```typescript
import { createOpenAI } from '@ai-sdk/openai';
import { generateText, streamText } from 'ai';
import { Queue, Worker } from 'glide-mq';

const worker = new Worker(QUEUE, async (job) => {
  if (job.data.mode === 'stream') {
    const result = streamText({
      model: openrouter.chat(model),
      prompt: job.data.prompt,
    });

    for await (const chunk of result.textStream) {
      await job.stream({ t: chunk });
    }
    await job.stream({ t: '', done: '1' });

    const usage = await result.usage;
    await job.reportUsage({
      model,
      provider: 'openrouter',
      tokens: { input: usage.inputTokens ?? 0, output: usage.outputTokens ?? 0 },
    });
    return { content: await result.text };
  }

  // Default: generateText
  const result = await generateText({
    model: openrouter.chat(model),
    prompt: job.data.prompt,
  });

  await job.reportUsage({
    model,
    provider: 'openrouter',
    tokens: { input: result.usage.inputTokens ?? 0, output: result.usage.outputTokens ?? 0 },
  });

  return { content: result.text };
}, { connection });
```

**Primitives used:** token streaming, usage tracking

---

## LangChain

**File:** `examples/with-langchain.ts`

LangChain chains (`prompt | model | parser`) run inside glide-mq workers for durable, retryable execution. A 3-step pipeline (research, summarize, format) uses different chains, with token usage reported from LangChain's response metadata.

```typescript
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { Queue, Worker, FlowProducer } from 'glide-mq';

const worker = new Worker(QUEUE, async (job) => {
  const { step } = job.data;

  if (step === 'research') {
    const result = await invokeWithUsage(researchChain, { topic: job.data.topic });
    await job.reportUsage({
      model: 'arcee-ai/trinity-large-preview:free',
      provider: 'openrouter',
      tokens: { input: result.usage.promptTokens ?? 0, output: result.usage.completionTokens ?? 0 },
    });
    return { output: result.text };
  }
  // ... summarize, format steps
}, { connection });
```

**Primitives used:** usage tracking, FlowProducer pipeline
