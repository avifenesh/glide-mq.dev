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

### Example: What the Agent Sees

When you ask your agent to "create a queue with delayed jobs and retries", it loads the skill and generates:

```typescript
import { Queue, Worker } from 'glide-mq';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };
const queue = new Queue('tasks', { connection });

await queue.add('send-email', { to: 'user@example.com' }, {
  delay: 300_000,           // 5 minutes
  attempts: 3,
  backoff: { type: 'exponential', delay: 1000 },
  priority: 0,              // lower = higher priority
});

const worker = new Worker('tasks', async (job) => {
  await sendEmail(job.data.to);
  return { sent: true };
}, { connection, concurrency: 10 });
```

Without the skill, the agent might guess wrong on connection format, priority direction, or method names.

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

### Example: Connection Migration

The biggest change is connection format. The skill teaches agents to convert:

```typescript
// BullMQ
const queue = new Queue('tasks', {
  connection: { host: 'localhost', port: 6379 }
});

// glide-mq (what the agent generates with the skill)
const queue = new Queue('tasks', {
  connection: { addresses: [{ host: 'localhost', port: 6379 }] }
});
```

Without the skill, the agent would use BullMQ's `{ host, port }` format and get a runtime error.

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

### Example: Job Creation

The biggest change is the chained builder pattern. The skill teaches agents to convert:

```typescript
// Bee-Queue (chained builder)
const job = queue.createJob({ email: 'user@example.com' })
  .retries(3)
  .backoff('exponential', 1000)
  .delayUntil(Date.now() + 60000)
  .setId('unique-123')
  .save();

// glide-mq (what the agent generates with the skill)
await queue.add('send-email', { email: 'user@example.com' }, {
  attempts: 3,
  backoff: { type: 'exponential', delay: 1000 },
  delay: 60000,
  jobId: 'unique-123',
});
```

Key differences the skill captures: `.retries(n)` becomes `attempts` (different name), `.delayUntil(date)` becomes `delay` in milliseconds, `.setId()` becomes `jobId` option, and `queue.process()` becomes a separate `Worker` class.

## Installing All Skills

To install all three skills at once:

```bash
npx skills add avifenesh/glide-mq
```

This installs the greenfield skill plus both migration guides. Your agent will automatically select the right skill based on your task.
