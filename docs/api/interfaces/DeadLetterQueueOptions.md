# Interface: DeadLetterQueueOptions

Defined in: [glide-mq/src/types.ts:65](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L65)

Configuration for dead letter queue routing.

## Properties

### ~~maxRetries?~~

```ts
optional maxRetries?: number;
```

Defined in: [glide-mq/src/types.ts:73](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L73)

#### Deprecated

Not read and scheduled for removal in the next major version. A job
moves to the DLQ when it fails terminally, which is decided by the job's own
`attempts` option; there is no separate DLQ retry count.

***

### name

```ts
name: string;
```

Defined in: [glide-mq/src/types.ts:67](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L67)

Queue name to use as the dead letter queue.
