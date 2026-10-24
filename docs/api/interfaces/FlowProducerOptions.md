# Interface: FlowProducerOptions

Defined in: [glide-mq/src/types.ts:477](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L477)

Configuration options for creating a FlowProducer instance.

## Properties

### client?

```ts
client?: Client;
```

Defined in: [glide-mq/src/types.ts:484](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L484)

Pre-existing GLIDE client for non-blocking commands.
When provided, the component does NOT own this client - close() will not destroy it.

***

### connection?

```ts
connection?: ConnectionOptions;
```

Defined in: [glide-mq/src/types.ts:479](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L479)

Connection options for creating a new client. Required unless `client` is provided.

***

### prefix?

```ts
prefix?: string;
```

Defined in: [glide-mq/src/types.ts:485](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L485)

***

### serializer?

```ts
serializer?: Serializer;
```

Defined in: [glide-mq/src/types.ts:492](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L492)

Custom serializer for job data and return values. Default: JSON.

**Important**: Must match the serializer used by the corresponding Queue
and Worker. A mismatch causes silent data corruption.
