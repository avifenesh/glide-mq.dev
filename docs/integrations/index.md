---
title: Framework Integrations
description: Use glide-mq with Hono, Fastify, NestJS, Hapi, and Express
---

# Framework Integrations

glide-mq ships official integration packages for popular Node.js frameworks. Each provides REST API endpoints, real-time SSE event streaming, and framework-native patterns.

## Available Integrations

| Package | Framework | Pattern | Install |
|---------|-----------|---------|---------|
| [@glidemq/hono](./hono) | Hono | Middleware + typed router | `npm i @glidemq/hono` |
| [@glidemq/fastify](./fastify) | Fastify v5 | Two-plugin registration | `npm i @glidemq/fastify` |
| [@glidemq/nestjs](./nestjs) | NestJS 10+ | Module + decorators + DI | `npm i @glidemq/nestjs` |
| [@glidemq/hapi](./hapi) | Hapi.js | Plugin + Joi validation | `npm i @glidemq/hapi` |
| [@glidemq/dashboard](./dashboard) | Express | Drop-in web UI | `npm i @glidemq/dashboard` |

## Common Features

All framework integrations share these capabilities:

- **21 REST endpoints** for job management, queue control, and scheduler CRUD
- **Server-Sent Events (SSE)** for real-time job lifecycle streaming
- **Lightweight producers** for serverless environments (no Worker overhead)
- **Testing mode** with in-memory queues (no Valkey required)
- **Graceful shutdown** with connection cleanup

## Choosing an Integration

| If you use... | Install |
|---------------|---------|
| **Hono** (edge, Bun, Cloudflare Workers) | `@glidemq/hono` - type-safe RPC, edge-native |
| **Fastify** (high-performance Node.js) | `@glidemq/fastify` - encapsulation-aware, Zod validation |
| **NestJS** (enterprise, decorators, DI) | `@glidemq/nestjs` - `@Processor`, `@InjectQueue`, full lifecycle |
| **Hapi** (enterprise, Joi validation) | `@glidemq/hapi` - Joi schemas, access control, SSE |
| **Express** (dashboard UI) | `@glidemq/dashboard` - drop-in web dashboard, no build step |
| **Express/Koa/other** (API only) | Use the core [HTTP Proxy](/guide/serverless#http-proxy) - no integration package needed |

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
