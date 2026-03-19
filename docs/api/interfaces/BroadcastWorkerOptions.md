# Interface: BroadcastWorkerOptions

Defined in: [glide-mq/src/types.ts:136](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L136)

## Extends

- [`WorkerOptions`](WorkerOptions.md)

## Properties

### backoffStrategies?

```ts
optional backoffStrategies?: Record&lt;string, (attemptsMade, err) => number>;
```

Defined in: [glide-mq/src/types.ts:113](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L113)

#### Inherited from

[`WorkerOptions`](WorkerOptions.md).[`backoffStrategies`](WorkerOptions.md#backoffstrategies)

***

### batch?

```ts
optional batch?: BatchOptions;
```

Defined in: [glide-mq/src/types.ts:121](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L121)

Enable batch processing. When set, the processor receives an array of jobs.

#### Inherited from

[`WorkerOptions`](WorkerOptions.md).[`batch`](WorkerOptions.md#batch)

***

### blockTimeout?

```ts
optional blockTimeout?: number;
```

Defined in: [glide-mq/src/types.ts:108](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L108)

#### Inherited from

[`WorkerOptions`](WorkerOptions.md).[`blockTimeout`](WorkerOptions.md#blocktimeout)

***

### client?

```ts
optional client?: Client;
```

Defined in: [glide-mq/src/types.ts:71](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L71)

Pre-existing GLIDE client for non-blocking commands.
When provided, the component does NOT own this client - close() will not destroy it.
Must not be used for blocking reads (XREADGROUP BLOCK / XREAD BLOCK).

#### Inherited from

[`WorkerOptions`](WorkerOptions.md).[`client`](WorkerOptions.md#client)

***

### commandClient?

```ts
optional commandClient?: Client;
```

Defined in: [glide-mq/src/types.ts:104](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L104)

Pre-existing GLIDE client for non-blocking commands (alias for `client`).
The blocking client for XREADGROUP is always auto-created from `connection`.
`connection` is required even when this is set.
Provide either `commandClient` or `client`, not both.

#### Inherited from

[`WorkerOptions`](WorkerOptions.md).[`commandClient`](WorkerOptions.md#commandclient)

***

### compression?

```ts
optional compression?: "none" | "gzip";
```

Defined in: [glide-mq/src/types.ts:76](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L76)

Enable transparent compression of job data. Default: 'none'.

#### Inherited from

[`WorkerOptions`](WorkerOptions.md).[`compression`](WorkerOptions.md#compression)

***

### concurrency?

```ts
optional concurrency?: number;
```

Defined in: [glide-mq/src/types.ts:105](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L105)

#### Inherited from

[`WorkerOptions`](WorkerOptions.md).[`concurrency`](WorkerOptions.md#concurrency)

***

### connection?

```ts
optional connection?: ConnectionOptions;
```

Defined in: [glide-mq/src/types.ts:65](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L65)

Connection options for creating a new client. Required unless `client` is provided.

#### Inherited from

[`WorkerOptions`](WorkerOptions.md).[`connection`](WorkerOptions.md#connection)

***

### deadLetterQueue?

```ts
optional deadLetterQueue?: DeadLetterQueueOptions;
```

Defined in: [glide-mq/src/types.ts:74](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L74)

Dead letter queue configuration. Jobs that exhaust retries are moved here.

#### Inherited from

[`WorkerOptions`](WorkerOptions.md).[`deadLetterQueue`](WorkerOptions.md#deadletterqueue)

***

### events?

```ts
optional events?: boolean;
```

Defined in: [glide-mq/src/types.ts:125](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L125)

Emit events to Valkey event stream on job completion/activation. Default: true.
 Set to false to skip XADD events in hot path (~1 fewer redis.call per job).
 TS-side EventEmitter ('completed', 'failed', etc.) is unaffected.

#### Inherited from

[`WorkerOptions`](WorkerOptions.md).[`events`](WorkerOptions.md#events)

***

### globalConcurrency?

```ts
optional globalConcurrency?: number;
```

Defined in: [glide-mq/src/types.ts:106](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L106)

#### Inherited from

[`WorkerOptions`](WorkerOptions.md).[`globalConcurrency`](WorkerOptions.md#globalconcurrency)

***

### limiter?

```ts
optional limiter?: object;
```

Defined in: [glide-mq/src/types.ts:112](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L112)

#### duration

```ts
duration: number;
```

#### max

```ts
max: number;
```

#### Inherited from

[`WorkerOptions`](WorkerOptions.md).[`limiter`](WorkerOptions.md#limiter)

***

### lockDuration?

```ts
optional lockDuration?: number;
```

Defined in: [glide-mq/src/types.ts:117](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L117)

Lock duration in ms. The worker sends a heartbeat every lockDuration/2.
 Jobs with a recent heartbeat are not reclaimed as stalled.
 Default: 30000 (30s).

#### Inherited from

[`WorkerOptions`](WorkerOptions.md).[`lockDuration`](WorkerOptions.md#lockduration)

***

### maxStalledCount?

```ts
optional maxStalledCount?: number;
```

Defined in: [glide-mq/src/types.ts:110](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L110)

#### Inherited from

[`WorkerOptions`](WorkerOptions.md).[`maxStalledCount`](WorkerOptions.md#maxstalledcount)

***

### metrics?

```ts
optional metrics?: boolean;
```

Defined in: [glide-mq/src/types.ts:128](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L128)

Record per-minute timing metrics in Valkey on job completion. Default: true.
 Set to false to skip HINCRBY metrics recording (~1-2 fewer redis.call per job).

#### Inherited from

[`WorkerOptions`](WorkerOptions.md).[`metrics`](WorkerOptions.md#metrics)

***

### prefetch?

```ts
optional prefetch?: number;
```

Defined in: [glide-mq/src/types.ts:107](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L107)

#### Inherited from

[`WorkerOptions`](WorkerOptions.md).[`prefetch`](WorkerOptions.md#prefetch)

***

### prefix?

```ts
optional prefix?: string;
```

Defined in: [glide-mq/src/types.ts:72](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L72)

#### Inherited from

[`WorkerOptions`](WorkerOptions.md).[`prefix`](WorkerOptions.md#prefix)

***

### promotionInterval?

```ts
optional promotionInterval?: number;
```

Defined in: [glide-mq/src/types.ts:111](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L111)

#### Inherited from

[`WorkerOptions`](WorkerOptions.md).[`promotionInterval`](WorkerOptions.md#promotioninterval)

***

### sandbox?

```ts
optional sandbox?: SandboxOptions;
```

Defined in: [glide-mq/src/types.ts:119](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L119)

Sandbox options for file-path processors. Only used when processor is a string.

#### Inherited from

[`WorkerOptions`](WorkerOptions.md).[`sandbox`](WorkerOptions.md#sandbox)

***

### serializer?

```ts
optional serializer?: Serializer;
```

Defined in: [glide-mq/src/types.ts:85](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L85)

Custom serializer for job data and return values. Default: JSON.

**Important**: The same serializer must be used across all Queue, Worker,
and FlowProducer instances that operate on the same queue. A mismatch
causes silent data corruption - the consumer will see `{}` and the job's
`deserializationFailed` flag will be `true`.

#### Inherited from

[`WorkerOptions`](WorkerOptions.md).[`serializer`](WorkerOptions.md#serializer)

***

### stalledInterval?

```ts
optional stalledInterval?: number;
```

Defined in: [glide-mq/src/types.ts:109](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L109)

#### Inherited from

[`WorkerOptions`](WorkerOptions.md).[`stalledInterval`](WorkerOptions.md#stalledinterval)

***

### startFrom?

```ts
optional startFrom?: string;
```

Defined in: [glide-mq/src/types.ts:145](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L145)

Stream ID to start from when creating this subscription.
- '$': Only new messages (default)
- '0-0': All history (backfill)
- '&lt;stream-id&gt;': Start from specific ID

***

### subjects?

```ts
optional subjects?: string[];
```

Defined in: [glide-mq/src/types.ts:163](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L163)

Subject patterns to filter messages. Only messages whose subject matches
at least one pattern are delivered to the processor. Non-matching messages
are auto-acknowledged and skipped (zero wasted HGETALL calls).

Pattern syntax (dot-separated segments):
- `*` matches exactly one segment
- `>` matches one or more trailing segments (must be last token)
- Literal segments match exactly

Examples:
- `'projects.>'` matches `'projects.1'`, `'projects.1.issues.2'`
- `'projects.*'` matches `'projects.1'` but not `'projects.1.issues.2'`
- `'projects.*.issues.>'` matches `'projects.1.issues.2'`

When omitted, all messages are delivered (no filtering).

***

### subscription

```ts
subscription: string;
```

Defined in: [glide-mq/src/types.ts:138](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L138)

Subscription name - becomes the consumer group name. Required for broadcast workers.
