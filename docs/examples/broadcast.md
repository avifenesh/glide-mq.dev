---
title: Broadcast
description: glide-mq broadcast examples -- fan-out pub/sub, subject-based routing, and wildcard filtering.
---

# Broadcast

Fan-out pub/sub messaging with subject-based filtering.

## Broadcast

Demonstrates the Broadcast (fan-out pub/sub) pattern in glide-mq, where every published message is delivered to all subscribers independently. Each `BroadcastWorker` creates its own consumer group and processes messages at its own pace. The `subjects` option filters messages so the processor only receives matching subjects; non-matching messages are auto-acknowledged and skipped.

```typescript
import { Broadcast, BroadcastWorker } from 'glide-mq';
import type { Job } from 'glide-mq';

// ---------------------------------------------------------------------------
// Connection
// ---------------------------------------------------------------------------

const connection = {
  addresses: [{ host: 'localhost', port: 6379 }],
  clusterMode: false,
};

// ---------------------------------------------------------------------------
// 1. Publisher -- fan-out event bus for order events
// ---------------------------------------------------------------------------

const events = new Broadcast('order-events', { connection });

// ---------------------------------------------------------------------------
// 2. Subscribers -- each gets every message independently
// ---------------------------------------------------------------------------
// Each BroadcastWorker creates its own consumer group (named by `subscription`).
// All subscribers receive every published message.

// Inventory service -- updates stock counts
const inventory = new BroadcastWorker('order-events', async (job: Job) => {
  console.log(`[inventory] ${job.name}: updating stock for order ${job.data.orderId}`);
  return { updated: true };
}, {
  connection,
  subscription: 'inventory-service',
  concurrency: 3,
});

// Analytics service -- records metrics
const analytics = new BroadcastWorker('order-events', async (job: Job) => {
  console.log(`[analytics] ${job.name}: recording event for order ${job.data.orderId}`);
  return { recorded: true };
}, {
  connection,
  subscription: 'analytics-service',
  concurrency: 2,
});

// Notification service -- sends customer emails
const notifications = new BroadcastWorker('order-events', async (job: Job) => {
  console.log(`[notifications] ${job.name}: emailing customer ${job.data.customer} about order ${job.data.orderId}`);
  return { notified: true };
}, {
  connection,
  subscription: 'notification-service',
  concurrency: 2,
});

// ---------------------------------------------------------------------------
// 3. Filtered subscriber -- only receives orders.placed events
// ---------------------------------------------------------------------------
// The `subjects` option filters messages by their subject. Non-matching
// messages are auto-acknowledged and skipped without hitting the processor.

const alerts = new BroadcastWorker('order-events', async (job: Job) => {
  console.log(`[alerts] High-value order alert: ${job.data.orderId} ($${job.data.total})`);
  return { alerted: true };
}, {
  connection,
  subscription: 'alert-service',
  subjects: ['orders.placed'],  // only orders.placed, ignores others
  concurrency: 1,
});

// ---------------------------------------------------------------------------
// 4. Worker events
// ---------------------------------------------------------------------------

inventory.on('completed', (job) =>
  console.log(`[inventory] Job ${job.id} completed`),
);
inventory.on('failed', (job, err) =>
  console.error(`[inventory] Job ${job.id} failed: ${err.message}`),
);

analytics.on('completed', (job) =>
  console.log(`[analytics] Job ${job.id} completed`),
);

notifications.on('completed', (job) =>
  console.log(`[notifications] Job ${job.id} completed`),
);

alerts.on('completed', (job) =>
  console.log(`[alerts] Job ${job.id} completed`),
);

// ---------------------------------------------------------------------------
// 5. Publish order events with different subjects
// ---------------------------------------------------------------------------
// publish(subject, data, opts?) -- subject is a dot-separated routing key.

// orders.placed -- received by ALL subscribers (inventory, analytics,
//   notifications, AND alerts)
await events.publish('orders.placed', {
  orderId: 'ORD-1001',
  customer: 'alice@example.com',
  items: ['widget-a', 'widget-b'],
  total: 149.99,
});
console.log('Published: orders.placed (ORD-1001)');

await events.publish('orders.placed', {
  orderId: 'ORD-1002',
  customer: 'bob@example.com',
  items: ['gadget-x'],
  total: 299.00,
});
console.log('Published: orders.placed (ORD-1002)');

// orders.confirmed -- received by inventory, analytics, notifications
//   but NOT alerts (filtered out)
await events.publish('orders.confirmed', {
  orderId: 'ORD-1001',
  customer: 'alice@example.com',
  confirmedAt: new Date().toISOString(),
});
console.log('Published: orders.confirmed (ORD-1001)');

// orders.shipped -- received by inventory, analytics, notifications
//   but NOT alerts (filtered out)
await events.publish('orders.shipped', {
  orderId: 'ORD-1001',
  customer: 'alice@example.com',
  trackingNumber: 'TRK-98765',
  carrier: 'FedEx',
});
console.log('Published: orders.shipped (ORD-1001)');

await events.publish('orders.shipped', {
  orderId: 'ORD-1002',
  customer: 'bob@example.com',
  trackingNumber: 'TRK-98766',
  carrier: 'UPS',
});
console.log('Published: orders.shipped (ORD-1002)');

// ---------------------------------------------------------------------------
// 6. Graceful shutdown
// ---------------------------------------------------------------------------

console.log('\nRunning... Press Ctrl+C to stop.');

process.on('SIGINT', async () => {
  console.log('\nShutting down...');
  await inventory.close();
  await analytics.close();
  await notifications.close();
  await alerts.close();
  await events.close();
  console.log('All resources closed. Goodbye.');
  process.exit(0);
});
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/broadcast)

---

## Broadcast Subjects

Demonstrates how `BroadcastWorker` can filter messages by subject using glob pattern matching, so each subscriber only processes the events it cares about. Non-matching messages are auto-ACKed at the stream level (zero wasted HGETALL calls).

| Subscriber | subjects option | Receives |
|---|---|---|
| `orders-service` | `['orders.*']` | orders.placed, orders.shipped, orders.delivered |
| `shipping-service` | `['orders.shipped', 'orders.delivered']` | orders.shipped, orders.delivered |
| `analytics-service` | _(none -- receives all)_ | all four events |

```typescript
import { Broadcast, BroadcastWorker } from 'glide-mq';
import type { Job } from 'glide-mq';
import { setTimeout } from 'timers/promises';

// ---------------------------------------------------------------------------
// Connection
// ---------------------------------------------------------------------------

const connection = {
  addresses: [{ host: 'localhost', port: 6379 }],
};

// ---------------------------------------------------------------------------
// 1. Publisher - fan-out event bus for a microservices system
// ---------------------------------------------------------------------------

const events = new Broadcast('service-events', {
  connection,
  maxMessages: 1000,
});

// ---------------------------------------------------------------------------
// 2. Subscribers - each with different subject filters
// ---------------------------------------------------------------------------

// --- orders-service: subscribes to all order events ---
// Pattern 'orders.*' matches exactly one segment after 'orders.':
//   orders.placed    -> MATCH
//   orders.shipped   -> MATCH
//   orders.delivered  -> MATCH
//   payments.completed -> NO MATCH (different first segment)
const ordersService = new BroadcastWorker('service-events', async (job: Job) => {
  console.log(`  [orders-service]    ${job.name} -> orderId=${job.data.orderId}`);
  return { handled: true };
}, {
  connection,
  subscription: 'orders-service',
  subjects: ['orders.*'],
  concurrency: 3,
});
ordersService.on('error', () => {});

// --- shipping-service: subscribes to shipping-related order events only ---
// Multiple literal patterns - a message matches if it matches ANY pattern.
const shippingService = new BroadcastWorker('service-events', async (job: Job) => {
  console.log(`  [shipping-service]  ${job.name} -> tracking=${job.data.tracking ?? 'n/a'}`);
  return { handled: true };
}, {
  connection,
  subscription: 'shipping-service',
  subjects: ['orders.shipped', 'orders.delivered'],
  concurrency: 2,
});
shippingService.on('error', () => {});

// --- analytics-service: subscribes to everything (catch-all) ---
// No `subjects` option means all messages are delivered, no filtering.
const analyticsService = new BroadcastWorker('service-events', async (job: Job) => {
  console.log(`  [analytics-service] ${job.name} -> ${JSON.stringify(job.data)}`);
  return { recorded: true };
}, {
  connection,
  subscription: 'analytics-service',
  concurrency: 5,
  // No `subjects` - receives ALL messages
});
analyticsService.on('error', () => {});

// ---------------------------------------------------------------------------
// 3. Wait for all subscribers to connect and create their consumer groups
// ---------------------------------------------------------------------------

await Promise.all([
  ordersService.waitUntilReady(),
  shippingService.waitUntilReady(),
  analyticsService.waitUntilReady(),
]);

console.log('All subscribers ready.\n');

// ---------------------------------------------------------------------------
// 4. Publish messages with different subjects
// ---------------------------------------------------------------------------

console.log('Publishing events...\n');

await events.publish('orders.placed', {
  orderId: 'ORD-2001',
  customer: 'alice@example.com',
  items: ['widget-a', 'widget-b'],
  total: 149.99,
});
console.log('  Published: orders.placed (ORD-2001)');

await events.publish('orders.shipped', {
  orderId: 'ORD-2001',
  tracking: 'TRK-55501',
  carrier: 'FedEx',
});
console.log('  Published: orders.shipped (ORD-2001)');

await events.publish('orders.delivered', {
  orderId: 'ORD-2001',
  tracking: 'TRK-55501',
  deliveredAt: new Date().toISOString(),
});
console.log('  Published: orders.delivered (ORD-2001)');

await events.publish('payments.completed', {
  txId: 'TX-8001',
  amount: 149.99,
  method: 'credit_card',
});
console.log('  Published: payments.completed (TX-8001)');

// ---------------------------------------------------------------------------
// 5. Wait for processing
// ---------------------------------------------------------------------------

console.log('\nWaiting for processing...\n');
await setTimeout(2000);

// ---------------------------------------------------------------------------
// 6. Expected routing summary
// ---------------------------------------------------------------------------

console.log('\n--- Expected routing ---');
console.log('');
console.log('  orders.placed       -> orders-service, analytics-service');
console.log('  orders.shipped      -> orders-service, shipping-service, analytics-service');
console.log('  orders.delivered    -> orders-service, shipping-service, analytics-service');
console.log('  payments.completed  -> analytics-service only');
console.log('');
console.log('  orders-service:    3 messages  (subjects: [\'orders.*\'])');
console.log('  shipping-service:  2 messages  (subjects: [\'orders.shipped\', \'orders.delivered\'])');
console.log('  analytics-service: 4 messages  (no subjects filter - receives all)');

// ---------------------------------------------------------------------------
// 7. Cleanup
// ---------------------------------------------------------------------------

console.log('\nShutting down...');
await Promise.all([
  ordersService.close(),
  shippingService.close(),
  analyticsService.close(),
  events.close(),
]);
console.log('Done.');
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/broadcast-subjects)

---

## Subject Filter

Demonstrates NATS-style subject filtering on `BroadcastWorker` for topic-based message routing. Features subject publishing with `broadcast.publish(subject, data)`, wildcard patterns (`*` for one segment, `>` for trailing wildcard), multiple filter patterns, zero-waste filtering where non-matching messages are auto-ACKed without HGETALL, and catch-all subscribers.

| Subscriber | Pattern | Receives |
|---|---|---|
| logger | (none) | All 9 events |
| order-service | `orders.>` | orders.placed, orders.shipped |
| payment-alerts | `payments.failed`, `payments.refunded` | payments.failed, payments.refunded |
| us-inventory | `inventory.us.*` | inventory.us.east, inventory.us.west |

```typescript
import { Broadcast, BroadcastWorker } from 'glide-mq';
import type { Job } from 'glide-mq';
import { setTimeout } from 'timers/promises';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

// Subject-based filtering lets BroadcastWorker subscribers receive only
// messages matching specific patterns. Non-matching messages are auto-ACKed
// at the stream level (zero wasted HGETALL calls).
//
// Pattern syntax (dot-separated segments):
//   *  matches exactly one segment
//   >  matches one or more trailing segments (must be last token)
//
// Examples:
//   'orders.*'           matches 'orders.placed', not 'orders.us.placed'
//   'orders.>'           matches 'orders.placed', 'orders.us.east.placed'
//   'orders.*.shipped'   matches 'orders.123.shipped'

const events = new Broadcast('store-events', { connection, maxMessages: 500 });

// --- 1. Catch-all subscriber (no filter) ---

const logger = new BroadcastWorker('store-events', async (job: Job) => {
  console.log(`[logger] ${job.name}: ${JSON.stringify(job.data)}`);
  return { logged: true };
}, {
  connection,
  subscription: 'event-logger',
  concurrency: 5,
});
logger.on('error', () => {});

// --- 2. Orders-only subscriber (wildcard) ---

const orderService = new BroadcastWorker('store-events', async (job: Job) => {
  console.log(`[orders] ${job.name}: orderId=${job.data.orderId}`);
  return { processed: true };
}, {
  connection,
  subscription: 'order-service',
  subjects: ['orders.>'],  // matches orders.placed, orders.shipped, orders.refunded
  concurrency: 3,
});
orderService.on('error', () => {});

// --- 3. Payment alerts (specific subjects) ---

const paymentAlerts = new BroadcastWorker('store-events', async (job: Job) => {
  console.log(`[payments] ALERT ${job.name}: $${job.data.amount}`);
  return { alerted: true };
}, {
  connection,
  subscription: 'payment-alerts',
  subjects: ['payments.failed', 'payments.refunded'],  // only failures and refunds
  concurrency: 1,
});
paymentAlerts.on('error', () => {});

// --- 4. Regional inventory (segment wildcard) ---

const usInventory = new BroadcastWorker('store-events', async (job: Job) => {
  console.log(`[us-inventory] ${job.name}: ${job.data.sku}`);
  return { updated: true };
}, {
  connection,
  subscription: 'us-inventory',
  subjects: ['inventory.us.*'],  // matches inventory.us.east, inventory.us.west
  concurrency: 2,
});
usInventory.on('error', () => {});

// Wait for all subscribers to be ready
await Promise.all([
  logger.waitUntilReady(),
  orderService.waitUntilReady(),
  paymentAlerts.waitUntilReady(),
  usInventory.waitUntilReady(),
]);

// --- 5. Publish events with different subjects ---

console.log('Publishing events with various subjects...\n');

// Orders - received by logger + orderService
await events.publish('orders.placed', { orderId: 'ORD-001', amount: 99.99 });
await events.publish('orders.shipped', { orderId: 'ORD-001', carrier: 'FedEx' });

// Payments - received by logger, paymentAlerts gets only failed/refunded
await events.publish('payments.completed', { txId: 'TX-100', amount: 99.99 });
await events.publish('payments.failed', { txId: 'TX-101', amount: 49.99, reason: 'insufficient funds' });
await events.publish('payments.refunded', { txId: 'TX-100', amount: 99.99 });

// Inventory - received by logger, usInventory gets only us.*
await events.publish('inventory.us.east', { sku: 'WIDGET-A', delta: -5 });
await events.publish('inventory.eu.west', { sku: 'WIDGET-B', delta: +10 });
await events.publish('inventory.us.west', { sku: 'WIDGET-C', delta: -2 });

// Users - received by logger only (no subscriber filters match)
await events.publish('users.signup', { userId: 'U-500', email: 'new@example.com' });

console.log('\nWaiting for processing...\n');
await setTimeout(2000);

// --- Summary ---
console.log('\n--- Expected routing ---');
console.log('logger:         ALL 9 events (no filter)');
console.log('order-service:  2 events (orders.placed, orders.shipped)');
console.log('payment-alerts: 2 events (payments.failed, payments.refunded)');
console.log('us-inventory:   2 events (inventory.us.east, inventory.us.west)');

// --- Shutdown ---
await Promise.all([
  logger.close(),
  orderService.close(),
  paymentAlerts.close(),
  usInventory.close(),
  events.close(),
]);
console.log('\nDone.');
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/subject-filter)
