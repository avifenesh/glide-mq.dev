# Interface: SchedulerEntry

Defined in: [glide-mq/src/types.ts:529](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L529)

Stored state of a registered job scheduler.

## Properties

### compression?

```ts
optional compression?: "gzip";
```

Defined in: [glide-mq/src/types.ts:542](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L542)

Set when the upserting Queue has `compression: 'gzip'`; each run stores its data compressed.

***

### endDate?

```ts
optional endDate?: number;
```

Defined in: [glide-mq/src/types.ts:537](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L537)

***

### every?

```ts
optional every?: number;
```

Defined in: [glide-mq/src/types.ts:531](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L531)

***

### inflightJobId?

```ts
optional inflightJobId?: string;
```

Defined in: [glide-mq/src/types.ts:546](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L546)

Id of the job the last tick fired. Only its completion advances a repeatAfterComplete entry.

***

### iterationCount?

```ts
optional iterationCount?: number;
```

Defined in: [glide-mq/src/types.ts:539](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L539)

***

### lastRun?

```ts
optional lastRun?: number;
```

Defined in: [glide-mq/src/types.ts:543](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L543)

***

### limit?

```ts
optional limit?: number;
```

Defined in: [glide-mq/src/types.ts:538](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L538)

***

### nextRun

```ts
nextRun: number;
```

Defined in: [glide-mq/src/types.ts:544](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L544)

***

### pattern?

```ts
optional pattern?: string;
```

Defined in: [glide-mq/src/types.ts:530](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L530)

***

### repeatAfterComplete?

```ts
optional repeatAfterComplete?: number;
```

Defined in: [glide-mq/src/types.ts:533](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L533)

Delay in ms after completion before scheduling the next job.

***

### startDate?

```ts
optional startDate?: number;
```

Defined in: [glide-mq/src/types.ts:536](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L536)

***

### template?

```ts
optional template?: JobTemplate;
```

Defined in: [glide-mq/src/types.ts:540](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L540)

***

### tz?

```ts
optional tz?: string;
```

Defined in: [glide-mq/src/types.ts:535](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L535)

IANA timezone for cron patterns (e.g. 'America/New_York'). Defaults to UTC.
