---
title: Workflows
description: glide-mq workflow examples -- FlowProducer trees, chain/group helpers, DAG dependencies, step jobs, and waiting-children patterns.
---

# Workflows

Parent-child flows, DAG dependencies, step jobs, and waiting-children patterns.

## Core Workflows

Demonstrates glide-mq orchestration patterns: FlowProducer for parent-child job trees (e-commerce order flow), `chain()` for sequential pipelines (data processing), and `group()` for parallel fan-out (notification broadcast).

```typescript
import { Queue, Worker, FlowProducer, chain, group } from 'glide-mq';
import type { Job } from 'glide-mq';
import { setTimeout } from 'timers/promises';

const connection = {
  addresses: [{ host: 'localhost', port: 6379 }],
  clusterMode: false,
};

// Queues
const orders = new Queue('orders', { connection });
const payments = new Queue('payments', { connection });
const shipping = new Queue('shipping', { connection });
const notifications = new Queue('notifications', { connection });
const analytics = new Queue('analytics', { connection });

// Workers
const orderWorker = new Worker('orders', async (job: Job) => {
  console.log(`Processing order: ${job.data.orderId}`);
  await setTimeout(500);
  return { orderId: job.data.orderId, status: 'processed' };
}, { connection, concurrency: 5 });

const paymentWorker = new Worker('payments', async (job: Job) => {
  console.log(`Processing payment: $${job.data.amount}`);
  await setTimeout(300);
  return { transactionId: `TXN-${Date.now()}` };
}, { connection, concurrency: 3 });

const shippingWorker = new Worker('shipping', async (job: Job) => {
  console.log(`Creating shipping label for ${job.data.orderId}`);
  await setTimeout(400);
  return { trackingNumber: `TRACK-${Date.now()}` };
}, { connection, concurrency: 5 });

const notificationWorker = new Worker('notifications', async (job: Job) => {
  console.log(`Sending ${job.data.type} to ${job.data.recipient}`);
  await setTimeout(100);
  return { sent: true };
}, { connection, concurrency: 10 });

const analyticsWorker = new Worker('analytics', async (job: Job) => {
  console.log(`Analytics: ${job.data.event}`);
  await setTimeout(100);
  return { processed: true };
}, { connection, concurrency: 10 });

// --- 1. FlowProducer: Parent-child job tree ---

const flowProducer = new FlowProducer({ connection });

await flowProducer.add({
  name: 'complete-order',
  queueName: 'orders',
  data: { orderId: 'ORD-001', total: 499.99 },
  children: [
    {
      name: 'process-payment',
      queueName: 'payments',
      data: { orderId: 'ORD-001', amount: 499.99 },
      children: [
        { name: 'update-inventory', queueName: 'shipping', data: { orderId: 'ORD-001' } },
      ],
    },
    {
      name: 'send-confirmation',
      queueName: 'notifications',
      data: { type: 'email', recipient: 'customer@example.com', message: 'Order confirmed!' },
    },
  ],
});
console.log('Flow: e-commerce order tree submitted');

await setTimeout(3000);

// --- 2. Chain: sequential pipeline ---

await chain('analytics', [
  { name: 'collect', data: { source: 'api' } },
  { name: 'transform', data: { format: 'json' } },
  { name: 'aggregate', data: { window: '1h' } },
  { name: 'store', data: { destination: 'warehouse' } },
], connection);
console.log('Chain: sequential data pipeline submitted');

await setTimeout(2000);

// --- 3. Group: parallel fan-out ---

await group('notifications', [
  { name: 'email', data: { type: 'email', recipient: 'user@example.com', message: 'New feature!' } },
  { name: 'sms', data: { type: 'sms', recipient: '+1234567890', message: 'New feature!' } },
  { name: 'push', data: { type: 'push', recipient: 'device-token', message: 'New feature!' } },
], connection);
console.log('Group: parallel notification broadcast submitted');

await setTimeout(2000);

// --- Shutdown ---

console.log('Done. Shutting down...');
await Promise.all([
  orderWorker.close(), paymentWorker.close(), shippingWorker.close(),
  notificationWorker.close(), analyticsWorker.close(), flowProducer.close(),
  orders.close(), payments.close(), shipping.close(), notifications.close(), analytics.close(),
]);
process.exit(0);
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/core-workflows)

---

## DAG Workflows

Demonstrates `dag()` helper and `FlowProducer.addDAG()` for arbitrary dependency graphs with multi-parent fan-in, diamond patterns, and cycle detection. Unlike tree-shaped flows, DAG nodes can depend on multiple parents, enabling diamond dependency patterns and fan-in merges.

```typescript
import { Queue, Worker, FlowProducer, dag } from 'glide-mq';
import type { Job, DAGNode } from 'glide-mq';
import { setTimeout } from 'timers/promises';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

// DAG (Directed Acyclic Graph) workflows allow arbitrary dependency graphs -
// not just parent-child trees. A node can depend on multiple parents (fan-in),
// and multiple nodes can depend on the same parent (fan-out).
//
// dag() validates the graph (cycle detection), topologically sorts nodes,
// and submits them via FlowProducer.addDAG().

// --- Worker ---

const etlWorker = new Worker('etl', async (job: Job) => {
  console.log(`[etl] ${job.name}: processing`);
  await setTimeout(100 + Math.floor(Math.random() * 100));

  switch (job.name) {
    case 'fetch-users':
      return { source: 'users', rows: 500 };
    case 'fetch-orders':
      return { source: 'orders', rows: 1200 };
    case 'fetch-products':
      return { source: 'products', rows: 300 };
    case 'join':
      return { joined: true };
    case 'enrich':
      return { enriched: true };
    case 'export':
      return { exported: true, destination: 's3://warehouse' };
    default:
      return { processed: true };
  }
}, { connection, concurrency: 5 });

etlWorker.on('completed', (job, result) => {
  console.log(`[etl] DONE ${job.name}:`, result);
});
etlWorker.on('error', (err) => console.error('[etl] Worker error:', err));

// --- Example 1: Diamond dependency pattern ---
//
//   fetch-users   fetch-orders   fetch-products
//        \            /                |
//      join (waits for BOTH)           |
//              \                      /
//            enrich (waits for join + products)
//                 |
//               export

console.log('--- DAG 1: Diamond ETL pipeline ---\n');

const nodes: DAGNode[] = [
  { name: 'fetch-users',    queueName: 'etl', data: { source: 'users-db' } },
  { name: 'fetch-orders',   queueName: 'etl', data: { source: 'orders-db' } },
  { name: 'fetch-products', queueName: 'etl', data: { source: 'products-db' } },
  { name: 'join', queueName: 'etl', data: { type: 'inner-join' },
    deps: ['fetch-users', 'fetch-orders'] },
  { name: 'enrich', queueName: 'etl', data: { type: 'left-join' },
    deps: ['join', 'fetch-products'] },
  { name: 'export', queueName: 'etl', data: { dest: 's3://warehouse' },
    deps: ['enrich'] },
];

const results = await dag(nodes, connection);
console.log(`DAG submitted: ${results.size} nodes`);
for (const [name, job] of results) {
  console.log(`  ${name} -> job ${job.id}`);
}

// Wait for pipeline to complete
await setTimeout(3000);

// --- Example 2: Fan-in merge (3 sources -> 1 merge) ---

console.log('\n--- DAG 2: Fan-in merge ---\n');

const mergeResults = await dag([
  { name: 'source-a', queueName: 'etl', data: { api: 'service-a' } },
  { name: 'source-b', queueName: 'etl', data: { api: 'service-b' } },
  { name: 'source-c', queueName: 'etl', data: { api: 'service-c' } },
  { name: 'merge',    queueName: 'etl', data: { strategy: 'concat' },
    deps: ['source-a', 'source-b', 'source-c'] },
], connection);

console.log(`Fan-in submitted: ${mergeResults.size} nodes\n`);

await setTimeout(2000);

// --- Example 3: Cycle detection ---

console.log('--- DAG 3: Cycle detection ---\n');

try {
  await dag([
    { name: 'a', queueName: 'etl', data: {}, deps: ['c'] },
    { name: 'b', queueName: 'etl', data: {}, deps: ['a'] },
    { name: 'c', queueName: 'etl', data: {}, deps: ['b'] }, // a -> b -> c -> a = cycle!
  ], connection);
} catch (err) {
  console.log(`Cycle detected: ${(err as Error).message}`);
}

// --- Shutdown ---
await etlWorker.close();
console.log('\nDone.');
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/dag-workflows)

---

## Step Job (moveToDelayed)

Multi-step jobs as resumable state machines using `moveToDelayed`. The job suspends itself and is re-queued at the given timestamp, resuming at the specified step without using external cron or storing state elsewhere. All state lives in the job itself.

```typescript
import { Queue, Worker } from 'glide-mq';
import type { Job } from 'glide-mq';
import { setTimeout } from 'timers/promises';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

// moveToDelayed(timestamp, nextStep) turns a job into a resumable state machine.
// The job suspends itself, is re-queued at the given timestamp, and resumes at
// the specified step - without using external cron or storing state elsewhere.

// --- 1. Multi-step email campaign ---
// Each email in a drip campaign sends, then schedules the next send.

type CampaignStep = 'welcome' | 'follow-up' | 'final';

type CampaignData = {
  userId: string;
  step: CampaignStep;
  email: string;
};

const campaignQueue = new Queue<CampaignData>('campaign', { connection });

const campaignWorker = new Worker<CampaignData>('campaign', async (job: Job<CampaignData>) => {
  const { userId, step, email } = job.data;

  switch (step) {
    case 'welcome':
      console.log(`[campaign] ${userId}: send welcome email to ${email}`);
      // moveToDelayed throws DelayedError - updates job.data.step and reschedules
      await job.moveToDelayed(Date.now() + 2000, 'follow-up');
      break; // unreachable - moveToDelayed always throws
    case 'follow-up':
      console.log(`[campaign] ${userId}: send follow-up email to ${email}`);
      await job.moveToDelayed(Date.now() + 2000, 'final');
      break; // unreachable
    case 'final':
      console.log(`[campaign] ${userId}: send final offer email to ${email}`);
      return { userId, completedAt: new Date().toISOString() };
    default:
      throw new Error(`Unknown step: ${step}`);
  }
}, { connection, concurrency: 3, promotionInterval: 200 });

campaignWorker.on('completed', (job, result) => {
  // Only the final step returns a result; intermediate steps throw DelayedError
  if (result) console.log(`[campaign] DONE for ${result.userId} at ${result.completedAt}`);
});
campaignWorker.on('error', (err) => console.error('[campaign] Worker error:', err));

// --- 2. Order processing state machine ---
// Order progresses through payment -> fulfillment -> shipping with delays between.

type OrderStep = 'payment' | 'fulfillment' | 'shipping';

type OrderData = {
  orderId: string;
  step: OrderStep;
  amount: number;
};

const orderQueue = new Queue<OrderData>('orders', { connection });

const orderWorker = new Worker<OrderData>('orders', async (job: Job<OrderData>) => {
  const { orderId, step, amount } = job.data;

  switch (step) {
    case 'payment':
      console.log(`[orders] ${orderId}: processing payment $${amount}`);
      await setTimeout(50); // simulate payment gateway
      await job.moveToDelayed(Date.now() + 1000, 'fulfillment');
      break; // unreachable
    case 'fulfillment':
      console.log(`[orders] ${orderId}: fulfilling order`);
      await setTimeout(50);
      await job.moveToDelayed(Date.now() + 1000, 'shipping');
      break; // unreachable
    case 'shipping':
      console.log(`[orders] ${orderId}: dispatching shipment`);
      await setTimeout(30);
      return { orderId, status: 'shipped', timestamp: Date.now() };
    default:
      throw new Error(`Unknown step: ${step}`);
  }
}, { connection, concurrency: 2, promotionInterval: 200 });

orderWorker.on('completed', (job, result) => {
  if (result) console.log(`[orders] Shipped: ${result.orderId}`);
});
orderWorker.on('error', (err) => console.error('[orders] Worker error:', err));

// --- Enqueue initial jobs ---

await campaignQueue.add('drip', { userId: 'u-001', step: 'welcome', email: 'alice@example.com' });
await campaignQueue.add('drip', { userId: 'u-002', step: 'welcome', email: 'bob@example.com' });
console.log('Added 2 campaign jobs (welcome → follow-up → final, 2s apart each)\n');

await orderQueue.add('process', { orderId: 'ORD-100', step: 'payment', amount: 99.99 });
await orderQueue.add('process', { orderId: 'ORD-101', step: 'payment', amount: 24.50 });
console.log('Added 2 order jobs (payment → fulfillment → shipping, 1s apart each)\n');

// Wait for all steps to complete (campaigns: 4s, orders: 2s)
await setTimeout(5500);

// --- Shutdown ---
await Promise.all([
  campaignWorker.close(),
  orderWorker.close(),
  campaignQueue.close(),
  orderQueue.close(),
]);
console.log('\nDone.');
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/step-job-move-to-delayed)

---

## Move to Waiting Children

Parent job suspends until all child jobs complete using `moveToWaitingChildren`. FlowProducer creates parent-child job hierarchies where the parent automatically enters "waiting-children" state and is only activated after all children complete. Use `getChildrenValues()` to access results from all dependencies.

```typescript
import { FlowProducer, Worker } from 'glide-mq';
import type { Job } from 'glide-mq';
import { setTimeout } from 'timers/promises';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

// FlowProducer creates parent-child job hierarchies. The parent automatically
// enters "waiting-children" state and is only activated after ALL children complete.
// Inside the parent processor, call job.getChildrenValues() to access results.

// --- Workers ---

// Child: fetch data from one source
const fetchWorker = new Worker('fetch', async (job: Job) => {
  console.log(`[fetch] ${job.data.source}: fetching...`);
  await setTimeout(200 + Math.floor(Math.random() * 300));
  const rows = Math.floor(Math.random() * 500) + 100;
  console.log(`[fetch] ${job.data.source}: got ${rows} rows`);
  return { source: job.data.source, rows };
}, { connection, concurrency: 5 });

fetchWorker.on('error', (err) => console.error('[fetch] Worker error:', err));

// Parent: aggregate results once ALL children have finished
const aggregateWorker = new Worker('aggregate', async (job: Job) => {
  // By the time this runs, all children have completed.
  // getChildrenValues() returns a map of { childQueueKey:childId -> returnvalue }
  const childResults = await job.getChildrenValues() as Record<string, { source: string; rows: number }>;

  const entries = Object.values(childResults);
  const total = entries.reduce((sum, r) => sum + r.rows, 0);

  console.log(`[aggregate] ${job.id}: ${entries.length} children done, total rows=${total}`);
  return { total, sources: entries.map((r) => r.source) };
}, { connection, concurrency: 2 });

aggregateWorker.on('completed', (job, result) => {
  console.log(`[aggregate] COMPLETED ${job.id}:`, result);
});
aggregateWorker.on('error', (err) => console.error('[aggregate] Worker error:', err));

// --- Flow Producer ---
const flow = new FlowProducer({ connection });

// --- Example 1: Single parent with 3 fetch children ---
console.log('--- Flow 1: merge 3 data sources ---');
const { job: parentJob1 } = await flow.add({
  name: 'merge-sources',
  queueName: 'aggregate',
  data: { label: 'multi-source merge' },
  children: [
    { name: 'fetch-db', queueName: 'fetch', data: { source: 'database' } },
    { name: 'fetch-api', queueName: 'fetch', data: { source: 'external-api' } },
    { name: 'fetch-cache', queueName: 'fetch', data: { source: 'redis-cache' } },
  ],
});
console.log(`Parent ${parentJob1.id} created with 3 children\n`);

// --- Example 2: Another flow with different children ---
console.log('--- Flow 2: merge 2 data sources ---');
const { job: parentJob2 } = await flow.add({
  name: 'merge-files',
  queueName: 'aggregate',
  data: { label: 'file merge' },
  children: [
    { name: 'fetch-s3', queueName: 'fetch', data: { source: 's3-bucket' } },
    { name: 'fetch-gcs', queueName: 'fetch', data: { source: 'gcs-archive' } },
  ],
});
console.log(`Parent ${parentJob2.id} created with 2 children\n`);

// Wait for all flows to complete
await setTimeout(3000);

// --- Shutdown ---
await Promise.all([
  fetchWorker.close(),
  aggregateWorker.close(),
  flow.close(),
]);
console.log('\nDone.');
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/move-to-waiting-children)
