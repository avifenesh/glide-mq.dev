# Interface: WorkerOptions

Defined in: [glide-mq/src/types.ts:124](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L124)

Configuration options for creating a Worker instance. Extends QueueOptions.

## Extends

- [`QueueOptions`](QueueOptions.md)

## Extended by

- [`BroadcastWorkerOptions`](BroadcastWorkerOptions.md)

## Properties

### backoffStrategies?

```ts
optional backoffStrategies?: Record&lt;string, (attemptsMade, err) => number>;
```

Defined in: [glide-mq/src/types.ts:156](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L156)

***

### batch?

```ts
optional batch?: BatchOptions;
```

Defined in: [glide-mq/src/types.ts:164](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L164)

Enable batch processing. When set, the processor receives an array of jobs.

***

### blockTimeout?

```ts
optional blockTimeout?: number;
```

Defined in: [glide-mq/src/types.ts:137](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L137)

XREADGROUP BLOCK timeout in ms. A graceful `close()` of an idle worker waits up to this long for the in-flight read to return, so no job is claimed by a closed consumer.

***

### client?

```ts
optional client?: Client;
```

Defined in: [glide-mq/src/types.ts:85](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L85)

Pre-existing GLIDE client for non-blocking commands.
When provided, the component does NOT own this client - close() will not destroy it.
Must not be used for blocking reads (XREADGROUP BLOCK / XREAD BLOCK).

#### Inherited from

[`QueueOptions`](QueueOptions.md).[`client`](QueueOptions.md#client)

***

### commandClient?

```ts
optional commandClient?: Client;
```

Defined in: [glide-mq/src/types.ts:131](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L131)

Pre-existing GLIDE client for non-blocking commands (alias for `client`).
The blocking client for XREADGROUP is always auto-created from `connection`.
`connection` is required even when this is set.
Provide either `commandClient` or `client`, not both.

***

### compression?

```ts
optional compression?: "none" | "gzip";
```

Defined in: [glide-mq/src/types.ts:94](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L94)

Enable transparent compression of job data. Default: 'none'.

#### Inherited from

[`QueueOptions`](QueueOptions.md).[`compression`](QueueOptions.md#compression)

***

### concurrency?

```ts
optional concurrency?: number;
```

Defined in: [glide-mq/src/types.ts:132](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L132)

***

### connection?

```ts
optional connection?: ConnectionOptions;
```

Defined in: [glide-mq/src/types.ts:79](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L79)

Connection options for creating a new client. Required unless `client` is provided.

#### Inherited from

[`QueueOptions`](QueueOptions.md).[`connection`](QueueOptions.md#connection)

***

### deadLetterQueue?

```ts
optional deadLetterQueue?: DeadLetterQueueOptions;
```

Defined in: [glide-mq/src/types.ts:92](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L92)

Dead letter queue configuration. On a Worker, jobs that fail terminally are copied
to this queue. On a Queue, it only records the DLQ name for `getDeadLetterJobs()`
and routes nothing.

#### Inherited from

[`QueueOptions`](QueueOptions.md).[`deadLetterQueue`](QueueOptions.md#deadletterqueue)

***

### events?

```ts
optional events?: boolean;
```

Defined in: [glide-mq/src/types.ts:169](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L169)

Emit events to Valkey event stream on job completion/failure/retry/activation. Default: true.
 Set to false to skip XADD events in hot path (~1 fewer redis.call per job).
 'failed', 'retrying' and 'stalled' stream events are still written.
 TS-side EventEmitter ('completed', 'failed', etc.) is unaffected.

#### Overrides

[`QueueOptions`](QueueOptions.md).[`events`](QueueOptions.md#events)

***

### globalConcurrency?

```ts
optional globalConcurrency?: number;
```

Defined in: [glide-mq/src/types.ts:133](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L133)

***

### limiter?

```ts
optional limiter?: object;
```

Defined in: [glide-mq/src/types.ts:141](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L141)

#### duration

```ts
duration: number;
```

#### max

```ts
max: number;
```

***

### lockDuration?

```ts
optional lockDuration?: number;
```

Defined in: [glide-mq/src/types.ts:160](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L160)

Lock duration in ms. The worker sends a heartbeat every lockDuration/2.
 Jobs with a recent heartbeat are not reclaimed as stalled.
 Default: 30000 (30s).

***

### maxStalledCount?

```ts
optional maxStalledCount?: number;
```

Defined in: [glide-mq/src/types.ts:139](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L139)

***

### metrics?

```ts
optional metrics?: boolean;
```

Defined in: [glide-mq/src/types.ts:172](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L172)

Record per-minute timing metrics in Valkey on job completion and failure. Default: true.
 Set to false to skip HINCRBY metrics recording (~1-2 fewer redis.call per job).

***

### prefetch?

```ts
optional prefetch?: number;
```

Defined in: [glide-mq/src/types.ts:135](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L135)

XREADGROUP COUNT per poll. Capped at `concurrency` (`concurrency * batch.size` in batch mode); only a lower value changes behavior.

***

### prefix?

```ts
optional prefix?: string;
```

Defined in: [glide-mq/src/types.ts:86](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L86)

#### Inherited from

[`QueueOptions`](QueueOptions.md).[`prefix`](QueueOptions.md#prefix)

***

### promotionInterval?

```ts
optional promotionInterval?: number;
```

Defined in: [glide-mq/src/types.ts:140](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L140)

***

### sandbox?

```ts
optional sandbox?: SandboxOptions;
```

Defined in: [glide-mq/src/types.ts:162](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L162)

Sandbox options for file-path processors. Only used when processor is a string.

***

### serializer?

```ts
optional serializer?: Serializer;
```

Defined in: [glide-mq/src/types.ts:103](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L103)

Custom serializer for job data and return values. Default: JSON.

**Important**: The same serializer must be used across all Queue, Worker,
and FlowProducer instances that operate on the same queue. A mismatch
causes silent data corruption - the consumer will see `{}` and the job's
`deserializationFailed` flag will be `true`.

#### Inherited from

[`QueueOptions`](QueueOptions.md).[`serializer`](QueueOptions.md#serializer)

***

### stalledInterval?

```ts
optional stalledInterval?: number;
```

Defined in: [glide-mq/src/types.ts:138](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L138)

***

### tokenLimiter?

```ts
optional tokenLimiter?: object;
```

Defined in: [glide-mq/src/types.ts:145](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L145)

Token-per-minute rate limiting. Tracks total tokens consumed per time window.
 Worker pauses fetching when either RPM limiter or TPM tokenLimiter is exceeded.
 Tokens reported via job.reportTokens() or auto-extracted from job.reportUsage().

#### duration

```ts
duration: number;
```

Window duration in milliseconds.

#### maxTokens

```ts
maxTokens: number;
```

Max tokens per window.

#### scope?

```ts
optional scope?: "queue" | "worker" | "both";
```

Enforcement scope. Default: 'both'.
 - 'queue': Valkey counter shared across all workers.
 - 'worker': In-memory counter per worker.
 - 'both': Local check first, then Valkey (optimal).
