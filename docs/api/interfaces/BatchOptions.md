# Interface: BatchOptions

Defined in: [glide-mq/src/types.ts:337](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L337)

Configuration for batch processing mode.

## Properties

### size

```ts
size: number;
```

Defined in: [glide-mq/src/types.ts:339](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L339)

Maximum number of jobs to collect before invoking the batch processor.

***

### timeout?

```ts
optional timeout?: number;
```

Defined in: [glide-mq/src/types.ts:341](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L341)

Maximum time in ms to wait for a full batch. If not set, processes whatever is available immediately.
