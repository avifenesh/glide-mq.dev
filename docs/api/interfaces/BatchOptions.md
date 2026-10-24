# Interface: BatchOptions

Defined in: [glide-mq/src/types.ts:347](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L347)

Configuration for batch processing mode.

## Properties

### size

```ts
size: number;
```

Defined in: [glide-mq/src/types.ts:349](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L349)

Maximum number of jobs to collect before invoking the batch processor.

***

### timeout?

```ts
timeout?: number;
```

Defined in: [glide-mq/src/types.ts:351](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L351)

Maximum time in ms to wait for a full batch. If not set, processes whatever is available immediately.
