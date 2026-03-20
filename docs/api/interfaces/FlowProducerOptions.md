# Interface: FlowProducerOptions

Defined in: [glide-mq/src/types.ts:279](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L279)

## Properties

### client?

```ts
optional client?: Client;
```

Defined in: [glide-mq/src/types.ts:286](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L286)

Pre-existing GLIDE client for non-blocking commands.
When provided, the component does NOT own this client - close() will not destroy it.

***

### connection?

```ts
optional connection?: ConnectionOptions;
```

Defined in: [glide-mq/src/types.ts:281](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L281)

Connection options for creating a new client. Required unless `client` is provided.

***

### prefix?

```ts
optional prefix?: string;
```

Defined in: [glide-mq/src/types.ts:287](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L287)

***

### serializer?

```ts
optional serializer?: Serializer;
```

Defined in: [glide-mq/src/types.ts:294](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L294)

Custom serializer for job data and return values. Default: JSON.

**Important**: Must match the serializer used by the corresponding Queue
and Worker. A mismatch causes silent data corruption.
