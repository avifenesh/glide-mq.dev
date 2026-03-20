# Interface: WorkerOptions

Defined in: [glide-mq/src/types.ts:97](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L97)

## Extends

- [`QueueOptions`](QueueOptions.md)

## Extended by

- [`BroadcastWorkerOptions`](BroadcastWorkerOptions.md)

## Properties

### backoffStrategies?

```ts
optional backoffStrategies?: Record&lt;string, (attemptsMade, err) => number>;
```

Defined in: [glide-mq/src/types.ts:113](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L113)

***

### batch?

```ts
optional batch?: BatchOptions;
```

Defined in: [glide-mq/src/types.ts:121](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L121)

Enable batch processing. When set, the processor receives an array of jobs.

***

### blockTimeout?

```ts
optional blockTimeout?: number;
```

Defined in: [glide-mq/src/types.ts:108](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L108)

***

### client?

```ts
optional client?: Client;
```

Defined in: [glide-mq/src/types.ts:71](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L71)

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

Defined in: [glide-mq/src/types.ts:104](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L104)

Pre-existing GLIDE client for non-blocking commands (alias for `client`).
The blocking client for XREADGROUP is always auto-created from `connection`.
`connection` is required even when this is set.
Provide either `commandClient` or `client`, not both.

***

### compression?

```ts
optional compression?: "none" | "gzip";
```

Defined in: [glide-mq/src/types.ts:76](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L76)

Enable transparent compression of job data. Default: 'none'.

#### Inherited from

[`QueueOptions`](QueueOptions.md).[`compression`](QueueOptions.md#compression)

***

### concurrency?

```ts
optional concurrency?: number;
```

Defined in: [glide-mq/src/types.ts:105](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L105)

***

### connection?

```ts
optional connection?: ConnectionOptions;
```

Defined in: [glide-mq/src/types.ts:65](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L65)

Connection options for creating a new client. Required unless `client` is provided.

#### Inherited from

[`QueueOptions`](QueueOptions.md).[`connection`](QueueOptions.md#connection)

***

### deadLetterQueue?

```ts
optional deadLetterQueue?: DeadLetterQueueOptions;
```

Defined in: [glide-mq/src/types.ts:74](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L74)

Dead letter queue configuration. Jobs that exhaust retries are moved here.

#### Inherited from

[`QueueOptions`](QueueOptions.md).[`deadLetterQueue`](QueueOptions.md#deadletterqueue)

***

### events?

```ts
optional events?: boolean;
```

Defined in: [glide-mq/src/types.ts:125](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L125)

Emit events to Valkey event stream on job completion/activation. Default: true.
 Set to false to skip XADD events in hot path (~1 fewer redis.call per job).
 TS-side EventEmitter ('completed', 'failed', etc.) is unaffected.

#### Overrides

[`QueueOptions`](QueueOptions.md).[`events`](QueueOptions.md#events)

***

### globalConcurrency?

```ts
optional globalConcurrency?: number;
```

Defined in: [glide-mq/src/types.ts:106](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L106)

***

### limiter?

```ts
optional limiter?: object;
```

Defined in: [glide-mq/src/types.ts:112](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L112)

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

Defined in: [glide-mq/src/types.ts:117](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L117)

Lock duration in ms. The worker sends a heartbeat every lockDuration/2.
 Jobs with a recent heartbeat are not reclaimed as stalled.
 Default: 30000 (30s).

***

### maxStalledCount?

```ts
optional maxStalledCount?: number;
```

Defined in: [glide-mq/src/types.ts:110](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L110)

***

### metrics?

```ts
optional metrics?: boolean;
```

Defined in: [glide-mq/src/types.ts:128](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L128)

Record per-minute timing metrics in Valkey on job completion. Default: true.
 Set to false to skip HINCRBY metrics recording (~1-2 fewer redis.call per job).

***

### prefetch?

```ts
optional prefetch?: number;
```

Defined in: [glide-mq/src/types.ts:107](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L107)

***

### prefix?

```ts
optional prefix?: string;
```

Defined in: [glide-mq/src/types.ts:72](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L72)

#### Inherited from

[`QueueOptions`](QueueOptions.md).[`prefix`](QueueOptions.md#prefix)

***

### promotionInterval?

```ts
optional promotionInterval?: number;
```

Defined in: [glide-mq/src/types.ts:111](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L111)

***

### sandbox?

```ts
optional sandbox?: SandboxOptions;
```

Defined in: [glide-mq/src/types.ts:119](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L119)

Sandbox options for file-path processors. Only used when processor is a string.

***

### serializer?

```ts
optional serializer?: Serializer;
```

Defined in: [glide-mq/src/types.ts:85](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L85)

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

Defined in: [glide-mq/src/types.ts:109](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L109)
