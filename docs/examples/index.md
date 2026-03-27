---
title: Examples
description: Browse all glide-mq examples grouped by category -- basics, scheduling, workflows, broadcast, frameworks, serverless, and advanced patterns.
---

# Examples

A curated collection of runnable examples demonstrating every major glide-mq feature. Each example is self-contained with its own `package.json` and can be started with `npm install && npm start`.

All examples require Valkey or Redis on `localhost:6379` unless noted otherwise.

## Basics

Fundamental queue and worker patterns, real-world use cases, and production-grade reliability features.

| Example | Description |
|---------|-------------|
| [core-basics](./basics#core-basics) | Queue, Worker, events, delayed/priority/retry jobs, bulk insert, graceful shutdown |
| [core-advanced](./basics#core-advanced) | Compression, rate limiting, deduplication, dead letter queues, schedulers |
| [email-service](./basics#email-service) | Production email delivery with DLQ, exponential backoff, priority, rate limiting |
| [webhook-delivery](./basics#webhook-delivery) | Reliable webhook delivery with fan-out, deduplication, per-endpoint rate limiting |
| [image-pipeline](./basics#image-pipeline) | FlowProducer image processing pipeline with multi-variant progress tracking |
| [stall-detection](./basics#stall-detection) | Detecting and recovering stalled jobs for both stream and list-sourced workers |

[View all basics examples &rarr;](./basics)

## Scheduling

Cron patterns, fixed intervals, bounded schedulers, and repeat-after-complete.

| Example | Description |
|---------|-------------|
| [cron-scheduler](./scheduling#cron-scheduler) | Cron patterns, fixed intervals, timezones, startDate, scheduler inspection |
| [bounded-schedulers](./scheduling#bounded-schedulers) | Schedulers with execution limits and end dates |
| [repeat-after-complete](./scheduling#repeat-after-complete) | Schedule the next run only after the current one finishes |

[View all scheduling examples &rarr;](./scheduling)

## Workflows

Parent-child flows, DAG dependencies, step jobs, and waiting-children patterns.

| Example | Description |
|---------|-------------|
| [core-workflows](./workflows#core-workflows) | FlowProducer trees, chain() pipelines, group() fan-out |
| [dag-workflows](./workflows#dag-workflows) | Arbitrary DAG dependencies with diamond patterns and cycle detection |
| [step-job-move-to-delayed](./workflows#step-job-move-to-delayed) | Multi-step resumable state machines using moveToDelayed |
| [move-to-waiting-children](./workflows#move-to-waiting-children) | Parent job suspends until all child jobs complete |

[View all workflow examples &rarr;](./workflows)

## Broadcast

Fan-out pub/sub messaging with subject-based filtering.

| Example | Description |
|---------|-------------|
| [broadcast](./broadcast#broadcast) | Fan-out delivery to multiple independent subscribers |
| [broadcast-subjects](./broadcast#broadcast-subjects) | Subject-based filtering with wildcard patterns |
| [subject-filter](./broadcast#subject-filter) | NATS-style topic routing with `*` and `>` wildcards |

[View all broadcast examples &rarr;](./broadcast)

## Framework Integrations

Integrate glide-mq with popular Node.js web frameworks.

| Example | Description |
|---------|-------------|
| [hono-basic](./frameworks#hono-basic) | Minimal Hono integration with glide-mq directly |
| [hono-api](./frameworks#hono-api) | Full REST API + SSE using `@glidemq/hono` |
| [fastify-api](./frameworks#fastify-api) | Full REST API + SSE using `@glidemq/fastify` |
| [hapi-basic](./frameworks#hapi-basic) | Basic Hapi.js server with glide-mq directly |
| [hapi-api](./frameworks#hapi-api) | Full REST API + SSE using `@glidemq/hapi` |
| [nestjs-module](./frameworks#nestjs-module) | Comprehensive `@glidemq/nestjs` with decorators, DI, and flow producers |
| [express-basic](./frameworks#express-basic) | Express queue management API with glide-mq directly |
| [express-dashboard](./frameworks#express-dashboard) | Web UI dashboard using `@glidemq/dashboard` |
| [koa-basic](./frameworks#koa-basic) | Koa queue management API with glide-mq directly |
| [nextjs-api-routes](./frameworks#nextjs-api-routes) | Next.js producer-only pattern with separate worker process |

[View all framework examples &rarr;](./frameworks)

## Serverless & Infrastructure

Serverless producers, IAM authentication, HTTP proxy, and cluster mode.

| Example | Description |
|---------|-------------|
| [serverless-producer](./serverless#serverless-producer) | Lightweight Producer and ServerlessPool for Lambda/Edge |
| [iam-auth](./serverless#iam-auth) | AWS IAM authentication for ElastiCache and MemoryDB |
| [http-proxy](./serverless#http-proxy) | Cross-language job enqueuing via HTTP proxy |
| [valkey-cluster](./serverless#valkey-cluster) | Running glide-mq on a Valkey/Redis cluster |

[View all serverless examples &rarr;](./serverless)

## Advanced Patterns

High-throughput tuning, batch processing, LIFO mode, custom serializers, and more.

| Example | Description |
|---------|-------------|
| [high-throughput](./advanced#high-throughput) | Skip server-side events/metrics for maximum throughput |
| [batch-processing](./advanced#batch-processing) | Process multiple jobs in a single processor invocation |
| [lifo-mode](./advanced#lifo-mode) | Last-in-first-out job processing with priority precedence |
| [custom-job-ids](./advanced#custom-job-ids) | Idempotent enqueuing with deterministic job IDs |
| [pluggable-serializers](./advanced#pluggable-serializers) | Custom serializers for job data encoding |
| [exclude-data](./advanced#exclude-data) | List jobs without payloads for lightweight dashboards |
| [request-reply](./advanced#request-reply) | Synchronous RPC over glide-mq using addAndWait |
| [otel-tracing](./advanced#otel-tracing) | OpenTelemetry tracing integration |
| [testing](./advanced#testing) | In-memory testing with TestQueue and TestWorker |

[View all advanced examples &rarr;](./advanced)

## AI Pipelines

AI-native examples combining usage tracking, streaming, budgets, fallbacks, suspend/resume, and vector search.

| Example | Description |
|---------|-------------|
| [rag-pipeline](./ai-pipelines#rag-pipeline) | RAG flow with embed, search, generate steps and budget caps |
| [ai-agent-loop](./ai-pipelines#ai-agent-loop) | ReAct-style agent with plan/execute/observe loop and human input |
| [content-pipeline](./ai-pipelines#content-pipeline) | Content moderation with classification, human review, and polishing |
| [model-failover](./ai-pipelines#model-failover) | Automatic fallback through a chain of model alternatives |
| [token-streaming](./ai-pipelines#token-streaming) | Stream LLM tokens to consumers in real time |
| [budget-cap](./ai-pipelines#budget-cap) | Prevent runaway spending with flow-level token/cost caps |
| [tpm-throttle](./ai-pipelines#tpm-throttle) | Dual-axis rate limiting (RPM + TPM) for API compliance |
| [human-approval](./ai-pipelines#human-approval) | Suspend for human review, resume with approve/reject signals |
| [usage-tracking](./ai-pipelines#usage-tracking) | Per-job and flow-level AI usage metadata |
| [embedding-pipeline](./ai-pipelines#embedding-pipeline) | Batch embedding generation with vector storage |
| [agent-memory](./ai-pipelines#agent-memory) | Vector search over agent interaction history |
| [adaptive-timeout](./ai-pipelines#adaptive-timeout) | Per-job lock duration matched to model latency |
| [search-dashboard](./ai-pipelines#search-dashboard) | Valkey Search index with TAG, NUMERIC, and VECTOR fields |
| [with-vercel-ai-sdk](./ai-pipelines#vercel-ai-sdk) | Vercel AI SDK (generateText/streamText) integration |
| [with-langchain](./ai-pipelines#langchain) | LangChain chain execution with usage tracking |
| [testing-mode](./ai-pipelines#testing) | In-memory testing of AI primitives without Valkey |
| [vector-search](./ai-pipelines#agent-memory) | Semantic similarity search over jobs |
| [llm](./ai-pipelines#rag-pipeline) | Shared LLM helper module used by all AI examples |

[View all AI pipeline examples &rarr;](./ai-pipelines)
