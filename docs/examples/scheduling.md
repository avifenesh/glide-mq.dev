---
title: Scheduling
description: glide-mq scheduling examples -- cron patterns, fixed intervals, bounded schedulers, and repeat-after-complete.
---

# Scheduling

Cron patterns, fixed intervals, bounded schedulers, and repeat-after-complete patterns.

## Cron Scheduler

Recurring jobs with cron patterns and fixed intervals. Demonstrates fixed-interval scheduling (drift-free, server-side), standard 5-field cron expressions, cron with IANA timezone, delayed start with `startDate`, scheduler inspection with `getJobScheduler`, and removal with `removeJobScheduler`.

```typescript
import { Queue, Worker } from 'glide-mq';
import type { Job } from 'glide-mq';
import { setTimeout } from 'timers/promises';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

const queue = new Queue('scheduled-tasks', { connection });
const worker = new Worker('scheduled-tasks', async (job: Job) => {
  const ts = new Date().toISOString();
  console.log(`[${ts}] Running: ${job.name} | scheduler: ${job.data.scheduler}`);
  return { ran: true, at: ts };
}, { connection, concurrency: 3, promotionInterval: 200 });

worker.on('error', (err) => console.error('Worker error:', err));

// --- 1. Fixed interval scheduler ---
// Fires every N milliseconds (drift-free, server-side scheduling).

await queue.upsertJobScheduler(
  'heartbeat',
  { every: 1000 },
  { name: 'ping', data: { scheduler: 'heartbeat' } },
);
console.log('Scheduler: heartbeat (every 1s)');

// --- 2. Cron pattern scheduler ---
// Standard 5-field cron: minute hour dayOfMonth month dayOfWeek.
// This one fires every minute (for demo - use real patterns in production).

await queue.upsertJobScheduler(
  'hourly-cleanup',
  { pattern: '* * * * *' }, // every minute
  { name: 'cleanup', data: { scheduler: 'hourly-cleanup', target: 'temp-files' } },
);
console.log('Scheduler: hourly-cleanup (cron: every minute)');

// --- 3. Cron with timezone ---
// Run at a specific time in a specific timezone.

await queue.upsertJobScheduler(
  'daily-report-us',
  {
    pattern: '0 9 * * *', // 9:00 AM
    tz: 'America/New_York',
  },
  { name: 'report', data: { scheduler: 'daily-report-us', region: 'US-East' } },
);
console.log('Scheduler: daily-report-us (cron: 9 AM ET)');

// --- 4. Interval with startDate ---
// Delay the first run until a future time.

await queue.upsertJobScheduler(
  'delayed-start',
  {
    every: 800,
    startDate: Date.now() + 2000, // first run 2s from now
  },
  { name: 'delayed-task', data: { scheduler: 'delayed-start' } },
);
console.log('Scheduler: delayed-start (every 800ms, starts in 2s)');

// --- Verify schedulers exist ---
const schedulerNames = ['heartbeat', 'hourly-cleanup', 'daily-report-us', 'delayed-start'];
console.log('\nActive schedulers:');
const entries = await Promise.all(schedulerNames.map((name) => queue.getJobScheduler(name)));
schedulerNames.forEach((name, i) => {
  if (entries[i]) {
    console.log(`  ${name} | next: ${new Date(entries[i]!.nextRun).toISOString()}`);
  }
});

// --- Observe runs ---
console.log('\nWaiting 4s to observe scheduled runs...\n');
await setTimeout(4000);

const counts = await queue.getJobCounts();
console.log('\nJob counts:', counts);

// --- Remove schedulers ---
await Promise.all(schedulerNames.map((name) => queue.removeJobScheduler(name)));
console.log('All schedulers removed.');

// --- Shutdown ---
await worker.close();
await queue.close();
console.log('Done.');
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/cron-scheduler)

---

## Bounded Schedulers

Schedulers with execution limits and end dates. Demonstrates `limit` to stop after N executions, `endDate` to stop after a given timestamp, and combined `limit` + `endDate` where whichever condition is met first stops the scheduler.

```typescript
import { Queue, Worker } from 'glide-mq';
import type { Job } from 'glide-mq';
import { setTimeout } from 'timers/promises';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

const queue = new Queue('scheduled', { connection });
const worker = new Worker('scheduled', async (job: Job) => {
  console.log(`[${new Date().toISOString()}] Running: ${job.name} (scheduler: ${job.data.scheduler})`);
  return { ran: true };
}, { connection, concurrency: 2, promotionInterval: 200 });

worker.on('error', (err) => console.error('Worker error:', err));

// --- 1. Bounded by execution count (limit) ---
// Runs at most 3 times, then the scheduler stops automatically.

await queue.upsertJobScheduler(
  'trial-digest',
  {
    every: 500, // every 500ms
    limit: 3,   // stop after 3 executions
  },
  {
    name: 'send-digest',
    data: { scheduler: 'trial-digest' },
  },
);
console.log('Scheduled: trial-digest (max 3 runs, every 500ms)');

// --- 2. Bounded by end date ---
// Stops running after the given date regardless of how many times it ran.

const endsAt = Date.now() + 2000; // stop after 2 seconds

await queue.upsertJobScheduler(
  'limited-campaign',
  {
    every: 400,
    endDate: endsAt,
  },
  {
    name: 'campaign-ping',
    data: { scheduler: 'limited-campaign' },
  },
);
console.log('Scheduled: limited-campaign (ends in 2s, every 400ms)');

// --- 3. Bounded by both limit AND end date (whichever comes first) ---

await queue.upsertJobScheduler(
  'onboarding-reminder',
  {
    every: 600,
    limit: 5,
    endDate: Date.now() + 5000,
  },
  {
    name: 'onboarding-reminder',
    data: { scheduler: 'onboarding-reminder' },
  },
);
console.log('Scheduled: onboarding-reminder (max 5 runs OR 5s, every 600ms)\n');

// Wait for schedulers to fire and expire
await setTimeout(4000);

const counts = await queue.getJobCounts();
console.log('\nFinal job counts:', counts);

// --- Shutdown ---
await worker.close();
await queue.close();
console.log('Done.');
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/bounded-schedulers)

---

## Repeat After Complete

Schedule jobs to repeat only after the previous run finishes, using `repeatAfterComplete`. Unlike fixed-interval scheduling, `repeatAfterComplete` measures from the end of each run, preventing job pile-up when processing takes longer than the interval. Useful for scrapers, report generators, and any task that must not overlap.

```typescript
import { Queue, Worker } from 'glide-mq';
import type { Job } from 'glide-mq';
import { setTimeout } from 'timers/promises';

const connection = { addresses: [{ host: 'localhost', port: 6379 }] };

// repeatAfterComplete schedules the next run only AFTER the current one finishes.
// This prevents pile-up when a job takes longer than the interval.

// --- 1. Scraper that must not overlap ---
// With a fixed cron/interval, a slow scrape would queue up multiple pending runs.
// With repeatAfterComplete, the next run waits for the current to finish.

const scrapeQueue = new Queue('scraper', { connection });
let scrapeRuns = 0;

const scrapeWorker = new Worker('scraper', async (job: Job) => {
  scrapeRuns++;
  const run = scrapeRuns;
  const duration = 300 + Math.floor(Math.random() * 200); // 300-500ms
  console.log(`[scraper] Run #${run} started (will take ${duration}ms)`);
  await setTimeout(duration);
  console.log(`[scraper] Run #${run} finished`);
  return { run, duration };
}, { connection, concurrency: 1, promotionInterval: 200 });

scrapeWorker.on('error', (err) => console.error('[scraper] Error:', err));

await scrapeQueue.upsertJobScheduler(
  'scrape-products',
  {
    repeatAfterComplete: 100, // 100ms delay after completion before next run
  },
  {
    name: 'scrape',
    data: { url: 'https://example.com/products' },
  },
);
console.log('Scheduler: scrape-products (repeatAfterComplete, 100ms gap after each run)\n');

// --- 2. Report generator with cool-down ---

const reportQueue = new Queue('reports', { connection });
let reportRuns = 0;

const reportWorker = new Worker('reports', async (job: Job) => {
  reportRuns++;
  console.log(`[reports] Generating report #${reportRuns} for ${job.data.period}`);
  await setTimeout(200);
  return { reportId: `RPT-${reportRuns}` };
}, { connection, concurrency: 1, promotionInterval: 200 });

reportWorker.on('error', (err) => console.error('[reports] Error:', err));

await reportQueue.upsertJobScheduler(
  'daily-report',
  {
    repeatAfterComplete: 500, // 500ms cool-down between reports
  },
  {
    name: 'generate',
    data: { period: 'daily' },
  },
);
console.log('Scheduler: daily-report (repeatAfterComplete, 500ms cool-down)\n');

// Observe a few cycles
await setTimeout(3000);

const [scraperCounts, reportCounts] = await Promise.all([
  scrapeQueue.getJobCounts(),
  reportQueue.getJobCounts(),
]);

console.log(`\nScraper runs completed: ${scrapeRuns} |`, scraperCounts);
console.log(`Report runs completed: ${reportRuns} |`, reportCounts);

// --- Shutdown ---
await Promise.all([scrapeWorker.close(), reportWorker.close(), scrapeQueue.close(), reportQueue.close()]);
console.log('\nDone.');
```

[View full source](https://github.com/avifenesh/glidemq-examples/tree/main/examples/repeat-after-complete)
