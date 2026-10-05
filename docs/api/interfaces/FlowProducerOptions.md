# Interface: FlowProducerOptions

Defined in: [glide-mq/src/types.ts:467](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L467)

Configuration options for creating a FlowProducer instance.

## Properties

### client?

```ts
optional client?: Client;
```

Defined in: [glide-mq/src/types.ts:474](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L474)

Pre-existing GLIDE client for non-blocking commands.
When provided, the component does NOT own this client - close() will not destroy it.

***

### connection?

```ts
optional connection?: ConnectionOptions;
```

Defined in: [glide-mq/src/types.ts:469](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L469)

Connection options for creating a new client. Required unless `client` is provided.

***

### prefix?

```ts
optional prefix?: string;
```

Defined in: [glide-mq/src/types.ts:475](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L475)

***

### serializer?

```ts
optional serializer?: Serializer;
```

Defined in: [glide-mq/src/types.ts:482](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L482)

Custom serializer for job data and return values. Default: JSON.

**Important**: Must match the serializer used by the corresponding Queue
and Worker. A mismatch causes silent data corruption.
