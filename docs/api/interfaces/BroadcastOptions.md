# Interface: BroadcastOptions

Defined in: [glide-mq/src/types.ts:176](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L176)

Configuration options for a Broadcast (pub/sub) queue.

## Extends

- [`QueueOptions`](QueueOptions.md)

## Properties

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

### compression?

```ts
optional compression?: "none" | "gzip";
```

Defined in: [glide-mq/src/types.ts:94](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L94)

Enable transparent compression of job data. Default: 'none'.

#### Inherited from

[`QueueOptions`](QueueOptions.md).[`compression`](QueueOptions.md#compression)

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

Defined in: [glide-mq/src/types.ts:105](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L105)

Emit events (e.g., 'added') on the events stream when adding jobs. Default: true.

#### Inherited from

[`QueueOptions`](QueueOptions.md).[`events`](QueueOptions.md#events)

***

### maxMessages?

```ts
optional maxMessages?: number;
```

Defined in: [glide-mq/src/types.ts:182](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L182)

Max messages to retain in stream (must be a positive integer). Trimmed exactly (hard limit) on each publish,
including messages a subscription has not read yet. Trimmed messages' job data is deleted once no subscription
holds them. Opt-in; no trimming by default.

***

### prefix?

```ts
optional prefix?: string;
```

Defined in: [glide-mq/src/types.ts:86](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L86)

#### Inherited from

[`QueueOptions`](QueueOptions.md).[`prefix`](QueueOptions.md#prefix)

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
