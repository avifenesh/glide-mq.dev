# Interface: SearchJobsOptions

Defined in: [glide-mq/src/types.ts:386](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L386)

## Properties

### data?

```ts
optional data?: Record<string, unknown>;
```

Defined in: [glide-mq/src/types.ts:389](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L389)

***

### excludeData?

```ts
optional excludeData?: boolean;
```

Defined in: [glide-mq/src/types.ts:392](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L392)

When true, excludes `data` and `returnvalue` fields from returned jobs.

***

### limit?

```ts
optional limit?: number;
```

Defined in: [glide-mq/src/types.ts:390](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L390)

***

### name?

```ts
optional name?: string;
```

Defined in: [glide-mq/src/types.ts:388](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L388)

***

### state?

```ts
optional state?: "completed" | "failed" | "delayed" | "active" | "waiting";
```

Defined in: [glide-mq/src/types.ts:387](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L387)
