---
title: Basics
description: Fundamental glide-mq examples -- queues, workers, events, DLQ, retries, email service, webhook delivery, image pipeline, and stall detection.
---

# Basics

Core queue and worker patterns, real-world use cases, and production-grade reliability features.

## Core Basics

Demonstrates fundamental glide-mq features: Queue and Worker setup, single/delayed/priority/retry jobs, bulk insert with `addBulk`, progress tracking and job logs, real-time events via `QueueEvents`, and graceful shutdown.

```typescript
import { Queue, Worker, QueueEvents } from 'glide-mq';
import type { Job } from 'glide-mq';

const connection = {
  addresses: [{ host: 'localhost', port: 6379 }],
  clusterMode: false,
};

// --- 1. Basic Queue & Worker ---

const queue = new Queue('tasks', { connection });

const worker = new Worker('tasks', async (job: Job) => {
  console.log(`Processing ${job.name}:`, job.data);

  // Progress tracking
  await job.updateProgress(50);
  await job.log('Halfway done');
  await job.updateProgress(100);

  return { processed: true, id: job.data.id };
}, { connection, concurrency: 5 });

worker.on('completed', (job) => console.log(`Job ${job.id} completed`));
worker.on('failed', (job, err) => console.error(`Job ${job.id} failed:`, err.message));

// --- 2. Real-time Events ---

const events = new QueueEvents('tasks', { connection });
events.on('added', ({ jobId }) => console.log(`Event: job ${jobId} added`));
events.on('completed', ({ jobId }) => console.log(`Event: job ${jobId} completed`));

// --- 3. Produce Jobs ---

// Single job
await queue.add('send-email', { to: 'user@example.com', subject: 'Hello' });

// Delayed job
await queue.add('reminder', { message: 'Follow up' }, { delay: 5000 });

// Priority job
await queue.add('urgent', { alert: 'Server down' }, { priority: 1 });

// Job with retries
await queue.add('payment', { amount: 99.99 }, {
  attempts: 3,
  backoff: { type: 'exponential', delay: 1000 },
});

// Bulk insert
const bulkJobs = Array.from({ length: 20 }, (_, i) => ({
  name: 'batch-item',
  data: { index: i },
}));
await queue.addBulk(bulkJobs);
console.log('Added 20 jobs via addBulk');

// --- 4. Graceful Shutdown ---

console.log('Running... Press Ctrl+C to stop.');

process.on('SIGINT', async () => {
  console.log('Shutting down...');
  await worker.close();
  await events.close();
  await queue.close();
  process.exit(0);
});
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/core-basics)

---

## Core Advanced

Demonstrates advanced glide-mq features: gzip compression for large payloads (98% reduction), token-bucket rate limiting, deduplication to prevent duplicate processing, dead letter queues for failed jobs, and cron-based schedulers.

```typescript
import { Queue, Worker } from 'glide-mq';
import type { Job } from 'glide-mq';
import { setTimeout } from 'timers/promises';

const connection = {
  addresses: [{ host: 'localhost', port: 6379 }],
  clusterMode: false,
};

// --- 1. Compression ---

const reportQueue = new Queue('reports', { connection, compression: 'gzip' });

const reportWorker = new Worker('reports', async (job: Job) => {
  console.log(`Generating ${job.data.type} report (${JSON.stringify(job.data).length} bytes)`);
  for (let i = 0; i <= 100; i += 20) {
    await setTimeout(300);
    await job.updateProgress(i);
  }
  return { reportId: `RPT-${Date.now()}`, pages: 42 };
}, { connection, concurrency: 1 });

// Large payload - compression reduces this by ~98%
await reportQueue.add('annual-report', {
  type: 'annual',
  data: Array.from({ length: 500 }, (_, i) => ({
    id: i,
    revenue: Math.random() * 10000,
    orders: Math.floor(Math.random() * 100),
  })),
});

// --- 2. Rate Limiting ---

const apiQueue = new Queue('api-calls', { connection });

const apiWorker = new Worker('api-calls', async (job: Job) => {
  console.log(`API call: ${job.data.endpoint}`);
  await setTimeout(100);
  return { status: 200 };
}, {
  connection,
  concurrency: 10,
  limiter: { max: 50, duration: 60000 }, // 50 per minute
});

for (let i = 0; i < 10; i++) {
  await apiQueue.add('call', { endpoint: `/api/resource/${i}` });
}

// --- 3. Deduplication ---

const analyticsQueue = new Queue('analytics', { connection });

const analyticsWorker = new Worker('analytics', async (job: Job) => {
  console.log(`Analytics event: ${job.data.event} (user: ${job.data.userId})`);
  return { processed: true };
}, { connection, concurrency: 5 });

// Only the first one will be processed - rest are deduplicated
for (let i = 0; i < 5; i++) {
  await analyticsQueue.add('page-view', {
    event: 'page_view',
    userId: 'USER-123',
    page: '/home',
  }, {
    deduplication: { id: 'pv-home-123', mode: 'simple' },
  });
}
console.log('Added 5 jobs with same dedup ID - only 1 will process');

// --- 4. Dead Letter Queue ---

const flakyQueue = new Queue('flaky', { connection });
const dlq = new Queue('dead-letter', { connection });

const flakyWorker = new Worker('flaky', async (job: Job) => {
  throw new Error(`Intentional failure on attempt ${job.attemptsMade + 1}`);
}, {
  connection,
  concurrency: 3,
  deadLetterQueue: { name: 'dead-letter' },
});

const dlqWorker = new Worker('dead-letter', async (job: Job) => {
  console.log(`DLQ: investigating failed job - ${job.data.reason || 'unknown'}`);
  return { investigated: true };
}, { connection, concurrency: 1 });

await flakyQueue.add('will-fail', { reason: 'testing DLQ' }, { attempts: 2 });

// --- 5. Scheduler (cron) ---
// Schedulers are managed via Queue - no separate Scheduler import needed

await reportQueue.upsertJobScheduler('daily-report', {
  pattern: '0 9 * * *', // 9 AM daily
}, {
  name: 'scheduled-report',
  data: { type: 'daily-summary' },
});
console.log('Scheduler: daily report at 9 AM registered');

await setTimeout(5000);

// --- Shutdown ---

console.log('Shutting down...');
await Promise.all([
  reportWorker.close(), apiWorker.close(), analyticsWorker.close(),
  flakyWorker.close(), dlqWorker.close(),
  reportQueue.close(), apiQueue.close(), analyticsQueue.close(),
  flakyQueue.close(), dlq.close(),
]);
process.exit(0);
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/core-advanced)

---

## Email Service

Simulates an email delivery service built on glide-mq, demonstrating production-grade patterns for reliable message processing: dead-letter queue (DLQ) for permanently failed emails, retry with exponential backoff, job priority for transactional vs. marketing emails, rate limiting at 10 emails/sec, progress tracking through validation/render/send stages, real-time monitoring via `QueueEvents`, and graceful shutdown.

```typescript
import { Queue, Worker, QueueEvents } from 'glide-mq';
import type { Job } from 'glide-mq';

// ---------------------------------------------------------------------------
// Connection
// ---------------------------------------------------------------------------

const connection = {
  addresses: [{ host: 'localhost', port: 6379 }],
  clusterMode: false,
};

// ---------------------------------------------------------------------------
// 1. Queue with Dead-Letter Queue (DLQ)
// ---------------------------------------------------------------------------
// When a job exhausts all retry attempts it is automatically moved to the DLQ
// instead of being silently discarded.

const emailQueue = new Queue('emails', {
  connection,
  deadLetterQueue: { name: 'email-dlq' },
});

const emailDlq = new Queue('email-dlq', { connection });

// ---------------------------------------------------------------------------
// 2. Simulated email sender
// ---------------------------------------------------------------------------
// Mimics network latency and random transient failures so we can exercise
// the retry and DLQ paths without a real SMTP server.

interface EmailPayload {
  to: string;
  subject: string;
  body: string;
  type: 'transactional' | 'marketing';
}

async function simulateSend(email: EmailPayload): Promise<void> {
  // Simulate network latency (100-500 ms)
  const latency = 100 + Math.random() * 400;
  await new Promise((r) => setTimeout(r, latency));

  // ~30 % chance of a transient failure
  if (Math.random() < 0.3) {
    throw new Error(`SMTP timeout sending to ${email.to}`);
  }
}

// ---------------------------------------------------------------------------
// 3. Email Worker -- processes the "emails" queue
// ---------------------------------------------------------------------------
// - Rate-limited to 10 emails/sec via the limiter option.
// - Each job goes through validation -> render -> send stages and reports
//   progress along the way.

const emailWorker = new Worker(
  'emails',
  async (job: Job<EmailPayload>) => {
    const { to, subject, type } = job.data;
    console.log(`[worker] Processing ${type} email to ${to} — "${subject}" (attempt ${job.attemptsMade + 1})`);

    // Stage 1 — Validate recipient
    await job.updateProgress(10);
    await job.log('Validating recipient address');
    await new Promise((r) => setTimeout(r, 50));

    // Stage 2 — Render template
    await job.updateProgress(40);
    await job.log(`Rendering ${type} template`);
    await new Promise((r) => setTimeout(r, 100));

    // Stage 3 — Send via (simulated) SMTP
    await job.updateProgress(70);
    await job.log('Sending via SMTP gateway');
    await simulateSend(job.data);

    // Done
    await job.updateProgress(100);
    await job.log('Delivery confirmed');

    return { delivered: true, to, timestamp: new Date().toISOString() };
  },
  {
    connection,
    concurrency: 5,
    // Rate limit: at most 10 jobs per 1 000 ms
    limiter: { max: 10, duration: 1000 },
  },
);

// ---------------------------------------------------------------------------
// 4. DLQ Worker -- handles permanently failed emails
// ---------------------------------------------------------------------------

const dlqWorker = new Worker(
  'email-dlq',
  async (job: Job) => {
    console.log(
      `[dlq] Permanently failed email — id: ${job.id}, to: ${job.data?.to ?? 'unknown'}, ` +
      `subject: "${job.data?.subject ?? ''}"`,
    );
    await job.log('Logged to dead-letter store for manual review');
    return { logged: true };
  },
  { connection },
);

// ---------------------------------------------------------------------------
// 5. Worker events
// ---------------------------------------------------------------------------

emailWorker.on('completed', (job) =>
  console.log(`[worker] Job ${job.id} completed — delivered to ${job.data.to}`),
);

emailWorker.on('failed', (job, err) =>
  console.error(`[worker] Job ${job.id} failed (attempt ${job.attemptsMade}): ${err.message}`),
);

dlqWorker.on('completed', (job) =>
  console.log(`[dlq] Job ${job.id} processed`),
);

// ---------------------------------------------------------------------------
// 6. Real-time monitoring with QueueEvents
// ---------------------------------------------------------------------------

const emailEvents = new QueueEvents('emails', { connection });

emailEvents.on('added', ({ jobId }) =>
  console.log(`[events] Email job ${jobId} added to queue`),
);

emailEvents.on('completed', ({ jobId }) =>
  console.log(`[events] Email job ${jobId} delivered successfully`),
);

emailEvents.on('failed', ({ jobId, failedReason }) =>
  console.log(`[events] Email job ${jobId} failed — ${failedReason}`),
);

emailEvents.on('progress', ({ jobId, data }) =>
  console.log(`[events] Email job ${jobId} progress: ${data}%`),
);

// ---------------------------------------------------------------------------
// 7. Produce sample email jobs
// ---------------------------------------------------------------------------

// Transactional emails — high priority (10)
const transactionalEmails: { name: string; data: EmailPayload }[] = [
  {
    name: 'password-reset',
    data: { to: 'alice@example.com', subject: 'Reset your password', body: 'Click here to reset...', type: 'transactional' },
  },
  {
    name: 'order-receipt',
    data: { to: 'bob@example.com', subject: 'Your receipt for order #1042', body: 'Thank you for your purchase...', type: 'transactional' },
  },
  {
    name: 'account-verification',
    data: { to: 'carol@example.com', subject: 'Verify your email', body: 'Please confirm your address...', type: 'transactional' },
  },
];

for (const email of transactionalEmails) {
  await emailQueue.add(email.name, email.data, {
    priority: 10,
    attempts: 5,
    backoff: { type: 'exponential', delay: 2000 },
  });
}
console.log(`Queued ${transactionalEmails.length} transactional emails (priority 10)`);

// Marketing emails — low priority (0)
const marketingEmails: { name: string; data: EmailPayload }[] = [
  {
    name: 'weekly-newsletter',
    data: { to: 'dave@example.com', subject: 'This week in tech', body: 'Top stories...', type: 'marketing' },
  },
  {
    name: 'promo-offer',
    data: { to: 'eve@example.com', subject: '50% off — today only!', body: 'Limited time offer...', type: 'marketing' },
  },
  {
    name: 'weekly-newsletter',
    data: { to: 'frank@example.com', subject: 'This week in tech', body: 'Top stories...', type: 'marketing' },
  },
  {
    name: 'promo-offer',
    data: { to: 'grace@example.com', subject: 'Free trial extended', body: 'We extended your trial...', type: 'marketing' },
  },
  {
    name: 'weekly-newsletter',
    data: { to: 'hank@example.com', subject: 'This week in tech', body: 'Top stories...', type: 'marketing' },
  },
];

for (const email of marketingEmails) {
  await emailQueue.add(email.name, email.data, {
    priority: 0,
    attempts: 5,
    backoff: { type: 'exponential', delay: 2000 },
  });
}
console.log(`Queued ${marketingEmails.length} marketing emails (priority 0)`);

// ---------------------------------------------------------------------------
// 8. Graceful shutdown
// ---------------------------------------------------------------------------

console.log('Running... Press Ctrl+C to stop.');

process.on('SIGINT', async () => {
  console.log('\nShutting down...');
  await emailWorker.close();
  await dlqWorker.close();
  await emailEvents.close();
  await emailQueue.close();
  await emailDlq.close();
  console.log('All resources closed. Goodbye.');
  process.exit(0);
});
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/email-service)

---

## Webhook Delivery

Reliable webhook delivery system with automatic retries and failure handling. Features dead letter queue for permanently undeliverable webhooks, exponential backoff with jitter (8 attempts, 1s base delay, 500ms jitter), per-endpoint rate limiting via ordering keys, deduplication to prevent double-delivery (1-hour TTL), fan-out to multiple registered endpoints, and real-time delivery tracking.

```typescript
import { Queue, Worker, QueueEvents } from 'glide-mq';
import type { Job } from 'glide-mq';

const connection = {
  addresses: [{ host: 'localhost', port: 6379 }],
  clusterMode: false,
};

// --- 1. Webhook Queue with Dead Letter Queue ---

const webhookQueue = new Queue('webhooks', {
  connection,
  deadLetterQueue: { name: 'webhook-dlq' },
});

// --- 2. Simulated HTTP POST ---

// Simulates sending an HTTP POST to a webhook endpoint.
// Randomly fails ~30% of the time to exercise retry/backoff logic.
async function simulateHttpPost(url: string, payload: unknown): Promise<{ status: number }> {
  const latency = 50 + Math.random() * 200;
  await new Promise((resolve) => setTimeout(resolve, latency));

  if (Math.random() < 0.3) {
    const code = Math.random() < 0.5 ? 500 : 503;
    throw new Error(`HTTP ${code} from ${url}`);
  }

  return { status: 200 };
}

// --- 3. Webhook Delivery Worker ---

const worker = new Worker('webhooks', async (job: Job) => {
  const { endpoint, event, payload, webhookId } = job.data;

  console.log(`[deliver] ${job.id} | ${event} -> ${endpoint} (attempt ${job.attemptsMade + 1}/8)`);

  const response = await simulateHttpPost(endpoint, {
    id: webhookId,
    type: event,
    data: payload,
    timestamp: new Date().toISOString(),
  });

  console.log(`[deliver] ${job.id} | ${event} -> ${endpoint} | HTTP ${response.status}`);

  return { status: response.status, deliveredAt: new Date().toISOString() };
}, {
  connection,
  concurrency: 10,
});

worker.on('completed', (job) => {
  console.log(`[ok]     ${job.id} | delivered successfully`);
});

worker.on('failed', (job, err) => {
  const remaining = 8 - (job.attemptsMade ?? 0);
  if (remaining > 0) {
    console.warn(`[retry]  ${job.id} | ${err.message} | ${remaining} attempts left`);
  } else {
    console.error(`[dead]   ${job.id} | exhausted all attempts, moving to DLQ`);
  }
});

// --- 4. Dead Letter Queue Worker ---

const dlqWorker = new Worker('webhook-dlq', async (job: Job) => {
  console.error(`[dlq] Permanently undeliverable webhook:`);
  console.error(`  Job ID:   ${job.id}`);
  console.error(`  Event:    ${job.data.event}`);
  console.error(`  Endpoint: ${job.data.endpoint}`);
  console.error(`  Payload:  ${JSON.stringify(job.data.payload)}`);
  // In production: persist to a database, alert on-call, or enqueue for manual review.
}, { connection });

// --- 5. Real-time Delivery Tracking ---

const events = new QueueEvents('webhooks', { connection });

events.on('added', ({ jobId }) => {
  console.log(`[event]  ${jobId} | queued for delivery`);
});

events.on('completed', ({ jobId, returnvalue }) => {
  console.log(`[event]  ${jobId} | delivery confirmed`);
});

events.on('failed', ({ jobId, failedReason }) => {
  console.log(`[event]  ${jobId} | delivery attempt failed: ${failedReason}`);
});

// --- 6. Enqueue Example Webhook Events ---

// Webhook endpoint registry (simulated)
const endpoints = [
  'https://partner-a.example.com/webhooks',
  'https://partner-b.example.com/hooks/receive',
  'https://internal.example.com/events',
];

// Example event payloads
const webhookEvents = [
  {
    event: 'order.created',
    payload: {
      orderId: 'ord_8f3k29d',
      customer: { id: 'cust_12x', email: 'alice@example.com' },
      items: [
        { sku: 'WIDGET-01', quantity: 2, unitPrice: 29.99 },
        { sku: 'GADGET-05', quantity: 1, unitPrice: 49.95 },
      ],
      total: 109.93,
      currency: 'USD',
    },
  },
  {
    event: 'payment.completed',
    payload: {
      paymentId: 'pay_a7m42nq',
      orderId: 'ord_8f3k29d',
      amount: 109.93,
      currency: 'USD',
      method: 'card',
      last4: '4242',
    },
  },
  {
    event: 'user.registered',
    payload: {
      userId: 'usr_9xp31w',
      email: 'bob@example.com',
      plan: 'pro',
      registeredAt: '2026-03-06T10:30:00Z',
    },
  },
];

// Fan out each event to every registered endpoint
for (const { event, payload } of webhookEvents) {
  for (const endpoint of endpoints) {
    const eventId = `${event}-${payload[Object.keys(payload)[0] as keyof typeof payload]}-${endpoint}`;

    await webhookQueue.add(event, {
      endpoint,
      event,
      payload,
      webhookId: crypto.randomUUID(),
    }, {
      // Exponential backoff with jitter for transient failures
      attempts: 8,
      backoff: { type: 'exponential', delay: 1000, jitter: 500 },

      // Rate limit per endpoint: max 5 deliveries per 10 seconds
      ordering: {
        key: endpoint,
        rateLimit: { max: 5, duration: 10000 },
      },

      // Prevent double-delivery of the same event to the same endpoint (1-hour TTL)
      deduplication: {
        id: eventId,
        ttl: 3600000,
      },
    });
  }
}

console.log(`Enqueued ${webhookEvents.length * endpoints.length} webhook deliveries across ${endpoints.length} endpoints.`);

// --- 7. Graceful Shutdown ---

console.log('Running... Press Ctrl+C to stop.');

process.on('SIGINT', async () => {
  console.log('\nShutting down...');
  await worker.close();
  await dlqWorker.close();
  await events.close();
  await webhookQueue.close();
  process.exit(0);
});
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/webhook-delivery)

---

## Image Pipeline

Demonstrates an image processing pipeline using glide-mq's `FlowProducer` for parent-child job dependencies with per-step progress tracking. Features FlowProducer for atomic multi-step pipelines, pipeline stages (validate, resize, optimize, upload), multiple variants processed in parallel, progress tracking with `job.updateProgress()`, concurrency control, and `getChildrenValues()` to collect results.

```typescript
import { Queue, FlowProducer, Worker, QueueEvents } from 'glide-mq';
import type { Job, FlowJob } from 'glide-mq';

const connection = {
  addresses: [{ host: 'localhost', port: 6379 }],
  clusterMode: false,
};

// --- Types ---

interface ImageJobData {
  step: 'validate' | 'resize' | 'optimize' | 'upload';
  imageId: string;
  filename: string;
  /** Target variant for resize/optimize/upload steps */
  variant?: string;
  /** Width in pixels for the target variant */
  width?: number;
  /** Quality percentage for optimization */
  quality?: number;
}

interface StepResult {
  step: string;
  imageId: string;
  variant?: string;
  url?: string;
  duration: number;
  metadata?: Record<string, unknown>;
}

// --- Simulated Processing ---

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function simulateValidation(job: Job<ImageJobData, StepResult>): Promise<StepResult> {
  const start = Date.now();

  await job.updateProgress({ step: 'validate', percent: 0 });
  await job.log(`Validating image: ${job.data.filename}`);

  // Simulate reading file headers and checking format
  await sleep(200);
  await job.updateProgress({ step: 'validate', percent: 50 });

  // Simulate dimension and file-size checks
  await sleep(150);
  await job.updateProgress({ step: 'validate', percent: 100 });
  await job.log('Validation passed: JPEG, 4032x3024, 8.2 MB');

  return {
    step: 'validate',
    imageId: job.data.imageId,
    duration: Date.now() - start,
    metadata: {
      format: 'jpeg',
      width: 4032,
      height: 3024,
      sizeBytes: 8_600_000,
    },
  };
}

async function simulateResize(job: Job<ImageJobData, StepResult>): Promise<StepResult> {
  const start = Date.now();
  const { variant, width } = job.data;

  await job.updateProgress({ step: 'resize', variant, percent: 0 });
  await job.log(`Resizing to ${variant} (${width}px wide)`);

  // Simulate progressive resize work
  for (let pct = 25; pct <= 100; pct += 25) {
    await sleep(300);
    await job.updateProgress({ step: 'resize', variant, percent: pct });
  }

  await job.log(`Resize complete: ${variant} -> ${width}x${Math.round(width! * 0.75)}px`);

  return {
    step: 'resize',
    imageId: job.data.imageId,
    variant,
    duration: Date.now() - start,
    metadata: { width, height: Math.round(width! * 0.75) },
  };
}

async function simulateOptimize(job: Job<ImageJobData, StepResult>): Promise<StepResult> {
  const start = Date.now();
  const { variant, quality } = job.data;

  await job.updateProgress({ step: 'optimize', variant, percent: 0 });
  await job.log(`Optimizing ${variant} at quality=${quality}%`);

  // Simulate compression passes
  await sleep(400);
  await job.updateProgress({ step: 'optimize', variant, percent: 50 });
  await sleep(350);
  await job.updateProgress({ step: 'optimize', variant, percent: 100 });

  const savedPct = 100 - quality!;
  await job.log(`Optimization complete: ~${savedPct}% size reduction`);

  return {
    step: 'optimize',
    imageId: job.data.imageId,
    variant,
    duration: Date.now() - start,
    metadata: { quality, compressionRatio: (100 - savedPct) / 100 },
  };
}

async function simulateUpload(job: Job<ImageJobData, StepResult>): Promise<StepResult> {
  const start = Date.now();
  const { variant, imageId } = job.data;

  await job.updateProgress({ step: 'upload', variant, percent: 0 });
  await job.log(`Uploading ${variant} to CDN`);

  // Simulate chunked upload
  for (let pct = 20; pct <= 100; pct += 20) {
    await sleep(200);
    await job.updateProgress({ step: 'upload', variant, percent: pct });
  }

  const url = `https://cdn.example.com/images/${imageId}/${variant}.jpg`;
  await job.log(`Upload complete: ${url}`);

  return {
    step: 'upload',
    imageId,
    variant,
    url,
    duration: Date.now() - start,
  };
}

// --- Worker ---

const worker = new Worker<ImageJobData, StepResult>(
  'image-processing',
  async (job: Job<ImageJobData, StepResult>) => {
    console.log(`[worker] Processing step="${job.data.step}" variant=${job.data.variant ?? 'n/a'} (job ${job.id})`);

    switch (job.data.step) {
      case 'validate':
        return simulateValidation(job);
      case 'resize':
        return simulateResize(job);
      case 'optimize':
        return simulateOptimize(job);
      case 'upload':
        return simulateUpload(job);
      default:
        throw new Error(`Unknown step: ${job.data.step}`);
    }
  },
  { connection, concurrency: 2 },
);

worker.on('completed', (job) => {
  console.log(`[worker] Completed job ${job.id} (step=${job.data.step}, variant=${job.data.variant ?? 'n/a'})`);
});

worker.on('failed', (job, err) => {
  console.error(`[worker] Failed job ${job.id}:`, err.message);
});

// --- QueueEvents for Pipeline Monitoring ---

const events = new QueueEvents('image-processing', { connection });

events.on('progress', ({ jobId, data }: { jobId: string; data: any }) => {
  const pct = data?.percent ?? 0;
  const step = data?.step ?? '?';
  const variant = data?.variant ? ` [${data.variant}]` : '';
  console.log(`[events] Job ${jobId} progress: ${step}${variant} ${pct}%`);
});

events.on('completed', ({ jobId }) => {
  console.log(`[events] Job ${jobId} completed`);
});

// --- Build & Submit the Pipeline ---

const QUEUE_NAME = 'image-processing';

const variants = [
  { name: 'thumbnail', width: 150, quality: 60 },
  { name: 'small', width: 480, quality: 75 },
  { name: 'medium', width: 1024, quality: 80 },
  { name: 'large', width: 1920, quality: 85 },
];

function buildPipeline(imageId: string, filename: string): FlowJob {
  const variantChildren: FlowJob[] = variants.map((v) => ({
    name: 'upload',
    queueName: QUEUE_NAME,
    data: {
      step: 'upload' as const,
      imageId,
      filename,
      variant: v.name,
    },
    children: [
      {
        name: 'optimize',
        queueName: QUEUE_NAME,
        data: {
          step: 'optimize' as const,
          imageId,
          filename,
          variant: v.name,
          quality: v.quality,
        },
        children: [
          {
            name: 'resize',
            queueName: QUEUE_NAME,
            data: {
              step: 'resize' as const,
              imageId,
              filename,
              variant: v.name,
              width: v.width,
            },
            children: [
              {
                name: 'validate',
                queueName: QUEUE_NAME,
                data: {
                  step: 'validate' as const,
                  imageId,
                  filename,
                },
              },
            ],
          },
        ],
      },
    ],
  }));

  return {
    name: 'process-image',
    queueName: QUEUE_NAME,
    data: { step: 'validate' as const, imageId, filename },
    children: variantChildren,
  };
}

// --- Main ---

const flowProducer = new FlowProducer({ connection });
const queue = new Queue(QUEUE_NAME, { connection });

const imageId = `img_${Date.now()}`;
const filename = 'photo-beach-sunset.jpg';

console.log(`Submitting image pipeline: ${filename} (${imageId})`);
console.log(`Variants: ${variants.map((v) => v.name).join(', ')}`);
console.log();

const tree = await flowProducer.add(buildPipeline(imageId, filename));

console.log(`Pipeline submitted. Parent job ID: ${tree.job.id}`);
console.log(`Child jobs: ${tree.children?.length ?? 0}`);
console.log();

// Wait for the parent job to complete, then collect children results
const parentState = await tree.job.waitUntilFinished(500, 120_000);
console.log();
console.log(`Parent job finished with state: ${parentState}`);

if (parentState === 'completed') {
  const childrenValues = await tree.job.getChildrenValues();
  console.log();
  console.log('--- Pipeline Results ---');

  const urls: Record<string, string> = {};
  for (const [key, result] of Object.entries(childrenValues)) {
    const r = result as StepResult;
    if (r.url) {
      urls[r.variant!] = r.url;
    }
  }

  if (Object.keys(urls).length > 0) {
    console.log('Generated URLs:');
    for (const [variant, url] of Object.entries(urls)) {
      console.log(`  ${variant}: ${url}`);
    }
  } else {
    console.log('Children values:', JSON.stringify(childrenValues, null, 2));
  }
}

// --- Graceful Shutdown ---

console.log();
console.log('Pipeline complete. Press Ctrl+C to exit.');

process.on('SIGINT', async () => {
  console.log('Shutting down...');
  await worker.close();
  await events.close();
  await flowProducer.close();
  await queue.close();
  process.exit(0);
});
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/image-pipeline)

---

## Stall Detection

Demonstrates how glide-mq detects and recovers stalled (hung) jobs for both stream-sourced and list-sourced (LIFO/priority) workers. Stream jobs are detected via XAUTOCLAIM (pending entry age). List-sourced jobs (new in v0.11) are detected via bounded SCAN over active jobs with stale `lastActive` timestamps. Both paths use the same `stalledCount` / `maxStalledCount` logic and emit `stalled` and `failed` events through `QueueEvents`.

```typescript
import { Queue, Worker, QueueEvents, gracefulShutdown } from 'glide-mq';
import type { Job } from 'glide-mq';
import { setTimeout as sleep } from 'timers/promises';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

const STALLED_INTERVAL = 2000; // Check for stalled jobs every 2s
const MAX_STALLED_COUNT = 1;   // Fail after 1 stall detection cycle
const LOCK_DURATION = 2000;    // Heartbeat window - short so stalls are detected fast

// --- Setup ---

const queue = new Queue('stall-demo', { connection });
const events = new QueueEvents('stall-demo', { connection });

// Track events for the demo
const stalledJobs: string[] = [];
const failedJobs: string[] = [];
const completedJobs: string[] = [];

events.on('stalled', ({ jobId }) => {
  console.log(`  [event] STALLED - job ${jobId} detected as hung`);
  stalledJobs.push(jobId);
});

events.on('failed', ({ jobId, failedReason }) => {
  console.log(`  [event] FAILED  - job ${jobId}: ${failedReason}`);
  failedJobs.push(jobId);
});

events.on('completed', ({ jobId }) => {
  console.log(`  [event] DONE    - job ${jobId} completed successfully`);
  completedJobs.push(jobId);
});

// --- Part 1: Stream-sourced job (default FIFO) ---

console.log('=== Part 1: Stream job stall detection (XAUTOCLAIM) ===\n');

// Worker 1 simulates a crash: it picks up the job but never resolves the promise.
const hungWorker1 = new Worker('stall-demo', async (_job: Job) => {
  console.log(`  [hung-worker] Picked up stream job ${_job.id} - hanging forever...`);
  return new Promise<void>(() => {});
}, {
  connection,
  concurrency: 1,
  stalledInterval: STALLED_INTERVAL,
  maxStalledCount: MAX_STALLED_COUNT,
  lockDuration: LOCK_DURATION,
});
hungWorker1.on('error', () => {});

await sleep(500);

const streamJob = await queue.add('stream-task', {
  type: 'stream',
  payload: 'This job will be picked up and hung',
});
console.log(`  Added stream job: ${streamJob.id}`);

await sleep(1000);

await hungWorker1.close(true);
console.log('  Hung worker closed (simulating crash).\n');

console.log('  Starting healthy worker - waiting for stall detection...\n');

let streamRecovered = false;
const healthyWorker1 = new Worker('stall-demo', async (job: Job) => {
  console.log(`  [healthy-worker] Processing reclaimed stream job ${job.id}`);
  streamRecovered = true;
  return { recovered: true };
}, {
  connection,
  concurrency: 1,
  stalledInterval: STALLED_INTERVAL,
  maxStalledCount: MAX_STALLED_COUNT,
  lockDuration: LOCK_DURATION,
});
healthyWorker1.on('error', () => {});

await sleep(STALLED_INTERVAL * 3 + 1000);
await healthyWorker1.close();

if (streamRecovered) {
  console.log('\n  Stream job was reclaimed and processed successfully.');
} else {
  console.log('\n  Stream job was moved to failed after exceeding maxStalledCount.');
}

// --- Part 2: List-sourced job (LIFO) - new in v0.11 ---

console.log('\n=== Part 2: LIFO job stall detection (bounded SCAN - new in v0.11) ===\n');

const hungWorker2 = new Worker('stall-demo', async (_job: Job) => {
  console.log(`  [hung-worker] Picked up LIFO job ${_job.id} - hanging forever...`);
  return new Promise<void>(() => {});
}, {
  connection,
  concurrency: 1,
  stalledInterval: STALLED_INTERVAL,
  maxStalledCount: MAX_STALLED_COUNT,
  lockDuration: LOCK_DURATION,
});
hungWorker2.on('error', () => {});

await sleep(500);

const lifoJob = await queue.add('lifo-task', {
  type: 'lifo',
  payload: 'This LIFO job will be picked up and hung',
}, { lifo: true });
console.log(`  Added LIFO job: ${lifoJob.id} (lifo: true)`);

await sleep(1000);

await hungWorker2.close(true);
console.log('  Hung worker closed (simulating crash).\n');

console.log('  Starting healthy worker - waiting for stall detection...\n');

let lifoRecovered = false;
const healthyWorker2 = new Worker('stall-demo', async (job: Job) => {
  console.log(`  [healthy-worker] Processing reclaimed LIFO job ${job.id}`);
  lifoRecovered = true;
  return { recovered: true };
}, {
  connection,
  concurrency: 1,
  stalledInterval: STALLED_INTERVAL,
  maxStalledCount: MAX_STALLED_COUNT,
  lockDuration: LOCK_DURATION,
});
healthyWorker2.on('error', () => {});

await sleep(STALLED_INTERVAL * 3 + 1000);
await healthyWorker2.close();

if (lifoRecovered) {
  console.log('\n  LIFO job was reclaimed and processed successfully.');
} else {
  console.log('\n  LIFO job was moved to failed after exceeding maxStalledCount.');
}

// --- Summary ---

console.log('\n=== Summary ===\n');
console.log(`  Stalled events received: ${stalledJobs.length} (${stalledJobs.join(', ') || 'none'})`);
console.log(`  Failed events received:  ${failedJobs.length} (${failedJobs.join(', ') || 'none'})`);
console.log(`  Completed events:        ${completedJobs.length} (${completedJobs.join(', ') || 'none'})`);
console.log();
console.log('  Key takeaways:');
console.log('  - Stream jobs: stall detected via XAUTOCLAIM (pending entry age)');
console.log('  - List jobs:   stall detected via bounded SCAN (lastActive timestamp)');
console.log('  - Both paths use the same stalledCount / maxStalledCount logic');
console.log('  - Both emit "stalled" and "failed" events through QueueEvents');

// --- Cleanup ---

await events.close();
await queue.close();
console.log('\nDone.');
process.exit(0);
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/stall-detection)
