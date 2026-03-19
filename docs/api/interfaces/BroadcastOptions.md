# Interface: BroadcastOptions

Defined in: [glide-mq/src/types.ts:131](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L131)

## Extends

- [`QueueOptions`](QueueOptions.md)

## Properties

### client?

```ts
optional client?: Client;
```

Defined in: [glide-mq/src/types.ts:71](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L71)

Pre-existing GLIDE client for non-blocking commands.
When provided, the component does NOT own this client - close() will not destroy it.
Must not be used for blocking reads (XREADGROUP BLOCK / XREAD BLOCK).

#### Inherited from

[`QueueOptions`](QueueOptions.md).[`client`](QueueOptions.md#client)

***

### compression?

```ts
optional compression?: "none" | "gzip";
```

Defined in: [glide-mq/src/types.ts:76](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L76)

Enable transparent compression of job data. Default: 'none'.

#### Inherited from

[`QueueOptions`](QueueOptions.md).[`compression`](QueueOptions.md#compression)

***

### connection?

```ts
optional connection?: ConnectionOptions;
```

Defined in: [glide-mq/src/types.ts:65](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L65)

Connection options for creating a new client. Required unless `client` is provided.

#### Inherited from

[`QueueOptions`](QueueOptions.md).[`connection`](QueueOptions.md#connection)

***

### deadLetterQueue?

```ts
optional deadLetterQueue?: DeadLetterQueueOptions;
```

Defined in: [glide-mq/src/types.ts:74](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L74)

Dead letter queue configuration. Jobs that exhaust retries are moved here.

#### Inherited from

[`QueueOptions`](QueueOptions.md).[`deadLetterQueue`](QueueOptions.md#deadletterqueue)

***

### events?

```ts
optional events?: boolean;
```

Defined in: [glide-mq/src/types.ts:87](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L87)

Emit events (e.g., 'added') on the events stream when adding jobs. Default: true.

#### Inherited from

[`QueueOptions`](QueueOptions.md).[`events`](QueueOptions.md#events)

***

### maxMessages?

```ts
optional maxMessages?: number;
```

Defined in: [glide-mq/src/types.ts:133](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L133)

Max messages to retain in stream (must be a positive integer). Trimmed exactly (hard limit) on each publish. Opt-in; no trimming by default.

***

### prefix?

```ts
optional prefix?: string;
```

Defined in: [glide-mq/src/types.ts:72](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L72)

#### Inherited from

[`QueueOptions`](QueueOptions.md).[`prefix`](QueueOptions.md#prefix)

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

[`QueueOptions`](QueueOptions.md).[`serializer`](QueueOptions.md#serializer)
