---
title: Agent Skills
description: Install glide-mq skills to help AI coding agents use the library correctly
---

# Agent Skills

glide-mq ships agent skills that teach AI coding agents (Claude Code, Cursor, GitHub Copilot, Codex, and others) how to use the library correctly. Skills provide API patterns, configuration examples, and migration guides directly in your agent's context.

## Available Skills

| Skill | Purpose | Install |
|-------|---------|---------|
| **glide-mq** | Greenfield development - full API reference, patterns, and troubleshooting | [Install](#greenfield) |
| **glide-mq-migrate-bullmq** | Step-by-step migration from BullMQ | [Install](#migrate-from-bullmq) |
| **glide-mq-migrate-bee** | Step-by-step migration from Bee-Queue | [Install](#migrate-from-bee-queue) |

## Why Skills?

AI agents are trained on data that may include outdated or mixed-version API patterns. Skills provide:

- **Version-locked knowledge** - the skill ships with the library, so the agent gets docs for the version you're using
- **Correct API patterns** - no hallucinated methods or wrong parameter names
- **Migration paths** - exact before/after code transforms, not guesswork
- **Progressive disclosure** - only loads detailed docs when relevant to your task

## Greenfield {#greenfield}

For new projects using glide-mq. Covers the full API: Queue, Worker, FlowProducer, Broadcast, Scheduler, and more.

### Install

**Claude Code:**
```bash
npx skills add avifenesh/glide-mq --skill glide-mq
```

**Manual (any agent):**

Copy `skills/glide-mq/` from the [glide-mq repo](https://github.com/avifenesh/glide-mq/tree/main/skills/glide-mq) into your project's `.claude/skills/` (or equivalent directory for your agent).

### What's Included

The skill contains a main `SKILL.md` with quick-start examples and a problem-to-reference mapping table, plus 8 reference files:

| Reference | Content |
|-----------|---------|
| `queue.md` | Queue constructor, add/addBulk/addAndWait, job options (delay, priority, retries, dedup, compression), rate limiting, DLQ |
| `worker.md` | Worker constructor, processor functions, batch mode, events, stall detection, LIFO, job revocation |
| `connection.md` | ConnectionOptions, TLS, auth (password + IAM), cluster mode, AZ-affinity, read strategies |
| `workflows.md` | FlowProducer, FlowJob trees, DAG submission, chain/group/chord helpers, dynamic children |
| `broadcast.md` | Broadcast/BroadcastWorker, NATS-style subject filtering, per-group retries |
| `schedulers.md` | Cron patterns, interval jobs, repeatAfterComplete, bounded scheduling |
| `observability.md` | QueueEvents, OpenTelemetry, time-series metrics, job logs, progress tracking |
| `serverless.md` | Producer, ServerlessPool, HTTP proxy, TestQueue/TestWorker for in-memory testing |

### Real Test: With vs Without

We ran Claude Code (Sonnet) on the same prompt with and without the skill installed.

**Prompt:** *"Write a complete TypeScript file that creates a glide-mq queue, adds a delayed job with 3 retries and exponential backoff, and creates a worker with concurrency 5. Include connection setup, error handling, and graceful shutdown."*

::: danger Without skill (35s)
```
I couldn't find `glide-mq` in any documentation sources — it doesn't
appear to be a known npm package.

Could you clarify what you mean by `glide-mq`? You might be thinking
of one of these popular TypeScript-compatible queue libraries:

- BullMQ — Redis-backed queue with workers, delayed jobs...
- bee-queue — Lightweight Redis-backed job queue
```
The agent doesn't know glide-mq exists. Zero usable output.
:::

::: tip With skill installed (20s)
```typescript
import { Queue, Worker, gracefulShutdown } from 'glide-mq';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };
const queue = new Queue('my-queue', { connection });

await queue.add('delayed-task', { message: 'hello' }, {
  delay: 10_000,
  attempts: 3,
  backoff: { type: 'exponential', delay: 1000 },
});

const worker = new Worker('my-queue', async (job) => {
  console.log(`Processing ${job.id}:`, job.data);
  return { processed: true };
}, { connection, concurrency: 5 });

worker.on('completed', (job) => console.log(`Completed: ${job.id}`));
worker.on('failed', (job, err) => console.error(`Failed: ${err.message}`));
worker.on('error', (err) => console.error('Worker error:', err));

// Registers SIGTERM/SIGINT handlers, closes all on signal
const handle = gracefulShutdown([worker, queue]);
```
Correct connection format, proper `gracefulShutdown`, accurate API. Ready to run.
:::

## Migrate from BullMQ {#migrate-from-bullmq}

For existing BullMQ projects switching to glide-mq. The API is intentionally similar - most changes are connection format and imports.

### Install

**Claude Code:**
```bash
npx skills add avifenesh/glide-mq --skill glide-mq-migrate-bullmq
```

**Manual:**

Copy `skills/glide-mq-migrate-bullmq/` from the [glide-mq repo](https://github.com/avifenesh/glide-mq/tree/main/skills/glide-mq-migrate-bullmq) into your agent's skills directory.

### What's Included

- **Breaking changes table** - 17 API differences between BullMQ and glide-mq
- **13 before/after code blocks** - connection, Queue.add, Worker, FlowProducer, QueueEvents, shutdown, scheduling, backoff, and more
- **New features table** - 25 capabilities not available in BullMQ
- **Migration checklist** - 17 checkbox items for tracking progress
- **Troubleshooting table** - 11 common errors with fixes
- **Performance comparison** - benchmark data at different concurrency levels

### Real Test: Migration Quality

We gave both agents the same BullMQ source file (Queue + Worker + FlowProducer + QueueEvents with TLS and `defaultJobOptions`) and asked to convert it.

::: danger Without skill - 2 bugs
```typescript
// Bug 1: Wrong method name
const flow = new FlowProducer({ connection });
await flow.addFlow({ ... }); // ← WRONG: should be flow.add()

// Bug 2: Wrong removeOnComplete type
removeOnComplete: true // ← WRONG: glide-mq supports { count: 100 }
```
The agent guessed `flow.addFlow()` (doesn't exist) and lost the `removeOnComplete` count configuration.
:::

::: tip With skill - correct output
```typescript
// Correct method name
await flow.add({ ... }); // ✓

// Correct removeOnComplete with count preservation
removeOnComplete: { count: 100 } // ✓

// Correct defaultJobOptions handling (removed from Queue, spread per-job)
const defaultJobOptions = {
  attempts: 3,
  backoff: { type: 'exponential', delay: 1000 },
  removeOnComplete: { count: 100 },
};
await queue.add('welcome', data, { ...defaultJobOptions, delay: 5000 });

// Correct graceful shutdown
await gracefulShutdown([worker, queue, events, flow]); // ✓
```
The skill correctly handles `defaultJobOptions` removal, `removeOnComplete` shape, and method names.
:::

## Migrate from Bee-Queue {#migrate-from-bee-queue}

For existing Bee-Queue projects. This migration requires more changes because Bee-Queue uses a chained builder API pattern.

### Install

**Claude Code:**
```bash
npx skills add avifenesh/glide-mq --skill glide-mq-migrate-bee
```

**Manual:**

Copy `skills/glide-mq-migrate-bee/` from the [glide-mq repo](https://github.com/avifenesh/glide-mq/tree/main/skills/glide-mq-migrate-bee) into your agent's skills directory.

### What's Included

- **Queue settings mapping** - all 15 Bee-Queue constructor settings mapped
- **Queue method mapping** - 12 methods with before/after
- **Event mapping** - 13 events with source class changes
- **9 before/after conversion examples** - covering the biggest API differences
- **Migration checklist** - 18 checkbox items
- **Troubleshooting table** - 10 common errors

### Real Test: Migration Accuracy

We gave both agents a Bee-Queue source file with chained job builder, `queue.process()`, `reportProgress()`, `checkHealth()`, and stall detection.

::: danger Without skill - 1 bug, 1 wrong default
```typescript
// Bug: Wrong attempts count
attempts: 4, // ← WRONG: claims "1 initial + 3 retries"
// glide-mq attempts means total attempts, same as Bee's retries(3) → attempts: 3

// Wrong default value
stalledInterval: 5000, // ← value copied from Bee-Queue's default
// glide-mq default is 30000, not 5000
```
The agent misunderstood `attempts` semantics (total attempts, not 1+retries) and copied Bee-Queue's stall interval default instead of glide-mq's.
:::

::: tip With skill - correct output
```typescript
// Correct attempts mapping
attempts: 3, // ✓ same as Bee-Queue's .retries(3)

// Correct progress API
await job.updateProgress(50); // ✓ (accepts number or object)

// Correct stall detection config
{ connection, concurrency: 5, lockDuration: 5000 } // ✓

// Correct per-job event pattern (QueueEvents + filter)
events.on('completed', ({ jobId, returnvalue }) => {
  if (jobId === job.id) console.log('Job done:', returnvalue);
});
```
The skill correctly maps `.retries(n)` to `attempts`, `reportProgress(json)` to `updateProgress(number)`, and `stallInterval` to `lockDuration`.
:::

## Installing All Skills

To install all three skills at once:

```bash
npx skills add avifenesh/glide-mq
```

This installs the greenfield skill plus both migration guides. Your agent will automatically select the right skill based on your task.
