---
layout: home

hero:
  name: glide-mq
  text: AI-Native Message Queue for Node.js
  tagline: Built-in primitives for LLM orchestration - cost tracking, token streaming, human-in-the-loop, model failover, TPM rate limiting, budget caps, and vector search. Powered by Valkey/Redis Streams with 1-RTT operations and a Rust NAPI core.
  actions:
    - theme: brand
      text: AI-Native Guide
      link: /guide/ai-native
    - theme: alt
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/avifenesh/glide-mq

features:
  - icon: "&#129302;"
    title: AI-Native Primitives
    details: Cost tracking, token streaming, suspend/resume, budget caps, fallback chains, dual-axis rate limiting (RPM + TPM), and vector search - built into the queue, not bolted on.
  - icon: "&#9889;"
    title: 1 Round-Trip Per Job
    details: All queue operations complete in a single FCALL via Valkey Server Functions. No Lua EVAL overhead, no multi-command scripts.
  - icon: "&#128640;"
    title: Rust NAPI Core
    details: Built on valkey-glide native bindings. Protocol parsing in Rust, not JavaScript. Lower latency, less GC pressure.
  - icon: "&#127760;"
    title: Cluster-Native
    details: Hash-tagged keys route all queue data to the same slot automatically. Works identically on standalone and cluster.
  - icon: "&#128279;"
    title: Workflows & DAGs
    details: FlowProducer for parent-child trees. chain(), group(), chord() helpers. Arbitrary DAG submission with cycle detection.
  - icon: "&#9729;"
    title: Serverless-Ready
    details: ServerlessPool caches connections across warm invocations. Lightweight Producer class with zero EventEmitter overhead.
---

## AI-Native Primitives

Every primitive AI orchestration needs - built into the queue, not a plugin or middleware.

| Primitive | API | What it does |
|---|---|---|
| **Cost tracking** | `job.reportUsage()` / `queue.getFlowUsage()` | Record model, tokens, cost, latency per job. Aggregate across entire flows. |
| **Token streaming** | `job.stream()` / `queue.readStream()` | Stream LLM output tokens to consumers in real time. SSE proxy endpoint included. |
| **Human-in-the-loop** | `job.suspend()` / `queue.signal()` | Pause for approval. Resume with a named signal and payload. Zero compute while suspended. |
| **Budget caps** | `FlowProducer.add(flow, { budget })` | Cap total tokens or USD cost across all jobs in a flow. Pre-dispatch + post-completion enforcement. |
| **Fallback chains** | `opts.fallbacks` / `job.currentFallback` | Ordered model/provider alternatives tried automatically on failure. |
| **Rate limiting** | `tokenLimiter` + `limiter` | RPM (requests/min) + TPM (tokens/min) with per-queue and per-worker scopes. |
| **Vector search** | `queue.createJobIndex()` / `queue.vectorSearch()` | KNN similarity search over jobs via Valkey Search. Your jobs are your vector store. |

```typescript
const worker = new Worker('ai', async (job) => {
  const result = await callLLM(job.data.prompt);
  await job.reportUsage({ model: 'gpt-5.4', inputTokens: 50, outputTokens: 200, costUsd: 0.003 });
  await job.stream({ type: 'token', content: result });
  return result;
}, {
  connection,
  tokenLimiter: { maxTokens: 100000, duration: 60000 },
});
```

[Read the full AI-Native guide](/guide/ai-native) | [18 runnable examples](/examples/ai-pipelines) | [Vercel AI SDK integration](/examples/frameworks#vercel-ai-sdk) | [LangChain integration](/examples/frameworks#langchain)

## Performance

Benchmarked on AWS ElastiCache Valkey 8.2 (r7g.large) with TLS:

| Concurrency | glide-mq | Leading Alternative | Delta |
|---|---|---|---|
| c=5 | 10,754 j/s | 9,866 j/s | +9% |
| c=10 | 18,218 j/s | 13,541 j/s | **+35%** |
| c=15 | 19,583 j/s | 14,162 j/s | **+38%** |

## Quick Install

```bash
npm install glide-mq
```

Requires Node.js 20+ (also works with Bun and Deno) and Valkey 7.0+ or Redis 7.0+. For vector search, use [valkey-bundle](https://hub.docker.com/r/valkey/valkey-bundle).

## Ecosystem

| Package | Description |
|---|---|
| [glide-mq](https://www.npmjs.com/package/glide-mq) | Core queue library |
| [@glidemq/hono](/integrations/hono) | Hono middleware |
| [@glidemq/fastify](/integrations/fastify) | Fastify plugin |
| [@glidemq/nestjs](/integrations/nestjs) | NestJS module |
| [@glidemq/hapi](/integrations/hapi) | Hapi plugin |
| [@glidemq/dashboard](/integrations/dashboard) | Express web dashboard |
