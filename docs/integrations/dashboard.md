---
title: Dashboard
description: Real-time web dashboard for glide-mq queues. Drop-in Express middleware with job inspection, bulk actions, SSE events, and authorization.
---

# @glidemq/dashboard

Real-time web dashboard for [glide-mq](/guide/getting-started) queues. Drop-in Express middleware -- no frontend build, no external dependencies.

::: info Package Links
- **npm:** [@glidemq/dashboard](https://www.npmjs.com/package/@glidemq/dashboard)
- **GitHub:** [github.com/avifenesh/glidemq-dashboard](https://github.com/avifenesh/glidemq-dashboard)
:::

## Why @glidemq/dashboard

- Use this when you need visibility into queue health, job states, and worker activity without writing your own tooling.
- Use this when you want live updates pushed to the browser via SSE instead of polling a CLI or database.
- Use this when your ops team needs a point-and-click interface for retrying failed jobs, draining queues, or inspecting payloads.
- Use this when you need per-action authorization so developers can view queues but only admins can obliterate them.

## Install

```bash
npm install @glidemq/dashboard glide-mq express
```

Requires **glide-mq 0.9+** and **Express 4 or 5**.

## Quick Start

```typescript
import express from "express";
import { Queue } from "glide-mq";
import { createDashboard } from "@glidemq/dashboard";

const app = express();
const queue = new Queue("payments", {
  connection: { addresses: [{ host: "localhost", port: 6379 }] },
});

app.use("/dashboard", createDashboard([queue]));
app.listen(3000);
// Open http://localhost:3000/dashboard
```

## Features

- **Real-time event stream** -- SSE pushes completed, failed, active, waiting, stalled, progress, and removed events to the browser as they happen.
- **Job inspection** -- view payload, options, logs, progress, return value, and failure reason for any job.
- **Bulk actions** -- pause, resume, drain, retry all failed, and clean old jobs at the queue level.
- **Per-job actions** -- retry a failed job, remove a job, or promote a delayed job to waiting.
- **Workers panel** -- see connected workers and their current status.
- **Schedulers view** -- list repeatable job configurations attached to each queue.
- **Dead letter queue** -- dedicated panel for jobs that exhausted all retries.
- **Throughput metrics** -- completed and failed counts per queue.
- **Job search** -- filter by name, state, or data content.
- **Authorization** -- `readOnly` mode or fine-grained `authorize` callback with per-action control.
- **Dark theme, responsive layout** -- works on desktop and mobile out of the box.
- **Self-contained** -- the UI is a single bundled HTML file; no CDN calls, no build step, no frontend framework.

## Configuration

```typescript
createDashboard(queues: Queue[], opts?: DashboardOptions): Router
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `queueEvents` | `QueueEvents[]` | `[]` | Instances to stream real-time SSE events from (one per queue) |
| `readOnly` | `boolean` | `false` | When `true`, all mutation routes return 403 |
| `authorize` | `(req, action) => boolean \| Promise<boolean>` | -- | Called before each mutation; return `false` to deny (403) |

## Authorization

Every mutation endpoint calls the `authorize` callback with the Express request and an action string. Return `false` to deny the request with a 403.

**Action strings:** `queue:pause`, `queue:resume`, `queue:obliterate`, `queue:drain`, `queue:retryAll`, `queue:clean`, `job:remove`, `job:retry`, `job:promote`

```typescript
app.use(
  "/dashboard",
  createDashboard(queues, {
    authorize: (req, action) => {
      const user = req.session?.user;
      if (!user) return false;
      if (action === "queue:obliterate") return user.role === "admin";
      return true;
    },
  })
);
```

## API Endpoints

### Read

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Dashboard HTML UI |
| GET | `/api/queues` | All queues with job counts and pause state |
| GET | `/api/queues/:name/jobs` | Jobs by state (`?state=`, `?start=`, `?end=`) |
| GET | `/api/queues/:name/job/:id` | Single job with logs and current state |
| GET | `/api/queues/:name/workers` | Connected workers |
| GET | `/api/queues/:name/schedulers` | Repeatable job configurations |
| GET | `/api/queues/:name/dlq` | Dead letter queue jobs |
| GET | `/api/queues/:name/metrics` | Completed/failed throughput counts |
| GET | `/api/queues/:name/search` | Search jobs (`?name=`, `?state=`, `?data=`, `?limit=`) |

### Mutations (guarded by `readOnly` / `authorize`)

| Method | Path | Action | Description |
|--------|------|--------|-------------|
| POST | `/api/queues/:name/pause` | `queue:pause` | Pause a queue |
| POST | `/api/queues/:name/resume` | `queue:resume` | Resume a paused queue |
| POST | `/api/queues/:name/obliterate` | `queue:obliterate` | Destroy a queue and all its data |
| POST | `/api/queues/:name/drain` | `queue:drain` | Remove all waiting jobs |
| POST | `/api/queues/:name/retry-all` | `queue:retryAll` | Bulk retry failed jobs |
| POST | `/api/queues/:name/clean` | `queue:clean` | Clean old completed/failed jobs |
| DELETE | `/api/queues/:name/jobs/:id` | `job:remove` | Remove a single job |
| POST | `/api/queues/:name/jobs/:id/retry` | `job:retry` | Retry a failed job |
| POST | `/api/queues/:name/jobs/:id/promote` | `job:promote` | Promote a delayed job to waiting |

SSE stream: `GET /api/events` -- server-sent events for real-time updates (requires `queueEvents` option).

## Limitations

- Express only. There is no built-in adapter for Koa, Fastify, or Hono (see [@glidemq/hono](/integrations/hono) for Hono).
- This is middleware, not a standalone server. You mount it on an existing Express app.
- Requires `glide-mq` Queue instances. It does not connect to Valkey/Redis directly.

## Ecosystem

| Package | Description |
|---------|-------------|
| [glide-mq](https://github.com/avifenesh/glide-mq) | Core queue library -- producers, workers, schedulers, workflows |
| **@glidemq/dashboard** | Express web dashboard (you are here) |
| [@glidemq/nestjs](/integrations/nestjs) | NestJS module -- decorators, DI, lifecycle management |
| [@glidemq/hono](/integrations/hono) | Hono REST API + SSE middleware |
| [@glidemq/fastify](/integrations/fastify) | Fastify plugin for queue APIs |
| [@glidemq/hapi](/integrations/hapi) | Hapi REST API + SSE plugin |

## License

Apache-2.0
