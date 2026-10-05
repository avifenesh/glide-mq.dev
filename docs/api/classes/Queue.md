# Class: Queue&lt;D, R&gt;

Defined in: [glide-mq/src/queue.ts:275](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L275)

Queue manages job submission, retrieval, scheduling, and lifecycle operations.
Connects to Valkey/Redis and uses server-side functions for atomic operations.

## Extends

- `EventEmitter`

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `D` | `any` |
| `R` | `any` |

## Constructors

### Constructor

```ts
new Queue<D, R>(name, opts): Queue<D, R>;
```

Defined in: [glide-mq/src/queue.ts:297](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L297)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` |
| `opts` | [`QueueOptions`](../interfaces/QueueOptions.md) |

#### Returns

`Queue`&lt;`D`, `R`&gt;

#### Overrides

```ts
EventEmitter.constructor
```

## Properties

### name

```ts
readonly name: string;
```

Defined in: [glide-mq/src/queue.ts:276](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L276)

***

### captureRejections

```ts
static captureRejections: boolean;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:425

Value: [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Change the default `captureRejections` option on all new `EventEmitter` objects.

#### Since

v13.4.0, v12.16.0

#### Inherited from

```ts
EventEmitter.captureRejections
```

***

### captureRejectionSymbol

```ts
readonly static captureRejectionSymbol: typeof captureRejectionSymbol;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:418

Value: `Symbol.for('nodejs.rejection')`

See how to write a custom `rejection handler`.

#### Since

v13.4.0, v12.16.0

#### Inherited from

```ts
EventEmitter.captureRejectionSymbol
```

***

### defaultMaxListeners

```ts
static defaultMaxListeners: number;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:464

By default, a maximum of `10` listeners can be registered for any single
event. This limit can be changed for individual `EventEmitter` instances
using the `emitter.setMaxListeners(n)` method. To change the default
for _all_`EventEmitter` instances, the `events.defaultMaxListeners` property
can be used. If this value is not a positive number, a `RangeError` is thrown.

Take caution when setting the `events.defaultMaxListeners` because the
change affects _all_ `EventEmitter` instances, including those created before
the change is made. However, calling `emitter.setMaxListeners(n)` still has
precedence over `events.defaultMaxListeners`.

This is not a hard limit. The `EventEmitter` instance will allow
more listeners to be added but will output a trace warning to stderr indicating
that a "possible EventEmitter memory leak" has been detected. For any single
`EventEmitter`, the `emitter.getMaxListeners()` and `emitter.setMaxListeners()` methods can be used to
temporarily avoid this warning:

```js
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.setMaxListeners(emitter.getMaxListeners() + 1);
emitter.once('event', () => {
  // do stuff
  emitter.setMaxListeners(Math.max(emitter.getMaxListeners() - 1, 0));
});
```

The `--trace-warnings` command-line flag can be used to display the
stack trace for such warnings.

The emitted warning can be inspected with `process.on('warning')` and will
have the additional `emitter`, `type`, and `count` properties, referring to
the event emitter instance, the event's name and the number of attached
listeners, respectively.
Its `name` property is set to `'MaxListenersExceededWarning'`.

#### Since

v0.11.2

#### Inherited from

```ts
EventEmitter.defaultMaxListeners
```

***

### errorMonitor

```ts
readonly static errorMonitor: typeof errorMonitor;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:411

This symbol shall be used to install a listener for only monitoring `'error'` events. Listeners installed using this symbol are called before the regular `'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an `'error'` event is emitted. Therefore, the process will still crash if no
regular `'error'` listener is installed.

#### Since

v13.6.0, v12.17.0

#### Inherited from

```ts
EventEmitter.errorMonitor
```

## Methods

### \[captureRejectionSymbol\]()?

```ts
optional [captureRejectionSymbol]<K>(
   error,
   event,
   ...args
): void;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:103

#### Type Parameters

| Type Parameter |
| ------ |
| `K` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `Error` |
| `event` | `string` \| `symbol` |
| ...`args` | `AnyRest` |

#### Returns

`void`

#### Inherited from

```ts
EventEmitter.[captureRejectionSymbol]
```

***

### add()

```ts
add(
   name,
   data,
   opts?
): Promise<Job<D, R> | null>;
```

Defined in: [glide-mq/src/queue.ts:744](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L744)

Add a single job to the queue.
Uses the glidemq_addJob server function to atomically create the job hash
and enqueue it to the stream (or scheduled ZSet if delayed/prioritized).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` |
| `data` | `D` |
| `opts?` | [`JobOptions`](../interfaces/JobOptions.md) |

#### Returns

`Promise`&lt;[`Job`](Job.md)&lt;`D`, `R`&gt; \| `null`&gt;

***

### addAndWait()

```ts
addAndWait(
   name,
   data,
   opts?
): Promise<R>;
```

Defined in: [glide-mq/src/queue.ts:902](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L902)

Add a job and wait for its completed/failed event using the queue events stream.
Captures the current tail entry ID before enqueue so fast completions are not missed.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` |
| `data` | `D` |
| `opts?` | [`AddAndWaitOptions`](../interfaces/AddAndWaitOptions.md) |

#### Returns

`Promise`&lt;`R`&gt;

***

### addBulk()

```ts
addBulk(jobs): Promise<Job<D, R>[]>;
```

Defined in: [glide-mq/src/queue.ts:979](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L979)

Add multiple jobs to the queue in a pipeline.
Uses GLIDE's Batch API to pipeline all addJob FCALL commands in a single round trip.
Non-atomic: each job is independent, but all are sent together for efficiency.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `jobs` | `object`[] |

#### Returns

`Promise`&lt;[`Job`](Job.md)&lt;`D`, `R`&gt;[]&gt;

***

### addListener()

```ts
addListener<K>(eventName, listener): this;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:642

Alias for `emitter.on(eventName, listener)`.

#### Type Parameters

| Type Parameter |
| ------ |
| `K` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`) => `void` |

#### Returns

`this`

#### Since

v0.1.26

#### Inherited from

```ts
EventEmitter.addListener
```

***

### clean()

```ts
clean(
   grace,
   limit,
   type
): Promise&lt;string[]>;
```

Defined in: [glide-mq/src/queue.ts:1673](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L1673)

Bulk-remove old completed or failed jobs by age.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `grace` | `number` | Minimum age in milliseconds. Jobs finished more recently than this are kept. |
| `limit` | `number` | Maximum number of jobs to remove in one call. |
| `type` | `"completed"` \| `"failed"` | Which job state to clean: 'completed' or 'failed'. |

#### Returns

`Promise`&lt;`string`[]&gt;

Array of removed job IDs.

***

### close()

```ts
close(): Promise&lt;void>;
```

Defined in: [glide-mq/src/queue.ts:3082](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L3082)

Close the queue and release the underlying client connection.
Idempotent: safe to call multiple times.

#### Returns

`Promise`&lt;`void`&gt;

***

### count()

```ts
count(): Promise&lt;number>;
```

Defined in: [glide-mq/src/queue.ts:2156](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L2156)

Get the count of waiting jobs (stream length).

#### Returns

`Promise`&lt;`number`&gt;

***

### createJobIndex()

```ts
createJobIndex(opts?): Promise&lt;void>;
```

Defined in: [glide-mq/src/queue.ts:2874](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L2874)

Create a Valkey Search index over job hashes for this queue.
Auto-includes base fields: name (TAG), state (TAG), timestamp (NUMERIC), priority (NUMERIC).

The index uses a queue-specific prefix that uniquely matches this queue's job hashes.
Requires the valkey-search module to be loaded on the server (standalone mode).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `opts?` | [`JobIndexOptions`](../interfaces/JobIndexOptions.md) |

#### Returns

`Promise`&lt;`void`&gt;

***

### drain()

```ts
drain(delayed?): Promise&lt;void>;
```

Defined in: [glide-mq/src/queue.ts:1685](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L1685)

Drain the queue: remove all waiting jobs without touching active jobs.
When delayed=true, also removes all delayed/scheduled jobs.
Deletes associated job hashes and emits a 'drained' event.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `delayed?` | `boolean` |

#### Returns

`Promise`&lt;`void`&gt;

***

### dropJobIndex()

```ts
dropJobIndex(name?): Promise&lt;void>;
```

Defined in: [glide-mq/src/queue.ts:2948](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L2948)

Drop a Valkey Search index. Indexed document keys (job hashes) are not affected.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `name?` | `string` |

#### Returns

`Promise`&lt;`void`&gt;

***

### emit()

```ts
emit<K>(eventName, ...args): boolean;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:904

Synchronously calls each of the listeners registered for the event named `eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
import { EventEmitter } from 'node:events';
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

#### Type Parameters

| Type Parameter |
| ------ |
| `K` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `eventName` | `string` \| `symbol` |
| ...`args` | `AnyRest` |

#### Returns

`boolean`

#### Since

v0.1.26

#### Inherited from

```ts
EventEmitter.emit
```

***

### eventNames()

```ts
eventNames(): (string | symbol)[];
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:967

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
import { EventEmitter } from 'node:events';

const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

#### Returns

(`string` \| `symbol`)[]

#### Since

v6.0.0

#### Inherited from

```ts
EventEmitter.eventNames
```

***

### getDeadLetterJob()

```ts
getDeadLetterJob(jobId, opts?): Promise<Job<D, R> | null>;
```

Defined in: [glide-mq/src/queue.ts:2679](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L2679)

Retrieve a single job from the configured dead letter queue.
Returns null when no DLQ is configured or the DLQ job does not exist.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `jobId` | `string` |
| `opts?` | [`GetJobsOptions`](../interfaces/GetJobsOptions.md) |

#### Returns

`Promise`&lt;[`Job`](Job.md)&lt;`D`, `R`&gt; \| `null`&gt;

***

### getDeadLetterJobs()

```ts
getDeadLetterJobs(
   start?,
   end?,
   opts?
): Promise<Job<D, R>[]>;
```

Defined in: [glide-mq/src/queue.ts:2608](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L2608)

Retrieve jobs from the dead letter queue configured for this queue.
Returns an empty array if no DLQ is configured.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `start` | `number` | `0` | Start index (default 0) |
| `end` | `number` | `-1` | End index (default -1, meaning all) |
| `opts?` | [`GetJobsOptions`](../interfaces/GetJobsOptions.md) | `undefined` | Set `excludeData: true` to omit `data` and `returnvalue` fields |

#### Returns

`Promise`&lt;[`Job`](Job.md)&lt;`D`, `R`&gt;[]&gt;

***

### getFlowBudget()

```ts
getFlowBudget(flowId): Promise<
  | {
  costUnit?: string;
  exceeded: boolean;
  maxCosts?: Record&lt;string, number>;
  maxTokens?: Record&lt;string, number>;
  maxTotalCost?: number;
  maxTotalTokens?: number;
  onExceeded: "fail" | "pause";
  tokenWeights?: Record&lt;string, number>;
  usedCost: number;
  usedTokens: number;
}
| null>;
```

Defined in: [glide-mq/src/queue.ts:2316](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L2316)

Read the budget state for a flow. Returns null if no budget was set.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `flowId` | `string` |

#### Returns

`Promise`&lt;
  \| \{
  `costUnit?`: `string`;
  `exceeded`: `boolean`;
  `maxCosts?`: `Record`&lt;`string`, `number`&gt;;
  `maxTokens?`: `Record`&lt;`string`, `number`&gt;;
  `maxTotalCost?`: `number`;
  `maxTotalTokens?`: `number`;
  `onExceeded`: `"fail"` \| `"pause"`;
  `tokenWeights?`: `Record`&lt;`string`, `number`&gt;;
  `usedCost`: `number`;
  `usedTokens`: `number`;
\}
  \| `null`&gt;

***

### getFlowUsage()

```ts
getFlowUsage(parentJobId): Promise<{
  costs: Record&lt;string, number>;
  costUnit?: string;
  jobCount: number;
  models: Record&lt;string, number>;
  tokens: Record&lt;string, number>;
  totalCost: number;
  totalTokens: number;
}>;
```

Defined in: [glide-mq/src/queue.ts:2216](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L2216)

Aggregate AI usage metadata across a flow (parent + children).
Walks the deps set of the parent job and sums token counts, cost, and model usage.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `parentJobId` | `string` |

#### Returns

`Promise`&lt;\{
  `costs`: `Record`&lt;`string`, `number`&gt;;
  `costUnit?`: `string`;
  `jobCount`: `number`;
  `models`: `Record`&lt;`string`, `number`&gt;;
  `tokens`: `Record`&lt;`string`, `number`&gt;;
  `totalCost`: `number`;
  `totalTokens`: `number`;
\}&gt;

***

### getGlobalRateLimit()

```ts
getGlobalRateLimit(): Promise<RateLimitConfig | null>;
```

Defined in: [glide-mq/src/queue.ts:1418](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L1418)

Get the current global rate limit for this queue.
Returns null if no global rate limit is configured.

#### Returns

`Promise`&lt;[`RateLimitConfig`](../interfaces/RateLimitConfig.md) \| `null`&gt;

***

### getJob()

```ts
getJob(id, opts?): Promise<Job<D, R> | null>;
```

Defined in: [glide-mq/src/queue.ts:1335](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L1335)

Retrieve a job by ID from the queue.
Returns null if the job does not exist.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | The job ID |
| `opts?` | [`GetJobsOptions`](../interfaces/GetJobsOptions.md) | Set `excludeData: true` to omit `data` and `returnvalue` fields |

#### Returns

`Promise`&lt;[`Job`](Job.md)&lt;`D`, `R`&gt; \| `null`&gt;

***

### getJobCountByTypes()

```ts
getJobCountByTypes(): Promise<JobCounts>;
```

Defined in: [glide-mq/src/queue.ts:2140](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L2140)

Get job counts by types. Alias for getJobCounts().

#### Returns

`Promise`&lt;[`JobCounts`](../interfaces/JobCounts.md)&gt;

***

### getJobCounts()

```ts
getJobCounts(): Promise<JobCounts>;
```

Defined in: [glide-mq/src/queue.ts:1713](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L1713)

Get job counts by state.
- waiting: stream length minus stream-active entries, plus LIFO and priority list lengths
- active: stream PEL count (XPENDING) plus list-active counter
- delayed: scheduled ZSet cardinality (includes both delayed and prioritized)
- completed: completed ZSet cardinality
- failed: failed ZSet cardinality

#### Returns

`Promise`&lt;[`JobCounts`](../interfaces/JobCounts.md)&gt;

***

### getJobLogs()

```ts
getJobLogs(
   id,
   start?,
   end?
): Promise<{
  count: number;
  logs: string[];
}>;
```

Defined in: [glide-mq/src/queue.ts:2200](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L2200)

Retrieve log entries for a job by ID.

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `id` | `string` | `undefined` |
| `start` | `number` | `0` |
| `end` | `number` | `-1` |

#### Returns

`Promise`&lt;\{
  `count`: `number`;
  `logs`: `string`[];
\}&gt;

***

### getJobs()

```ts
getJobs(
   type,
   start?,
   end?,
   opts?
): Promise<Job<D, R>[]>;
```

Defined in: [glide-mq/src/queue.ts:1875](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L1875)

Retrieve jobs by state with optional pagination.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `type` | `"completed"` \| `"failed"` \| `"delayed"` \| `"active"` \| `"waiting"` | `undefined` | The job state to query |
| `start` | `number` | `0` | Start index for pagination (default 0) |
| `end` | `number` | `-1` | End index for pagination (default -1, meaning all) |
| `opts?` | [`GetJobsOptions`](../interfaces/GetJobsOptions.md) | `undefined` | Set `excludeData: true` to omit `data` and `returnvalue` fields |

#### Returns

`Promise`&lt;[`Job`](Job.md)&lt;`D`, `R`&gt;[]&gt;

***

### getJobScheduler()

```ts
getJobScheduler(name): Promise<SchedulerEntry | null>;
```

Defined in: [glide-mq/src/queue.ts:2186](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L2186)

Get a single job scheduler entry by name.
Returns null if no scheduler with that name exists or if stored data is malformed.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` |

#### Returns

`Promise`&lt;[`SchedulerEntry`](../interfaces/SchedulerEntry.md) \| `null`&gt;

***

### getMaxListeners()

```ts
getMaxListeners(): number;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:819

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [EventEmitter.defaultMaxListeners](#defaultmaxlisteners).

#### Returns

`number`

#### Since

v1.0.0

#### Inherited from

```ts
EventEmitter.getMaxListeners
```

***

### getMetrics()

```ts
getMetrics(type, opts?): Promise<Metrics>;
```

Defined in: [glide-mq/src/queue.ts:1616](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L1616)

Get metrics for completed or failed jobs.
Returns total count and per-minute time-series data points with throughput and avg duration.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"completed"` \| `"failed"` |
| `opts?` | [`MetricsOptions`](../interfaces/MetricsOptions.md) |

#### Returns

`Promise`&lt;[`Metrics`](../interfaces/Metrics.md)&gt;

***

### getRepeatableJobs()

```ts
getRepeatableJobs(): Promise&lt;object[]>;
```

Defined in: [glide-mq/src/queue.ts:2164](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L2164)

Get all registered job schedulers (repeatable jobs).

#### Returns

`Promise`&lt;`object`[]&gt;

***

### getSuspendedJobs()

```ts
getSuspendedJobs(
   start?,
   end?,
   opts?
): Promise<Job<D, R>[]>;
```

Defined in: [glide-mq/src/queue.ts:2783](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L2783)

Retrieve jobs currently in the suspended state.
Results are ordered by the suspended ZSet score (timeout deadline).

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `start` | `number` | `0` |
| `end` | `number` | `-1` |
| `opts?` | [`GetJobsOptions`](../interfaces/GetJobsOptions.md) | `undefined` |

#### Returns

`Promise`&lt;[`Job`](Job.md)&lt;`D`, `R`&gt;[]&gt;

***

### getSuspendInfo()

```ts
getSuspendInfo(jobId): Promise<
  | {
  reason?: string;
  signals: SignalEntry[];
  suspendedAt: number;
  timeout?: number;
}
| null>;
```

Defined in: [glide-mq/src/queue.ts:2821](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L2821)

Get suspension information for a job.
Returns null if the job is not in the suspended state.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `jobId` | `string` |

#### Returns

`Promise`&lt;
  \| \{
  `reason?`: `string`;
  `signals`: [`SignalEntry`](../interfaces/SignalEntry.md)[];
  `suspendedAt`: `number`;
  `timeout?`: `number`;
\}
  \| `null`&gt;

***

### getUsageSummary()

```ts
getUsageSummary(opts?): Promise<UsageSummary>;
```

Defined in: [glide-mq/src/queue.ts:2450](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L2450)

Aggregate reported AI usage across queues for a rolling time window.
Uses per-minute buckets recorded by job.reportUsage(), avoiding job-hash scans.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `opts?` | [`UsageSummaryOptions`](../interfaces/UsageSummaryOptions.md) |

#### Returns

`Promise`&lt;[`UsageSummary`](../interfaces/UsageSummary.md)&gt;

***

### getWorkers()

```ts
getWorkers(): Promise<WorkerInfo[]>;
```

Defined in: [glide-mq/src/queue.ts:1432](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L1432)

List all active workers for this queue.
Workers register themselves with TTL-based keys; only live workers appear.
Returns an array of WorkerInfo sorted by startedAt (oldest first).

#### Returns

`Promise`&lt;[`WorkerInfo`](../interfaces/WorkerInfo.md)[]&gt;

***

### isPaused()

```ts
isPaused(): Promise&lt;boolean>;
```

Defined in: [glide-mq/src/queue.ts:2147](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L2147)

Check if the queue is paused.

#### Returns

`Promise`&lt;`boolean`&gt;

***

### listenerCount()

```ts
listenerCount<K>(eventName, listener?): number;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:913

Returns the number of listeners listening for the event named `eventName`.
If `listener` is provided, it will return how many times the listener is found
in the list of the listeners of the event.

#### Type Parameters

| Type Parameter |
| ------ |
| `K` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `eventName` | `string` \| `symbol` | The name of the event being listened for |
| `listener?` | `Function` | The event handler function |

#### Returns

`number`

#### Since

v3.2.0

#### Inherited from

```ts
EventEmitter.listenerCount
```

***

### listeners()

```ts
listeners<K>(eventName): Function[];
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:832

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// Prints: [ [Function] ]
```

#### Type Parameters

| Type Parameter |
| ------ |
| `K` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Since

v0.1.26

#### Inherited from

```ts
EventEmitter.listeners
```

***

### obliterate()

```ts
obliterate(opts?): Promise&lt;void>;
```

Defined in: [glide-mq/src/queue.ts:1756](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L1756)

Remove all data associated with this queue from the server.
If force=false (default), fails if there are active jobs (stream PEL
entries or active priority/LIFO list claims).
If force=true, deletes everything regardless of active jobs.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `opts?` | \{ `force?`: `boolean`; \} |
| `opts.force?` | `boolean` |

#### Returns

`Promise`&lt;`void`&gt;

***

### off()

```ts
off<K>(eventName, listener): this;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:792

Alias for `emitter.removeListener()`.

#### Type Parameters

| Type Parameter |
| ------ |
| `K` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`) => `void` |

#### Returns

`this`

#### Since

v10.0.0

#### Inherited from

```ts
EventEmitter.off
```

***

### on()

```ts
on<K>(eventName, listener): this;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:674

Adds the `listener` function to the end of the listeners array for the event
named `eventName`. No checks are made to see if the `listener` has already
been added. Multiple calls passing the same combination of `eventName` and
`listener` will result in the `listener` being added, and called, multiple times.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The `emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
import { EventEmitter } from 'node:events';
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

#### Type Parameters

| Type Parameter |
| ------ |
| `K` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`) => `void` | The callback function |

#### Returns

`this`

#### Since

v0.1.101

#### Inherited from

```ts
EventEmitter.on
```

***

### once()

```ts
once<K>(eventName, listener): this;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:704

Adds a **one-time** `listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The `emitter.prependOnceListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
import { EventEmitter } from 'node:events';
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependOnceListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

#### Type Parameters

| Type Parameter |
| ------ |
| `K` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`) => `void` | The callback function |

#### Returns

`this`

#### Since

v0.3.0

#### Inherited from

```ts
EventEmitter.once
```

***

### pause()

```ts
pause(): Promise&lt;void>;
```

Defined in: [glide-mq/src/queue.ts:1354](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L1354)

Pause the queue. Workers will stop picking up new jobs.

#### Returns

`Promise`&lt;`void`&gt;

***

### prependListener()

```ts
prependListener<K>(eventName, listener): this;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:931

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`
and `listener` will result in the `listener` being added, and called, multiple times.

```js
server.prependListener('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Type Parameters

| Type Parameter |
| ------ |
| `K` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`) => `void` | The callback function |

#### Returns

`this`

#### Since

v6.0.0

#### Inherited from

```ts
EventEmitter.prependListener
```

***

### prependOnceListener()

```ts
prependOnceListener<K>(eventName, listener): this;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:947

Adds a **one-time**`listener` function for the event named `eventName` to the _beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Type Parameters

| Type Parameter |
| ------ |
| `K` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`) => `void` | The callback function |

#### Returns

`this`

#### Since

v6.0.0

#### Inherited from

```ts
EventEmitter.prependOnceListener
```

***

### rateLimitGroup()

```ts
rateLimitGroup(
   groupKey,
   duration,
   opts?
): Promise&lt;number>;
```

Defined in: [glide-mq/src/queue.ts:2798](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L2798)

Rate-limit a specific ordering group from outside the worker processor.
Registers the group in the ratelimited ZADD  -  the scheduler will unblock it after duration.
Any in-flight job for the group continues; new activations are blocked until resumeAt.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `groupKey` | `string` |
| `duration` | `number` |
| `opts?` | \{ `extend?`: `"max"` \| `"replace"`; \} |
| `opts.extend?` | `"max"` \| `"replace"` |

#### Returns

`Promise`&lt;`number`&gt;

***

### rawListeners()

```ts
rawListeners<K>(eventName): Function[];
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:863

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```

#### Type Parameters

| Type Parameter |
| ------ |
| `K` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Since

v9.4.0

#### Inherited from

```ts
EventEmitter.rawListeners
```

***

### readStream()

```ts
readStream(jobId, opts?): Promise&lt;object[]>;
```

Defined in: [glide-mq/src/queue.ts:2557](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L2557)

Read entries from a job's streaming channel.
Uses XRANGE for non-blocking reads by default.
When `block` is set and > 0, uses XREAD with BLOCK for long-polling.
Pass lastId to resume from a known position.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `jobId` | `string` |
| `opts?` | [`ReadStreamOptions`](../interfaces/ReadStreamOptions.md) |

#### Returns

`Promise`&lt;`object`[]&gt;

***

### removeAllListeners()

```ts
removeAllListeners(eventName?): this;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:803

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `eventName?` | `string` \| `symbol` |

#### Returns

`this`

#### Since

v0.1.26

#### Inherited from

```ts
EventEmitter.removeAllListeners
```

***

### removeDeadLetterJob()

```ts
removeDeadLetterJob(jobId): Promise&lt;boolean>;
```

Defined in: [glide-mq/src/queue.ts:2703](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L2703)

Remove a single job from the configured dead letter queue.
Returns false when no DLQ is configured or the DLQ job does not exist.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `jobId` | `string` |

#### Returns

`Promise`&lt;`boolean`&gt;

***

### removeGlobalRateLimit()

```ts
removeGlobalRateLimit(): Promise&lt;void>;
```

Defined in: [glide-mq/src/queue.ts:1409](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L1409)

Remove the global rate limit for this queue.
Workers fall back to their local WorkerOptions.limiter if configured.

#### Returns

`Promise`&lt;`void`&gt;

***

### removeJobScheduler()

```ts
removeJobScheduler(name): Promise&lt;void>;
```

Defined in: [glide-mq/src/queue.ts:1602](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L1602)

Remove a job scheduler by name.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` |

#### Returns

`Promise`&lt;`void`&gt;

***

### removeListener()

```ts
removeListener<K>(eventName, listener): this;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:787

Removes the specified `listener` from the listener array for the event named `eventName`.

```js
const callback = (stream) => {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

`removeListener()` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `eventName`, then `removeListener()` must be
called multiple times to remove each instance.

Once an event is emitted, all listeners attached to it at the
time of emitting are called in order. This implies that any `removeListener()` or `removeAllListeners()` calls _after_ emitting and _before_ the last listener finishes execution
will not remove them from`emit()` in progress. Subsequent events behave as expected.

```js
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit('event');
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit('event');
// Prints:
//   A
```

Because listeners are managed using an internal array, calling this will
change the position indices of any listener registered _after_ the listener
being removed. This will not impact the order in which listeners are called,
but it means that any copies of the listener array as returned by
the `emitter.listeners()` method will need to be recreated.

When a single function has been added as a handler multiple times for a single
event (as in the example below), `removeListener()` will remove the most
recently added instance. In the example the `once('ping')` listener is removed:

```js
import { EventEmitter } from 'node:events';
const ee = new EventEmitter();

function pong() {
  console.log('pong');
}

ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);

ee.emit('ping');
ee.emit('ping');
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Type Parameters

| Type Parameter |
| ------ |
| `K` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`) => `void` |

#### Returns

`this`

#### Since

v0.1.26

#### Inherited from

```ts
EventEmitter.removeListener
```

***

### replayDeadLetterJob()

```ts
replayDeadLetterJob(jobId): Promise<Job&lt;any, any> | null>;
```

Defined in: [glide-mq/src/queue.ts:2720](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L2720)

Replay a job from the dead letter queue back to its original queue.
Returns the newly added job, or null when the DLQ job does not exist.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `jobId` | `string` |

#### Returns

`Promise`&lt;[`Job`](Job.md)&lt;`any`, `any`&gt; \| `null`&gt;

***

### resume()

```ts
resume(): Promise&lt;void>;
```

Defined in: [glide-mq/src/queue.ts:1364](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L1364)

Resume the queue after a pause.

#### Returns

`Promise`&lt;`void`&gt;

***

### retryJobs()

```ts
retryJobs(opts?): Promise&lt;number>;
```

Defined in: [glide-mq/src/queue.ts:1697](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L1697)

Bulk retry failed jobs.
Moves jobs from the failed set to the scheduled ZSet (delayed state).
Resets attemptsMade, failedReason, and finishedOn on each retried job.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `opts?` | \{ `count?`: `number`; \} | - |
| `opts.count?` | `number` | Maximum number of jobs to retry. Omit or 0 to retry all. |

#### Returns

`Promise`&lt;`number`&gt;

Number of jobs retried.

***

### revoke()

```ts
revoke(jobId): Promise&lt;string>;
```

Defined in: [glide-mq/src/queue.ts:1376](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L1376)

Revoke a job by ID.
If the job is waiting/delayed, it is immediately moved to the failed set with reason 'revoked'.
If the job is currently being processed, a revoked flag is set on the hash -
the worker will check this flag cooperatively and fire the AbortSignal.
Returns 'revoked', 'flagged', or 'not_found'.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `jobId` | `string` |

#### Returns

`Promise`&lt;`string`&gt;

***

### searchJobs()

```ts
searchJobs(opts): Promise<Job<D, R>[]>;
```

Defined in: [glide-mq/src/queue.ts:1954](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L1954)

Search for jobs matching the given criteria.
Supports filtering by state, name (exact match), and data fields (shallow key-value match).
If state is provided, searches only within that state's data structure.
If no state is provided, SCANs all job hashes matching the queue prefix.
Default limit: 100.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `opts` | [`SearchJobsOptions`](../interfaces/SearchJobsOptions.md) |

#### Returns

`Promise`&lt;[`Job`](Job.md)&lt;`D`, `R`&gt;[]&gt;

***

### setGlobalConcurrency()

```ts
setGlobalConcurrency(n): Promise&lt;void>;
```

Defined in: [glide-mq/src/queue.ts:1387](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L1387)

Set the global concurrency limit for this queue.
When set, workers will not pick up new jobs if the total number of
pending (active) jobs across all workers meets or exceeds this limit.
Set to 0 to remove the limit.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `n` | `number` |

#### Returns

`Promise`&lt;`void`&gt;

***

### setGlobalRateLimit()

```ts
setGlobalRateLimit(config): Promise&lt;void>;
```

Defined in: [glide-mq/src/queue.ts:1397](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L1397)

Set a global rate limit for this queue.
All workers will respect this limit dynamically (picked up within one scheduler tick).
While set, it replaces WorkerOptions.limiter on every worker (the limits are not combined).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`RateLimitConfig`](../interfaces/RateLimitConfig.md) |

#### Returns

`Promise`&lt;`void`&gt;

***

### setMaxListeners()

```ts
setMaxListeners(n): this;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:813

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to `Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `n` | `number` |

#### Returns

`this`

#### Since

v0.3.5

#### Inherited from

```ts
EventEmitter.setMaxListeners
```

***

### signal()

```ts
signal(
   jobId,
   signalName,
   data?
): Promise&lt;boolean>;
```

Defined in: [glide-mq/src/queue.ts:2810](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L2810)

Send a signal to a suspended job, resuming it.
The job moves back to waiting state and re-enters the stream.
Returns true if the job was resumed, false if it was not in suspended state.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `jobId` | `string` |
| `signalName` | `string` |
| `data?` | `any` |

#### Returns

`Promise`&lt;`boolean`&gt;

***

### updateFlowBudget()

```ts
updateFlowBudget(flowId, limits): Promise<
  | {
  costUnit?: string;
  exceeded: boolean;
  maxCosts?: Record&lt;string, number>;
  maxTokens?: Record&lt;string, number>;
  maxTotalCost?: number;
  maxTotalTokens?: number;
  onExceeded: "fail" | "pause";
  tokenWeights?: Record&lt;string, number>;
  usedCost: number;
  usedTokens: number;
}
| null>;
```

Defined in: [glide-mq/src/queue.ts:2357](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L2357)

Change the limits of a flow budget. Only the given fields change; null
deletes a limit. The exceeded flag is re-evaluated against the usage
already charged, so raising the limits above it resumes the flow: jobs
paused by onExceeded 'pause' run at their next re-check
(Worker.BUDGET_PAUSE_RECHECK_MS) or when promoted. Returns the new
budget state, or null when the flow has no budget.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `flowId` | `string` |
| `limits` | \{ `costUnit?`: `string` \| `null`; `maxCosts?`: `Record`&lt;`string`, `number`&gt; \| `null`; `maxTokens?`: `Record`&lt;`string`, `number`&gt; \| `null`; `maxTotalCost?`: `number` \| `null`; `maxTotalTokens?`: `number` \| `null`; `onExceeded?`: `"fail"` \| `"pause"`; `tokenWeights?`: `Record`&lt;`string`, `number`&gt; \| `null`; \} |
| `limits.costUnit?` | `string` \| `null` |
| `limits.maxCosts?` | `Record`&lt;`string`, `number`&gt; \| `null` |
| `limits.maxTokens?` | `Record`&lt;`string`, `number`&gt; \| `null` |
| `limits.maxTotalCost?` | `number` \| `null` |
| `limits.maxTotalTokens?` | `number` \| `null` |
| `limits.onExceeded?` | `"fail"` \| `"pause"` |
| `limits.tokenWeights?` | `Record`&lt;`string`, `number`&gt; \| `null` |

#### Returns

`Promise`&lt;
  \| \{
  `costUnit?`: `string`;
  `exceeded`: `boolean`;
  `maxCosts?`: `Record`&lt;`string`, `number`&gt;;
  `maxTokens?`: `Record`&lt;`string`, `number`&gt;;
  `maxTotalCost?`: `number`;
  `maxTotalTokens?`: `number`;
  `onExceeded`: `"fail"` \| `"pause"`;
  `tokenWeights?`: `Record`&lt;`string`, `number`&gt;;
  `usedCost`: `number`;
  `usedTokens`: `number`;
\}
  \| `null`&gt;

***

### upsertJobScheduler()

```ts
upsertJobScheduler(
   name,
   schedule,
   template?
): Promise&lt;void>;
```

Defined in: [glide-mq/src/queue.ts:1484](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L1484)

Upsert a job scheduler (repeatable/cron job).
Stores the scheduler config in the schedulers hash.
Computes the initial nextRun based on the schedule.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` |
| `schedule` | [`ScheduleOpts`](../interfaces/ScheduleOpts.md) |
| `template?` | [`JobTemplate`](../interfaces/JobTemplate.md) |

#### Returns

`Promise`&lt;`void`&gt;

***

### vectorSearch()

```ts
vectorSearch(embedding, opts?): Promise<VectorSearchResult<D, R>[]>;
```

Defined in: [glide-mq/src/queue.ts:2964](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L2964)

Search for jobs by vector similarity (KNN) using a Valkey Search index.
Requires a prior call to createJobIndex with a vectorField configured.

The search is automatically scoped to this queue via the index prefix.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `embedding` | `Float32Array`&lt;`ArrayBufferLike`&gt; \| `number`[] | The query vector (number[] or Float32Array). |
| `opts?` | [`VectorSearchOptions`](../interfaces/VectorSearchOptions.md) | Search options (index name, k, pre-filter, return fields, score field). |

#### Returns

`Promise`&lt;[`VectorSearchResult`](../interfaces/VectorSearchResult.md)&lt;`D`, `R`&gt;[]&gt;

Array of { job, score } sorted by similarity (best first).

***

### addAbortListener()

```ts
static addAbortListener(signal, resource): Disposable;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:403

Listens once to the `abort` event on the provided `signal`.

Listening to the `abort` event on abort signals is unsafe and may
lead to resource leaks since another third party with the signal can
call `e.stopImmediatePropagation()`. Unfortunately Node.js cannot change
this since it would violate the web standard. Additionally, the original
API makes it easy to forget to remove listeners.

This API allows safely using `AbortSignal`s in Node.js APIs by solving these
two issues by listening to the event such that `stopImmediatePropagation` does
not prevent the listener from running.

Returns a disposable so that it may be unsubscribed from more easily.

```js
import { addAbortListener } from 'node:events';

function example(signal) {
  let disposable;
  try {
    signal.addEventListener('abort', (e) => e.stopImmediatePropagation());
    disposable = addAbortListener(signal, (e) => {
      // Do something when signal is aborted.
    });
  } finally {
    disposable?.[Symbol.dispose]();
  }
}
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `signal` | `AbortSignal` |
| `resource` | (`event`) => `void` |

#### Returns

`Disposable`

Disposable that removes the `abort` listener.

#### Since

v20.5.0

#### Inherited from

```ts
EventEmitter.addAbortListener
```

***

### getEventListeners()

```ts
static getEventListeners(emitter, name): Function[];
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:325

Returns a copy of the array of listeners for the event named `eventName`.

For `EventEmitter`s this behaves exactly the same as calling `.listeners` on
the emitter.

For `EventTarget`s this is the only way to get the event listeners for the
event target. This is useful for debugging and diagnostic purposes.

```js
import { getEventListeners, EventEmitter } from 'node:events';

{
  const ee = new EventEmitter();
  const listener = () => console.log('Events are fun');
  ee.on('foo', listener);
  console.log(getEventListeners(ee, 'foo')); // [ [Function: listener] ]
}
{
  const et = new EventTarget();
  const listener = () => console.log('Events are fun');
  et.addEventListener('foo', listener);
  console.log(getEventListeners(et, 'foo')); // [ [Function: listener] ]
}
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `emitter` | `EventEmitter`&lt;`DefaultEventMap`&gt; \| `EventTarget` |
| `name` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Since

v15.2.0, v14.17.0

#### Inherited from

```ts
EventEmitter.getEventListeners
```

***

### getMaxListeners()

```ts
static getMaxListeners(emitter): number;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:354

Returns the currently set max amount of listeners.

For `EventEmitter`s this behaves exactly the same as calling `.getMaxListeners` on
the emitter.

For `EventTarget`s this is the only way to get the max event listeners for the
event target. If the number of event handlers on a single EventTarget exceeds
the max set, the EventTarget will print a warning.

```js
import { getMaxListeners, setMaxListeners, EventEmitter } from 'node:events';

{
  const ee = new EventEmitter();
  console.log(getMaxListeners(ee)); // 10
  setMaxListeners(11, ee);
  console.log(getMaxListeners(ee)); // 11
}
{
  const et = new EventTarget();
  console.log(getMaxListeners(et)); // 10
  setMaxListeners(11, et);
  console.log(getMaxListeners(et)); // 11
}
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `emitter` | `EventEmitter`&lt;`DefaultEventMap`&gt; \| `EventTarget` |

#### Returns

`number`

#### Since

v19.9.0

#### Inherited from

```ts
EventEmitter.getMaxListeners
```

***

### getUsageSummary()

```ts
static getUsageSummary(opts): Promise<UsageSummary>;
```

Defined in: [glide-mq/src/queue.ts:2463](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/queue.ts#L2463)

Aggregate reported AI usage across queues for a rolling time window.
Pass either an existing client or connection options for a temporary client.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `opts` | [`UsageSummaryOptions`](../interfaces/UsageSummaryOptions.md) & `Pick`&lt;[`QueueOptions`](../interfaces/QueueOptions.md), `"client"` \| `"connection"` \| `"prefix"`&gt; |

#### Returns

`Promise`&lt;[`UsageSummary`](../interfaces/UsageSummary.md)&gt;

***

### ~~listenerCount()~~

```ts
static listenerCount(emitter, eventName): number;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:297

A class method that returns the number of listeners for the given `eventName` registered on the given `emitter`.

```js
import { EventEmitter, listenerCount } from 'node:events';

const myEmitter = new EventEmitter();
myEmitter.on('event', () => {});
myEmitter.on('event', () => {});
console.log(listenerCount(myEmitter, 'event'));
// Prints: 2
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `emitter` | `EventEmitter` | The emitter to query |
| `eventName` | `string` \| `symbol` | The event name |

#### Returns

`number`

#### Since

v0.9.12

#### Deprecated

Since v3.2.0 - Use `listenerCount` instead.

#### Inherited from

```ts
EventEmitter.listenerCount
```

***

### on()

#### Call Signature

```ts
static on(
   emitter,
   eventName,
   options?
): AsyncIterator&lt;any[]>;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:270

```js
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

const ee = new EventEmitter();

// Emit later on
process.nextTick(() => {
  ee.emit('foo', 'bar');
  ee.emit('foo', 42);
});

for await (const event of on(ee, 'foo')) {
  // The execution of this inner block is synchronous and it
  // processes one event at a time (even with await). Do not use
  // if concurrent execution is required.
  console.log(event); // prints ['bar'] [42]
}
// Unreachable here
```

Returns an `AsyncIterator` that iterates `eventName` events. It will throw
if the `EventEmitter` emits `'error'`. It removes all listeners when
exiting the loop. The `value` returned by each iteration is an array
composed of the emitted event arguments.

An `AbortSignal` can be used to cancel waiting on events:

```js
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

const ac = new AbortController();

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo', { signal: ac.signal })) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();

process.nextTick(() => ac.abort());
```

Use the `close` option to specify an array of event names that will end the iteration:

```js
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

const ee = new EventEmitter();

// Emit later on
process.nextTick(() => {
  ee.emit('foo', 'bar');
  ee.emit('foo', 42);
  ee.emit('close');
});

for await (const event of on(ee, 'foo', { close: ['close'] })) {
  console.log(event); // prints ['bar'] [42]
}
// the loop will exit after 'close' is emitted
console.log('done'); // prints 'done'
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `emitter` | `EventEmitter` |
| `eventName` | `string` \| `symbol` |
| `options?` | `StaticEventEmitterIteratorOptions` |

##### Returns

`AsyncIterator`&lt;`any`[]&gt;

An `AsyncIterator` that iterates `eventName` events emitted by the `emitter`

##### Since

v13.6.0, v12.16.0

##### Inherited from

```ts
EventEmitter.on
```

#### Call Signature

```ts
static on(
   emitter,
   eventName,
   options?
): AsyncIterator&lt;any[]>;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:275

```js
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

const ee = new EventEmitter();

// Emit later on
process.nextTick(() => {
  ee.emit('foo', 'bar');
  ee.emit('foo', 42);
});

for await (const event of on(ee, 'foo')) {
  // The execution of this inner block is synchronous and it
  // processes one event at a time (even with await). Do not use
  // if concurrent execution is required.
  console.log(event); // prints ['bar'] [42]
}
// Unreachable here
```

Returns an `AsyncIterator` that iterates `eventName` events. It will throw
if the `EventEmitter` emits `'error'`. It removes all listeners when
exiting the loop. The `value` returned by each iteration is an array
composed of the emitted event arguments.

An `AbortSignal` can be used to cancel waiting on events:

```js
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

const ac = new AbortController();

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo', { signal: ac.signal })) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();

process.nextTick(() => ac.abort());
```

Use the `close` option to specify an array of event names that will end the iteration:

```js
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

const ee = new EventEmitter();

// Emit later on
process.nextTick(() => {
  ee.emit('foo', 'bar');
  ee.emit('foo', 42);
  ee.emit('close');
});

for await (const event of on(ee, 'foo', { close: ['close'] })) {
  console.log(event); // prints ['bar'] [42]
}
// the loop will exit after 'close' is emitted
console.log('done'); // prints 'done'
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `emitter` | `EventTarget` |
| `eventName` | `string` |
| `options?` | `StaticEventEmitterIteratorOptions` |

##### Returns

`AsyncIterator`&lt;`any`[]&gt;

An `AsyncIterator` that iterates `eventName` events emitted by the `emitter`

##### Since

v13.6.0, v12.16.0

##### Inherited from

```ts
EventEmitter.on
```

***

### once()

#### Call Signature

```ts
static once(
   emitter,
   eventName,
   options?
): Promise&lt;any[]>;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:184

Creates a `Promise` that is fulfilled when the `EventEmitter` emits the given
event or that is rejected if the `EventEmitter` emits `'error'` while waiting.
The `Promise` will resolve with an array of all the arguments emitted to the
given event.

This method is intentionally generic and works with the web platform [EventTarget](https://dom.spec.whatwg.org/#interface-eventtarget) interface, which has no special`'error'` event
semantics and does not listen to the `'error'` event.

```js
import { once, EventEmitter } from 'node:events';
import process from 'node:process';

const ee = new EventEmitter();

process.nextTick(() => {
  ee.emit('myevent', 42);
});

const [value] = await once(ee, 'myevent');
console.log(value);

const err = new Error('kaboom');
process.nextTick(() => {
  ee.emit('error', err);
});

try {
  await once(ee, 'myevent');
} catch (err) {
  console.error('error happened', err);
}
```

The special handling of the `'error'` event is only used when `events.once()` is used to wait for another event. If `events.once()` is used to wait for the
'`error'` event itself, then it is treated as any other kind of event without
special handling:

```js
import { EventEmitter, once } from 'node:events';

const ee = new EventEmitter();

once(ee, 'error')
  .then(([err]) => console.log('ok', err.message))
  .catch((err) => console.error('error', err.message));

ee.emit('error', new Error('boom'));

// Prints: ok boom
```

An `AbortSignal` can be used to cancel waiting for the event:

```js
import { EventEmitter, once } from 'node:events';

const ee = new EventEmitter();
const ac = new AbortController();

async function foo(emitter, event, signal) {
  try {
    await once(emitter, event, { signal });
    console.log('event emitted!');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Waiting for the event was canceled!');
    } else {
      console.error('There was an error', error.message);
    }
  }
}

foo(ee, 'foo', ac.signal);
ac.abort(); // Abort waiting for the event
ee.emit('foo'); // Prints: Waiting for the event was canceled!
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `emitter` | `EventEmitter` |
| `eventName` | `string` \| `symbol` |
| `options?` | `StaticEventEmitterOptions` |

##### Returns

`Promise`&lt;`any`[]&gt;

##### Since

v11.13.0, v10.16.0

##### Inherited from

```ts
EventEmitter.once
```

#### Call Signature

```ts
static once(
   emitter,
   eventName,
   options?
): Promise&lt;any[]>;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:189

Creates a `Promise` that is fulfilled when the `EventEmitter` emits the given
event or that is rejected if the `EventEmitter` emits `'error'` while waiting.
The `Promise` will resolve with an array of all the arguments emitted to the
given event.

This method is intentionally generic and works with the web platform [EventTarget](https://dom.spec.whatwg.org/#interface-eventtarget) interface, which has no special`'error'` event
semantics and does not listen to the `'error'` event.

```js
import { once, EventEmitter } from 'node:events';
import process from 'node:process';

const ee = new EventEmitter();

process.nextTick(() => {
  ee.emit('myevent', 42);
});

const [value] = await once(ee, 'myevent');
console.log(value);

const err = new Error('kaboom');
process.nextTick(() => {
  ee.emit('error', err);
});

try {
  await once(ee, 'myevent');
} catch (err) {
  console.error('error happened', err);
}
```

The special handling of the `'error'` event is only used when `events.once()` is used to wait for another event. If `events.once()` is used to wait for the
'`error'` event itself, then it is treated as any other kind of event without
special handling:

```js
import { EventEmitter, once } from 'node:events';

const ee = new EventEmitter();

once(ee, 'error')
  .then(([err]) => console.log('ok', err.message))
  .catch((err) => console.error('error', err.message));

ee.emit('error', new Error('boom'));

// Prints: ok boom
```

An `AbortSignal` can be used to cancel waiting for the event:

```js
import { EventEmitter, once } from 'node:events';

const ee = new EventEmitter();
const ac = new AbortController();

async function foo(emitter, event, signal) {
  try {
    await once(emitter, event, { signal });
    console.log('event emitted!');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Waiting for the event was canceled!');
    } else {
      console.error('There was an error', error.message);
    }
  }
}

foo(ee, 'foo', ac.signal);
ac.abort(); // Abort waiting for the event
ee.emit('foo'); // Prints: Waiting for the event was canceled!
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `emitter` | `EventTarget` |
| `eventName` | `string` |
| `options?` | `StaticEventEmitterOptions` |

##### Returns

`Promise`&lt;`any`[]&gt;

##### Since

v11.13.0, v10.16.0

##### Inherited from

```ts
EventEmitter.once
```

***

### setMaxListeners()

```ts
static setMaxListeners(n?, ...eventTargets): void;
```

Defined in: glide-mq/node\_modules/@types/node/events.d.ts:369

```js
import { setMaxListeners, EventEmitter } from 'node:events';

const target = new EventTarget();
const emitter = new EventEmitter();

setMaxListeners(5, target, emitter);
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `n?` | `number` | A non-negative number. The maximum number of listeners per `EventTarget` event. |
| ...`eventTargets?` | (`EventEmitter`&lt;`DefaultEventMap`&gt; \| `EventTarget`)[] | Zero or more {EventTarget} or {EventEmitter} instances. If none are specified, `n` is set as the default max for all newly created {EventTarget} and {EventEmitter} objects. |

#### Returns

`void`

#### Since

v15.4.0

#### Inherited from

```ts
EventEmitter.setMaxListeners
```
