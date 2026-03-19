---
layout: home

hero:
  name: glide-mq
  text: Message Queue for Node.js
  tagline: High-performance job queue on Valkey/Redis Streams with 1-RTT operations and a Rust NAPI core
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/avifenesh/glide-mq
    - theme: alt
      text: Migration from BullMQ
      link: /migration/from-bullmq

features:
  - icon: "&#9889;"
    title: 1 Round-Trip Per Job
    details: All queue operations complete in a single FCALL via Valkey Server Functions - no Lua EVAL overhead, no multi-command scripts.
  - icon: "&#128640;"
    title: Rust NAPI Core
    details: Built on valkey-glide native bindings. Protocol parsing in Rust, not JavaScript. Lower latency, less GC pressure.
  - icon: "&#127760;"
    title: Cluster-Native
    details: Hash-tagged keys route all queue data to the same slot automatically. Works identically on standalone and cluster.
  - icon: "&#128279;"
    title: Workflows & DAGs
    details: FlowProducer for parent-child trees. chain(), group(), chord() helpers. Arbitrary DAG submission with cycle detection.
  - icon: "&#128264;"
    title: Broadcast & Fan-Out
    details: Durable pub/sub with independent subscriber groups, NATS-style subject filtering, and per-group retries.
  - icon: "&#9729;"
    title: Serverless-Ready
    details: ServerlessPool caches connections across warm invocations. Lightweight Producer class with zero EventEmitter overhead.
---

## Performance

Benchmarked on AWS ElastiCache Valkey 8.2 (r7g.large) with TLS enabled:

| Concurrency | glide-mq | BullMQ | Delta |
|---|---|---|---|
| c=1 | 2,479 j/s | 2,535 j/s | -2% |
| c=5 | 10,754 j/s | 9,866 j/s | +9% |
| c=10 | 18,218 j/s | 13,541 j/s | **+35%** |
| c=15 | 19,583 j/s | 14,162 j/s | **+38%** |

`addBulk`: 10,000 jobs in 350ms. Gzip compression: 98% reduction on 15KB payloads.

## Quick Install

```bash
npm install glide-mq
```

Requires Node.js 20+ and Valkey 7.0+ (or Redis 7.0+).

## Ecosystem

| Package | Description |
|---|---|
| [glide-mq](https://www.npmjs.com/package/glide-mq) | Core queue library |
| [@glidemq/hono](/integrations/hono) | Hono middleware |
| [@glidemq/fastify](/integrations/fastify) | Fastify plugin |
| [@glidemq/nestjs](/integrations/nestjs) | NestJS module |
| [@glidemq/hapi](/integrations/hapi) | Hapi plugin |
| [@glidemq/dashboard](/integrations/dashboard) | Express web dashboard |
