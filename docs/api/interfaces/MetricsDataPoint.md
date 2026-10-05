# Interface: MetricsDataPoint

Defined in: [glide-mq/src/types.ts:550](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L550)

A single per-minute metrics data point.

## Properties

### avgDuration

```ts
avgDuration: number;
```

Defined in: [glide-mq/src/types.ts:556](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L556)

Average processing duration in ms for this bucket.

***

### count

```ts
count: number;
```

Defined in: [glide-mq/src/types.ts:554](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L554)

Number of jobs completed/failed in this bucket.

***

### timestamp

```ts
timestamp: number;
```

Defined in: [glide-mq/src/types.ts:552](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L552)

Minute-bucket epoch ms (floored to start of minute).
