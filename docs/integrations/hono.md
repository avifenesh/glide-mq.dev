---
title: Hono Integration
description: REST API and real-time SSE for glide-mq job queues, as Hono middleware. Type-safe RPC, flow orchestration, usage summaries, and broadcast SSE.
---

# @glidemq/hono

REST API and real-time SSE for [glide-mq](/guide/getting-started) job queues, as Hono middleware. One middleware + one router gives you the full queue management surface with type-safe RPC.

::: info Package Links
- **npm:** [@glidemq/hono](https://www.npmjs.com/package/@glidemq/hono)
- **GitHub:** [github.com/avifenesh/glidemq-hono](https://github.com/avifenesh/glidemq-hono)
:::

## Why @glidemq/hono

- **Type-safe RPC client** -- export `GlideMQApiType` and use Hono's `hc<>` for end-to-end typed HTTP calls with zero codegen
- **Edge and serverless ready** -- lightweight `Producer` re-exports let you enqueue jobs from Cloudflare Workers, Vercel Edge Functions, or Deno Deploy without pulling in full Queue/Worker machinery. Workers and SSE require a long-lived runtime (Node, Bun, Deno).
- **Multi-runtime** -- Hono runs on Node, Deno, Bun, and edge runtimes; this middleware follows
- **Two imports, full API** -- `glideMQ()` middleware + `glideMQApi()` router gives you queue control, SSE events, scheduler CRUD, flow orchestration, rolling usage summaries, and broadcast over HTTP
- **Optional Zod validation** -- install `zod` + `@hono/zod-validator` for request validation; works fine without them

## Install

```bash
npm install @glidemq/hono glide-mq hono
```

Optional Zod validation:

```bash
npm install zod @hono/zod-validator
```

Requires **glide-mq >= 0.14.0**.

## Quick Start

```ts
import { Hono } from 'hono';
import { glideMQ, glideMQApi } from '@glidemq/hono';

const app = new Hono();

app.use(
  glideMQ({
    connection: { addresses: [{ host: 'localhost', port: 6379 }] },
    queues: {
      emails: {
        processor: async (job) => {
          await sendEmail(job.data.to, job.data.subject);
          return { sent: true };
        },
        concurrency: 5,
      },
      reports: {},
    },
  }),
);

app.route('/api/queues', glideMQApi());

export default app;
```

## How It Works

`glideMQ(config)` is a Hono middleware that creates a `QueueRegistry` and injects it into every request as `c.var.glideMQ`. Queues and workers are initialized lazily on first access; producers are created eagerly when requested.

`glideMQApi(opts?)` returns a typed Hono sub-router with the full queue HTTP surface. Mount it at any path with `app.route()`. It reads the registry from `c.var.glideMQ` -- the middleware must be applied first.

You can also pass a pre-built `QueueRegistryImpl` for graceful shutdown control:

```ts
const registry = new QueueRegistryImpl({ connection, queues: { emails: { processor } } });
app.use(glideMQ(registry));
process.on('SIGTERM', () => registry.closeAll());
```

## Type-Safe RPC Client

Hono's `hc` client infers route types from the router, giving you end-to-end typed HTTP calls with no codegen and no OpenAPI spec:

```ts
import { hc } from 'hono/client';
import type { GlideMQApiType } from '@glidemq/hono';

const client = hc<GlideMQApiType>('http://localhost:3000/api/queues');

const res = await client[':name'].jobs.$post({
  param: { name: 'emails' },
  json: { name: 'welcome', data: { to: 'user@example.com' } },
});
const job = await res.json(); // typed as JobResponse
```

## Endpoints

### Jobs

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/:name/jobs` | Add a job |
| POST | `/:name/jobs/wait` | Add a job and wait for result |
| GET | `/:name/jobs` | List jobs (query: `type`, `start`, `end`, `excludeData`) |
| GET | `/:name/jobs/:id` | Get a single job |
| POST | `/:name/jobs/:id/priority` | Change job priority |
| POST | `/:name/jobs/:id/delay` | Change job delay |
| POST | `/:name/jobs/:id/promote` | Promote a delayed job |

### Queue Operations

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/:name/counts` | Get job counts by state |
| GET | `/:name/metrics` | Get queue metrics (query: `type`, `start`, `end`) |
| POST | `/:name/pause` | Pause queue |
| POST | `/:name/resume` | Resume queue |
| POST | `/:name/drain` | Drain waiting jobs |
| POST | `/:name/retry` | Retry failed jobs |
| DELETE | `/:name/clean` | Clean old jobs (query: `grace`, `limit`, `type`) |
| GET | `/:name/workers` | List active workers |
| GET | `/:name/events` | SSE event stream |
| POST | `/:name/produce` | Add a job via Producer (lightweight, serverless) |

### Schedulers

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/:name/schedulers` | List all schedulers |
| GET | `/:name/schedulers/:schedulerName` | Get a single scheduler |
| PUT | `/:name/schedulers/:schedulerName` | Upsert a scheduler |
| DELETE | `/:name/schedulers/:schedulerName` | Remove a scheduler |

### AI-Native

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/flows` | Create a tree flow or DAG over HTTP with `{ flow, budget? }` or `{ dag }` |
| GET | `/flows/:id` | Inspect a flow snapshot with nodes, roots, counts, usage, and budget |
| GET | `/flows/:id/tree` | Inspect the nested tree view for a submitted tree flow or DAG |
| DELETE | `/flows/:id` | Revoke or flag remaining jobs in a flow and delete the HTTP flow record |
| GET | `/:name/flows/:id/usage` | Aggregated token/cost usage across a flow |
| GET | `/:name/flows/:id/budget` | Budget state (limits, spent, exceeded) for a flow |
| GET | `/:name/jobs/:id/stream` | SSE stream of real-time chunks from a streaming job |

### Global and Broadcast

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/usage/summary` | Rolling token/cost summary across one or more queues |
| POST | `/broadcast/:name` | Publish a broadcast message with a `subject` and payload |
| GET | `/broadcast/:name/events` | SSE stream for a durable broadcast subscription (`?subscription=` required) |

## Features

- **Full queue HTTP API** -- jobs, counts, metrics, pause/resume, drain, retry, clean, workers, queue events, schedulers, producers, flow create/read/tree/delete, flow usage/budget, usage summary, and broadcast routes
- **Type-safe RPC** -- `hc<GlideMQApiType>` gives end-to-end typed HTTP calls with no codegen
- **Edge/serverless producers** -- re-exports `Producer`, `ServerlessPool`, and `serverlessPool` from glide-mq for lightweight job enqueuing without worker overhead
- **Real-time SSE** -- streams `completed`, `failed`, `progress`, `active`, `waiting`, `stalled`, `usage`, `suspended`, `budget-exceeded`, and `heartbeat` events via Hono's `streamSSE`
- **Queue access control** -- restrict which queues and producers are exposed via `GlideMQApiConfig`; the queue allowlist also governs broadcast names and `/usage/summary?queues=...`
- **Optional Zod validation** -- auto-detected at startup; degrades gracefully to manual parsing when not installed
- **Scheduler CRUD** -- create, read, update, and delete repeatable job schedulers (cron or interval)
- **Testing mode** -- `createTestApp()` uses in-memory TestQueue/TestWorker, no Valkey required
- **Broadcast over HTTP** -- publish messages and stream them via SSE with durable subscriptions and optional subject filters
- **Flow orchestration over HTTP** -- create tree flows or DAGs from any HTTP client, then inspect them as flat snapshots or nested trees

## Configuration

### GlideMQConfig

```ts
interface GlideMQConfig {
  connection?: ConnectionOptions; // Required unless testing: true
  queues?: Record<string, QueueConfig>;
  producers?: Record<string, ProducerConfig>;
  prefix?: string;      // Key prefix (default: 'glide')
  testing?: boolean;    // In-memory mode, no Valkey needed
  serializer?: Serializer;
}

interface QueueConfig {
  processor?: (job: Job) => Promise<any>; // Omit for producer-only queues
  concurrency?: number;                   // Default: 1
  workerOpts?: Record<string, unknown>;
}

interface ProducerConfig {
  compression?: 'none' | 'gzip';
  serializer?: Serializer;
}
```

### GlideMQApiConfig

```ts
interface GlideMQApiConfig {
  queues?: string[];     // Restrict to specific queue names
  producers?: string[];  // Restrict to specific producer names
}
```

Producers are lightweight alternatives to queues for serverless/edge -- they only support `add()` and `addBulk()`, return string IDs, and carry no worker or event-emitter overhead. Configure them alongside queues and use `POST /:name/produce` or access them directly via `c.var.glideMQ.getProducer(name)`.

## Testing

No Valkey needed. `createTestApp` wires middleware and router in testing mode using in-memory TestQueue/TestWorker:

```ts
import { createTestApp } from '@glidemq/hono/testing';

const { app, registry } = createTestApp({
  emails: { processor: async (job) => ({ sent: true }) },
});

const res = await app.request('/emails/jobs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'welcome', data: { to: 'user@example.com' } }),
});

expect(res.status).toBe(201);
await registry.closeAll();
```

> **Note:** SSE in testing mode emits `counts` events (polling-based state diffs) rather than job lifecycle events.

## Direct Registry Access

Access the registry in your own routes via `c.var.glideMQ`:

```ts
app.post('/send-email', async (c) => {
  const { queue } = c.var.glideMQ.get('emails');
  const job = await queue.add('send', { to: 'user@example.com', subject: 'Hello' });
  return c.json({ jobId: job?.id });
});
```

## Limitations

- Graceful shutdown is manual -- call `registry.closeAll()` yourself (Hono has no lifecycle hooks like Fastify's `onClose`)
- SSE requires a long-lived connection; edge runtimes with short execution limits may not support it
- `POST /flows` accepts tree flow payloads with optional budgets and DAG payloads without budgets. HTTP-submitted budgets are currently supported for tree flows only.
- `/flows*`, `/usage/summary`, and `/broadcast/*` require a live connection and are unavailable in testing mode
- Producers are not available in testing mode; use queues instead
- Queue names must match `/^[a-zA-Z0-9_-]{1,128}$/`

## Ecosystem

| Package | Description |
|---------|-------------|
| [glide-mq](https://github.com/avifenesh/glide-mq) | Core queue library -- producers, workers, schedulers, workflows |
| **@glidemq/hono** | Hono REST API + SSE middleware (you are here) |
| [@glidemq/fastify](/integrations/fastify) | Fastify REST API + SSE plugin |
| [@glidemq/hapi](/integrations/hapi) | Hapi REST API + SSE plugin |
| [@glidemq/nestjs](/integrations/nestjs) | NestJS module -- decorators, DI, lifecycle management |
| [@glidemq/dashboard](/integrations/dashboard) | Express web UI for monitoring and managing queues |

## License

Apache-2.0
