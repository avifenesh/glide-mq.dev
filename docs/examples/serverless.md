---
title: Serverless & Infrastructure
description: glide-mq serverless and infrastructure examples -- Producer, ServerlessPool, IAM auth, HTTP proxy, and Valkey cluster.
---

# Serverless & Infrastructure

Serverless producers, IAM authentication, HTTP proxy, and cluster mode.

## Serverless Producer

Demonstrates `Producer` and `ServerlessPool` for lightweight job enqueue in serverless/edge environments. Producer is a minimal alternative to Queue (no EventEmitter, returns string IDs), and ServerlessPool caches connections for warm Lambda/Edge invocations.

| | Producer | Queue |
|---|---|---|
| Weight | Minimal (no EventEmitter) | Full-featured |
| Returns | String ID or null | Job instance |
| Methods | add(), addBulk(), close() | 25+ methods |
| Workers | No | Yes |
| Events | No | Yes |
| Use case | Serverless, edge, fire-and-forget | Application servers |

```typescript
import { Producer, ServerlessPool, serverlessPool, Worker } from 'glide-mq';
import type { Job, ProducerOptions } from 'glide-mq';
import { setTimeout } from 'timers/promises';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

// Producer is a lightweight alternative to Queue for serverless/edge environments.
// No EventEmitter, no Job instances, no state tracking - just add() and addBulk().
// Returns plain string IDs instead of full Job objects.
//
// ServerlessPool caches Producer instances by connection fingerprint so warm
// Lambda/Edge invocations reuse connections instead of creating new ones.

// --- 1. Direct Producer usage ---

const producer = new Producer('tasks', { connection });

console.log('--- Direct Producer ---\n');

const id1 = await producer.add('process-image', { url: 'https://example.com/photo.jpg', width: 800 });
console.log(`Added job: ${id1}`);

const id2 = await producer.add('send-email', { to: 'user@example.com', subject: 'Welcome' });
console.log(`Added job: ${id2}`);

// Custom job ID for idempotency
const id3 = await producer.add('charge', { amount: 99.99 }, { jobId: 'order-123' });
console.log(`Added job: ${id3} (custom ID)`);

// Duplicate returns null
const dup = await producer.add('charge', { amount: 99.99 }, { jobId: 'order-123' });
console.log(`Duplicate: ${dup} (null = skipped)\n`);

// --- 2. Bulk enqueue ---

console.log('--- Bulk enqueue ---\n');

const ids = await producer.addBulk([
  { name: 'resize', data: { file: 'a.png' } },
  { name: 'resize', data: { file: 'b.png' } },
  { name: 'resize', data: { file: 'c.png' } },
  { name: 'resize', data: { file: 'd.png' } },
  { name: 'resize', data: { file: 'e.png' } },
]);
console.log(`Bulk added ${ids.length} jobs: [${ids.join(', ')}]\n`);

// --- 3. ServerlessPool (connection reuse for Lambda/Edge) ---

console.log('--- ServerlessPool ---\n');

const opts: ProducerOptions = { connection };

// Simulating multiple Lambda invocations - same pool, same cached connection
const p1 = serverlessPool.getProducer('notifications', opts);
const p2 = serverlessPool.getProducer('notifications', opts);
console.log(`Same instance: ${p1 === p2}`); // true - cached by fingerprint

const p3 = serverlessPool.getProducer('analytics', opts);
console.log(`Different queue: ${p1 === p3}`); // false - different queue name

await p1.add('push', { token: 'device-abc', message: 'New order!' });
await p3.add('track', { event: 'page_view', page: '/checkout' });
console.log('Enqueued via pooled producers\n');

// --- 4. Worker consumes the jobs ---

console.log('--- Worker processing ---\n');

const worker = new Worker('tasks', async (job: Job) => {
  console.log(`[worker] ${job.name}: ${JSON.stringify(job.data)}`);
  return { done: true };
}, { connection, concurrency: 5 });

worker.on('error', () => {});

await setTimeout(1500);

const notifWorker = new Worker('notifications', async (job: Job) => {
  console.log(`[notifications] ${job.name}: ${JSON.stringify(job.data)}`);
  return { sent: true };
}, { connection, concurrency: 2 });

notifWorker.on('error', () => {});

await setTimeout(1000);

// --- Shutdown ---
await Promise.all([
  producer.close(),
  serverlessPool.closeAll(),
  worker.close(),
  notifWorker.close(),
]);
console.log('\nDone.');
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/serverless-producer)

---

## IAM Auth

AWS IAM authentication for ElastiCache and MemoryDB with glide-mq. The client generates SigV4 tokens automatically using the default AWS credentials chain -- no AWS SDK dependency needed in your app.

```typescript
import { Queue, Worker } from 'glide-mq';
import type { Job, ConnectionOptions, IamCredentials } from 'glide-mq';
import { setTimeout } from 'timers/promises';

// --- AWS IAM Authentication for ElastiCache / MemoryDB ---
//
// glide-mq supports IAM auth natively via the valkey-glide client.
// The client generates SigV4 tokens automatically using the default
// AWS credentials chain (env vars, ~/.aws/credentials, EC2 instance role, etc.).
//
// TLS is REQUIRED for IAM auth - AWS enforces encrypted connections.

const REGION = process.env.AWS_REGION ?? 'us-east-1';

// --- 1. ElastiCache Serverless with IAM ---

const elasticacheConnection: ConnectionOptions = {
  addresses: [{ host: 'my-cache.serverless.use1.cache.amazonaws.com', port: 6379 }],
  useTLS: true, // Required for IAM auth
  credentials: {
    type: 'iam',
    serviceType: 'elasticache',
    region: REGION,
    userId: 'my-iam-user',               // IAM user created in ElastiCache
    clusterName: 'my-cache',             // ElastiCache cluster name
    refreshIntervalSeconds: 300,          // Token refresh interval (default: 300s)
  } satisfies IamCredentials,
};

// --- 2. MemoryDB with IAM ---

const memorydbConnection: ConnectionOptions = {
  addresses: [{ host: 'my-memorydb.abc123.memorydb.us-east-1.amazonaws.com', port: 6379 }],
  useTLS: true,
  credentials: {
    type: 'iam',
    serviceType: 'memorydb',
    region: REGION,
    userId: 'my-iam-user',
    clusterName: 'my-memorydb',
  } satisfies IamCredentials,
};

// --- 3. ElastiCache cluster mode with IAM + read replicas ---

const clusterConnection: ConnectionOptions = {
  addresses: [
    { host: 'my-cluster.abc123.clustercfg.use1.cache.amazonaws.com', port: 6379 },
  ],
  useTLS: true,
  clusterMode: true,
  credentials: {
    type: 'iam',
    serviceType: 'elasticache',
    region: REGION,
    userId: 'my-iam-user',
    clusterName: 'my-cluster',
  } satisfies IamCredentials,
  readFrom: 'preferReplica', // Route reads to replicas for lower latency
};

// --- Pick which connection to use ---
// For this demo, we default to the ElastiCache serverless connection.
// Change this to memorydbConnection or clusterConnection as needed.

const connection = elasticacheConnection;

// --- Queue + Worker (same API as always) ---
// IAM auth is transparent - once the connection is configured, everything
// works exactly the same as password auth or no auth.

const queue = new Queue('iam-demo', { connection });

const worker = new Worker('iam-demo', async (job: Job) => {
  console.log(`[worker] Processing ${job.name}: ${JSON.stringify(job.data)}`);
  await setTimeout(50);
  const creds = connection.credentials;
  const region = creds && 'type' in creds && creds.type === 'iam' ? creds.region : 'unknown';
  return { processed: true, region };
}, { connection, concurrency: 2 });

worker.on('completed', (job, result) => {
  console.log(`[worker] Completed ${job.id}:`, result);
});
worker.on('error', (err) => console.error('[worker] Error:', err));

// --- Produce jobs ---

console.log('Adding 3 jobs via IAM-authenticated connection...\n');
await queue.add('compute', { value: 1 });
await queue.add('compute', { value: 2 });
await queue.add('compute', { value: 3 });

await setTimeout(1000);

const counts = await queue.getJobCounts();
console.log('\nJob counts:', counts);

// --- Shutdown ---
await worker.close();
await queue.close();
console.log('Done.');
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/iam-auth)

---

## HTTP Proxy

Cross-language queue access via the glide-mq HTTP proxy. Any HTTP client (Python, Go, Ruby, curl) can enqueue jobs, create flows, subscribe to queue events, query rolling usage summaries, and publish or consume broadcasts through a simple REST API. The proxy is an Express app that maps HTTP requests to queue operations. Use `{ flow, budget? }` for tree flows or `{ dag }` for DAGs; HTTP-submitted budgets are currently supported for tree flows only.

```typescript
import { createProxyServer } from 'glide-mq/proxy';
import { Worker } from 'glide-mq';
import type { Job } from 'glide-mq';
import { setTimeout } from 'timers/promises';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };
const PORT = 3456;

type SseEvent = {
  data: unknown;
  event: string;
  id?: string;
};

type FlowCreateResponse = {
  flowId: string;
  kind: 'dag' | 'tree';
  nodeCount: number;
};

async function readFirstSseEvent(path: string, timeoutMs = 5_000): Promise<SseEvent> {
  const controller = new AbortController();
  const timeoutId = globalThis.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`http://localhost:${PORT}${path}`, {
      headers: { Accept: 'text/event-stream' },
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`SSE request failed: ${res.status}`);
    }
    if (!res.body) {
      throw new Error(`SSE response for ${path} has no body`);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let currentEvent = 'message';
    let currentId: string | undefined;
    let dataLines: string[] = [];

    const flush = (): SseEvent | undefined => {
      if (dataLines.length === 0) return undefined;
      const raw = dataLines.join('\n');
      let data: unknown = raw;
      try {
        data = JSON.parse(raw);
      } catch {
        // keep raw text for non-JSON payloads
      }
      return { data, event: currentEvent, id: currentId };
    };

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let boundary = buffer.indexOf('\n\n');
      while (boundary !== -1) {
        const chunk = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 2);

        for (const line of chunk.split(/\r?\n/)) {
          if (line === '' || line.startsWith(':')) continue;
          if (line.startsWith('event:')) {
            currentEvent = line.slice(6).trim();
            continue;
          }
          if (line.startsWith('id:')) {
            currentId = line.slice(3).trim();
            continue;
          }
          if (line.startsWith('data:')) {
            dataLines.push(line.slice(5).trimStart());
          }
        }

        const event = flush();
        if (event) {
          await reader.cancel().catch(() => undefined);
          return event;
        }

        currentEvent = 'message';
        currentId = undefined;
        dataLines = [];
        boundary = buffer.indexOf('\n\n');
      }
    }

    throw new Error(`No SSE event received from ${path}`);
  } catch (err) {
    if (controller.signal.aborted) {
      throw new Error(`Timed out waiting for SSE event from ${path}`);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
    controller.abort();
  }
}

// --- 1. Start the HTTP proxy ---
// createProxyServer returns an Express app that maps HTTP requests to queue ops.
// Any language that can make HTTP calls can enqueue jobs, create flows, read
// usage summaries, subscribe to queue events, and publish/consume broadcasts.
// NOTE: Add authentication middleware (API key, JWT) before production use.

const proxy = createProxyServer({
  connection,
  queues: ['emails', 'orders', 'notifications'], // optional allowlist
});

const server = await new Promise<ReturnType<typeof proxy.app.listen>>((resolve) => {
  const s = proxy.app.listen(PORT, () => {
    console.log(`HTTP proxy listening on http://localhost:${PORT}`);
    console.log('Endpoints:');
    console.log('  POST   /queues/:name/jobs        - add a job');
    console.log('  POST   /queues/:name/jobs/bulk   - add jobs in bulk');
    console.log('  GET    /queues/:name/events      - queue lifecycle SSE');
    console.log('  POST   /flows                    - create a tree flow or DAG');
    console.log('  GET    /flows/:id                - inspect a flow snapshot');
    console.log('  GET    /flows/:id/tree           - inspect the nested flow tree');
    console.log('  DELETE /flows/:id                - revoke remaining jobs in a flow');
    console.log('  GET    /usage/summary            - rolling usage summary');
    console.log('  POST   /broadcast/:name          - publish a broadcast message');
    console.log('  GET    /broadcast/:name/events   - durable broadcast SSE');
    console.log('  GET    /health                   - health check\n');
    resolve(s);
  });
});

// --- 2. Workers process jobs as usual ---
// The proxy only enqueues - workers are separate Node.js processes.

const emailWorker = new Worker('emails', async (job: Job) => {
  console.log(`[email] Sending to ${job.data.to}: ${job.data.subject}`);
  await job.reportUsage({
    model: 'demo-email-model',
    provider: 'example',
    tokens: { input: 120, output: 45 },
    costs: { total: 0.0012 },
    costUnit: 'usd',
  });
  return { sent: true };
}, { connection, concurrency: 2 });

emailWorker.on('error', (err) => console.error('[email] Error:', err));

const orderWorker = new Worker('orders', async (job: Job) => {
  console.log(`[order] Processing ${job.data.orderId}: $${job.data.amount}`);
  return { processed: true, orderId: job.data.orderId };
}, { connection, concurrency: 2 });

orderWorker.on('error', (err) => console.error('[order] Error:', err));

// --- 3. Demo: enqueue via HTTP (simulating a Python/Go/Ruby client) ---

async function httpPost<T = unknown>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`http://localhost:${PORT}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json() as Promise<T>;
}

async function httpGet<T = unknown>(path: string): Promise<T> {
  const res = await fetch(`http://localhost:${PORT}${path}`);
  return res.json() as Promise<T>;
}

async function httpDelete<T = unknown>(path: string): Promise<T> {
  const res = await fetch(`http://localhost:${PORT}${path}`, {
    method: 'DELETE',
  });
  return res.json() as Promise<T>;
}

const emailQueueEventPromise = readFirstSseEvent('/queues/emails/events');

// Add a single job
const emailResult = await httpPost('/queues/emails/jobs', {
  name: 'welcome',
  data: { to: 'alice@example.com', subject: 'Welcome!' },
});
console.log('POST /queues/emails/jobs:', emailResult);
console.log('GET /queues/emails/events:', await emailQueueEventPromise);

// Add jobs in bulk
const bulkResult = await httpPost('/queues/orders/jobs/bulk', {
  jobs: [
    { name: 'process', data: { orderId: 'ORD-001', amount: 99.99 } },
    { name: 'process', data: { orderId: 'ORD-002', amount: 24.50 } },
    { name: 'process', data: { orderId: 'ORD-003', amount: 150.00 } },
  ],
});
console.log('POST /queues/orders/jobs/bulk:', bulkResult);

const flowCreate = await httpPost<FlowCreateResponse>('/flows', {
  budget: { maxTotalTokens: 500, onExceeded: 'pause' },
  flow: {
    children: [
      {
        data: { subject: 'Order received', to: 'alice@example.com' },
        name: 'send-confirmation',
        queueName: 'emails',
      },
      {
        data: { subject: 'Invoice available', to: 'alice@example.com' },
        name: 'send-invoice',
        queueName: 'emails',
      },
    ],
    data: { amount: 149.99, orderId: 'ORD-900' },
    name: 'fulfill-order',
    queueName: 'orders',
  },
});
console.log('POST /flows:', flowCreate);

// Wait for processing
await setTimeout(500);

const flowSnapshot = await httpGet(`/flows/${flowCreate.flowId}`);
console.log(`GET /flows/${flowCreate.flowId}:`, flowSnapshot);

const flowTree = await httpGet(`/flows/${flowCreate.flowId}/tree`);
console.log(`GET /flows/${flowCreate.flowId}/tree:`, flowTree);

const usageSummary = await httpGet('/usage/summary?queues=emails&windowMs=60000');
console.log('\nGET /usage/summary?queues=emails&windowMs=60000:', usageSummary);

const broadcastEventPromise = readFirstSseEvent(
  '/broadcast/notifications/events?subscription=http-proxy-demo&subjects=orders.*',
);
const broadcastPublish = await httpPost('/broadcast/notifications', {
  subject: 'orders.created',
  data: { orderId: 'ORD-900', source: 'http-proxy-example' },
});
console.log('POST /broadcast/notifications:', broadcastPublish);
console.log(
  'GET /broadcast/notifications/events?subscription=http-proxy-demo&subjects=orders.*:',
  await broadcastEventPromise,
);

// Query job counts
const emailCounts = await httpGet('/queues/emails/counts');
console.log('\nGET /queues/emails/counts:', emailCounts);

const orderCounts = await httpGet('/queues/orders/counts');
console.log('GET /queues/orders/counts:', orderCounts);

const flowDelete = await httpDelete(`/flows/${flowCreate.flowId}`);
console.log(`DELETE /flows/${flowCreate.flowId}:`, flowDelete);

// Health check
const health = await httpGet('/health');
console.log('GET /health:', health);

// Broadcast channel not in allowlist
const forbidden = await fetch(`http://localhost:${PORT}/broadcast/secret`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ subject: 'hack', data: {} }),
});
console.log(`\nPOST /broadcast/secret: ${forbidden.status}`, await forbidden.json());

// --- Shutdown ---
await new Promise<void>((resolve) => server.close(() => resolve()));
await emailWorker.close();
await orderWorker.close();
await proxy.close();
console.log('\nDone.');
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/http-proxy)

---

## Valkey Cluster

Running glide-mq with a Valkey/Redis cluster. The only code change vs. standalone is `clusterMode: true` in `ConnectionOptions`. All glide-mq keys are hash-tagged (`glide:{queueName}:*`) so they always land in the same hash slot -- no cross-slot issues.

```typescript
import { Queue, Worker } from 'glide-mq';
import type { Job, ConnectionOptions } from 'glide-mq';
import { setTimeout } from 'timers/promises';

// --- Valkey/Redis Cluster Connection ---
// glide-mq uses hash-tagged keys (glide:{queueName}:*) so all keys for a
// queue land in the same hash slot - no cross-slot issues.

const clusterConnection: ConnectionOptions = {
  addresses: [
    { host: 'localhost', port: 7000 },
    { host: 'localhost', port: 7001 },
    { host: 'localhost', port: 7002 },
  ],
  clusterMode: true,
};

// --- Queue + Worker (same API as standalone) ---
// The only difference is `clusterMode: true` in the connection options.
// All queue operations, Lua functions, and streams work identically.

const queue = new Queue('cluster-demo', { connection: clusterConnection });

const worker = new Worker('cluster-demo', async (job: Job) => {
  console.log(`[worker] Processing ${job.name} on cluster: ${JSON.stringify(job.data)}`);
  await setTimeout(50);
  return { processed: true, node: 'some-cluster-node' };
}, { connection: clusterConnection, concurrency: 3 });

worker.on('completed', (job, result) => {
  console.log(`[worker] Completed ${job.id}:`, result);
});
worker.on('error', (err) => console.error('[worker] Error:', err));

// --- Produce jobs ---

console.log('Adding 5 jobs to cluster queue...\n');
for (let i = 0; i < 5; i++) {
  await queue.add('compute', { index: i, payload: `data-${i}` });
}

// Wait for processing
await setTimeout(1000);

const counts = await queue.getJobCounts();
console.log('\nJob counts:', counts);

// --- Scheduler on cluster ---
// Schedulers also work on cluster mode - keys are hash-tagged.

await queue.upsertJobScheduler(
  'cluster-heartbeat',
  { every: 500 },
  { name: 'heartbeat', data: { source: 'cluster' } },
);
console.log('Scheduler added on cluster.');

await setTimeout(2000);

const schedulerCounts = await queue.getJobCounts();
console.log('After scheduler:', schedulerCounts);

await queue.removeJobScheduler('cluster-heartbeat');

// --- Shutdown ---
await worker.close();
await queue.close();
console.log('\nDone.');
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/valkey-cluster)
