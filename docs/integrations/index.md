---
title: Framework Integrations
description: Use glide-mq with Hono, Fastify, NestJS, Hapi, and Express
---

# Framework Integrations

glide-mq ships official integration packages for popular Node.js frameworks. Together they cover HTTP APIs, real-time SSE streaming, DI-first application wiring, and an operator-friendly dashboard.

## Available Integrations

| Package | Framework | Pattern | Install |
|---------|-----------|---------|---------|
| [@glidemq/hono](./hono) | Hono | Middleware + typed router | `npm i @glidemq/hono` |
| [@glidemq/fastify](./fastify) | Fastify v5 | Two-plugin registration | `npm i @glidemq/fastify` |
| [@glidemq/nestjs](./nestjs) | NestJS 10+ | Module + decorators + DI | `npm i @glidemq/nestjs` |
| [@glidemq/hapi](./hapi) | Hapi.js | Plugin + Joi validation | `npm i @glidemq/hapi` |
| [@glidemq/dashboard](./dashboard) | Express | Drop-in web UI | `npm i @glidemq/dashboard` |

## Common Features

The integrations share the same core queue model, but they expose it in different ways:

- **Hono, Fastify, and Hapi** expose the full HTTP queue API with SSE, schedulers, flow usage and budget endpoints, queue-wide usage summaries, and broadcast publish/SSE routes.
- **NestJS** exposes the same core APIs through decorators and DI instead of shipping an HTTP layer.
- **Dashboard** focuses on monitoring and operations, including queue controls, flow usage and budget views, job streaming, and queue-wide usage summaries.
- **Testing mode** is available across the API wrappers and NestJS for in-memory development. Broadcast and summary routes still require a live connection.
- **Graceful shutdown** is built into each integration using the framework's lifecycle hooks or registry helpers.

## Choosing an Integration

| If you use... | Install |
|---------------|---------|
| **Hono** (edge, Bun, Cloudflare Workers) | `@glidemq/hono` - type-safe RPC, edge-native |
| **Fastify** (high-performance Node.js) | `@glidemq/fastify` - encapsulation-aware, Zod validation |
| **NestJS** (enterprise, decorators, DI) | `@glidemq/nestjs` - `@Processor`, `@InjectQueue`, full lifecycle |
| **Hapi** (enterprise, Joi validation) | `@glidemq/hapi` - Joi schemas, access control, SSE |
| **Express** (dashboard UI) | `@glidemq/dashboard` - drop-in web dashboard, no build step |
| **Express/Koa/other** (API only) | Use the core [HTTP Proxy](/examples/serverless#http-proxy) - queue routes, queue events SSE, usage summary, and broadcast over HTTP |

## Quick Start

Every integration follows the same pattern - declare queues, register the plugin, get endpoints:

```typescript
// Example with Hono
import { Hono } from 'hono';
import { glideMQ, glideMQApi } from '@glidemq/hono';

const app = new Hono();
const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

app.use('/mq/*', glideMQ({
  connection,
  queues: { emails: { name: 'emails' } },
}));

app.route('/mq', glideMQApi());

export default app;
```

See each integration's page for framework-specific setup, configuration options, and examples.

## AI Framework Integrations

glide-mq works with popular AI SDKs via its AI-native job primitives. No additional packages are required - use the standard `Queue` and `Worker` classes.

| Framework | Pattern | Example |
|-----------|---------|---------|
| **Vercel AI SDK** | `generateText`/`streamText` inside a Worker, `job.stream()` for token output, `job.reportUsage()` for metrics | [with-vercel-ai-sdk](/examples/frameworks#vercel-ai-sdk) |
| **LangChain** | LangChain chains inside a Worker, `job.reportUsage()` from response metadata | [with-langchain](/examples/frameworks#langchain) |

### Vercel AI SDK

```typescript
import { generateText } from 'ai';
import { Worker } from 'glide-mq';

const worker = new Worker('inference', async (job) => {
  const result = await generateText({
    model: openai('gpt-5.4'),
    prompt: job.data.prompt,
  });

  await job.reportUsage({
    model: 'gpt-5.4',
    tokens: {
      input: result.usage.inputTokens,
      output: result.usage.outputTokens,
    },
  });

  return { content: result.text };
}, { connection });
```

### LangChain

```typescript
import { ChatOpenAI } from '@langchain/openai';
import { Worker } from 'glide-mq';

const worker = new Worker('langchain', async (job) => {
  const response = await llm.invoke(messages);
  const usage = response.response_metadata?.tokenUsage;

  await job.reportUsage({
    model: 'gpt-5.4',
    tokens: {
      input: usage?.promptTokens ?? 0,
      output: usage?.completionTokens ?? 0,
    },
  });

  return { output: String(response.content) };
}, { connection });
```

See the [AI Pipeline Examples](/examples/ai-pipelines) for complete, runnable examples with both frameworks.
