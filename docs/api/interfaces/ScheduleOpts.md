# Interface: ScheduleOpts

Defined in: [glide-mq/src/types.ts:506](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L506)

Options for defining a job schedule (cron, interval, or repeat-after-complete).

## Properties

### endDate?

```ts
endDate?: number | Date;
```

Defined in: [glide-mq/src/types.ts:526](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L526)

Latest scheduled run time allowed before the scheduler auto-removes itself.

***

### every?

```ts
every?: number;
```

Defined in: [glide-mq/src/types.ts:515](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L515)

Repeat interval in milliseconds

***

### limit?

```ts
limit?: number;
```

Defined in: [glide-mq/src/types.ts:528](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L528)

Maximum number of jobs to create before the scheduler auto-removes itself.

***

### pattern?

```ts
pattern?: string;
```

Defined in: [glide-mq/src/types.ts:513](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L513)

Cron pattern: `minute hour dayOfMonth month dayOfWeek`, or 6 fields with a
leading `second`. Accepts names (JAN-DEC, SUN-SAT), dayOfWeek 0-7 (0 and 7
are Sunday), `?`, `L`, `W` and `#`. cron-parser (BullMQ) compatible; see
docs/ADVANCED.md "Cron syntax".

***

### repeatAfterComplete?

```ts
repeatAfterComplete?: number;
```

Defined in: [glide-mq/src/types.ts:520](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L520)

Schedule next job N ms after the current one completes (or terminally fails).
Mutually exclusive with `pattern` and `every`.

***

### startDate?

```ts
startDate?: number | Date;
```

Defined in: [glide-mq/src/types.ts:524](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L524)

Earliest time the scheduler may create a job. Accepts a Date or epoch milliseconds.

***

### tz?

```ts
tz?: string;
```

Defined in: [glide-mq/src/types.ts:522](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L522)

IANA timezone for cron patterns (e.g. 'America/New_York'). Defaults to UTC.
