# Interface: QueueOptions

Defined in: [glide-mq/src/types.ts:63](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L63)

## Extended by

- [`WorkerOptions`](WorkerOptions.md)
- [`BroadcastOptions`](BroadcastOptions.md)

## Properties

### client?

```ts
optional client?: Client;
```

Defined in: [glide-mq/src/types.ts:71](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L71)

Pre-existing GLIDE client for non-blocking commands.
When provided, the component does NOT own this client - close() will not destroy it.
Must not be used for blocking reads (XREADGROUP BLOCK / XREAD BLOCK).

***

### compression?

```ts
optional compression?: "none" | "gzip";
```

Defined in: [glide-mq/src/types.ts:76](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L76)

Enable transparent compression of job data. Default: 'none'.

***

### connection?

```ts
optional connection?: ConnectionOptions;
```

Defined in: [glide-mq/src/types.ts:65](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L65)

Connection options for creating a new client. Required unless `client` is provided.

***

### deadLetterQueue?

```ts
optional deadLetterQueue?: DeadLetterQueueOptions;
```

Defined in: [glide-mq/src/types.ts:74](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L74)

Dead letter queue configuration. Jobs that exhaust retries are moved here.

***

### events?

```ts
optional events?: boolean;
```

Defined in: [glide-mq/src/types.ts:87](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L87)

Emit events (e.g., 'added') on the events stream when adding jobs. Default: true.

***

### prefix?

```ts
optional prefix?: string;
```

Defined in: [glide-mq/src/types.ts:72](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L72)

***

### serializer?

```ts
optional serializer?: Serializer;
```

Defined in: [glide-mq/src/types.ts:85](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L85)

Custom serializer for job data and return values. Default: JSON.

**Important**: The same serializer must be used across all Queue, Worker,
and FlowProducer instances that operate on the same queue. A mismatch
causes silent data corruption - the consumer will see `{}` and the job's
`deserializationFailed` flag will be `true`.
