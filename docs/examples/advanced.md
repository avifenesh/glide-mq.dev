---
title: Advanced Patterns
description: glide-mq advanced examples -- high-throughput tuning, batch processing, LIFO mode, custom job IDs, serializers, exclude-data, request-reply, OpenTelemetry tracing, and testing.
---

# Advanced Patterns

High-throughput tuning, batch processing, LIFO mode, custom serializers, and more.

## High Throughput

Skip server-side event publishing and metrics recording to reduce Redis calls in the worker hot path. Set `events: false` and `metrics: false` on Worker options when you are not consuming server-side events via `QueueEvents` or calling `queue.getMetrics()`. The TypeScript-side `EventEmitter` (`worker.on('completed', ...)`) still works normally.

```typescript
import { Queue, Worker } from 'glide-mq';
import type { Job } from 'glide-mq';

const connection = {
  addresses: [{ host: 'localhost', port: 6379 }],
  clusterMode: false,
};

const JOBS_PER_RUN = 500;

function makeJobs(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    name: 'work',
    data: { index: i },
  }));
}

async function runBenchmark(
  queueName: string,
  workerOpts: { events?: boolean; metrics?: boolean },
  label: string,
): Promise<number> {
  const queue = new Queue(queueName, { connection });
  let completed = 0;

  const ms = await new Promise<number>((resolve) => {
    const start = performance.now();
    const worker = new Worker(
      queueName,
      async (_job: Job) => {
        // Minimal work
      },
      { connection, concurrency: 10, ...workerOpts },
    );
    worker.on('error', () => {});
    worker.on('completed', () => {
      completed++;
      if (completed >= JOBS_PER_RUN) {
        const elapsed = performance.now() - start;
        worker.close().then(() => resolve(elapsed));
      }
    });

    // Add jobs after worker is created and listening for events
    queue.addBulk(makeJobs(JOBS_PER_RUN));
  });

  console.log(
    `[${label}] ${JOBS_PER_RUN} jobs in ${ms.toFixed(0)} ms ` +
      `(${((JOBS_PER_RUN / ms) * 1000).toFixed(0)} jobs/s)`,
  );
  await queue.close();
  return ms;
}

// ---------------------------------------------------------------------------
// Run benchmarks
// ---------------------------------------------------------------------------

console.log('=== High-Throughput Worker: events/metrics opt-out ===\n');

/**
 * events: false  - skips XADD to the event stream per completion (~1 redis call saved)
 * metrics: false - skips HINCRBY to the metrics hash per completion (~1 redis call saved)
 *
 * Safe when you don't consume server-side events via QueueEvents or getMetrics().
 * The TS-side EventEmitter (worker.on('completed', ...)) still works normally.
 */
const fastMs = await runBenchmark(
  `ht-fast-${Date.now()}`,
  { events: false, metrics: false },
  'events:OFF  metrics:OFF ',
);

const baseMs = await runBenchmark(
  `ht-base-${Date.now()}`,
  {},
  'events:ON   metrics:ON  ',
);

// Summary
const speedup = ((baseMs - fastMs) / baseMs) * 100;
console.log(
  `\nResult: disabling events+metrics was ${speedup > 0 ? 'faster' : 'slower'} ` +
    `by ${Math.abs(speedup).toFixed(1)}%`,
);

console.log('\nDone.');
process.exit(0);
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/high-throughput)

---

## Batch Processing

Process multiple jobs at once with a single processor invocation -- ideal for bulk DB inserts, batch API calls, and high-throughput event ingestion. The processor receives a `Job[]` array and must return a result array of the same length.

```typescript
import { Queue, Worker } from 'glide-mq';
import type { Job, BatchProcessor } from 'glide-mq';
import { setTimeout } from 'timers/promises';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

// --- 1. Basic batch worker ---
// BatchProcessor receives a Job[] and must return a result array of the same length.

const analyticsQueue = new Queue('analytics', { connection });

const analyticsBatch: BatchProcessor = async (jobs: Job[]) => {
  console.log(`[analytics] Processing batch of ${jobs.length} events`);

  // Simulate a bulk DB insert - one round trip for the whole batch
  const rows = jobs.map((j) => ({ event: j.data.event, userId: j.data.userId }));
  await setTimeout(20); // simulated DB write
  console.log(`[analytics] Inserted ${rows.length} rows`);

  // Return one result per job (same order as input)
  return jobs.map((j) => ({ stored: true, event: j.data.event }));
};

const analyticsWorker = new Worker('analytics', analyticsBatch, {
  connection,
  concurrency: 1,
  batch: {
    size: 10,      // collect up to 10 jobs before processing
    timeout: 100,  // or flush after 100 ms if fewer than 10 are available
  },
});

analyticsWorker.on('completed', (job) => console.log(`[analytics] Job ${job.id} completed`));
analyticsWorker.on('error', (err) => console.error('[analytics] Worker error:', err));

// --- 2. Batch worker for push notifications ---

const notificationsQueue = new Queue('notifications', { connection });

const notificationsBatch: BatchProcessor = async (jobs: Job[]) => {
  console.log(`[notifications] Sending batch of ${jobs.length} notifications`);

  jobs.forEach((j) => console.log(`  → ${j.data.to}: ${j.data.message}`));
  return jobs.map((j) => ({ sent: true, to: j.data.to }));
};

const notificationsWorker = new Worker('notifications', notificationsBatch, {
  connection,
  concurrency: 2,
  batch: { size: 5, timeout: 100 },
});

notificationsWorker.on('completed', (job) => console.log(`[notifications] Job ${job.id} sent`));
notificationsWorker.on('error', (err) => console.error('[notifications] Worker error:', err));

// --- Produce jobs ---

console.log('Adding 25 analytics events...');
for (let i = 0; i < 25; i++) {
  await analyticsQueue.add('track', {
    event: `page_view_${i}`,
    userId: `user-${Math.floor(i / 5)}`,
  });
}

console.log('Adding 8 notification jobs...');
for (let i = 0; i < 8; i++) {
  await notificationsQueue.add('send', { to: `user${i}@example.com`, message: `Hello ${i}!` });
}

console.log('\nProcessing... (batches of 10 / 5)\n');
await setTimeout(3000);

const [aCounts, nCounts] = await Promise.all([
  analyticsQueue.getJobCounts(),
  notificationsQueue.getJobCounts(),
]);

console.log('Analytics queue:', aCounts);
console.log('Notifications queue:', nCounts);

// --- Shutdown ---
console.log('\nShutting down...');
await Promise.all([
  analyticsWorker.close(),
  notificationsWorker.close(),
  analyticsQueue.close(),
  notificationsQueue.close(),
]);
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/batch-processing)

---

## LIFO Mode

Demonstrates `lifo: true` option for last-in-first-out job processing. LIFO processes the newest jobs first -- useful for cache invalidation (latest wins), real-time dashboards, and undo stacks. Priority ordering is preserved: priority > LIFO > FIFO.

```typescript
import { Queue, Worker } from 'glide-mq';
import type { Job } from 'glide-mq';
import { setTimeout } from 'timers/promises';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

// LIFO (Last-In-First-Out) processes the NEWEST jobs first.
// Use cases: cache invalidation (latest wins), real-time dashboards,
// undo stacks, any scenario where recent data is more valuable.
//
// Priority ordering is preserved: priority > LIFO > FIFO.
// LIFO cannot be combined with ordering keys.

// --- 1. Basic LIFO queue ---

const queue = new Queue('lifo-demo', { connection });

// Add 10 jobs - with LIFO, job 10 will be processed first
console.log('Adding 10 LIFO jobs (newest processed first)...\n');
for (let i = 1; i <= 10; i++) {
  await queue.add(`task-${i}`, { index: i, createdAt: Date.now() }, { lifo: true });
}

const processOrder: number[] = [];

const worker = new Worker('lifo-demo', async (job: Job) => {
  processOrder.push(job.data.index);
  console.log(`[worker] Processing task-${job.data.index} (LIFO order)`);
  await setTimeout(30);
  return { index: job.data.index };
}, { connection, concurrency: 1 }); // concurrency 1 to show ordering clearly

worker.on('error', () => {});

await setTimeout(2000);
console.log(`\nProcessing order: [${processOrder.join(', ')}]`);
console.log('Expected: newest first (10, 9, 8, ... 1)\n');

await worker.close();

// --- 2. Priority takes precedence over LIFO ---

console.log('--- Priority > LIFO ---\n');

// Add LIFO jobs with mixed priorities
await queue.add('normal-1', { label: 'normal-1' }, { lifo: true });
await queue.add('normal-2', { label: 'normal-2' }, { lifo: true });
await queue.add('urgent',   { label: 'urgent' },   { lifo: true, priority: 1 });
await queue.add('normal-3', { label: 'normal-3' }, { lifo: true });

const priorityOrder: string[] = [];

const priorityWorker = new Worker('lifo-demo', async (job: Job) => {
  priorityOrder.push(job.data.label);
  console.log(`[worker] ${job.data.label} (priority: ${job.opts.priority ?? 'none'})`);
  await setTimeout(30);
  return { label: job.data.label };
}, { connection, concurrency: 1 });

priorityWorker.on('error', () => {});

await setTimeout(1500);
console.log(`\nPriority order: [${priorityOrder.join(', ')}]`);
console.log('Expected: urgent first (priority=1), then LIFO for the rest\n');

await priorityWorker.close();

// --- 3. LIFO vs FIFO comparison ---

console.log('--- LIFO vs FIFO side by side ---\n');

const fifoQueue = new Queue('fifo-compare', { connection });
const lifoQueue = new Queue('lifo-compare', { connection });

const fifoOrder: number[] = [];
const lifoOrder: number[] = [];

// Add same jobs to both queues
for (let i = 1; i <= 5; i++) {
  await fifoQueue.add(`item-${i}`, { index: i }); // default FIFO
  await lifoQueue.add(`item-${i}`, { index: i }, { lifo: true }); // LIFO
}

const fifoWorker = new Worker('fifo-compare', async (job: Job) => {
  fifoOrder.push(job.data.index);
  return { index: job.data.index };
}, { connection, concurrency: 1 });

const lifoWorker = new Worker('lifo-compare', async (job: Job) => {
  lifoOrder.push(job.data.index);
  return { index: job.data.index };
}, { connection, concurrency: 1 });

fifoWorker.on('error', () => {});
lifoWorker.on('error', () => {});

await setTimeout(1500);

console.log(`FIFO order: [${fifoOrder.join(', ')}]  (oldest first)`);
console.log(`LIFO order: [${lifoOrder.join(', ')}]  (newest first)`);

// --- Shutdown ---
await Promise.all([
  fifoWorker.close(),
  lifoWorker.close(),
  queue.close(),
  fifoQueue.close(),
  lifoQueue.close(),
]);
console.log('\nDone.');
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/lifo-mode)

---

## Custom Job IDs

Idempotent job enqueuing with custom job IDs. Adding the same `jobId` a second time returns `null` without creating a new job -- safe to retry on network errors. Use meaningful IDs derived from your domain (e.g. `order-{orderId}`, `report-{userId}-{month}`).

```typescript
import { Queue, Worker } from 'glide-mq';
import type { Job } from 'glide-mq';
import { setTimeout } from 'timers/promises';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

const queue = new Queue('tasks', { connection });
const worker = new Worker('tasks', async (job: Job) => {
  console.log(`Processing job ${job.id}: ${job.name}`);
  return { done: true };
}, { connection, concurrency: 3 });

worker.on('error', (err) => console.error('Worker error:', err));

// --- 1. Custom job ID for idempotent enqueuing ---
// Adding the same jobId a second time returns null (deduplicated).

const job1 = await queue.add('send-report', { userId: 'u-123', month: '2026-02' }, {
  jobId: 'report-u-123-2026-02',
});
console.log('Added job:', job1?.id); // report-u-123-2026-02

const job2 = await queue.add('send-report', { userId: 'u-123', month: '2026-02' }, {
  jobId: 'report-u-123-2026-02', // same ID - deduplicated
});
console.log('Duplicate add result:', job2); // null

// --- 2. Lookup by known ID ---
// Poll until the job is processed rather than using a fixed delay.

let fetched = await queue.getJob('report-u-123-2026-02');
while (!fetched?.returnvalue) {
  await setTimeout(50);
  fetched = await queue.getJob('report-u-123-2026-02');
}
console.log('\nFetched by ID:', { id: fetched?.id, name: fetched?.name, returnvalue: fetched?.returnvalue });

// --- 3. Batch with custom IDs (e.g. order IDs from your DB) ---

const orders = ['ORD-001', 'ORD-002', 'ORD-003'];
const jobs = await queue.addBulk(
  orders.map((orderId) => ({
    name: 'process-order',
    data: { orderId },
    opts: { jobId: `order-${orderId}` },
  })),
);
console.log('\nBulk add with custom IDs:', jobs.map((j) => j?.id));

// Adding same orders again - all return null (idempotent)
const deduped = await queue.addBulk(
  orders.map((orderId) => ({
    name: 'process-order',
    data: { orderId },
    opts: { jobId: `order-${orderId}` },
  })),
);
console.log('Re-add duplicates:', deduped); // [null, null, null]

// Wait for order jobs to be processed before shutting down.
let counts = await queue.getJobCounts();
while ((counts.active ?? 0) > 0 || (counts.waiting ?? 0) > 0) {
  await setTimeout(50);
  counts = await queue.getJobCounts();
}

// --- Shutdown ---
await worker.close();
await queue.close();
console.log('\nDone.');
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/custom-job-ids)

---

## Pluggable Serializers

Custom serializers for job data encoding. The same `serializer` must be passed to both `Queue` and `Worker`. Implements the `Serializer` interface with `serialize(data): string` and `deserialize(raw): unknown`.

```typescript
import { Queue, Worker, JSON_SERIALIZER } from 'glide-mq';
import type { Job, Serializer } from 'glide-mq';
import { setTimeout } from 'timers/promises';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

// glide-mq supports pluggable serializers: any object with
//   serialize(data: unknown): string
//   deserialize(raw: string): unknown
// The SAME serializer must be used in both Queue and Worker.

// --- 1. Default (JSON) serializer - shown for comparison ---

const jsonQueue = new Queue('json-jobs', { connection });
const jsonWorker = new Worker('json-jobs', async (job: Job) => {
  return { echo: job.data, processed: true };
}, { connection, concurrency: 1 });

jsonWorker.on('error', (err) => console.error('[json] Worker error:', err));

// --- 2. Custom base64 serializer ---
// Useful for payloads that must survive environments that corrupt raw JSON
// (e.g. systems that escape quotes or truncate long strings).

const base64Serializer: Serializer = {
  serialize(data: unknown): string {
    return Buffer.from(JSON.stringify(data)).toString('base64');
  },
  deserialize(raw: string): unknown {
    return JSON.parse(Buffer.from(raw, 'base64').toString('utf8'));
  },
};

const b64Queue = new Queue('b64-jobs', { connection, serializer: base64Serializer });
const b64Worker = new Worker('b64-jobs', async (job: Job) => {
  // job.data is already deserialized - no manual decoding needed
  return { received: job.data, encoding: 'base64' };
}, { connection, concurrency: 1, serializer: base64Serializer });

b64Worker.on('error', (err) => console.error('[b64] Worker error:', err));

// --- 3. Compact number-array serializer ---
// Demonstrates a domain-specific serializer for tight binary-like encoding.
// Uses a 'NUM_ARR:' prefix to unambiguously distinguish the custom format from JSON.

const NUM_ARR_PREFIX = 'NUM_ARR:';

const numberArraySerializer: Serializer = {
  serialize(data: unknown): string {
    if (Array.isArray(data) && data.every((n) => typeof n === 'number')) {
      return NUM_ARR_PREFIX + (data as number[]).join(',');
    }
    // Fall back to JSON for non-number-array data
    return JSON.stringify(data);
  },
  deserialize(raw: string): unknown {
    if (raw.startsWith(NUM_ARR_PREFIX)) {
      const str = raw.slice(NUM_ARR_PREFIX.length);
      return str === '' ? [] : str.split(',').map(Number);
    }
    return JSON.parse(raw);
  },
};

const numQueue = new Queue('num-jobs', { connection, serializer: numberArraySerializer });
const numWorker = new Worker('num-jobs', async (job: Job) => {
  const nums = job.data as number[];
  const sum = nums.reduce((a, b) => a + b, 0);
  return { count: nums.length, sum, avg: sum / nums.length };
}, { connection, concurrency: 1, serializer: numberArraySerializer });

numWorker.on('error', (err) => console.error('[num] Worker error:', err));

// --- Enqueue jobs ---

const jsonJob = await jsonQueue.add('echo', { message: 'hello from JSON', nested: { ok: true } });
console.log('Added JSON job:', jsonJob?.id);

const b64Job = await b64Queue.add('encode', { secret: 'base64-encoded payload', value: 42 });
console.log('Added base64 job:', b64Job?.id);

const numJob = await numQueue.add('sum', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as unknown as Record<string, unknown>);
console.log('Added number-array job:', numJob?.id, '\n');

// Wait for processing
await setTimeout(500);

// Verify results
const [jsonDone, b64Done, numDone] = await Promise.all([
  jsonQueue.getJob(jsonJob?.id ?? ''),
  b64Queue.getJob(b64Job?.id ?? ''),
  numQueue.getJob(numJob?.id ?? ''),
]);

console.log('JSON result:', jsonDone?.returnvalue);
console.log('Base64 result:', b64Done?.returnvalue);
console.log('Number-array result:', numDone?.returnvalue);

// Serializer mismatch demo: reading a b64 job with the default serializer
// would produce garbled data - the serializer must match on both sides.
console.log('\n[NOTE] Serializer must match in Queue AND Worker. Mismatched serializers');
console.log('       set job.deserializationError=true instead of throwing.');

// Show that JSON_SERIALIZER is the same as the built-in default
const _check: Serializer = JSON_SERIALIZER;
void _check;

// --- Shutdown ---
await Promise.all([
  jsonWorker.close(),
  b64Worker.close(),
  numWorker.close(),
  jsonQueue.close(),
  b64Queue.close(),
  numQueue.close(),
]);
console.log('\nDone.');
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/pluggable-serializers)

---

## Exclude Data

List jobs without payloads using `excludeData` for lightweight status dashboards. When `excludeData: true` is passed, the `data` and `returnvalue` fields are omitted from returned job objects, significantly reducing memory and network usage for large payloads.

```typescript
import { Queue, Worker } from 'glide-mq';
import type { Job } from 'glide-mq';
import { setTimeout } from 'timers/promises';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

// excludeData: true omits the payload (data + returnvalue) when listing jobs.
// Useful for status dashboards where payloads can be large (MB+).

const queue = new Queue('uploads', { connection });

const worker = new Worker('uploads', async (job: Job) => {
  console.log(`Processing upload: ${job.data.filename}`);
  await setTimeout(50);
  return { stored: true, url: `https://cdn.example.com/${job.data.filename}` };
}, { connection, concurrency: 3 });

worker.on('error', (err) => console.error('Worker error:', err));

// Add jobs with large-ish payloads
for (let i = 0; i < 10; i++) {
  await queue.add('process', {
    filename: `video-${i}.mp4`,
    metadata: { size: 1024 * 1024 * (i + 1), codec: 'h264' },
    // imagine this is a large binary blob in production
    preview: 'x'.repeat(1000),
  });
}
console.log('Added 10 upload jobs');

// Wait for processing
await setTimeout(800);

// --- 1. Status dashboard: list completed jobs WITHOUT payloads ---
// Only gets id, name, state, timestamps - much smaller response.
const lightweight = await queue.getJobs('completed', 0, 99, { excludeData: true });
console.log(`\nCompleted jobs (excludeData: true) - ${lightweight.length} jobs:`);
lightweight.forEach((j) => {
  // data and returnvalue are omitted when excludeData is true
  console.log(`  ${j.id} | ${j.name} | data: ${j.data ?? '(excluded)'} | returnvalue: ${j.returnvalue ?? '(excluded)'}`);
});

// --- 2. Get full details for a single job by ID ---
if (lightweight.length > 0) {
  const jobId = lightweight[0].id;

  const fullJob = await queue.getJob(jobId);
  console.log(`\nFull job ${fullJob?.id}:`);
  console.log('  data.filename:', fullJob?.data?.filename);
  console.log('  returnvalue:', fullJob?.returnvalue);

  // --- 3. getJob with excludeData ---
  const lightJob = await queue.getJob(jobId, { excludeData: true });
  console.log(`\nSame job with excludeData: data keys=${Object.keys(lightJob?.data ?? {}).length}`);
}

// --- Shutdown ---
await worker.close();
await queue.close();
console.log('\nDone.');
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/exclude-data)

---

## Request Reply

Synchronous request-reply (RPC) over glide-mq using `addAndWait`. Enqueues a job and blocks until its result is available -- no polling required. The worker processes the job normally; the caller receives the return value directly.

```typescript
import { Queue, Worker } from 'glide-mq';
import type { Job } from 'glide-mq';
import { setTimeout } from 'timers/promises';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

// --- 1. Worker that processes the request and returns a result ---

const rpcQueue = new Queue('rpc', { connection });

const worker = new Worker('rpc', async (job: Job) => {
  console.log(`[worker] Processing ${job.name}: ${JSON.stringify(job.data)}`);
  await setTimeout(50); // simulate work

  switch (job.name) {
    case 'add':
      return { result: job.data.a + job.data.b };
    case 'greet':
      return { message: `Hello, ${job.data.name}!` };
    default:
      throw new Error(`Unknown operation: ${job.name}`);
  }
}, { connection, concurrency: 5 });

worker.on('error', (err) => console.error('[worker] Error:', err));

// --- 2. addAndWait: enqueue + block until result is available ---
// This is synchronous from the caller's perspective - no polling needed.

console.log('Sending RPC: add(3, 4)');
const addResult = await rpcQueue.addAndWait('add', { a: 3, b: 4 }, { waitTimeout: 5000 });
console.log('Result:', addResult); // { result: 7 }

console.log('\nSending RPC: greet("world")');
const greetResult = await rpcQueue.addAndWait('greet', { name: 'world' }, { waitTimeout: 5000 });
console.log('Result:', greetResult); // { message: "Hello, world!" }

// --- 3. Concurrent RPC calls ---

console.log('\nSending 5 concurrent RPC calls...');
const results = await Promise.all([
  rpcQueue.addAndWait('add', { a: 1, b: 2 }, { waitTimeout: 5000 }),
  rpcQueue.addAndWait('add', { a: 10, b: 20 }, { waitTimeout: 5000 }),
  rpcQueue.addAndWait('add', { a: 100, b: 200 }, { waitTimeout: 5000 }),
  rpcQueue.addAndWait('greet', { name: 'Alice' }, { waitTimeout: 5000 }),
  rpcQueue.addAndWait('greet', { name: 'Bob' }, { waitTimeout: 5000 }),
]);

results.forEach((r, i) => console.log(`  [${i}]`, r));

// --- Shutdown ---
await worker.close();
await rpcQueue.close();
console.log('\nDone.');
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/request-reply)

---

## OTel Tracing

OpenTelemetry tracing integration with glide-mq. Use `setTracer(tracer)` to pass an OTel tracer so all queue/worker operations create spans. Each `queue.add` and worker job processing creates a span with attributes like `glide-mq.queue`, `glide-mq.job.name`, and `glide-mq.job.id`.

```typescript
import { Queue, Worker, setTracer, isTracingEnabled } from 'glide-mq';
import type { Job } from 'glide-mq';
import { setTimeout } from 'timers/promises';

// OpenTelemetry SDK setup - must happen before glide-mq imports resolve the tracer.
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { SimpleSpanProcessor, ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';
import { Resource } from '@opentelemetry/resources';

// --- 1. Configure OTel SDK ---

const provider = new NodeTracerProvider({
  resource: new Resource({ 'service.name': 'glidemq-otel-example' }),
  // Use BatchSpanProcessor in production - SimpleSpanProcessor is for demo only
  spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
});

provider.register();

// Pass the tracer to glide-mq so all queue/worker operations are traced.
// glide-mq also auto-detects @opentelemetry/api if installed as a peer dep.
const tracer = provider.getTracer('glidemq-example');
setTracer(tracer);

console.log('Tracing enabled:', isTracingEnabled());

// --- 2. Queue + Worker ---

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

const queue = new Queue('traced-jobs', { connection });
const worker = new Worker('traced-jobs', async (job: Job) => {
  console.log(`[worker] Processing ${job.name}: ${JSON.stringify(job.data)}`);
  await setTimeout(50); // simulate work
  return { processed: true, value: job.data.value * 2 };
}, { connection, concurrency: 2 });

worker.on('error', (err) => console.error('[worker] Error:', err));

// --- 3. Produce traced jobs ---

console.log('\nAdding 3 jobs (each queue.add creates a span)...\n');

await queue.add('double', { value: 10 });
await queue.add('double', { value: 20 });
await queue.add('double', { value: 30 });

// Wait for processing (each worker.process also creates a span)
await setTimeout(1000);

const counts = await queue.getJobCounts();
console.log('\nJob counts:', counts);

// --- Shutdown ---
await worker.close();
await queue.close();
await provider.shutdown();
console.log('Done. Check console output above for exported spans.');
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/otel-tracing)

---

## Testing

Test glide-mq processors without running Valkey or Redis using in-memory `TestQueue` and `TestWorker`. Tests run instantly with zero infrastructure, no port allocation or Docker containers, and can run in parallel without conflicts.

### email-service.ts (Module Under Test)

```typescript
// We type-alias the queue interface so this module works with both
// the real Queue and the in-memory TestQueue (they share the same API surface).
interface QueueLike {
  add(name: string, data: any, opts?: { priority?: number }): Promise<any>;
  getJobCounts(): Promise<{
    waiting: number;
    active: number;
    completed: number;
    failed: number;
    delayed: number;
  }>;
}

export interface EmailJobData {
  to: string;
  subject: string;
  body: string;
}

export interface EmailResult {
  delivered: boolean;
  to: string;
}

/**
 * Create an email service backed by a glide-mq queue.
 */
export function createEmailService(queue: QueueLike) {
  return {
    async send(to: string, subject: string, body: string) {
      const isTransactional = subject.toLowerCase().startsWith('[transactional]');
      const priority = isTransactional ? 10 : 0;

      return queue.add('send-email', { to, subject, body } satisfies EmailJobData, {
        priority,
      });
    },

    async getStatus() {
      return queue.getJobCounts();
    },
  };
}

/**
 * Processor function for email jobs.
 * Export it separately so tests can pass it directly to TestWorker.
 */
export async function emailProcessor(
  job: { data: EmailJobData },
): Promise<EmailResult> {
  return { delivered: true, to: job.data.to };
}
```

### email-service.test.ts (Tests)

```typescript
import { describe, it, expect } from 'vitest';
import { TestQueue, TestWorker } from 'glide-mq/testing';
import { createEmailService, emailProcessor } from './email-service.js';
import type { EmailJobData, EmailResult } from './email-service.js';

function waitForProcessing(ms = 50): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('Email service with TestQueue/TestWorker', () => {
  it('adds a job to the queue', async () => {
    const queue = new TestQueue<EmailJobData, EmailResult>('email');
    const service = createEmailService(queue);

    const job = await service.send('alice@example.com', 'Hello', 'Hi Alice');

    expect(job).not.toBeNull();
    expect(job!.data.to).toBe('alice@example.com');
    expect(job!.data.subject).toBe('Hello');

    const counts = await queue.getJobCounts();
    expect(counts.waiting).toBe(1);

    await queue.close();
  });

  it('processes a job and returns a result', async () => {
    const queue = new TestQueue<EmailJobData, EmailResult>('email');
    const worker = new TestWorker(queue, emailProcessor);
    const service = createEmailService(queue);

    await service.send('bob@example.com', 'Welcome', 'Welcome aboard');

    await waitForProcessing();

    const counts = await queue.getJobCounts();
    expect(counts.completed).toBe(1);
    expect(counts.waiting).toBe(0);

    const completed = await queue.getJobs('completed');
    expect(completed).toHaveLength(1);
    expect(completed[0].returnvalue).toEqual({
      delivered: true,
      to: 'bob@example.com',
    });

    await worker.close();
    await queue.close();
  });

  it('records failedReason when the processor throws', async () => {
    const queue = new TestQueue<EmailJobData, EmailResult>('email');

    const failingProcessor = async () => {
      throw new Error('SMTP connection refused');
    };

    const worker = new TestWorker(queue, failingProcessor);

    await queue.add('send-email', {
      to: 'fail@example.com',
      subject: 'Oops',
      body: 'This will fail',
    });

    await waitForProcessing();

    const failed = await queue.getJobs('failed');
    expect(failed).toHaveLength(1);
    expect(failed[0].failedReason).toBe('SMTP connection refused');

    await worker.close();
    await queue.close();
  });

  it('retries a job according to the attempts option', async () => {
    let callCount = 0;

    const queue = new TestQueue<EmailJobData, EmailResult>('email');

    const flakyProcessor = async (job: { data: EmailJobData }) => {
      callCount++;
      if (callCount < 3) {
        throw new Error(`Attempt ${callCount} failed`);
      }
      return { delivered: true, to: job.data.to } satisfies EmailResult;
    };

    const worker = new TestWorker(queue, flakyProcessor);

    await queue.add('send-email', {
      to: 'retry@example.com',
      subject: 'Important',
      body: 'Please retry',
    }, { attempts: 3 });

    await waitForProcessing(150);

    expect(callCount).toBe(3);

    const counts = await queue.getJobCounts();
    expect(counts.completed).toBe(1);
    expect(counts.failed).toBe(0);

    await worker.close();
    await queue.close();
  });

  it('assigns priority based on subject prefix', async () => {
    const queue = new TestQueue<EmailJobData, EmailResult>('email');
    const service = createEmailService(queue);

    const transactional = await service.send(
      'vip@example.com',
      '[Transactional] Password Reset',
      'Click here to reset',
    );

    const marketing = await service.send(
      'user@example.com',
      'Weekly Newsletter',
      'Check out our deals',
    );

    expect(transactional!.opts.priority).toBe(10);
    expect(marketing!.opts.priority).toBe(0);

    await queue.close();
  });

  it('tracks progress updates during processing', async () => {
    const queue = new TestQueue<EmailJobData, EmailResult>('email');

    const progressProcessor = async (job: any) => {
      await job.updateProgress(50);
      await job.updateProgress(100);
      return { delivered: true, to: job.data.to };
    };

    const worker = new TestWorker(queue, progressProcessor);

    await queue.add('send-email', {
      to: 'progress@example.com',
      subject: 'Tracking',
      body: 'Watch my progress',
    });

    await waitForProcessing();

    const completed = await queue.getJobs('completed');
    expect(completed).toHaveLength(1);
    expect(completed[0].returnvalue).toEqual({
      delivered: true,
      to: 'progress@example.com',
    });

    await worker.close();
    await queue.close();
  });

  it('processes jobs added via addBulk', async () => {
    const queue = new TestQueue<EmailJobData, EmailResult>('email');
    const worker = new TestWorker(queue, emailProcessor);

    const recipients = ['a@test.com', 'b@test.com', 'c@test.com', 'd@test.com', 'e@test.com'];

    await queue.addBulk(
      recipients.map((to) => ({
        name: 'send-email',
        data: { to, subject: 'Bulk', body: 'Bulk email' },
      })),
    );

    await waitForProcessing(200);

    const counts = await queue.getJobCounts();
    expect(counts.completed).toBe(5);
    expect(counts.waiting).toBe(0);

    const completed = await queue.getJobs('completed');
    const deliveredTo = completed.map((j) => j.returnvalue?.to).sort();
    expect(deliveredTo).toEqual(recipients.sort());

    await worker.close();
    await queue.close();
  });

  it('reports accurate job counts across states', async () => {
    const queue = new TestQueue<EmailJobData, EmailResult>('email');

    const selectiveProcessor = async (job: { data: EmailJobData }) => {
      if (job.data.to.startsWith('fail@')) {
        throw new Error('Rejected');
      }
      return { delivered: true, to: job.data.to } satisfies EmailResult;
    };

    const worker = new TestWorker(queue, selectiveProcessor);

    await queue.add('send-email', { to: 'ok1@test.com', subject: 'Hi', body: '.' });
    await queue.add('send-email', { to: 'ok2@test.com', subject: 'Hi', body: '.' });
    await queue.add('send-email', { to: 'fail@test.com', subject: 'Hi', body: '.' });

    await waitForProcessing();

    const counts = await queue.getJobCounts();
    expect(counts.completed).toBe(2);
    expect(counts.failed).toBe(1);
    expect(counts.waiting).toBe(0);
    expect(counts.active).toBe(0);

    await worker.close();
    await queue.close();
  });
});
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/testing)
