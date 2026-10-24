# Interface: SchedulerEntry

Defined in: [glide-mq/src/types.ts:539](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L539)

Stored state of a registered job scheduler.

## Properties

### compression?

```ts
compression?: "gzip";
```

Defined in: [glide-mq/src/types.ts:552](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L552)

Set when the upserting Queue has `compression: 'gzip'`; each run stores its data compressed.

***

### endDate?

```ts
endDate?: number;
```

Defined in: [glide-mq/src/types.ts:547](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L547)

***

### every?

```ts
every?: number;
```

Defined in: [glide-mq/src/types.ts:541](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L541)

***

### inflightJobId?

```ts
inflightJobId?: string;
```

Defined in: [glide-mq/src/types.ts:556](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L556)

Id of the job the last tick fired. Only its completion advances a repeatAfterComplete entry.

***

### iterationCount?

```ts
iterationCount?: number;
```

Defined in: [glide-mq/src/types.ts:549](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L549)

***

### lastRun?

```ts
lastRun?: number;
```

Defined in: [glide-mq/src/types.ts:553](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L553)

***

### limit?

```ts
limit?: number;
```

Defined in: [glide-mq/src/types.ts:548](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L548)

***

### nextRun

```ts
nextRun: number;
```

Defined in: [glide-mq/src/types.ts:554](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L554)

***

### pattern?

```ts
pattern?: string;
```

Defined in: [glide-mq/src/types.ts:540](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L540)

***

### repeatAfterComplete?

```ts
repeatAfterComplete?: number;
```

Defined in: [glide-mq/src/types.ts:543](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L543)

Delay in ms after completion before scheduling the next job.

***

### startDate?

```ts
startDate?: number;
```

Defined in: [glide-mq/src/types.ts:546](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L546)

***

### template?

```ts
template?: JobTemplate;
```

Defined in: [glide-mq/src/types.ts:550](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L550)

***

### tz?

```ts
tz?: string;
```

Defined in: [glide-mq/src/types.ts:545](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L545)

IANA timezone for cron patterns (e.g. 'America/New_York'). Defaults to UTC.
