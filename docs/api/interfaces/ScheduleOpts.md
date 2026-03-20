# Interface: ScheduleOpts

Defined in: [glide-mq/src/types.ts:306](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L306)

## Properties

### endDate?

```ts
optional endDate?: number | Date;
```

Defined in: [glide-mq/src/types.ts:321](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L321)

Latest scheduled run time allowed before the scheduler auto-removes itself.

***

### every?

```ts
optional every?: number;
```

Defined in: [glide-mq/src/types.ts:310](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L310)

Repeat interval in milliseconds

***

### limit?

```ts
optional limit?: number;
```

Defined in: [glide-mq/src/types.ts:323](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L323)

Maximum number of jobs to create before the scheduler auto-removes itself.

***

### pattern?

```ts
optional pattern?: string;
```

Defined in: [glide-mq/src/types.ts:308](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L308)

Cron pattern (5 fields: minute hour dayOfMonth month dayOfWeek)

***

### repeatAfterComplete?

```ts
optional repeatAfterComplete?: number;
```

Defined in: [glide-mq/src/types.ts:315](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L315)

Schedule next job N ms after the current one completes (or terminally fails).
Mutually exclusive with `pattern` and `every`.

***

### startDate?

```ts
optional startDate?: number | Date;
```

Defined in: [glide-mq/src/types.ts:319](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L319)

Earliest time the scheduler may create a job. Accepts a Date or epoch milliseconds.

***

### tz?

```ts
optional tz?: string;
```

Defined in: [glide-mq/src/types.ts:317](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L317)

IANA timezone for cron patterns (e.g. 'America/New_York'). Defaults to UTC.
