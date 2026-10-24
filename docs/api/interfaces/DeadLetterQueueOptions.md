# Interface: DeadLetterQueueOptions

Defined in: [glide-mq/src/types.ts:65](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L65)

Configuration for dead letter queue routing.

## Properties

### ~~maxRetries?~~

```ts
maxRetries?: number;
```

Defined in: [glide-mq/src/types.ts:73](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L73)

#### Deprecated

Not read and scheduled for removal in the next major version. A job
moves to the DLQ when it fails terminally, which is decided by the job's own
`attempts` option; there is no separate DLQ retry count.

***

### name

```ts
name: string;
```

Defined in: [glide-mq/src/types.ts:67](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L67)

Queue name to use as the dead letter queue.
