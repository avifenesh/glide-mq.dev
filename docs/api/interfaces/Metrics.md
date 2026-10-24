# Interface: Metrics

Defined in: [glide-mq/src/types.ts:578](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L578)

Aggregated metrics result with total count and per-minute data points.

## Properties

### count

```ts
count: number;
```

Defined in: [glide-mq/src/types.ts:580](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L580)

Total count of completed or failed jobs.

***

### data

```ts
data: MetricsDataPoint[];
```

Defined in: [glide-mq/src/types.ts:582](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L582)

Per-minute data points sorted oldest-first.

***

### meta

```ts
meta: object;
```

Defined in: [glide-mq/src/types.ts:584](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L584)

Resolution metadata.

#### resolution

```ts
resolution: "minute";
```
