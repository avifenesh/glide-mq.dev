# Interface: SearchJobsOptions

Defined in: [glide-mq/src/types.ts:603](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L603)

Options for searchJobs() method.

## Properties

### data?

```ts
data?: Record&lt;string, unknown>;
```

Defined in: [glide-mq/src/types.ts:606](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L606)

***

### excludeData?

```ts
excludeData?: boolean;
```

Defined in: [glide-mq/src/types.ts:609](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L609)

When true, excludes `data` and `returnvalue` fields from returned jobs.

***

### limit?

```ts
limit?: number;
```

Defined in: [glide-mq/src/types.ts:607](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L607)

***

### name?

```ts
name?: string;
```

Defined in: [glide-mq/src/types.ts:605](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L605)

***

### state?

```ts
state?: "completed" | "failed" | "delayed" | "active" | "waiting";
```

Defined in: [glide-mq/src/types.ts:604](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L604)
