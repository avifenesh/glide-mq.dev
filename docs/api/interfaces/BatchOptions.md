# Interface: BatchOptions

Defined in: [glide-mq/src/types.ts:262](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L262)

## Properties

### size

```ts
size: number;
```

Defined in: [glide-mq/src/types.ts:264](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L264)

Maximum number of jobs to collect before invoking the batch processor.

***

### timeout?

```ts
optional timeout?: number;
```

Defined in: [glide-mq/src/types.ts:266](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L266)

Maximum time in ms to wait for a full batch. If not set, processes whatever is available immediately.
