# Interface: Metrics

Defined in: [glide-mq/src/types.ts:364](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L364)

## Properties

### count

```ts
count: number;
```

Defined in: [glide-mq/src/types.ts:366](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L366)

Total count of completed or failed jobs.

***

### data

```ts
data: MetricsDataPoint[];
```

Defined in: [glide-mq/src/types.ts:368](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L368)

Per-minute data points sorted oldest-first.

***

### meta

```ts
meta: object;
```

Defined in: [glide-mq/src/types.ts:370](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L370)

Resolution metadata.

#### resolution

```ts
resolution: "minute";
```
