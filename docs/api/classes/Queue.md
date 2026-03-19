# Class: Queue&lt;D, R&gt;

Defined in: [glide-mq/src/queue.ts:93](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L93)

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

Defined in: [glide-mq/src/queue.ts:107](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L107)

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

Defined in: [glide-mq/src/queue.ts:94](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L94)

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
   event, ...
   args): void;
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
opts?): Promise<Job<D, R> | null>;
```

Defined in: [glide-mq/src/queue.ts:223](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L223)

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
opts?): Promise<R>;
```

Defined in: [glide-mq/src/queue.ts:413](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L413)

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

Defined in: [glide-mq/src/queue.ts:480](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L480)

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
type): Promise&lt;string[]>;
```

Defined in: [glide-mq/src/queue.ts:1141](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L1141)

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

Defined in: [glide-mq/src/queue.ts:1744](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L1744)

Close the queue and release the underlying client connection.
Idempotent: safe to call multiple times.

#### Returns

`Promise`&lt;`void`&gt;

***

### count()

```ts
count(): Promise&lt;number>;
```

Defined in: [glide-mq/src/queue.ts:1635](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L1635)

Get the count of waiting jobs (stream length).

#### Returns

`Promise`&lt;`number`&gt;

***

### drain()

```ts
drain(delayed?): Promise&lt;void>;
```

Defined in: [glide-mq/src/queue.ts:1153](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L1153)

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

### getDeadLetterJobs()

```ts
getDeadLetterJobs(
   start?, 
   end?, 
opts?): Promise<Job<D, R>[]>;
```

Defined in: [glide-mq/src/queue.ts:1698](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L1698)

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

### getGlobalRateLimit()

```ts
getGlobalRateLimit(): Promise<RateLimitConfig | null>;
```

Defined in: [glide-mq/src/queue.ts:916](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L916)

Get the current global rate limit for this queue.
Returns null if no global rate limit is configured.

#### Returns

`Promise`&lt;[`RateLimitConfig`](../interfaces/RateLimitConfig.md) \| `null`&gt;

***

### getJob()

```ts
getJob(id, opts?): Promise<Job<D, R> | null>;
```

Defined in: [glide-mq/src/queue.ts:835](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L835)

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

Defined in: [glide-mq/src/queue.ts:1619](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L1619)

Get job counts by types. Alias for getJobCounts().

#### Returns

`Promise`&lt;[`JobCounts`](../interfaces/JobCounts.md)&gt;

***

### getJobCounts()

```ts
getJobCounts(): Promise<JobCounts>;
```

Defined in: [glide-mq/src/queue.ts:1181](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L1181)

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
   end?): Promise<{
  count: number;
  logs: string[];
}>;
```

Defined in: [glide-mq/src/queue.ts:1679](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L1679)

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
opts?): Promise<Job<D, R>[]>;
```

Defined in: [glide-mq/src/queue.ts:1349](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L1349)

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

Defined in: [glide-mq/src/queue.ts:1665](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L1665)

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

Defined in: [glide-mq/src/queue.ts:1084](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L1084)

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

Defined in: [glide-mq/src/queue.ts:1643](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L1643)

Get all registered job schedulers (repeatable jobs).

#### Returns

`Promise`&lt;`object`[]&gt;

***

### getWorkers()

```ts
getWorkers(): Promise<WorkerInfo[]>;
```

Defined in: [glide-mq/src/queue.ts:930](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L930)

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

Defined in: [glide-mq/src/queue.ts:1626](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L1626)

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

Defined in: [glide-mq/src/queue.ts:1223](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L1223)

Remove all data associated with this queue from the server.
If force=false (default), fails if there are active jobs.
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

Defined in: [glide-mq/src/queue.ts:854](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L854)

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

### removeGlobalRateLimit()

```ts
removeGlobalRateLimit(): Promise&lt;void>;
```

Defined in: [glide-mq/src/queue.ts:907](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L907)

Remove the global rate limit for this queue.
Workers fall back to their local WorkerOptions.limiter if configured.

#### Returns

`Promise`&lt;`void`&gt;

***

### removeJobScheduler()

```ts
removeJobScheduler(name): Promise&lt;void>;
```

Defined in: [glide-mq/src/queue.ts:1070](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L1070)

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

### resume()

```ts
resume(): Promise&lt;void>;
```

Defined in: [glide-mq/src/queue.ts:862](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L862)

Resume the queue after a pause.

#### Returns

`Promise`&lt;`void`&gt;

***

### retryJobs()

```ts
retryJobs(opts?): Promise&lt;number>;
```

Defined in: [glide-mq/src/queue.ts:1165](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L1165)

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

Defined in: [glide-mq/src/queue.ts:874](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L874)

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

Defined in: [glide-mq/src/queue.ts:1428](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L1428)

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

Defined in: [glide-mq/src/queue.ts:885](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L885)

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

Defined in: [glide-mq/src/queue.ts:895](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L895)

Set a global rate limit for this queue.
All workers will respect this limit dynamically (picked up within one scheduler tick).
Takes precedence over WorkerOptions.limiter when set.

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

### upsertJobScheduler()

```ts
upsertJobScheduler(
   name, 
   schedule, 
template?): Promise&lt;void>;
```

Defined in: [glide-mq/src/queue.ts:981](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/queue.ts#L981)

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
options?): AsyncIterator&lt;any[]>;
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
options?): AsyncIterator&lt;any[]>;
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
options?): Promise&lt;any[]>;
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
options?): Promise&lt;any[]>;
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
