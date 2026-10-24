# Interface: MetricsDataPoint

Defined in: [glide-mq/src/types.ts:560](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L560)

A single per-minute metrics data point.

## Properties

### avgDuration

```ts
avgDuration: number;
```

Defined in: [glide-mq/src/types.ts:566](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L566)

Average processing duration in ms for this bucket.

***

### count

```ts
count: number;
```

Defined in: [glide-mq/src/types.ts:564](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L564)

Number of jobs completed/failed in this bucket.

***

### timestamp

```ts
timestamp: number;
```

Defined in: [glide-mq/src/types.ts:562](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L562)

Minute-bucket epoch ms (floored to start of minute).
