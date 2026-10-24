# Interface: JobTemplate

Defined in: [glide-mq/src/types.ts:532](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L532)

Template for jobs created by a scheduler.

## Properties

### data?

```ts
data?: any;
```

Defined in: [glide-mq/src/types.ts:534](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L534)

***

### name?

```ts
name?: string;
```

Defined in: [glide-mq/src/types.ts:533](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L533)

***

### opts?

```ts
opts?: Omit<JobOptions, "delay" | "jobId" | "deduplication" | "parent">;
```

Defined in: [glide-mq/src/types.ts:535](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L535)
