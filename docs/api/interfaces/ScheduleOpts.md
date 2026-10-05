# Interface: ScheduleOpts

Defined in: [glide-mq/src/types.ts:496](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L496)

Options for defining a job schedule (cron, interval, or repeat-after-complete).

## Properties

### endDate?

```ts
optional endDate?: number | Date;
```

Defined in: [glide-mq/src/types.ts:516](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L516)

Latest scheduled run time allowed before the scheduler auto-removes itself.

***

### every?

```ts
optional every?: number;
```

Defined in: [glide-mq/src/types.ts:505](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L505)

Repeat interval in milliseconds

***

### limit?

```ts
optional limit?: number;
```

Defined in: [glide-mq/src/types.ts:518](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L518)

Maximum number of jobs to create before the scheduler auto-removes itself.

***

### pattern?

```ts
optional pattern?: string;
```

Defined in: [glide-mq/src/types.ts:503](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L503)

Cron pattern: `minute hour dayOfMonth month dayOfWeek`, or 6 fields with a
leading `second`. Accepts names (JAN-DEC, SUN-SAT), dayOfWeek 0-7 (0 and 7
are Sunday), `?`, `L`, `W` and `#`. cron-parser (BullMQ) compatible; see
docs/ADVANCED.md "Cron syntax".

***

### repeatAfterComplete?

```ts
optional repeatAfterComplete?: number;
```

Defined in: [glide-mq/src/types.ts:510](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L510)

Schedule next job N ms after the current one completes (or terminally fails).
Mutually exclusive with `pattern` and `every`.

***

### startDate?

```ts
optional startDate?: number | Date;
```

Defined in: [glide-mq/src/types.ts:514](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L514)

Earliest time the scheduler may create a job. Accepts a Date or epoch milliseconds.

***

### tz?

```ts
optional tz?: string;
```

Defined in: [glide-mq/src/types.ts:512](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L512)

IANA timezone for cron patterns (e.g. 'America/New_York'). Defaults to UTC.
