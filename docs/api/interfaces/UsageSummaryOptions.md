# Interface: UsageSummaryOptions

Defined in: [glide-mq/src/types.ts:681](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L681)

Options for aggregating reported usage across one or more queues.

## Properties

### endTime?

```ts
optional endTime?: number;
```

Defined in: [glide-mq/src/types.ts:691](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L691)

End of the query window in epoch milliseconds (inclusive).
Defaults to `Date.now()`.

***

### queues?

```ts
optional queues?: string[];
```

Defined in: [glide-mq/src/types.ts:701](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L701)

Restrict the summary to specific queues.
When omitted, all queues with recorded usage under the current prefix are included.

***

### startTime?

```ts
optional startTime?: number;
```

Defined in: [glide-mq/src/types.ts:686](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L686)

Start of the query window in epoch milliseconds (inclusive).
When omitted, `windowMs` is used relative to `endTime`.

***

### windowMs?

```ts
optional windowMs?: number;
```

Defined in: [glide-mq/src/types.ts:696](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L696)

Window length in milliseconds when `startTime` is omitted.
Defaults to 1 hour.
