---
title: Getting Started
description: Install glide-mq, set up your first queue and worker, and learn the core concepts.
---

# Getting Started

## Install

```bash
npm install glide-mq
```

Requires Node.js 20+ and a running [Valkey](https://valkey.io) 7.0+ or Redis 7.0+ instance.

## Quick Start

```typescript
import { Queue, Worker } from 'glide-mq';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

const queue = new Queue('tasks', { connection });
await queue.add('send-email', { to: 'user@example.com', subject: 'Hello' });

const worker = new Worker('tasks', async (job) => {
  console.log(`Processing ${job.name}:`, job.data);
  return { sent: true };
}, { connection, concurrency: 10 });

worker.on('completed', (job) => console.log(`Job ${job.id} done`));
worker.on('failed', (job, err) => console.error(`Job ${job.id} failed:`, err.message));
```

## Core Concepts

- **Queue** - stores jobs in Valkey Streams. Handles enqueue, delay, priority, pause, drain, and bulk operations.
- **Worker** - processes jobs with configurable concurrency, prefetch, lock duration, and stalled-job recovery.
- **Job** - a unit of work with name, data, options (retries, backoff, priority, TTL), and lifecycle events.
- **FlowProducer** - creates parent-child job trees and DAGs. A parent waits for all children before processing.
- **Producer** - lightweight enqueue-only client. No EventEmitter, no Job instances, returns plain string IDs. Built for serverless.
- **Broadcast** - fan-out pub/sub. Each message is delivered to every subscriber group with independent retries and backpressure.
- **QueueEvents** - real-time stream of job lifecycle events (completed, failed, delayed, waiting, etc.).

## Requirements

- **Node.js 20+**
- **Valkey 7.0+** or **Redis 7.0+**
- TypeScript 5+ recommended

## How It Works

glide-mq connects through a Rust-native NAPI client ([valkey-glide](https://github.com/valkey-io/valkey-glide)), executes all queue logic in a single Valkey Server Function call per operation (FCALL, not EVAL), and hash-tags every key for automatic cluster slot alignment. The result is fewer round trips, no Lua cache misses, and zero cluster configuration.

| Aspect | glide-mq approach |
|--------|-------------------|
| **Network per job** | 1 RTT - complete current job + fetch next in a single FCALL |
| **Client** | Rust NAPI bindings (valkey-glide) - no JS protocol parsing |
| **Server logic** | 1 persistent Valkey Function library (FUNCTION LOAD + FCALL) - no per-call EVAL recompilation |
| **Cluster** | Hash-tagged keys (`glide:{queueName}:*`) - all queue data routes to the same slot automatically |

## Adding Jobs

```typescript
// Single job
const job = await queue.add('send-email', { to: 'user@example.com' });

// With options
await queue.add('send-email', { to: 'user@example.com' }, {
  delay: 5_000,       // run after 5 seconds
  priority: 1,        // lower = higher priority
  attempts: 3,        // retry up to 3 times
  backoff: { type: 'exponential', delay: 1_000 },
});

// Bulk add - 12.7x faster than serial
await queue.addBulk([
  { name: 'job1', data: { a: 1 } },
  { name: 'job2', data: { a: 2 } },
]);
```

## Cluster Mode

Set `clusterMode: true` in the connection config. Everything else stays the same - keys are hash-tagged automatically.

```typescript
const connection = {
  addresses: [
    { host: 'node1', port: 7000 },
    { host: 'node2', port: 7001 },
  ],
  clusterMode: true,
};

const queue = new Queue('tasks', { connection });
const worker = new Worker('tasks', processor, { connection });
```

## Graceful Shutdown

```typescript
import { gracefulShutdown } from 'glide-mq';

await gracefulShutdown([queue, worker]);
```

Registers `SIGTERM`/`SIGINT` handlers and waits for all components to close before the process exits.

## Next Steps

- [Usage Guide](./usage) - Queue, Worker, and event listener details
- [Advanced Features](./advanced) - Schedulers, rate limiting, deduplication, compression
- [Workflows](./workflows) - FlowProducer, DAG, chain, group, chord
- [Broadcast](./broadcast) - Pub/sub fan-out messaging
- [Step Jobs](./step-jobs) - Multi-step job processors
- [Testing](./testing) - In-memory testing without Valkey
- [Serverless](./serverless) - Lambda and Edge deployment
- [Observability](./observability) - OpenTelemetry, metrics, dashboard
- [Wire Protocol](./wire-protocol) - Cross-language FCALL specs
- [Architecture](./architecture) - Internal design and key schema
- [Durability](./durability) - Persistence and delivery guarantees
- [Migration from BullMQ](/migration/from-bullmq) - API mapping and step-by-step guide
