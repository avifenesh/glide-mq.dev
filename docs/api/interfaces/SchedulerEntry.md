# Interface: SchedulerEntry

Defined in: [glide-mq/src/types.ts:332](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L332)

## Properties

### endDate?

```ts
optional endDate?: number;
```

Defined in: [glide-mq/src/types.ts:340](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L340)

***

### every?

```ts
optional every?: number;
```

Defined in: [glide-mq/src/types.ts:334](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L334)

***

### iterationCount?

```ts
optional iterationCount?: number;
```

Defined in: [glide-mq/src/types.ts:342](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L342)

***

### lastRun?

```ts
optional lastRun?: number;
```

Defined in: [glide-mq/src/types.ts:344](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L344)

***

### limit?

```ts
optional limit?: number;
```

Defined in: [glide-mq/src/types.ts:341](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L341)

***

### nextRun

```ts
nextRun: number;
```

Defined in: [glide-mq/src/types.ts:345](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L345)

***

### pattern?

```ts
optional pattern?: string;
```

Defined in: [glide-mq/src/types.ts:333](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L333)

***

### repeatAfterComplete?

```ts
optional repeatAfterComplete?: number;
```

Defined in: [glide-mq/src/types.ts:336](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L336)

Delay in ms after completion before scheduling the next job.

***

### startDate?

```ts
optional startDate?: number;
```

Defined in: [glide-mq/src/types.ts:339](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L339)

***

### template?

```ts
optional template?: JobTemplate;
```

Defined in: [glide-mq/src/types.ts:343](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L343)

***

### tz?

```ts
optional tz?: string;
```

Defined in: [glide-mq/src/types.ts:338](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L338)

IANA timezone for cron patterns (e.g. 'America/New_York'). Defaults to UTC.
