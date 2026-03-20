# Interface: Metrics

Defined in: [glide-mq/src/types.ts:364](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L364)

## Properties

### count

```ts
count: number;
```

Defined in: [glide-mq/src/types.ts:366](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L366)

Total count of completed or failed jobs.

***

### data

```ts
data: MetricsDataPoint[];
```

Defined in: [glide-mq/src/types.ts:368](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L368)

Per-minute data points sorted oldest-first.

***

### meta

```ts
meta: object;
```

Defined in: [glide-mq/src/types.ts:370](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L370)

Resolution metadata.

#### resolution

```ts
resolution: "minute";
```
