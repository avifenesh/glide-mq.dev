# Class: Job&lt;D, R&gt;

Defined in: [glide-mq/src/job.ts:11](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L11)

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

Defined in: [glide-mq/src/job.ts:41](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L41)

AbortSignal that fires when this job is revoked during processing.
The processor should check signal.aborted cooperatively.
Only set when the job is being processed by a Worker.

***

### attemptsMade

```ts
attemptsMade: number;
```

Defined in: [glide-mq/src/job.ts:16](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L16)

***

### cost?

```ts
optional cost?: number;
```

Defined in: [glide-mq/src/job.ts:32](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L32)

***

### data

```ts
data: D;
```

Defined in: [glide-mq/src/job.ts:14](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L14)

***

### deserializationFailed

```ts
deserializationFailed: boolean = false;
```

Defined in: [glide-mq/src/job.ts:60](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L60)

Set to true when data or returnvalue could not be deserialized from Valkey.
This typically indicates a serializer mismatch between the producer and consumer.
When true, `data` is set to `{} as D` and `returnvalue` to `undefined`.

***

### discarded

```ts
discarded: boolean = false;
```

Defined in: [glide-mq/src/job.ts:47](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L47)

When true, the job will not be retried on failure regardless of attempts config.
Set by calling `discard()` inside the processor.

***

### expireAt?

```ts
optional expireAt?: number;
```

Defined in: [glide-mq/src/job.ts:33](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L33)

***

### failedReason

```ts
failedReason: string | undefined;
```

Defined in: [glide-mq/src/job.ts:18](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L18)

***

### finishedOn

```ts
finishedOn: number | undefined;
```

Defined in: [glide-mq/src/job.ts:21](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L21)

***

### groupKey?

```ts
optional groupKey?: string;
```

Defined in: [glide-mq/src/job.ts:31](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L31)

***

### id

```ts
readonly id: string;
```

Defined in: [glide-mq/src/job.ts:12](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L12)

***

### name

```ts
readonly name: string;
```

Defined in: [glide-mq/src/job.ts:13](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L13)

***

### opts

```ts
readonly opts: JobOptions;
```

Defined in: [glide-mq/src/job.ts:15](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L15)

***

### orderingKey?

```ts
optional orderingKey?: string;
```

Defined in: [glide-mq/src/job.ts:29](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L29)

***

### orderingSeq?

```ts
optional orderingSeq?: number;
```

Defined in: [glide-mq/src/job.ts:30](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L30)

***

### parentId?

```ts
optional parentId?: string;
```

Defined in: [glide-mq/src/job.ts:23](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L23)

***

### parentIds?

```ts
optional parentIds?: string[];
```

Defined in: [glide-mq/src/job.ts:26](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L26)

Additional parent IDs for DAG multi-parent jobs.

***

### parentQueue?

```ts
optional parentQueue?: string;
```

Defined in: [glide-mq/src/job.ts:24](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L24)

***

### parentQueues?

```ts
optional parentQueues?: string[];
```

Defined in: [glide-mq/src/job.ts:28](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L28)

Additional parent queues for DAG multi-parent jobs (parallel array to parentIds).

***

### processedOn

```ts
processedOn: number | undefined;
```

Defined in: [glide-mq/src/job.ts:22](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L22)

***

### progress

```ts
progress: number | object;
```

Defined in: [glide-mq/src/job.ts:19](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L19)

***

### returnvalue

```ts
returnvalue: R | undefined;
```

Defined in: [glide-mq/src/job.ts:17](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L17)

***

### schedulerName?

```ts
optional schedulerName?: string;
```

Defined in: [glide-mq/src/job.ts:34](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L34)

***

### timestamp

```ts
timestamp: number;
```

Defined in: [glide-mq/src/job.ts:20](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L20)

## Methods

### changeDelay()

```ts
changeDelay(newDelay): Promise&lt;void>;
```

Defined in: [glide-mq/src/job.ts:359](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L359)

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

Defined in: [glide-mq/src/job.ts:339](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L339)

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

Defined in: [glide-mq/src/job.ts:154](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L154)

Mark this job so it will not be retried on failure.
Call inside the processor before throwing to skip all remaining attempts.

#### Returns

`void`

***

### getChildrenValues()

```ts
getChildrenValues(): Promise<Record&lt;string, R>>;
```

Defined in: [glide-mq/src/job.ts:206](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L206)

Read return values from all child jobs (for flow/parent-child patterns).

#### Returns

`Promise`&lt;`Record`&lt;`string`, `R`&gt;&gt;

***

### getParents()

```ts
getParents(): Promise&lt;object[]>;
```

Defined in: [glide-mq/src/job.ts:253](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L253)

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

Defined in: [glide-mq/src/job.ts:495](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L495)

Read the current state from the job hash.

#### Returns

`Promise`&lt;`string`&gt;

***

### isActive()

```ts
isActive(): Promise&lt;boolean>;
```

Defined in: [glide-mq/src/job.ts:473](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L473)

Check if this job is in the active state.

#### Returns

`Promise`&lt;`boolean`&gt;

***

### isCompleted()

```ts
isCompleted(): Promise&lt;boolean>;
```

Defined in: [glide-mq/src/job.ts:452](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L452)

Check if this job is in the completed state.

#### Returns

`Promise`&lt;`boolean`&gt;

***

### isDelayed()

```ts
isDelayed(): Promise&lt;boolean>;
```

Defined in: [glide-mq/src/job.ts:466](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L466)

Check if this job is in the delayed state.

#### Returns

`Promise`&lt;`boolean`&gt;

***

### isFailed()

```ts
isFailed(): Promise&lt;boolean>;
```

Defined in: [glide-mq/src/job.ts:459](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L459)

Check if this job is in the failed state.

#### Returns

`Promise`&lt;`boolean`&gt;

***

### isRevoked()

```ts
isRevoked(): Promise&lt;boolean>;
```

Defined in: [glide-mq/src/job.ts:487](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L487)

Check if this job has been revoked.

#### Returns

`Promise`&lt;`boolean`&gt;

***

### isWaiting()

```ts
isWaiting(): Promise&lt;boolean>;
```

Defined in: [glide-mq/src/job.ts:480](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L480)

Check if this job is in the waiting state.

#### Returns

`Promise`&lt;`boolean`&gt;

***

### log()

```ts
log(message): Promise&lt;void>;
```

Defined in: [glide-mq/src/job.ts:101](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L101)

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

Defined in: [glide-mq/src/job.ts:395](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L395)

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

Defined in: [glide-mq/src/job.ts:296](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L296)

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

Defined in: [glide-mq/src/job.ts:188](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L188)

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

Defined in: [glide-mq/src/job.ts:378](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L378)

Promote a delayed job to waiting immediately.
Removes from the scheduled ZSet, adds to the stream, sets state to 'waiting'.
Throws if the job is not in the delayed state or does not exist.

#### Returns

`Promise`&lt;`void`&gt;

***

### remove()

```ts
remove(): Promise&lt;void>;
```

Defined in: [glide-mq/src/job.ts:330](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L330)

Remove this job from all data structures.

#### Returns

`Promise`&lt;`void`&gt;

***

### retry()

```ts
retry(): Promise&lt;void>;
```

Defined in: [glide-mq/src/job.ts:420](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L420)

Retry this job by moving it back to the scheduled ZSet with a score of now
(so it gets promoted immediately on the next promote cycle).
Removes the job from the failed ZSet first to prevent dual membership.

#### Returns

`Promise`&lt;`void`&gt;

***

### updateData()

```ts
updateData(data): Promise&lt;void>;
```

Defined in: [glide-mq/src/job.ts:142](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L142)

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

Defined in: [glide-mq/src/job.ts:112](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L112)

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

Defined in: [glide-mq/src/job.ts:505](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/job.ts#L505)

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
