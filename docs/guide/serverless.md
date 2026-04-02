---
title: Serverless / Edge Guide
description: Lightweight enqueueing for AWS Lambda and similar server-side runtimes, plus HTTP proxy patterns for edge platforms.
---

# Serverless / Edge Guide

Lightweight enqueueing for AWS Lambda and other server-side runtimes where persistent connections are expensive or impossible. For edge runtimes without NAPI support, use the HTTP proxy pattern instead of importing `glide-mq` directly.

## Why Producer over Queue

The `Queue` class extends `EventEmitter`, creates `Job` instances, and is designed for long-running processes. In serverless environments this overhead is wasted:

|                  | Queue              | Producer                      |
| ---------------- | ------------------ | ----------------------------- |
| EventEmitter     | Yes                | No                            |
| Job instances    | Returns `Job<D,R>` | Returns `string` ID           |
| State tracking   | Yes                | No                            |
| Connection reuse | Manual             | Built-in via `ServerlessPool` |
| Overhead         | ~2KB per instance  | Minimal                       |

Both use the **same FCALL functions** on the server - jobs created by `Producer` are identical to those created by `Queue` and are processed by the same `Worker`.

## Quick Start

```typescript
import { Producer } from 'glide-mq';

const producer = new Producer('emails', {
  connection: { addresses: [{ host: 'localhost', port: 6379 }] },
  events: false, // skip XADD event emission - saves 1 redis.call() per add
});

const jobId = await producer.add('send-welcome', {
  to: 'user@example.com',
  subject: 'Welcome!',
});

console.log(`Enqueued job ${jobId}`);
await producer.close();
```

## AWS Lambda

Use `ServerlessPool` to reuse connections across warm invocations:

```typescript
import { serverlessPool } from 'glide-mq';

const CONNECTION = {
  addresses: [{ host: process.env.VALKEY_HOST!, port: 6379 }],
};

export async function handler(event: any) {
  const producer = serverlessPool.getProducer('notifications', {
    connection: CONNECTION,
  });

  const id = await producer.add('push-notification', {
    userId: event.userId,
    message: event.message,
  });

  return { statusCode: 200, body: JSON.stringify({ jobId: id }) };
}

// Optional: clean up on SIGTERM (Lambda extension)
process.on('SIGTERM', async () => {
  await serverlessPool.closeAll();
});
```

On cold starts, `getProducer` creates a new connection. On warm invocations, it returns the cached producer - zero connection overhead.

## Cloudflare Workers

Cloudflare Workers do not provide the server-side NAPI runtime that `glide-mq` requires. Use the HTTP proxy from a Worker instead:

```typescript
export default {
  async fetch(request: Request, env: any) {
    const body = await request.json();
    const res = await fetch(`${env.GLIDEMQ_PROXY_URL}/queues/tasks/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.PROXY_TOKEN}` },
      body: JSON.stringify({ name: 'process-webhook', data: body }),
    });
    return new Response(await res.text(), {
      status: res.status,
      headers: { 'content-type': res.headers.get('content-type') ?? 'application/json' },
    });
  },
};
```

## Vercel Edge Functions

Vercel Edge has the same limitation. Use `fetch()` against the HTTP proxy or another server-side endpoint that owns the Valkey connection:

```typescript
export default async function handler(req: Request) {
  const body = await req.json();
  const res = await fetch(`${process.env.GLIDEMQ_PROXY_URL}/queues/analytics/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PROXY_TOKEN!}`,
    },
    body: JSON.stringify({ name: 'track-event', data: body }),
  });

  return new Response(await res.text(), {
    status: res.status,
    headers: { 'content-type': res.headers.get('content-type') ?? 'application/json' },
  });
}

export const config = { runtime: 'edge' };
```

## Bulk Enqueueing

Use `addBulk()` to pipeline multiple jobs in a single round trip:

```typescript
const ids = await producer.addBulk([
  { name: 'send-email', data: { to: 'a@test.com' } },
  { name: 'send-email', data: { to: 'b@test.com' } },
  { name: 'send-sms', data: { phone: '+1234567890' } },
]);
// ids: ['1', '2', '3']
```

## All Queue.add() Features Work

Producer supports the same `JobOptions` as `Queue.add()`:

```typescript
// Delayed job
await producer.add('reminder', data, { delay: 3600000 });

// Priority
await producer.add('urgent', data, { priority: 1 });

// Deduplication
await producer.add('idempotent', data, {
  deduplication: { id: 'unique-key', ttl: 60000 },
});

// Custom job ID
await producer.add('named', data, { jobId: 'order-12345' });

// Ordering key
await producer.add('sequential', data, {
  ordering: { key: 'user-42', concurrency: 1 },
});

// TTL
await producer.add('ephemeral', data, { ttl: 30000 });

// Compression (set at Producer level)
const compressed = new Producer('q', {
  connection: CONNECTION,
  compression: 'gzip',
});
```

## API Reference

### `new Producer(name, opts)`

| Parameter          | Type                | Description                                           |
| ------------------ | ------------------- | ----------------------------------------------------- |
| `name`             | `string`            | Queue name                                            |
| `opts.connection`  | `ConnectionOptions` | Connection config (required unless `client` provided) |
| `opts.client`      | `Client`            | Pre-existing GLIDE client (not owned by Producer)     |
| `opts.prefix`      | `string`            | Key prefix (default: `'glide'`)                       |
| `opts.compression` | `'none' \| 'gzip'`  | Compression mode (default: `'none'`)                  |
| `opts.serializer`  | `Serializer`        | Custom serializer (default: JSON)                     |
| `opts.events`      | `boolean`           | Emit 'added' events on add (default: `true`)          |

### `producer.add(name, data, opts?)`

Returns `Promise<string | null>` - job ID or `null` for dedup/collision.

### `producer.addBulk(jobs)`

Returns `Promise<(string | null)[]>` - array of job IDs.

### `producer.close()`

Closes the owned connection. If an external `client` was provided, it is not closed.

### `ServerlessPool`

```typescript
import { serverlessPool, ServerlessPool } from 'glide-mq';

// Use the module-level singleton
const producer = serverlessPool.getProducer('queue', { connection });

// Or create your own pool
const pool = new ServerlessPool();
pool.getProducer('queue', { connection });
await pool.closeAll();
```

## AI Primitives in Serverless

### Enqueuing AI jobs from serverless functions

The `Producer` class supports all `JobOptions` including AI-native options like `fallbacks`, `lockDuration`, and `ordering`. Ordering is useful for per-key sequencing, per-group concurrency, and token-bucket rate limits. Worker-side TPM enforcement still comes from `tokenLimiter`. AI-specific processing (streaming, usage tracking, budgets) happens on the worker side.

```typescript
import { serverlessPool } from 'glide-mq';

export async function handler(event: any) {
  const producer = serverlessPool.getProducer('inference', { connection: CONNECTION });

  // Enqueue with fallback chain and per-job lock
  const id = await producer.add('generate', {
    prompt: event.prompt,
    primaryModel: 'gpt-5.4',
  }, {
    fallbacks: [
      { model: 'gpt-5.4-nano', provider: 'openai' },
      { model: 'claude-sonnet-4-20250514', provider: 'anthropic' },
    ],
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 },
    lockDuration: 60_000,
  });

  return { statusCode: 200, body: JSON.stringify({ jobId: id }) };
}
```

### Reading streaming output from serverless

Use `Queue.readStream()` to consume LLM token streams from a serverless API endpoint:

```typescript
import { Queue } from 'glide-mq';

const queue = new Queue('inference', { connection: CONNECTION });

export async function handler(req: Request) {
  const { jobId } = await req.json();
  const entries = await queue.readStream(jobId, { count: 100 });
  return Response.json({ chunks: entries.map(e => e.fields) });
}
```

For long-polling (blocking reads), pass `block`:

```typescript
const entries = await queue.readStream(jobId, {
  lastId: req.headers.get('x-last-id') ?? undefined,
  block: 5000,
  count: 50,
});
```

## Connection Behavior

- **Cold start**: `getClient()` creates a new GLIDE connection and loads the function library
- **Warm invocation**: Returns the cached client immediately
- **Container freeze/thaw**: GLIDE auto-reconnects on next command
- **SIGTERM**: Call `serverlessPool.closeAll()` or `producer.close()` for clean shutdown
