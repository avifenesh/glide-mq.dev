---
title: Migration Guides
description: Migrate to glide-mq from other Node.js job queue libraries
---

# Migration Guides

Moving to glide-mq from another job queue library? These guides provide step-by-step conversion instructions, API mapping tables, and migration checklists.

## Available Guides

### [From BullMQ](./from-bullmq)

BullMQ is the most popular Redis-backed job queue for Node.js. The glide-mq API is intentionally similar - most changes are connection format and imports. Migration is straightforward with minimal code changes.

**Key differences**: Connection format (ioredis -> valkey-glide), script engine (Lua EVAL -> Valkey Server Functions), and new features (Broadcast, batch processing, compression, dedup).

### [From Bee-Queue](./from-bee-queue)

Bee-Queue uses a chained job builder pattern (`queue.createJob(data).retries(3).save()`) that differs more from glide-mq's options-based API. This guide covers the full conversion including the separated Queue/Worker pattern.

**Why migrate**: Bee-Queue is unmaintained (last release 2021), lacks cluster support, TLS, TypeScript types, and many features glide-mq provides out of the box.

## What You Gain

All migration paths give you access to features your current library doesn't have:

| Feature | Description |
|---------|-------------|
| 1-RTT job operations | Single FCALL round-trip per job |
| Rust NAPI core | Lower latency, less GC pressure |
| Cluster-native | Hash-tagged keys, AZ-affinity routing |
| FlowProducer | Parent-child job trees and DAG workflows |
| Broadcast | Fan-out pub/sub with NATS-style subject filtering |
| Batch processing | Process multiple jobs per worker call |
| Compression | Gzip with 98% reduction on 15KB payloads |
| Deduplication | Simple, throttle, and debounce modes |
| Schedulers | Cron patterns and interval repeatable jobs |
| Rate limiting | Global and per-group limits |
| Serverless | Connection caching for Lambda/Edge |
| In-memory testing | TestQueue/TestWorker without Valkey |
| Framework integrations | Hono, Fastify, NestJS, Hapi, Dashboard |
