# Class: Job&lt;D, R&gt;

Defined in: [glide-mq/src/job.ts:181](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L181)

Represents a single job in the queue.
Provides methods for reporting usage, streaming chunks, managing state,
and interacting with the job lifecycle (delay, suspend, retry, etc.).

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `D` | `any` |
| `R` | `any` |

## Properties

### abortSignal?

```ts
optional abortSignal?: AbortSignal;
```

Defined in: [glide-mq/src/job.ts:230](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L230)

AbortSignal that fires when this job is revoked during processing.
The processor should check signal.aborted cooperatively.
Only set when the job is being processed by a Worker.

***

### attemptsMade

```ts
attemptsMade: number;
```

Defined in: [glide-mq/src/job.ts:186](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L186)

***

### budgetKey?

```ts
optional budgetKey?: string;
```

Defined in: [glide-mq/src/job.ts:207](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L207)

Budget key for flow-level budget enforcement. Set when the job belongs to a budgeted flow.

***

### cost?

```ts
optional cost?: number;
```

Defined in: [glide-mq/src/job.ts:202](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L202)

***

### data

```ts
data: D;
```

Defined in: [glide-mq/src/job.ts:184](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L184)

***

### deserializationFailed

```ts
deserializationFailed: boolean = false;
```

Defined in: [glide-mq/src/job.ts:271](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L271)

Set to true when data or returnvalue could not be deserialized from Valkey.
This typically indicates a serializer mismatch between the producer and consumer.
When true, `data` is set to `{} as D` and `returnvalue` to `undefined`.

***

### discarded

```ts
discarded: boolean = false;
```

Defined in: [glide-mq/src/job.ts:239](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L239)

When true, the job will not be retried on failure regardless of attempts config.
Set by calling `discard()` inside the processor.

***

### expireAt?

```ts
optional expireAt?: number;
```

Defined in: [glide-mq/src/job.ts:203](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L203)

***

### failedReason

```ts
failedReason: string | undefined;
```

Defined in: [glide-mq/src/job.ts:188](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L188)

***

### fallbackIndex

```ts
fallbackIndex: number = 0;
```

Defined in: [glide-mq/src/job.ts:210](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L210)

Current position in the fallback chain. 0 = original request, 1+ = fallback entries.

***

### finishedOn

```ts
finishedOn: number | undefined;
```

Defined in: [glide-mq/src/job.ts:191](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L191)

***

### groupKey?

```ts
optional groupKey?: string;
```

Defined in: [glide-mq/src/job.ts:201](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L201)

***

### id

```ts
readonly id: string;
```

Defined in: [glide-mq/src/job.ts:182](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L182)

***

### name

```ts
readonly name: string;
```

Defined in: [glide-mq/src/job.ts:183](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L183)

***

### opts

```ts
readonly opts: JobOptions;
```

Defined in: [glide-mq/src/job.ts:185](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L185)

***

### orderingKey?

```ts
optional orderingKey?: string;
```

Defined in: [glide-mq/src/job.ts:199](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L199)

***

### orderingSeq?

```ts
optional orderingSeq?: number;
```

Defined in: [glide-mq/src/job.ts:200](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L200)

***

### parentId?

```ts
optional parentId?: string;
```

Defined in: [glide-mq/src/job.ts:193](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L193)

***

### parentIds?

```ts
optional parentIds?: string[];
```

Defined in: [glide-mq/src/job.ts:196](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L196)

Additional parent IDs for DAG multi-parent jobs.

***

### parentQueue?

```ts
optional parentQueue?: string;
```

Defined in: [glide-mq/src/job.ts:194](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L194)

***

### parentQueues?

```ts
optional parentQueues?: string[];
```

Defined in: [glide-mq/src/job.ts:198](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L198)

Additional parent queues for DAG multi-parent jobs (parallel array to parentIds).

***

### processedOn

```ts
processedOn: number | undefined;
```

Defined in: [glide-mq/src/job.ts:192](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L192)

***

### progress

```ts
progress: number | object;
```

Defined in: [glide-mq/src/job.ts:189](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L189)

***

### returnvalue

```ts
returnvalue: R | undefined;
```

Defined in: [glide-mq/src/job.ts:187](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L187)

***

### schedulerName?

```ts
optional schedulerName?: string;
```

Defined in: [glide-mq/src/job.ts:204](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L204)

***

### signals

```ts
signals: SignalEntry[] = [];
```

Defined in: [glide-mq/src/job.ts:233](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L233)

Signals delivered to this job while it was suspended.

***

### timestamp

```ts
timestamp: number;
```

Defined in: [glide-mq/src/job.ts:190](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L190)

***

### tpmTokens?

```ts
optional tpmTokens?: number;
```

Defined in: [glide-mq/src/job.ts:216](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L216)

Tokens reported via reportTokens() for TPM rate limiting.

***

### usage?

```ts
optional usage?: JobUsage;
```

Defined in: [glide-mq/src/job.ts:213](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L213)

AI-specific usage metadata reported via reportUsage().

## Accessors

### currentFallback

#### Get Signature

```ts
get currentFallback():
  | {
  metadata?: Record&lt;string, unknown>;
  model: string;
  provider?: string;
}
  | undefined;
```

Defined in: [glide-mq/src/job.ts:314](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L314)

The current fallback entry, or undefined when running the original request.
fallbackIndex=0 means original (no fallback). On first failure, fallbackIndex
becomes 1 and currentFallback returns fallbacks[0], etc.

##### Returns

  \| \{
  `metadata?`: `Record`&lt;`string`, `unknown`&gt;;
  `model`: `string`;
  `provider?`: `string`;
\}
  \| `undefined`

## Methods

### changeDelay()

```ts
changeDelay(newDelay): Promise&lt;void>;
```

Defined in: [glide-mq/src/job.ts:726](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L726)

Change the delay of this job. Supports delayed, waiting, and prioritized states.
Setting delay to 0 promotes a delayed job immediately.
Setting delay > 0 on a waiting/prioritized job moves it to the scheduled ZSet.
Throws if the job is in an invalid state (active, completed, failed).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `newDelay` | `number` |

#### Returns

`Promise`&lt;`void`&gt;

***

### changePriority()

```ts
changePriority(newPriority): Promise&lt;void>;
```

Defined in: [glide-mq/src/job.ts:706](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L706)

Change the priority of this job. Supports waiting, prioritized, and delayed states.
Setting priority to 0 moves a prioritized job back to the stream (waiting).
Throws if the job is in an invalid state (active, completed, failed).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `newPriority` | `number` |

#### Returns

`Promise`&lt;`void`&gt;

***

### discard()

```ts
discard(): void;
```

Defined in: [glide-mq/src/job.ts:491](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L491)

Mark this job so it will not be retried on failure.
Call inside the processor before throwing to skip all remaining attempts.

#### Returns

`void`

***

### getChildrenValues()

```ts
getChildrenValues(): Promise<Record&lt;string, R>>;
```

Defined in: [glide-mq/src/job.ts:575](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L575)

Read return values from all child jobs (for flow/parent-child patterns).

#### Returns

`Promise`&lt;`Record`&lt;`string`, `R`&gt;&gt;

***

### getParents()

```ts
getParents(): Promise&lt;object[]>;
```

Defined in: [glide-mq/src/job.ts:622](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L622)

Read all parent references for this job (for DAG multi-parent patterns).
Returns an array of { queue, id } for each parent.
For single-parent jobs, returns an array with one element.
For jobs with no parent, returns an empty array.

#### Returns

`Promise`&lt;`object`[]&gt;

***

### getState()

```ts
getState(): Promise&lt;string>;
```

Defined in: [glide-mq/src/job.ts:863](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L863)

Read the current state from the job hash.

#### Returns

`Promise`&lt;`string`&gt;

***

### isActive()

```ts
isActive(): Promise&lt;boolean>;
```

Defined in: [glide-mq/src/job.ts:841](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L841)

Check if this job is in the active state.

#### Returns

`Promise`&lt;`boolean`&gt;

***

### isCompleted()

```ts
isCompleted(): Promise&lt;boolean>;
```

Defined in: [glide-mq/src/job.ts:820](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L820)

Check if this job is in the completed state.

#### Returns

`Promise`&lt;`boolean`&gt;

***

### isDelayed()

```ts
isDelayed(): Promise&lt;boolean>;
```

Defined in: [glide-mq/src/job.ts:834](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L834)

Check if this job is in the delayed state.

#### Returns

`Promise`&lt;`boolean`&gt;

***

### isFailed()

```ts
isFailed(): Promise&lt;boolean>;
```

Defined in: [glide-mq/src/job.ts:827](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L827)

Check if this job is in the failed state.

#### Returns

`Promise`&lt;`boolean`&gt;

***

### isRevoked()

```ts
isRevoked(): Promise&lt;boolean>;
```

Defined in: [glide-mq/src/job.ts:855](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L855)

Check if this job has been revoked.

#### Returns

`Promise`&lt;`boolean`&gt;

***

### isWaiting()

```ts
isWaiting(): Promise&lt;boolean>;
```

Defined in: [glide-mq/src/job.ts:848](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L848)

Check if this job is in the waiting state.

#### Returns

`Promise`&lt;`boolean`&gt;

***

### log()

```ts
log(message): Promise&lt;void>;
```

Defined in: [glide-mq/src/job.ts:322](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L322)

Append a log line to this job's log list.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |

#### Returns

`Promise`&lt;`void`&gt;

***

### moveToDelayed()

```ts
moveToDelayed(timestamp, nextStep?): Promise&lt;never>;
```

Defined in: [glide-mq/src/job.ts:762](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L762)

Pause an active job and resume it after the given UNIX timestamp in ms.
Optionally updates `job.data.step` before yielding back to the worker.

This method must be called from inside a Worker processor.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `timestamp` | `number` |
| `nextStep?` | `string` |

#### Returns

`Promise`&lt;`never`&gt;

***

### moveToFailed()

```ts
moveToFailed(err): Promise&lt;void>;
```

Defined in: [glide-mq/src/job.ts:658](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L658)

Move this job to the failed state.
If attempts remain and backoff is configured, retries via the scheduled ZSet.
Requires entryId to be set (set by Worker when processing).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `err` | `Error` |

#### Returns

`Promise`&lt;`void`&gt;

***

### moveToWaitingChildren()

```ts
moveToWaitingChildren(): Promise&lt;never>;
```

Defined in: [glide-mq/src/job.ts:525](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L525)

Pause an active job and wait for dynamically-added child jobs to complete.
When all children finish, this job resumes and the processor is invoked again.

This method must be called from inside a Worker processor.

#### Returns

`Promise`&lt;`never`&gt;

***

### promote()

```ts
promote(): Promise&lt;void>;
```

Defined in: [glide-mq/src/job.ts:745](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L745)

Promote a delayed job to waiting immediately.
Removes from the scheduled ZSet, adds to the stream, sets state to 'waiting'.
Throws if the job is not in the delayed state or does not exist.

#### Returns

`Promise`&lt;`void`&gt;

***

### rateLimitGroup()

```ts
rateLimitGroup(duration, opts?): Promise&lt;never>;
```

Defined in: [glide-mq/src/job.ts:790](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L790)

Rate-limit this job's ordering group for the given duration (milliseconds).
The current job is re-parked in the group queue (by default at the front)
and the entire group is paused until the duration expires.

Can only be called from inside a Worker processor.
Throws GroupRateLimitError which the worker catches internally.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `duration` | `number` |
| `opts?` | [`GroupRateLimitOptions`](../interfaces/GroupRateLimitOptions.md) |

#### Returns

`Promise`&lt;`never`&gt;

***

### remove()

```ts
remove(): Promise&lt;void>;
```

Defined in: [glide-mq/src/job.ts:697](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L697)

Remove this job from all data structures.

#### Returns

`Promise`&lt;`void`&gt;

***

### reportTokens()

```ts
reportTokens(count): Promise&lt;void>;
```

Defined in: [glide-mq/src/job.ts:442](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L442)

Report tokens consumed by this job for TPM (tokens-per-minute) tracking.
The count is stored in the job hash field `tpmTokens`.
After job completion, the Worker reads this value and increments the TPM counter
if a tokenLimiter is configured.

Calling multiple times overwrites the previous value.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `count` | `number` |

#### Returns

`Promise`&lt;`void`&gt;

***

### reportUsage()

```ts
reportUsage(usage): Promise&lt;void>;
```

Defined in: [glide-mq/src/job.ts:360](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L360)

Report AI-specific usage metadata for this job. Persists to the job hash
and emits a 'usage' event on the events stream.

Callable from any context (inside a processor, externally via getJob(), etc.).
If `totalTokens` is not provided, it is auto-computed as the sum of all values in `tokens`.
Calling multiple times overwrites the previous usage data.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `usage` | [`JobUsage`](../interfaces/JobUsage.md) |

#### Returns

`Promise`&lt;`void`&gt;

***

### retry()

```ts
retry(): Promise&lt;void>;
```

Defined in: [glide-mq/src/job.ts:805](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L805)

Retry this failed job by moving it back to the scheduled ZSet with a score
of now (so it gets promoted immediately on the next promote cycle).
Throws if the job does not exist or is not in the failed state.

#### Returns

`Promise`&lt;`void`&gt;

***

### storeVector()

```ts
storeVector(field, embedding): Promise&lt;void>;
```

Defined in: [glide-mq/src/job.ts:1015](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L1015)

Store a vector embedding in this job's hash field.
The vector is stored as a raw Float32Array buffer suitable for Valkey Search vector indexing.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `field` | `string` | Hash field name where the vector is stored (must match the index schema). |
| `embedding` | `Float32Array`&lt;`ArrayBufferLike`&gt; \| `number`[] | The vector as a number[] or Float32Array. |

#### Returns

`Promise`&lt;`void`&gt;

***

### stream()

```ts
stream(chunk): Promise&lt;string>;
```

Defined in: [glide-mq/src/job.ts:453](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L453)

Append a chunk to this job's streaming channel.
Each chunk is a flat string-keyed object appended via XADD to a per-job stream.
Returns the Valkey stream entry ID.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `chunk` | `Record`&lt;`string`, `string`&gt; |

#### Returns

`Promise`&lt;`string`&gt;

***

### streamChunk()

```ts
streamChunk(type, content?): Promise&lt;string>;
```

Defined in: [glide-mq/src/job.ts:481](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L481)

Convenience method for streaming typed LLM chunks.
Wraps `stream()` with `{ type, content }` fields.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `string` |
| `content?` | `string` |

#### Returns

`Promise`&lt;`string`&gt;

#### Example

```ts
await job.streamChunk('reasoning', 'Let me think about this...');
  await job.streamChunk('content', 'The answer is 42.');
  await job.streamChunk('done');
```

***

### suspend()

```ts
suspend(opts?): Promise&lt;never>;
```

Defined in: [glide-mq/src/job.ts:551](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L551)

Suspend this job to wait for an external signal (human-in-the-loop).
The processor is interrupted and the job moves to 'suspended' state.
When a signal arrives via Queue.signal(), the job re-enters the stream
and the processor is re-invoked from scratch with job.signals populated.

Optionally provide an onResume callback that runs instead of the main
processor when the job resumes on the same worker (best-effort).

This method must be called from inside a Worker processor.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `opts?` | [`SuspendOptions`](../interfaces/SuspendOptions.md) & `object` |

#### Returns

`Promise`&lt;`never`&gt;

***

### updateData()

```ts
updateData(data): Promise&lt;void>;
```

Defined in: [glide-mq/src/job.ts:346](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L346)

Replace the data payload of this job.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `D` |

#### Returns

`Promise`&lt;`void`&gt;

***

### updateProgress()

```ts
updateProgress(progress): Promise&lt;void>;
```

Defined in: [glide-mq/src/job.ts:333](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L333)

Update the progress of this job. Persists to the job hash and emits a progress event.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `progress` | `number` \| `object` |

#### Returns

`Promise`&lt;`void`&gt;

***

### waitUntilFinished()

```ts
waitUntilFinished(pollIntervalMs?, timeoutMs?): Promise<"completed" | "failed">;
```

Defined in: [glide-mq/src/job.ts:873](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/job.ts#L873)

Wait until the job reaches a terminal state (completed or failed).
Polls the job hash state at the given interval.
Returns the final state.

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `pollIntervalMs` | `number` | `500` |
| `timeoutMs` | `number` | `30000` |

#### Returns

`Promise`&lt;`"completed"` \| `"failed"`&gt;
