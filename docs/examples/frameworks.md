---
title: Framework Integrations
description: glide-mq framework integration examples -- Hono, Fastify, Hapi, NestJS, Express, Koa, Next.js, Vercel AI SDK, and LangChain.
---

# Framework Integrations

Integrate glide-mq with popular Node.js web frameworks.

## Hono Basic

Simple Hono app using glide-mq directly (no `@glidemq/hono` package needed). Shows the minimal integration pattern: import `glide-mq`, create a queue and worker, produce jobs from routes.

```typescript
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { Queue, Worker } from 'glide-mq';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

const emailQueue = new Queue('emails', { connection });

// Worker - processes jobs in background
const worker = new Worker('emails', async (job) => {
  console.log(`Sending email to ${job.data.to}: ${job.data.subject}`);
  // Simulate email sending
  await new Promise(r => setTimeout(r, 500));
  return { sent: true };
}, { connection, concurrency: 5 });

worker.on('completed', (job) => console.log(`Email ${job.id} sent`));
worker.on('failed', (job, err) => console.error(`Email ${job.id} failed:`, err.message));

// Hono app - produces jobs
const app = new Hono();

app.post('/send-email', async (c) => {
  const { to, subject, body } = await c.req.json();
  const job = await emailQueue.add('send', { to, subject, body });
  return c.json({ jobId: job?.id ?? null, status: 'queued' });
});

app.get('/queue-status', async (c) => {
  const counts = await emailQueue.getJobCounts();
  return c.json(counts);
});

serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log('Server running at http://localhost:3000');
});
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/hono-basic)

---

## Hono API

Full REST API + SSE events for glide-mq queue management using `@glidemq/hono`. The wrapper exposes queue control, schedulers, flow usage and budget endpoints, queue-wide usage summaries, durable broadcast SSE, type-safe RPC, and direct queue access via `c.var.glideMQ`.

```typescript
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { glideMQ, glideMQApi, QueueRegistryImpl } from '@glidemq/hono';
import type { GlideMQEnv } from '@glidemq/hono';
import type { Job } from 'glide-mq';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

// Processor functions
async function processEmail(job: Job) {
  console.log(`Sending email to ${job.data.to}`);
  return { sent: true, to: job.data.to };
}

async function processOrder(job: Job) {
  console.log(`Processing order ${job.data.orderId}`);
  await job.updateProgress(50);
  return { orderId: job.data.orderId, status: 'shipped' };
}

// Create registry for graceful shutdown access
const registry = new QueueRegistryImpl({
  connection,
  queues: {
    emails: { processor: processEmail, concurrency: 5 },
    orders: { processor: processOrder, concurrency: 3 },
  },
});

const app = new Hono<GlideMQEnv>();

// Mount middleware - injects registry into c.var.glideMQ
app.use(glideMQ(registry));

// Mount queue HTTP API + SSE
app.route('/api/queues', glideMQApi());

// Custom route using the queue directly
app.post('/send-email', async (c) => {
  const { to, subject, body } = await c.req.json();
  const { queue } = c.var.glideMQ.get('emails');
  const job = await queue.add('send', { to, subject, body });
  return c.json({ jobId: job?.id ?? null });
});

app.post('/place-order', async (c) => {
  const { items, total } = await c.req.json();
  const { queue } = c.var.glideMQ.get('orders');
  const job = await queue.add('process', { orderId: `ORD-${Date.now()}`, items, total });
  return c.json({ jobId: job?.id ?? null });
});

// Start server
serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log('Hono server running at http://localhost:3000');
  console.log('Queue API at http://localhost:3000/api/queues');
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await registry.closeAll();
  process.exit(0);
});
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/hono-api)

---

## Fastify API

Full REST API + SSE events for glide-mq queue management using `@glidemq/fastify`. The wrapper exposes queue control, schedulers, flow usage and budget endpoints, queue-wide usage summaries, durable broadcast SSE, direct queue access via `app.glidemq`, and automatic graceful shutdown via Fastify's `onClose` hook.

```typescript
import Fastify from 'fastify';
import { glideMQPlugin, glideMQRoutes, QueueRegistryImpl } from '@glidemq/fastify';
import type { Job } from 'glide-mq';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

// Processor functions
async function processEmail(job: Job) {
  console.log(`Sending email to ${job.data.to}`);
  return { sent: true, to: job.data.to };
}

async function processOrder(job: Job) {
  console.log(`Processing order ${job.data.orderId}`);
  await job.updateProgress(50);
  return { orderId: job.data.orderId, status: 'shipped' };
}

// Create registry for graceful shutdown access
const registry = new QueueRegistryImpl({
  connection,
  queues: {
    emails: { processor: processEmail, concurrency: 5 },
    orders: { processor: processOrder, concurrency: 3 },
  },
});

const app = Fastify({ logger: true });

// Register core plugin with pre-built registry
await app.register(glideMQPlugin, registry as any);

// Mount queue HTTP API + SSE
await app.register(glideMQRoutes, { prefix: '/api/queues' });

// Custom route using the queue directly
app.post('/send-email', async (request, reply) => {
  const { to, subject, body } = request.body as any;
  const { queue } = app.glidemq.get('emails');
  const job = await queue.add('send', { to, subject, body });
  return reply.send({ jobId: job?.id ?? null });
});

app.post('/place-order', async (request, reply) => {
  const { items, total } = request.body as any;
  const { queue } = app.glidemq.get('orders');
  const job = await queue.add('process', { orderId: `ORD-${Date.now()}`, items, total });
  return reply.send({ jobId: job?.id ?? null });
});

// Start server
await app.listen({ port: 3000 });
console.log('Fastify server running at http://localhost:3000');
console.log('Queue API at http://localhost:3000/api/queues');

// Graceful shutdown
process.on('SIGTERM', async () => {
  await app.close(); // triggers onClose hook → registry.closeAll()
  process.exit(0);
});
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/fastify-api)

---

## Hapi Basic

Basic Hapi.js server using glide-mq directly (no `@glidemq/hapi` plugin). Features Queue + Worker registered manually, REST endpoints for job management, convenience routes, and graceful shutdown.

```typescript
import Hapi from '@hapi/hapi';
import { Queue, Worker } from 'glide-mq';
import type { Job } from 'glide-mq';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

// Processor functions
async function processEmail(job: Job) {
  console.log(`Sending email to ${job.data.to}`);
  return { sent: true, to: job.data.to };
}

async function processOrder(job: Job) {
  console.log(`Processing order ${job.data.orderId}`);
  await job.updateProgress(50);
  return { orderId: job.data.orderId, status: 'shipped' };
}

// Create queues and workers
const emailQueue = new Queue('emails', { connection });
const orderQueue = new Queue('orders', { connection });

const emailWorker = new Worker('emails', processEmail, { connection, concurrency: 5 });
const orderWorker = new Worker('orders', processOrder, { connection, concurrency: 3 });

emailWorker.on('completed', (job) => console.log(`Email job ${job.id} done`));
orderWorker.on('completed', (job) => console.log(`Order job ${job.id} done`));
emailWorker.on('error', (err) => console.error('Email worker error:', err));
orderWorker.on('error', (err) => console.error('Order worker error:', err));

// Queue registry helper
function getQueue(name: string): Queue | null {
  if (name === 'emails') return emailQueue;
  if (name === 'orders') return orderQueue;
  return null;
}

// Hapi server
const server = Hapi.server({ port: 3000, host: 'localhost' });

// Add a job
server.route({
  method: 'POST',
  path: '/api/queues/{name}/jobs',
  handler: async (request, h) => {
    const queue = getQueue(request.params.name);
    if (!queue) return h.response({ error: 'Queue not found' }).code(404);

    const { name, data, opts } = request.payload as any;
    if (!name || typeof name !== 'string') {
      return h.response({ error: 'Validation failed', details: ['name is required'] }).code(400);
    }

    const job = await queue.add(name, data ?? {}, opts);
    return h.response({ id: job?.id, name: job?.name, data: job?.data }).code(201);
  },
});

// List jobs
server.route({
  method: 'GET',
  path: '/api/queues/{name}/jobs',
  handler: async (request, h) => {
    const queue = getQueue(request.params.name);
    if (!queue) return h.response({ error: 'Queue not found' }).code(404);

    const query = request.query as Record<string, string>;
    const type = query.type ?? 'waiting';
    const start = Number(query.start ?? 0);
    const end = Math.min(Number(query.end ?? 99), 99);
    const jobs = await queue.getJobs(type as any, start, end);
    return h.response(jobs.map((j) => ({ id: j.id, name: j.name, data: j.data })));
  },
});

// Get single job
server.route({
  method: 'GET',
  path: '/api/queues/{name}/jobs/{id}',
  handler: async (request, h) => {
    const queue = getQueue(request.params.name);
    if (!queue) return h.response({ error: 'Queue not found' }).code(404);

    const job = await queue.getJob(request.params.id);
    if (!job) return h.response({ error: 'Job not found' }).code(404);

    return h.response({ id: job.id, name: job.name, data: job.data });
  },
});

// Job counts
server.route({
  method: 'GET',
  path: '/api/queues/{name}/counts',
  handler: async (request, h) => {
    const queue = getQueue(request.params.name);
    if (!queue) return h.response({ error: 'Queue not found' }).code(404);

    return h.response(await queue.getJobCounts());
  },
});

// Pause queue
server.route({
  method: 'POST',
  path: '/api/queues/{name}/pause',
  options: { payload: { failAction: 'ignore' as const } },
  handler: async (request, h) => {
    const queue = getQueue(request.params.name);
    if (!queue) return h.response({ error: 'Queue not found' }).code(404);

    await queue.pause();
    return h.response().code(204);
  },
});

// Resume queue
server.route({
  method: 'POST',
  path: '/api/queues/{name}/resume',
  options: { payload: { failAction: 'ignore' as const } },
  handler: async (request, h) => {
    const queue = getQueue(request.params.name);
    if (!queue) return h.response({ error: 'Queue not found' }).code(404);

    await queue.resume();
    return h.response().code(204);
  },
});

// Convenience routes
server.route({
  method: 'POST',
  path: '/send-email',
  handler: async (request, h) => {
    const { to, subject, body } = request.payload as any;
    const job = await emailQueue.add('send', { to, subject, body });
    return h.response({ jobId: job?.id ?? null });
  },
});

server.route({
  method: 'POST',
  path: '/place-order',
  handler: async (request, h) => {
    const { items, total } = request.payload as any;
    const job = await orderQueue.add('process', { orderId: `ORD-${Date.now()}`, items, total });
    return h.response({ jobId: job?.id ?? null });
  },
});

// Start server
await server.start();
console.log('Hapi server running at', server.info.uri);
console.log('Queue API at http://localhost:3000/api/queues');

// Graceful shutdown
process.on('SIGTERM', async () => {
  await server.stop();
  await Promise.all([emailQueue.close(), orderQueue.close(), emailWorker.close(), orderWorker.close()]);
  process.exit(0);
});
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/hapi-basic)

---

## Hapi API

Full REST API + SSE events for glide-mq queue management using `@glidemq/hapi`. The wrapper exposes queue control, schedulers, flow usage and budget endpoints, queue-wide usage summaries, durable broadcast SSE, direct queue access via `request.server.glidemq`, and automatic graceful shutdown via Hapi's `onPostStop` hook.

```typescript
import Hapi from '@hapi/hapi';
import { glideMQPlugin, glideMQRoutes, QueueRegistryImpl } from '@glidemq/hapi';
import type { Job } from 'glide-mq';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

// Processor functions
async function processEmail(job: Job) {
  console.log(`Sending email to ${job.data.to}`);
  return { sent: true, to: job.data.to };
}

async function processOrder(job: Job) {
  console.log(`Processing order ${job.data.orderId}`);
  await job.updateProgress(50);
  return { orderId: job.data.orderId, status: 'shipped' };
}

// Create registry for graceful shutdown access
const registry = new QueueRegistryImpl({
  connection,
  queues: {
    emails: { processor: processEmail, concurrency: 5 },
    orders: { processor: processOrder, concurrency: 3 },
  },
});

const server = Hapi.server({ port: 3000, host: 'localhost' });

// Register core plugin with pre-built registry
await server.register({
  plugin: glideMQPlugin,
  options: registry as any,
});

// Mount queue HTTP API + SSE
await server.register({
  plugin: glideMQRoutes,
  options: { prefix: '/api/queues' },
});

// Custom route using the queue directly
server.route({
  method: 'POST',
  path: '/send-email',
  handler: async (request, h) => {
    const { to, subject, body } = request.payload as any;
    const { queue } = request.server.glidemq.get('emails');
    const job = await queue.add('send', { to, subject, body });
    return h.response({ jobId: job?.id ?? null });
  },
});

server.route({
  method: 'POST',
  path: '/place-order',
  handler: async (request, h) => {
    const { items, total } = request.payload as any;
    const { queue } = request.server.glidemq.get('orders');
    const job = await queue.add('process', { orderId: `ORD-${Date.now()}`, items, total });
    return h.response({ jobId: job?.id ?? null });
  },
});

// Start server
await server.start();
console.log('Hapi server running at', server.info.uri);
console.log('Queue API at http://localhost:3000/api/queues');

// Graceful shutdown
process.on('SIGTERM', async () => {
  await server.stop(); // triggers onPostStop hook -> registry.closeAll()
  process.exit(0);
});
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/hapi-api)

---

## NestJS Module

Comprehensive example of `@glidemq/nestjs` demonstrating every major feature using an order processing + email notification scenario. Features `GlideMQModule.forRoot()`, `registerQueue()`, `registerFlowProducer()`, `@Processor` with concurrency and `WorkerHost`, `@OnWorkerEvent`, `@InjectQueue`, `@InjectFlowProducer`, `@QueueEventsListener`, `@OnQueueEvent`, feature module pattern, progress tracking, job logging, and parent/child flow workflows.

```typescript
import 'reflect-metadata';
import {
  Module,
  Injectable,
  Controller,
  Post,
  Get,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  GlideMQModule,
  InjectQueue,
  InjectFlowProducer,
  Processor,
  WorkerHost,
  OnWorkerEvent,
  QueueEventsListener,
  QueueEventsHost,
  OnQueueEvent,
} from '@glidemq/nestjs';
import type { Queue, FlowProducer, Job } from 'glide-mq';

// --- Processors ---

@Processor({ name: 'emails', concurrency: 3 })
class EmailProcessor extends WorkerHost {
  async process(job: Job) {
    console.log(`[EmailProcessor] Sending to ${job.data.to}: ${job.data.subject}`);
    await new Promise((r) => setTimeout(r, 200));
    return { sent: true, to: job.data.to };
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    console.log(`[EmailProcessor] Job ${job.id} started`);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`[EmailProcessor] Job ${job.id} completed`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, err: Error) {
    console.error(`[EmailProcessor] Job ${job.id} failed:`, err.message);
  }
}

@Processor('orders')
class OrderProcessor extends WorkerHost {
  async process(job: Job) {
    console.log(`[OrderProcessor] Processing order ${job.data.orderId}`);

    await job.updateProgress(10);
    await job.log('Validating order...');
    await new Promise((r) => setTimeout(r, 100));

    await job.updateProgress(50);
    await job.log('Charging payment...');
    await new Promise((r) => setTimeout(r, 100));

    await job.updateProgress(100);
    await job.log('Order complete');

    return { orderId: job.data.orderId, status: 'fulfilled' };
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`[OrderProcessor] Order ${job.data.orderId} fulfilled`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, err: Error) {
    console.error(`[OrderProcessor] Order ${job.data.orderId} failed:`, err.message);
  }
}

// --- Queue Events Listener ---

@QueueEventsListener('orders')
class OrderEventsListener extends QueueEventsHost {
  @OnQueueEvent('completed')
  onCompleted(args: { jobId: string; returnvalue: any }) {
    console.log(`[QueueEvents] Order job ${args.jobId} completed`);
  }

  @OnQueueEvent('progress')
  onProgress(args: { jobId: string; data: string }) {
    console.log(`[QueueEvents] Order job ${args.jobId} progress: ${args.data}%`);
  }

  @OnQueueEvent('stalled')
  onStalled(args: { jobId: string }) {
    console.log(`[QueueEvents] Order job ${args.jobId} stalled`);
  }
}

// --- Services ---

@Injectable()
class EmailService {
  constructor(@InjectQueue('emails') private readonly queue: Queue) {}

  async send(to: string, subject: string, body: string) {
    const job = await this.queue.add('send', { to, subject, body });
    return { jobId: job?.id ?? null, status: 'queued' };
  }

  async sendBulk(emails: { to: string; subject: string; body: string }[]) {
    const jobs = await this.queue.addBulk(
      emails.map((e) => ({ name: 'send', data: e })),
    );
    return jobs.map((j) => ({ jobId: j.id }));
  }

  async getJob(id: string) {
    const job = await this.queue.getJob(id);
    if (!job) throw new NotFoundException(`Job ${id} not found`);
    return { id: job.id, name: job.name, data: job.data, returnvalue: job.returnvalue };
  }

  async getStatus() {
    return this.queue.getJobCounts();
  }
}

@Injectable()
class OrderService {
  constructor(
    @InjectQueue('orders') private readonly queue: Queue,
    @InjectFlowProducer('order-flow') private readonly flow: FlowProducer,
  ) {}

  async createOrder(orderId: string, items: string[]) {
    const job = await this.queue.add('process', { orderId, items }, {
      priority: 1,
      attempts: 3,
      backoff: { type: 'exponential', delay: 1000 },
    });
    return { jobId: job?.id ?? null, status: 'queued' };
  }

  async createOrderWithConfirmation(orderId: string, items: string[], email: string) {
    const result = await this.flow.add({
      name: 'process',
      queueName: 'orders',
      data: { orderId, items },
      children: [
        {
          name: 'send',
          queueName: 'emails',
          data: { to: email, subject: `Order ${orderId} confirmed`, body: `Items: ${items.join(', ')}` },
        },
      ],
    });
    return { parentJobId: result.job?.id ?? null, status: 'flow-queued' };
  }

  async getJob(id: string) {
    const job = await this.queue.getJob(id);
    if (!job) throw new NotFoundException(`Job ${id} not found`);
    return { id: job.id, name: job.name, data: job.data, returnvalue: job.returnvalue };
  }

  async getStatus() {
    return this.queue.getJobCounts();
  }
}

// --- Controllers ---

@Controller('emails')
class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async send(@Body() dto: { to: string; subject: string; body: string }) {
    return this.emailService.send(dto.to, dto.subject, dto.body);
  }

  @Post('send-bulk')
  async sendBulk(@Body() dto: { emails: { to: string; subject: string; body: string }[] }) {
    return this.emailService.sendBulk(dto.emails);
  }

  @Get('status')
  async status() {
    return this.emailService.getStatus();
  }

  @Get(':id')
  async getJob(@Param('id') id: string) {
    return this.emailService.getJob(id);
  }
}

@Controller('orders')
class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() body: { orderId: string; items: string[] }) {
    return this.orderService.createOrder(body.orderId, body.items);
  }

  @Post('flow')
  async createFlow(@Body() body: { orderId: string; items: string[]; email: string }) {
    return this.orderService.createOrderWithConfirmation(body.orderId, body.items, body.email);
  }

  @Get('status')
  async status() {
    return this.orderService.getStatus();
  }

  @Get(':id')
  async getJob(@Param('id') id: string) {
    return this.orderService.getJob(id);
  }
}

// --- Feature Module: orders have their own module with queue + flow producer ---

@Module({
  imports: [
    GlideMQModule.registerQueue({ name: 'orders' }),
    GlideMQModule.registerFlowProducer({ name: 'order-flow' }),
  ],
  providers: [OrderProcessor, OrderService, OrderEventsListener],
  controllers: [OrderController],
})
class OrderModule {}

// --- App Module ---

@Module({
  imports: [
    GlideMQModule.forRoot({
      connection: { addresses: [{ host: 'localhost', port: 6379 }] },
      testing: process.env.TESTING === 'true',
    }),
    GlideMQModule.registerQueue({ name: 'emails' }),
    OrderModule,
  ],
  providers: [EmailProcessor, EmailService],
  controllers: [EmailController],
})
class AppModule {}

// --- Bootstrap ---

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  await app.listen(3000);

  console.log(`NestJS + glide-mq running at http://localhost:3000

Email endpoints:
  POST /emails/send       - { to, subject, body }
  POST /emails/send-bulk  - { emails: [{ to, subject, body }] }
  GET  /emails/status
  GET  /emails/:id

Order endpoints:
  POST /orders            - { orderId, items }
  POST /orders/flow       - { orderId, items, email }
  GET  /orders/status
  GET  /orders/:id`);
}

bootstrap().catch((err) => {
  console.error('Failed to start:', err);
  process.exit(1);
});
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/nestjs-module)

---

## Express Basic

Queue management API using Express and glide-mq core directly. Features REST endpoints for job management (add, list, get, counts, pause, resume) and convenience routes for email and order operations.

```typescript
import crypto from 'crypto';
import express from 'express';
import { Queue, Worker } from 'glide-mq';
import type { Job } from 'glide-mq';

const VALID_JOB_TYPES = ['waiting', 'active', 'delayed', 'completed', 'failed'] as const;
type JobType = typeof VALID_JOB_TYPES[number];

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

// Processor functions
async function processEmail(job: Job) {
  console.log(`Sending email to ${job.data.to}`);
  return { sent: true, to: job.data.to };
}

async function processOrder(job: Job) {
  console.log(`Processing order ${job.data.orderId}`);
  await job.updateProgress(50);
  return { orderId: job.data.orderId, status: 'shipped' };
}

// Create queues and workers
const emailQueue = new Queue('emails', { connection });
const orderQueue = new Queue('orders', { connection });

const emailWorker = new Worker('emails', processEmail, { connection, concurrency: 5 });
const orderWorker = new Worker('orders', processOrder, { connection, concurrency: 3 });

emailWorker.on('completed', (job) => console.log(`Email job ${job.id} done`));
orderWorker.on('completed', (job) => console.log(`Order job ${job.id} done`));
emailWorker.on('error', (err) => console.error('Email worker error:', err));
orderWorker.on('error', (err) => console.error('Order worker error:', err));

// Queue registry helper
function getQueue(name: string): Queue | null {
  if (name === 'emails') return emailQueue;
  if (name === 'orders') return orderQueue;
  return null;
}

// Express app
const app = express();
app.use(express.json());

const router = express.Router();

// Add a job
router.post('/:name/jobs', async (req, res) => {
  const queue = getQueue(req.params.name);
  if (!queue) { res.status(404).json({ error: 'Queue not found' }); return; }

  const { name, data, opts } = req.body;
  if (!name || typeof name !== 'string') {
    res.status(400).json({ error: 'Validation failed', details: ['name is required'] });
    return;
  }

  const job = await queue.add(name, data ?? {}, opts);
  res.status(201).json({ id: job?.id, name: job?.name, data: job?.data });
});

// List jobs (max 100 per page)
router.get('/:name/jobs', async (req, res) => {
  const queue = getQueue(req.params.name);
  if (!queue) { res.status(404).json({ error: 'Queue not found' }); return; }

  const type = (req.query.type as string) ?? 'waiting';
  if (!VALID_JOB_TYPES.includes(type as JobType)) {
    res.status(400).json({ error: 'Validation failed', details: [`type must be one of: ${VALID_JOB_TYPES.join(', ')}`] });
    return;
  }

  const start = Number(req.query.start ?? 0);
  const end = Math.min(Number(req.query.end ?? 99), 99); // cap at 100 jobs
  const jobs = await queue.getJobs(type as JobType, start, end);
  res.json(jobs.map((j) => ({ id: j.id, name: j.name, data: j.data })));
});

// Get single job
router.get('/:name/jobs/:id', async (req, res) => {
  const queue = getQueue(req.params.name);
  if (!queue) { res.status(404).json({ error: 'Queue not found' }); return; }

  const job = await queue.getJob(req.params.id);
  if (!job) { res.status(404).json({ error: 'Job not found' }); return; }

  res.json({ id: job.id, name: job.name, data: job.data });
});

// Job counts
router.get('/:name/counts', async (req, res) => {
  const queue = getQueue(req.params.name);
  if (!queue) { res.status(404).json({ error: 'Queue not found' }); return; }

  res.json(await queue.getJobCounts());
});

// Pause queue
router.post('/:name/pause', async (req, res) => {
  const queue = getQueue(req.params.name);
  if (!queue) { res.status(404).json({ error: 'Queue not found' }); return; }

  await queue.pause();
  res.status(204).send();
});

// Resume queue
router.post('/:name/resume', async (req, res) => {
  const queue = getQueue(req.params.name);
  if (!queue) { res.status(404).json({ error: 'Queue not found' }); return; }

  await queue.resume();
  res.status(204).send();
});

app.use('/api/queues', router);

// Convenience routes
app.post('/send-email', async (req, res) => {
  const { to, subject, body } = req.body;
  const job = await emailQueue.add('send', { to, subject, body });
  res.json({ jobId: job?.id ?? null });
});

app.post('/place-order', async (req, res) => {
  const { items, total } = req.body;
  const job = await orderQueue.add('process', { orderId: `ORD-${crypto.randomUUID()}`, items, total });
  res.json({ jobId: job?.id ?? null });
});

app.listen(3000, () => {
  console.log('Express server running at http://localhost:3000');
  console.log('Queue API at http://localhost:3000/api/queues');
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await Promise.all([emailQueue.close(), orderQueue.close(), emailWorker.close(), orderWorker.close()]);
  process.exit(0);
});
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/express-basic)

---

## Express Dashboard

Web UI for monitoring and managing glide-mq queues using `@glidemq/dashboard`. Features real-time queue metrics, job inspection with logs and state, queue operations (pause, resume, drain, obliterate), job operations (retry, remove, promote), and read-only mode with authorization hooks.

```typescript
import express from 'express';
import { Queue, Worker } from 'glide-mq';
import { createDashboard } from '@glidemq/dashboard';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

// Create queues
const fast = new Queue('fast-queue', { connection });
const slow = new Queue('slow-queue', { connection });
const flaky = new Queue('flaky-queue', { connection });

// Workers
const fastWorker = new Worker('fast-queue', async (job) => {
  await new Promise(r => setTimeout(r, 30 + Math.random() * 70));
  return { processed: job.name, seq: job.data.i };
}, { connection, concurrency: 5, blockTimeout: 1000 });

const slowWorker = new Worker('slow-queue', async (job) => {
  await new Promise(r => setTimeout(r, 400 + Math.random() * 600));
  return { result: 'done', size: job.data.size };
}, { connection, concurrency: 1, blockTimeout: 1000 });

const flakyWorker = new Worker('flaky-queue', async (job) => {
  await new Promise(r => setTimeout(r, 100 + Math.random() * 200));
  if (Math.random() < 0.3) throw new Error('Random failure on attempt ' + (job.attemptsMade + 1));
  return { ok: true };
}, { connection, concurrency: 3, blockTimeout: 1000 });

fastWorker.on('error', () => {});
slowWorker.on('error', () => {});
flakyWorker.on('error', () => {});

// Seed some jobs
async function seed() {
  for (let i = 0; i < 30; i++) {
    await fast.add('task', { i, ts: Date.now() });
  }
  for (let i = 0; i < 10; i++) {
    await slow.add('batch', { size: Math.floor(Math.random() * 1000) }, { delay: i * 1500 });
  }
  for (let i = 0; i < 20; i++) {
    await flaky.add('work', { i }, {
      attempts: 3, backoff: { type: 'exponential', delay: 500 },
    });
  }
  console.log('Seeded: 30 fast, 10 slow (delayed), 20 flaky (with retries)');
}

// Mount dashboard
const app = express();
app.use('/dashboard', createDashboard([fast, slow, flaky], {
  // readOnly: true,
  // authorize: (req, action) => req.headers['x-admin-key'] === 'secret',
}));

app.listen(3000, async () => {
  console.log('Dashboard: http://localhost:3000/dashboard');
  await seed();
});
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/express-dashboard)

---

## Koa Basic

Queue management API using Koa and glide-mq core directly. Features REST endpoints for job management and convenience routes, following the same pattern as the Express example but with Koa middleware.

```typescript
import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import { Queue, Worker } from 'glide-mq';
import type { Job } from 'glide-mq';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

// Processor functions
async function processEmail(job: Job) {
  console.log(`Sending email to ${job.data.to}`);
  return { sent: true, to: job.data.to };
}

async function processOrder(job: Job) {
  console.log(`Processing order ${job.data.orderId}`);
  await job.updateProgress(50);
  return { orderId: job.data.orderId, status: 'shipped' };
}

// Create queues and workers
const emailQueue = new Queue('emails', { connection });
const orderQueue = new Queue('orders', { connection });

const emailWorker = new Worker('emails', processEmail, { connection, concurrency: 5 });
const orderWorker = new Worker('orders', processOrder, { connection, concurrency: 3 });

emailWorker.on('completed', (job) => console.log(`Email job ${job.id} done`));
orderWorker.on('completed', (job) => console.log(`Order job ${job.id} done`));
emailWorker.on('error', () => {});
orderWorker.on('error', () => {});

// Koa app
const app = new Koa();
const router = new Router();

app.use(bodyParser());

// Add a job
router.post('/api/queues/:name/jobs', async (ctx) => {
  const { name: queueName } = ctx.params;
  const queue = queueName === 'emails' ? emailQueue : queueName === 'orders' ? orderQueue : null;

  if (!queue) {
    ctx.status = 404;
    ctx.body = { error: 'Queue not found' };
    return;
  }

  const { name, data, opts } = ctx.request.body as any;
  if (!name || typeof name !== 'string') {
    ctx.status = 400;
    ctx.body = { error: 'Validation failed', details: ['name is required'] };
    return;
  }

  const job = await queue.add(name, data ?? {}, opts);
  ctx.status = 201;
  ctx.body = { id: job?.id, name: job?.name, data: job?.data };
});

// Get job counts
router.get('/api/queues/:name/counts', async (ctx) => {
  const { name: queueName } = ctx.params;
  const queue = queueName === 'emails' ? emailQueue : queueName === 'orders' ? orderQueue : null;

  if (!queue) {
    ctx.status = 404;
    ctx.body = { error: 'Queue not found' };
    return;
  }

  ctx.body = await queue.getJobCounts();
});

// List jobs
router.get('/api/queues/:name/jobs', async (ctx) => {
  const { name: queueName } = ctx.params;
  const queue = queueName === 'emails' ? emailQueue : queueName === 'orders' ? orderQueue : null;

  if (!queue) {
    ctx.status = 404;
    ctx.body = { error: 'Queue not found' };
    return;
  }

  const type = (ctx.query.type as string) ?? 'waiting';
  const jobs = await queue.getJobs(type as any);
  ctx.body = jobs.map((j) => ({ id: j.id, name: j.name, data: j.data }));
});

// Get single job
router.get('/api/queues/:name/jobs/:id', async (ctx) => {
  const { name: queueName, id } = ctx.params;
  const queue = queueName === 'emails' ? emailQueue : queueName === 'orders' ? orderQueue : null;

  if (!queue) {
    ctx.status = 404;
    ctx.body = { error: 'Queue not found' };
    return;
  }

  const job = await queue.getJob(id);
  if (!job) {
    ctx.status = 404;
    ctx.body = { error: 'Job not found' };
    return;
  }

  ctx.body = { id: job.id, name: job.name, data: job.data };
});

// Pause / resume
router.post('/api/queues/:name/pause', async (ctx) => {
  const queue = ctx.params.name === 'emails' ? emailQueue : ctx.params.name === 'orders' ? orderQueue : null;
  if (!queue) { ctx.status = 404; ctx.body = { error: 'Queue not found' }; return; }
  await queue.pause();
  ctx.status = 204;
});

router.post('/api/queues/:name/resume', async (ctx) => {
  const queue = ctx.params.name === 'emails' ? emailQueue : ctx.params.name === 'orders' ? orderQueue : null;
  if (!queue) { ctx.status = 404; ctx.body = { error: 'Queue not found' }; return; }
  await queue.resume();
  ctx.status = 204;
});

// Custom convenience routes
router.post('/send-email', async (ctx) => {
  const { to, subject, body } = ctx.request.body as any;
  const job = await emailQueue.add('send', { to, subject, body });
  ctx.body = { jobId: job?.id ?? null };
});

router.post('/place-order', async (ctx) => {
  const { items, total } = ctx.request.body as any;
  const job = await orderQueue.add('process', { orderId: `ORD-${Date.now()}`, items, total });
  ctx.body = { jobId: job?.id ?? null };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Koa server running at http://localhost:3000');
  console.log('Queue API at http://localhost:3000/api/queues');
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await Promise.all([emailQueue.close(), orderQueue.close(), emailWorker.close(), orderWorker.close()]);
  process.exit(0);
});
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/koa-basic)

---

## Next.js API Routes

Demonstrates the recommended architecture for using glide-mq with Next.js on Vercel or any serverless platform. The Next.js app only produces jobs (lightweight), while a separate long-lived worker process consumes them. This split is necessary because serverless functions are short-lived and cannot run persistent workers.

### API Routes (Producer)

```typescript
import { Queue } from 'glide-mq';
import type { Job } from 'glide-mq';

// Shared queue connection (reuse across requests)
const connection = {
  addresses: [{ host: 'localhost', port: 6379 }],
  clusterMode: false,
};

let _queue: Queue | null = null;

function getQueue(): Queue {
  if (!_queue) {
    _queue = new Queue('jobs', { connection });
  }
  return _queue;
}

// POST /api/jobs — Add a job to the queue
export async function POST(request: Request) {
  const body = await request.json();
  const { type, payload } = body;

  const queue = getQueue();

  const job = await queue.add(type, payload, {
    deduplication: {
      id: payload.idempotencyKey,
      ttl: 3600000, // 1 hour
    },
  });

  if (!job) {
    return Response.json(
      { queued: false, reason: 'duplicate', jobId: payload.idempotencyKey },
      { status: 200 },
    );
  }

  return Response.json({ queued: true, jobId: job.id }, { status: 201 });
}

// GET /api/jobs/[id] — Check job status
export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const queue = getQueue();
  const job = await queue.getJob(params.id);

  if (!job) {
    return Response.json({ error: 'Job not found' }, { status: 404 });
  }

  const state = await job.getState();

  return Response.json({
    jobId: job.id,
    state,
    data: job.data,
    returnvalue: job.returnvalue,
    failedReason: job.failedReason,
    progress: job.progress,
  });
}

// Server Action — Queue a background task from a React Server Component
async function sendReportAction(reportId: string) {
  'use server';

  const queue = getQueue();

  const job = await queue.add('generate-report', { reportId }, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 },
  });

  if (!job) {
    return { success: false, reason: 'duplicate' };
  }

  return { success: true, jobId: job.id };
}
```

### Worker (Consumer)

```typescript
import { Worker } from 'glide-mq';
import type { Job } from 'glide-mq';

const connection = {
  addresses: [{ host: 'localhost', port: 6379 }],
  clusterMode: false,
};

const worker = new Worker('jobs', async (job: Job) => {
  console.log(`[worker] Processing ${job.name} (${job.id}):`, job.data);

  switch (job.name) {
    case 'generate-report': {
      await job.updateProgress(10);
      // ... generate the report ...
      await job.log('Report generated');
      await job.updateProgress(80);
      // ... upload to S3, send email, etc. ...
      await job.updateProgress(100);
      return { reportUrl: `https://cdn.example.com/reports/${job.data.reportId}.pdf` };
    }

    default: {
      await job.updateProgress(50);
      await job.log(`Processed ${job.name}`);
      await job.updateProgress(100);
      return { processed: true };
    }
  }
}, { connection, concurrency: 5 });

worker.on('completed', (job) => {
  console.log(`[worker] Completed ${job.id} ->`, job.returnvalue);
});

worker.on('failed', (job, err) => {
  console.error(`[worker] Failed ${job.id}:`, err.message);
});

console.log('[worker] Listening for jobs on "jobs" queue (concurrency: 5)');
console.log('[worker] Press Ctrl+C to stop.');

async function shutdown() {
  console.log('[worker] Shutting down...');
  await worker.close();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/nextjs-api-routes)

---

## Vercel AI SDK

Use the Vercel AI SDK (`generateText`, `streamText`) inside a glide-mq worker for durable, retryable AI inference with token streaming and usage tracking.

```typescript
import { createOpenAI } from '@ai-sdk/openai';
import { generateText, streamText } from 'ai';
import { Queue, Worker } from 'glide-mq';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

const queue = new Queue('ai-tasks', { connection });

const worker = new Worker('ai-tasks', async (job) => {
  const { prompt, model } = job.data;

  if (job.data.mode === 'stream') {
    // Stream tokens via job.stream()
    const result = streamText({
      model: openrouter.chat(model),
      prompt,
      maxTokens: 150,
    });

    for await (const chunk of result.textStream) {
      await job.stream({ t: chunk });
    }
    await job.stream({ t: '', done: '1' });

    const usage = await result.usage;
    await job.reportUsage({
      model,
      provider: 'openrouter',
      tokens: { input: usage.inputTokens ?? 0, output: usage.outputTokens ?? 0 },
    });

    return { content: await result.text };
  }

  // Non-streaming: generateText
  const result = await generateText({
    model: openrouter.chat(model),
    prompt,
    maxTokens: 150,
  });

  await job.reportUsage({
    model,
    provider: 'openrouter',
    tokens: { input: result.usage.inputTokens ?? 0, output: result.usage.outputTokens ?? 0 },
  });

  return {
    content: result.text,
    finishReason: result.finishReason,
  };
}, { connection, concurrency: 1 });

// Enqueue jobs
await queue.add('generate', { prompt: 'Hello world', model: 'gpt-5.4-nano', mode: 'generate' });
await queue.add('stream', { prompt: 'Write a haiku', model: 'gpt-5.4-nano', mode: 'stream' });
```

[View full source](https://github.com/avifenesh/glide-mq/blob/main/examples/with-vercel-ai-sdk.ts)

---

## LangChain

LangChain chains (`prompt | model | parser`) run inside glide-mq workers for durable, retryable execution. Token usage is reported from LangChain's response metadata.

```typescript
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { Queue, Worker, FlowProducer } from 'glide-mq';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

const llm = new ChatOpenAI({
  model: 'gpt-5.4-nano',
  configuration: { baseURL: 'https://openrouter.ai/api/v1' },
  apiKey: process.env.OPENROUTER_API_KEY,
  maxTokens: 150,
});

const parser = new StringOutputParser();

// Define chains for each pipeline step
const researchChain = ChatPromptTemplate.fromMessages([
  ['system', 'List 3 key facts about the topic.'],
  ['user', '{topic}'],
]).pipe(llm).pipe(parser);

const summarizeChain = ChatPromptTemplate.fromMessages([
  ['system', 'Summarize into one concise paragraph.'],
  ['user', '{research}'],
]).pipe(llm).pipe(parser);

const queue = new Queue('langchain', { connection });

const worker = new Worker('langchain', async (job) => {
  const { step, topic, research } = job.data;

  if (step === 'research') {
    const prompt = researchChain.first;
    const messages = await prompt.formatMessages({ topic });
    const response = await llm.invoke(messages);
    const text = String(response.content);
    const usage = response.response_metadata?.tokenUsage;

    if (usage) {
      await job.reportUsage({
        model: 'gpt-5.4-nano',
        provider: 'openrouter',
        tokens: { input: usage.promptTokens ?? 0, output: usage.completionTokens ?? 0 },
      });
    }

    return { output: text };
  }

  if (step === 'summarize') {
    const prompt = summarizeChain.first;
    const messages = await prompt.formatMessages({ research });
    const response = await llm.invoke(messages);
    // ... report usage similarly
    return { output: String(response.content) };
  }
}, { connection });
```

[View full source](https://github.com/avifenesh/glide-mq/blob/main/examples/with-langchain.ts)
