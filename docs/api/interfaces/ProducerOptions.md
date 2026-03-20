# Interface: ProducerOptions

Defined in: [glide-mq/src/producer.ts:34](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/producer.ts#L34)

## Properties

### client?

```ts
optional client?: Client;
```

Defined in: [glide-mq/src/producer.ts:38](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/producer.ts#L38)

Pre-existing GLIDE client. When provided, the Producer does NOT own this client - close() will not destroy it.

***

### compression?

```ts
optional compression?: "none" | "gzip";
```

Defined in: [glide-mq/src/producer.ts:42](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/producer.ts#L42)

Enable transparent compression of job data. Default: 'none'.

***

### connection?

```ts
optional connection?: ConnectionOptions;
```

Defined in: [glide-mq/src/producer.ts:36](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/producer.ts#L36)

Connection options for creating a new client. Required unless `client` is provided.

***

### events?

```ts
optional events?: boolean;
```

Defined in: [glide-mq/src/producer.ts:46](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/producer.ts#L46)

Emit 'added' events on the events stream when adding jobs. Default: true.

***

### prefix?

```ts
optional prefix?: string;
```

Defined in: [glide-mq/src/producer.ts:40](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/producer.ts#L40)

Key prefix. Default: 'glide'.

***

### serializer?

```ts
optional serializer?: Serializer;
```

Defined in: [glide-mq/src/producer.ts:44](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/producer.ts#L44)

Custom serializer for job data. Default: JSON.
