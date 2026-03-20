# Interface: MetricsDataPoint

Defined in: [glide-mq/src/types.ts:348](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L348)

## Properties

### avgDuration

```ts
avgDuration: number;
```

Defined in: [glide-mq/src/types.ts:354](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L354)

Average processing duration in ms for this bucket.

***

### count

```ts
count: number;
```

Defined in: [glide-mq/src/types.ts:352](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L352)

Number of jobs completed/failed in this bucket.

***

### timestamp

```ts
timestamp: number;
```

Defined in: [glide-mq/src/types.ts:350](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L350)

Minute-bucket epoch ms (floored to start of minute).
