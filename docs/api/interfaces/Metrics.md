# Interface: Metrics

Defined in: [glide-mq/src/types.ts:568](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L568)

Aggregated metrics result with total count and per-minute data points.

## Properties

### count

```ts
count: number;
```

Defined in: [glide-mq/src/types.ts:570](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L570)

Total count of completed or failed jobs.

***

### data

```ts
data: MetricsDataPoint[];
```

Defined in: [glide-mq/src/types.ts:572](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L572)

Per-minute data points sorted oldest-first.

***

### meta

```ts
meta: object;
```

Defined in: [glide-mq/src/types.ts:574](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L574)

Resolution metadata.

#### resolution

```ts
resolution: "minute";
```
