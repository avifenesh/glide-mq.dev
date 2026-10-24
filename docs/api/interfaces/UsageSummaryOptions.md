# Interface: UsageSummaryOptions

Defined in: [glide-mq/src/types.ts:691](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L691)

Options for aggregating reported usage across one or more queues.

## Properties

### endTime?

```ts
endTime?: number;
```

Defined in: [glide-mq/src/types.ts:701](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L701)

End of the query window in epoch milliseconds (inclusive).
Defaults to `Date.now()`.

***

### queues?

```ts
queues?: string[];
```

Defined in: [glide-mq/src/types.ts:711](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L711)

Restrict the summary to specific queues.
When omitted, all queues with recorded usage under the current prefix are included.

***

### startTime?

```ts
startTime?: number;
```

Defined in: [glide-mq/src/types.ts:696](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L696)

Start of the query window in epoch milliseconds (inclusive).
When omitted, `windowMs` is used relative to `endTime`.

***

### windowMs?

```ts
windowMs?: number;
```

Defined in: [glide-mq/src/types.ts:706](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L706)

Window length in milliseconds when `startTime` is omitted.
Defaults to 1 hour.
