---
title: Migrate from Bee-Queue
description: Step-by-step guide for converting Bee-Queue projects to glide-mq
---

# Migrate from Bee-Queue to glide-mq

Step-by-step guide for converting Bee-Queue projects to glide-mq. Bee-Queue uses a different API pattern (chained job builder) so this migration requires more changes than BullMQ.

## Why Migrate

- Bee-Queue is **unmaintained** (last release 2021, Node.js compatibility issues)
- No cluster support, no TLS, no TypeScript types (community `@types/bee-queue` only)
- No built-in delayed jobs, priority, workflows, broadcast, or batch processing
- ioredis dependency with no native client option
- glide-mq provides all Bee-Queue features plus 35%+ higher throughput

## Quick Migration Commands

```bash
npm uninstall bee-queue
npm uninstall @types/bee-queue  # if using TypeScript
npm install glide-mq
```

## Breaking Changes Summary

| Feature | Bee-Queue | glide-mq |
|---------|-----------|----------|
| **Queue + Worker** | Single `Queue` class does both | Separate `Queue` (producer) and `Worker` (consumer) |
| **Job creation** | `queue.createJob(data).save()` chained | `queue.add(name, data, opts)` single call |
| **Job options** | Chained: `.timeout(ms).retries(n)` | Options object: `{ attempts, backoff, delay }` |
| **Processing** | `queue.process(concurrency, handler)` | `new Worker(name, handler, { concurrency })` |
| **Connection** | ioredis client or `{ host, port }` | `{ addresses: [{ host, port }] }` |
| **Stall detection** | `stallInterval` on Queue + manual start | `lockDuration` + `maxStalledCount` on Worker (automatic) |
| **Progress** | `job.reportProgress(data)` (any JSON) | `job.updateProgress(number)` (0-100) |
| **Delayed jobs** | `job.delayUntil(date)` | `queue.add(name, data, { delay: ms })` |
| **Job ID** | `job.setId(id).save()` | `queue.add(name, data, { jobId: id })` |
| **Events** | Queue emits for all jobs | `QueueEvents` class for real-time stream |
| **Retries** | `job.retries(n)` | `{ attempts: n, backoff: { type, delay } }` |
| **Producer-only** | `{ isWorker: false }` | Use `Producer` class or `Queue` (no Worker needed) |
| **Batch save** | `queue.saveAll(jobs)` | `queue.addBulk(jobs)` |
| **TypeScript** | Community types only | Native TypeScript |
| **Cluster** | Not supported | Native cluster support |
| **TLS** | Manual ioredis config | `useTLS: true` |

## Queue Settings Mapping

Bee-Queue has 15 constructor settings. Here's how each maps to glide-mq:

| Bee-Queue Setting | Default | glide-mq Equivalent | Notes |
|-------------------|---------|---------------------|-------|
| `redis` | `{}` | `connection: { addresses: [...] }` | See connection section below |
| `isWorker` | `true` | Use `Producer` or `Queue` class | Separate classes instead of flag |
| `getEvents` | `true` | Use `QueueEvents` class | Separate class for event subscription |
| `sendEvents` | `true` | `events: true` on Worker | Controls whether job lifecycle emits to stream |
| `storeJobs` | `true` | Always true | glide-mq always stores jobs |
| `ensureScripts` | `true` | Automatic | Server Functions loaded automatically |
| `activateDelayedJobs` | `false` | Automatic via Scheduler | glide-mq handles delayed activation internally |
| `removeOnSuccess` | `false` | `{ removeOnComplete: true }` | Per-job or via `defaultJobOptions` |
| `removeOnFailure` | `false` | `{ removeOnFail: true }` | Per-job or via `defaultJobOptions` |
| `stallInterval` | `5000` | `lockDuration` on Worker | glide-mq uses lock-based stall detection |
| `nearTermWindow` | `20000` | N/A | glide-mq uses Valkey-native delayed processing |
| `delayedDebounce` | `1000` | N/A | Not needed - server-side scheduling |
| `prefix` | `bq` | `prefix` on Queue | Key prefix (default: `glide`) |
| `quitCommandClient` | `true` | Automatic | Handled by graceful shutdown |
| `redisScanCount` | `100` | N/A | Not applicable (different key strategy) |

## Backoff Strategy Mapping

| Bee-Queue | glide-mq |
|-----------|----------|
| `'immediate'` | `{ type: 'fixed', delay: 0 }` |
| `'fixed'` | `{ type: 'fixed', delay: ms }` |
| `'exponential'` | `{ type: 'exponential', delay: ms }` |
| Custom via `backoffStrategies` Map | Custom via `backoffStrategies` on Worker |

```typescript
// BEFORE (Bee-Queue) - custom backoff
const queue = new Queue('tasks', {
  settings: {
    backoffStrategies: {
      linear: (attemptsMade) => attemptsMade * 1000,
    }
  }
});
queue.createJob(data).backoff('linear', 1000).save();

// AFTER (glide-mq) - custom backoff
const worker = new Worker('tasks', processor, {
  connection,
  backoffStrategies: {
    linear: (attemptsMade) => attemptsMade * 1000,
  }
});
await queue.add('job', data, { backoff: { type: 'linear', delay: 1000 } });
```

## Queue Method Mapping

| Bee-Queue Method | glide-mq Equivalent | Notes |
|------------------|---------------------|-------|
| `queue.createJob(data)` | `queue.add(name, data, opts)` | Returns Job vs returns jobId |
| `queue.process(n, handler)` | `new Worker(name, handler, { concurrency: n })` | Separate class |
| `queue.checkStalledJobs(interval)` | Automatic on Worker | No manual call needed |
| `queue.checkHealth()` | `queue.getJobCounts(...)` | Different return shape |
| `queue.close()` | `gracefulShutdown([...])` | Or individual `.close()` calls |
| `queue.ready()` | `worker.waitUntilReady()` | On Worker, not Queue |
| `queue.isRunning()` | `worker.isRunning()` | On Worker |
| `queue.getJob(id)` | `queue.getJob(id)` | Same API |
| `queue.getJobs(type, page)` | `queue.getJobs(type, start, end)` | Range-based instead of paginated |
| `queue.removeJob(id)` | `(await queue.getJob(id)).remove()` | Via Job instance |
| `queue.saveAll(jobs)` | `queue.addBulk(jobs)` | Different input format |
| `queue.destroy()` | `queue.obliterate()` | Removes all queue data |

## Event Mapping

| Bee-Queue Event | Source | glide-mq Equivalent | Source |
|-----------------|--------|---------------------|--------|
| `queue.on('ready')` | Queue | `worker.waitUntilReady()` | Worker |
| `queue.on('error', err)` | Queue | `worker.on('error', err)` | Worker |
| `queue.on('succeeded', job, result)` | Queue (local) | `worker.on('completed', job)` | Worker |
| `queue.on('retrying', job, err)` | Queue (local) | `worker.on('failed', job, err)` | Worker (with retries remaining) |
| `queue.on('failed', job, err)` | Queue (local) | `worker.on('failed', job, err)` | Worker |
| `queue.on('stalled', jobId)` | Queue | `worker.on('stalled', jobId)` | Worker |
| `queue.on('job succeeded', id, result)` | Queue (PubSub) | `events.on('completed', { jobId })` | QueueEvents |
| `queue.on('job failed', id, err)` | Queue (PubSub) | `events.on('failed', { jobId, failedReason })` | QueueEvents |
| `queue.on('job retrying', id, err)` | Queue (PubSub) | No direct equivalent | Use `events.on('failed')` + retry check |
| `queue.on('job progress', id, data)` | Queue (PubSub) | `events.on('progress', { jobId, data })` | QueueEvents |
| `job.on('succeeded', result)` | Job | `events.on('completed', { jobId })` | QueueEvents (filter by jobId) |
| `job.on('failed', err)` | Job | `events.on('failed', { jobId })` | QueueEvents (filter by jobId) |
| `job.on('progress', data)` | Job | `events.on('progress', { jobId })` | QueueEvents (filter by jobId) |

::: warning Per-Job Events
Bee-Queue supports per-job event listeners (`job.on('succeeded', ...)`). glide-mq uses a centralized `QueueEvents` class instead. Filter by `jobId` in the event handler, or use `queue.addAndWait()` for request-reply patterns.
:::

## Step-by-Step Conversion

### 1. Connection

```typescript
// BEFORE (Bee-Queue)
const Queue = require('bee-queue');
const queue = new Queue('tasks', {
  redis: { host: 'localhost', port: 6379 }
});

// AFTER (glide-mq)
import { Queue, Worker } from 'glide-mq';
const connection = { addresses: [{ host: 'localhost', port: 6379 }] };
const queue = new Queue('tasks', { connection });
```

With shared redis client:

```typescript
// BEFORE (Bee-Queue) - shared ioredis client
const Redis = require('ioredis');
const redis = new Redis();
const queue = new Queue('tasks', { redis });

// AFTER (glide-mq) - connection config shared
const connection = { addresses: [{ host: 'localhost', port: 6379 }] };
const queue = new Queue('tasks', { connection });
// glide-mq manages its own connection pool internally
```

### 2. Job Creation (Biggest Change)

Bee-Queue uses a chained builder pattern. glide-mq uses an options object.

```typescript
// BEFORE (Bee-Queue) - chained builder
const job = queue.createJob({ email: 'user@example.com' })
  .timeout(30000)
  .retries(3)
  .backoff('exponential', 1000)
  .delayUntil(Date.now() + 60000)
  .setId('unique-123')
  .save();

job.on('succeeded', (result) => console.log('Done:', result));
job.on('failed', (err) => console.error('Failed:', err));

// AFTER (glide-mq) - options object
const jobId = await queue.add('send-email',
  { email: 'user@example.com' },
  {
    attempts: 3,
    backoff: { type: 'exponential', delay: 1000 },
    delay: 60000,
    jobId: 'unique-123',
  }
);

// Events via QueueEvents (not per-job)
import { QueueEvents } from 'glide-mq';
const events = new QueueEvents('tasks', { connection });
events.on('completed', ({ jobId }) => console.log('Done:', jobId));
events.on('failed', ({ jobId, failedReason }) =>
  console.error('Failed:', failedReason)
);
```

::: tip Timeout handling
Bee-Queue's `.timeout()` has no direct equivalent as a job option. glide-mq uses `lockDuration` on the Worker instead. For cooperative cancellation, use the AbortSignal token:

```typescript
const worker = new Worker('tasks', async (job, token) => {
  const signal = token.signal;
  return await longOperation(signal);  // Throws AbortError on timeout
}, { connection, lockDuration: 30000 });
```
:::

### 3. Batch Job Creation

```typescript
// BEFORE (Bee-Queue)
const jobs = items.map(item => queue.createJob(item));
await queue.saveAll(jobs);

// AFTER (glide-mq)
const jobs = items.map(item => ({
  name: 'process',
  data: item
}));
await queue.addBulk(jobs);
```

### 4. Worker (Processing Jobs)

```typescript
// BEFORE (Bee-Queue) - queue.process()
queue.process(10, async (job) => {
  console.log(`Processing job ${job.id}:`, job.data);
  return { processed: true };
});

queue.on('succeeded', (job, result) => {
  console.log(`Job ${job.id} succeeded:`, result);
});

queue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message);
});

// AFTER (glide-mq) - separate Worker class
const worker = new Worker('tasks', async (job) => {
  console.log(`Processing job ${job.id}:`, job.data);
  return { processed: true };
}, { connection, concurrency: 10 });

worker.on('completed', (job) => {
  console.log(`Job ${job.id} succeeded:`, job.returnValue);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message);
});
```

### 5. Producer-Only Queue

```typescript
// BEFORE (Bee-Queue) - disable worker mode
const queue = new Queue('tasks', {
  isWorker: false,
  getEvents: false,
  redis: { host: 'localhost', port: 6379 }
});

// AFTER (glide-mq) - use Producer class
import { Producer } from 'glide-mq';
const producer = new Producer(connection);
await producer.add('tasks', 'job-name', data);
await producer.close();
```

### 6. Progress Reporting

```typescript
// BEFORE (Bee-Queue) - arbitrary JSON progress
queue.process(async (job) => {
  job.reportProgress({ percent: 50 });
  return result;
});

// AFTER (glide-mq) - numeric progress (0-100)
const worker = new Worker('tasks', async (job) => {
  await job.updateProgress(50);
  return result;
}, { connection });
```

::: info
Bee-Queue accepts arbitrary JSON for progress. glide-mq uses a number (0-100). For structured progress data, use `job.log()`:

```typescript
await job.log('Processing step 2', { items: 50, total: 100 });
```
:::

### 7. Stall Detection

```typescript
// BEFORE (Bee-Queue) - manual start required
const queue = new Queue('tasks', {
  stallInterval: 5000
});
queue.checkStalledJobs(5000);

// AFTER (glide-mq) - automatic on Worker
const worker = new Worker('tasks', processor, {
  connection,
  lockDuration: 30000,
  lockRenewTime: 15000,
  maxStalledCount: 2
});
// Stall detection runs automatically
```

### 8. Queue Health Check

```typescript
// BEFORE (Bee-Queue)
const health = await queue.checkHealth();
// { waiting, active, succeeded, failed, delayed, newestJob }

// AFTER (glide-mq)
const counts = await queue.getJobCounts(
  'waiting', 'active', 'completed', 'failed', 'delayed'
);
```

### 9. Closing Connections

```typescript
// BEFORE (Bee-Queue)
await queue.close();

// AFTER (glide-mq)
import { gracefulShutdown } from 'glide-mq';
await gracefulShutdown([worker, queue, events]);
```

### 10. Destroying a Queue

```typescript
// BEFORE (Bee-Queue) - remove all Redis keys for queue
await queue.destroy();

// AFTER (glide-mq)
await queue.obliterate();
```

### 11. Web UI (Arena -> Dashboard)

```typescript
// BEFORE (Bee-Queue) - Arena web UI
const Arena = require('bull-arena');
const express = require('express');
const app = express();
app.use('/', Arena({ Bee: require('bee-queue'), queues: [{ name: 'tasks' }] }));

// AFTER (glide-mq) - Dashboard
import { createDashboard } from '@glidemq/dashboard';
import express from 'express';
const app = express();
app.use('/dashboard', createDashboard([queue]));
```

## What You Gain

After migration, you have access to features Bee-Queue never had:

| Feature | Description |
|---------|-------------|
| Priority jobs | `{ priority: 10 }` - higher = earlier |
| FlowProducer | Parent-child job trees and DAG workflows |
| Broadcast | Fan-out with subscriber groups and NATS-style filtering |
| Batch processing | Process multiple jobs per worker call |
| Compression | Gzip with 98% reduction on 15KB payloads |
| Deduplication | Simple/throttle/debounce modes |
| Schedulers | Cron patterns and interval repeatable jobs |
| Rate limiting | Global and per-group limits |
| Per-key ordering | Sequential processing per ordering key |
| LIFO mode | Process newest jobs first |
| Serverless pool | Connection caching for Lambda/Edge |
| HTTP proxy | Cross-language queue access via REST |
| OpenTelemetry | Automatic span emission |
| Testing utilities | TestQueue/TestWorker without Valkey |
| Cluster support | Hash-tagged keys, AZ-affinity routing |
| Framework integrations | Hono, Fastify, NestJS, Hapi, Dashboard |

## Migration Checklist

```
- [ ] Install glide-mq, uninstall bee-queue and @types/bee-queue
- [ ] Create connection config (addresses array format)
- [ ] Convert queue.createJob().save() -> queue.add()
- [ ] Convert chained options (.retries/.timeout/.delay) -> options object
- [ ] Convert queue.process() -> new Worker()
- [ ] Convert queue.saveAll() -> queue.addBulk()
- [ ] Separate producer queues (isWorker:false -> Producer class)
- [ ] Convert job.reportProgress() -> job.updateProgress()
- [ ] Convert stall config (stallInterval -> lockDuration/maxStalledCount)
- [ ] Convert health checks (checkHealth -> getJobCounts)
- [ ] Update event listeners (queue.on -> worker.on or QueueEvents)
- [ ] Replace require() with import (glide-mq is ESM)
- [ ] Run full test suite
- [ ] Benchmark: compare throughput before/after
```

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `queue.createJob is not a function` | API changed | Use `queue.add(name, data, opts)` |
| `queue.process is not a function` | Separated producer/consumer | Use `new Worker(name, handler, opts)` |
| `Cannot use require()` | glide-mq is ESM-only | Change to `import` statements |
| `job.reportProgress is not a function` | API renamed | Use `job.updateProgress(number)` |
| `Cannot find module 'bee-queue'` | Forgot to update an import | `grep -r "bee-queue" src/` |
| No stall detection | Bee-Queue needed manual start | glide-mq runs it automatically on Worker |
