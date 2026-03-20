# Class: Job\<D, R\>

Defined in: [glide-mq/src/job.ts:12](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L12)

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

Defined in: [glide-mq/src/job.ts:42](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L42)

AbortSignal that fires when this job is revoked during processing.
The processor should check signal.aborted cooperatively.
Only set when the job is being processed by a Worker.

***

### attemptsMade

```ts
attemptsMade: number;
```

Defined in: [glide-mq/src/job.ts:17](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L17)

***

### cost?

```ts
optional cost?: number;
```

Defined in: [glide-mq/src/job.ts:33](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L33)

***

### data

```ts
data: D;
```

Defined in: [glide-mq/src/job.ts:15](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L15)

***

### deserializationFailed

```ts
deserializationFailed: boolean = false;
```

Defined in: [glide-mq/src/job.ts:61](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L61)

Set to true when data or returnvalue could not be deserialized from Valkey.
This typically indicates a serializer mismatch between the producer and consumer.
When true, `data` is set to `{} as D` and `returnvalue` to `undefined`.

***

### discarded

```ts
discarded: boolean = false;
```

Defined in: [glide-mq/src/job.ts:48](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L48)

When true, the job will not be retried on failure regardless of attempts config.
Set by calling `discard()` inside the processor.

***

### expireAt?

```ts
optional expireAt?: number;
```

Defined in: [glide-mq/src/job.ts:34](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L34)

***

### failedReason

```ts
failedReason: string | undefined;
```

Defined in: [glide-mq/src/job.ts:19](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L19)

***

### finishedOn

```ts
finishedOn: number | undefined;
```

Defined in: [glide-mq/src/job.ts:22](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L22)

***

### groupKey?

```ts
optional groupKey?: string;
```

Defined in: [glide-mq/src/job.ts:32](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L32)

***

### id

```ts
readonly id: string;
```

Defined in: [glide-mq/src/job.ts:13](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L13)

***

### name

```ts
readonly name: string;
```

Defined in: [glide-mq/src/job.ts:14](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L14)

***

### opts

```ts
readonly opts: JobOptions;
```

Defined in: [glide-mq/src/job.ts:16](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L16)

***

### orderingKey?

```ts
optional orderingKey?: string;
```

Defined in: [glide-mq/src/job.ts:30](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L30)

***

### orderingSeq?

```ts
optional orderingSeq?: number;
```

Defined in: [glide-mq/src/job.ts:31](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L31)

***

### parentId?

```ts
optional parentId?: string;
```

Defined in: [glide-mq/src/job.ts:24](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L24)

***

### parentIds?

```ts
optional parentIds?: string[];
```

Defined in: [glide-mq/src/job.ts:27](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L27)

Additional parent IDs for DAG multi-parent jobs.

***

### parentQueue?

```ts
optional parentQueue?: string;
```

Defined in: [glide-mq/src/job.ts:25](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L25)

***

### parentQueues?

```ts
optional parentQueues?: string[];
```

Defined in: [glide-mq/src/job.ts:29](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L29)

Additional parent queues for DAG multi-parent jobs (parallel array to parentIds).

***

### processedOn

```ts
processedOn: number | undefined;
```

Defined in: [glide-mq/src/job.ts:23](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L23)

***

### progress

```ts
progress: number | object;
```

Defined in: [glide-mq/src/job.ts:20](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L20)

***

### returnvalue

```ts
returnvalue: R | undefined;
```

Defined in: [glide-mq/src/job.ts:18](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L18)

***

### schedulerName?

```ts
optional schedulerName?: string;
```

Defined in: [glide-mq/src/job.ts:35](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L35)

***

### timestamp

```ts
timestamp: number;
```

Defined in: [glide-mq/src/job.ts:21](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L21)

## Methods

### changeDelay()

```ts
changeDelay(newDelay): Promise<void>;
```

Defined in: [glide-mq/src/job.ts:360](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L360)

Change the delay of this job. Supports delayed, waiting, and prioritized states.
Setting delay to 0 promotes a delayed job immediately.
Setting delay > 0 on a waiting/prioritized job moves it to the scheduled ZSet.
Throws if the job is in an invalid state (active, completed, failed).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `newDelay` | `number` |

#### Returns

`Promise`\<`void`\>

***

### changePriority()

```ts
changePriority(newPriority): Promise<void>;
```

Defined in: [glide-mq/src/job.ts:340](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L340)

Change the priority of this job. Supports waiting, prioritized, and delayed states.
Setting priority to 0 moves a prioritized job back to the stream (waiting).
Throws if the job is in an invalid state (active, completed, failed).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `newPriority` | `number` |

#### Returns

`Promise`\<`void`\>

***

### discard()

```ts
discard(): void;
```

Defined in: [glide-mq/src/job.ts:155](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L155)

Mark this job so it will not be retried on failure.
Call inside the processor before throwing to skip all remaining attempts.

#### Returns

`void`

***

### getChildrenValues()

```ts
getChildrenValues(): Promise<Record<string, R>>;
```

Defined in: [glide-mq/src/job.ts:207](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L207)

Read return values from all child jobs (for flow/parent-child patterns).

#### Returns

`Promise`\<`Record`\<`string`, `R`\>\>

***

### getParents()

```ts
getParents(): Promise<object[]>;
```

Defined in: [glide-mq/src/job.ts:254](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L254)

Read all parent references for this job (for DAG multi-parent patterns).
Returns an array of { queue, id } for each parent.
For single-parent jobs, returns an array with one element.
For jobs with no parent, returns an empty array.

#### Returns

`Promise`\<`object`[]\>

***

### getState()

```ts
getState(): Promise<string>;
```

Defined in: [glide-mq/src/job.ts:514](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L514)

Read the current state from the job hash.

#### Returns

`Promise`\<`string`\>

***

### isActive()

```ts
isActive(): Promise<boolean>;
```

Defined in: [glide-mq/src/job.ts:492](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L492)

Check if this job is in the active state.

#### Returns

`Promise`\<`boolean`\>

***

### isCompleted()

```ts
isCompleted(): Promise<boolean>;
```

Defined in: [glide-mq/src/job.ts:471](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L471)

Check if this job is in the completed state.

#### Returns

`Promise`\<`boolean`\>

***

### isDelayed()

```ts
isDelayed(): Promise<boolean>;
```

Defined in: [glide-mq/src/job.ts:485](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L485)

Check if this job is in the delayed state.

#### Returns

`Promise`\<`boolean`\>

***

### isFailed()

```ts
isFailed(): Promise<boolean>;
```

Defined in: [glide-mq/src/job.ts:478](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L478)

Check if this job is in the failed state.

#### Returns

`Promise`\<`boolean`\>

***

### isRevoked()

```ts
isRevoked(): Promise<boolean>;
```

Defined in: [glide-mq/src/job.ts:506](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L506)

Check if this job has been revoked.

#### Returns

`Promise`\<`boolean`\>

***

### isWaiting()

```ts
isWaiting(): Promise<boolean>;
```

Defined in: [glide-mq/src/job.ts:499](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L499)

Check if this job is in the waiting state.

#### Returns

`Promise`\<`boolean`\>

***

### log()

```ts
log(message): Promise<void>;
```

Defined in: [glide-mq/src/job.ts:102](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L102)

Append a log line to this job's log list.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |

#### Returns

`Promise`\<`void`\>

***

### moveToDelayed()

```ts
moveToDelayed(timestamp, nextStep?): Promise<never>;
```

Defined in: [glide-mq/src/job.ts:396](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L396)

Pause an active job and resume it after the given UNIX timestamp in ms.
Optionally updates `job.data.step` before yielding back to the worker.

This method must be called from inside a Worker processor.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `timestamp` | `number` |
| `nextStep?` | `string` |

#### Returns

`Promise`\<`never`\>

***

### moveToFailed()

```ts
moveToFailed(err): Promise<void>;
```

Defined in: [glide-mq/src/job.ts:297](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L297)

Move this job to the failed state.
If attempts remain and backoff is configured, retries via the scheduled ZSet.
Requires entryId to be set (set by Worker when processing).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `err` | `Error` |

#### Returns

`Promise`\<`void`\>

***

### moveToWaitingChildren()

```ts
moveToWaitingChildren(): Promise<never>;
```

Defined in: [glide-mq/src/job.ts:189](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L189)

Pause an active job and wait for dynamically-added child jobs to complete.
When all children finish, this job resumes and the processor is invoked again.

This method must be called from inside a Worker processor.

#### Returns

`Promise`\<`never`\>

***

### promote()

```ts
promote(): Promise<void>;
```

Defined in: [glide-mq/src/job.ts:379](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L379)

Promote a delayed job to waiting immediately.
Removes from the scheduled ZSet, adds to the stream, sets state to 'waiting'.
Throws if the job is not in the delayed state or does not exist.

#### Returns

`Promise`\<`void`\>

***

### rateLimitGroup()

```ts
rateLimitGroup(duration, opts?): Promise<never>;
```

Defined in: [glide-mq/src/job.ts:424](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L424)

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

`Promise`\<`never`\>

***

### remove()

```ts
remove(): Promise<void>;
```

Defined in: [glide-mq/src/job.ts:331](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L331)

Remove this job from all data structures.

#### Returns

`Promise`\<`void`\>

***

### retry()

```ts
retry(): Promise<void>;
```

Defined in: [glide-mq/src/job.ts:439](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L439)

Retry this job by moving it back to the scheduled ZSet with a score of now
(so it gets promoted immediately on the next promote cycle).
Removes the job from the failed ZSet first to prevent dual membership.

#### Returns

`Promise`\<`void`\>

***

### updateData()

```ts
updateData(data): Promise<void>;
```

Defined in: [glide-mq/src/job.ts:143](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L143)

Replace the data payload of this job.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `D` |

#### Returns

`Promise`\<`void`\>

***

### updateProgress()

```ts
updateProgress(progress): Promise<void>;
```

Defined in: [glide-mq/src/job.ts:113](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L113)

Update the progress of this job. Persists to the job hash and emits a progress event.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `progress` | `number` \| `object` |

#### Returns

`Promise`\<`void`\>

***

### waitUntilFinished()

```ts
waitUntilFinished(pollIntervalMs?, timeoutMs?): Promise<"completed" | "failed">;
```

Defined in: [glide-mq/src/job.ts:524](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/job.ts#L524)

Wait until the job reaches a terminal state (completed or failed).
Polls the job hash state at the given interval.
Returns the final state.

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `pollIntervalMs` | `number` | `500` |
| `timeoutMs` | `number` | `30000` |

#### Returns

`Promise`\<`"completed"` \| `"failed"`\>
