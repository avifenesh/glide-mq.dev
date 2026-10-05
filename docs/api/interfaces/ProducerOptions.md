# Interface: ProducerOptions

Defined in: [glide-mq/src/producer.ts:35](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/producer.ts#L35)

## Properties

### client?

```ts
optional client?: Client;
```

Defined in: [glide-mq/src/producer.ts:39](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/producer.ts#L39)

Pre-existing GLIDE client. When provided, the Producer does NOT own this client - close() will not destroy it.

***

### compression?

```ts
optional compression?: "none" | "gzip";
```

Defined in: [glide-mq/src/producer.ts:43](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/producer.ts#L43)

Enable transparent compression of job data. Default: 'none'.

***

### connection?

```ts
optional connection?: ConnectionOptions;
```

Defined in: [glide-mq/src/producer.ts:37](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/producer.ts#L37)

Connection options for creating a new client. Required unless `client` is provided.

***

### events?

```ts
optional events?: boolean;
```

Defined in: [glide-mq/src/producer.ts:47](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/producer.ts#L47)

Emit 'added' events on the events stream when adding jobs. Default: true.

***

### prefix?

```ts
optional prefix?: string;
```

Defined in: [glide-mq/src/producer.ts:41](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/producer.ts#L41)

Key prefix. Default: 'glide'.

***

### serializer?

```ts
optional serializer?: Serializer;
```

Defined in: [glide-mq/src/producer.ts:45](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/producer.ts#L45)

Custom serializer for job data. Default: JSON.
