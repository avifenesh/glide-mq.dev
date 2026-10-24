# Interface: BudgetOptions

Defined in: [glide-mq/src/types.ts:357](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L357)

Budget constraints for a flow. Caps token usage and/or cost across all jobs.

## Properties

### costUnit?

```ts
costUnit?: string;
```

Defined in: [glide-mq/src/types.ts:373](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L373)

Unit for cost values (informational, e.g. 'usd', 'credits', 'ils').

***

### maxCosts?

```ts
maxCosts?: Record&lt;string, number>;
```

Defined in: [glide-mq/src/types.ts:371](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L371)

Per-category cost caps. Each independently enforced.

***

### maxTokens?

```ts
maxTokens?: Record&lt;string, number>;
```

Defined in: [glide-mq/src/types.ts:361](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L361)

Per-category token caps (e.g. { input: 50000, reasoning: 5000 }). Each independently enforced.

***

### maxTotalCost?

```ts
maxTotalCost?: number;
```

Defined in: [glide-mq/src/types.ts:369](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L369)

Hard cap on total cost across all jobs in this flow.

***

### maxTotalTokens?

```ts
maxTotalTokens?: number;
```

Defined in: [glide-mq/src/types.ts:359](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L359)

Hard cap on weighted total tokens across all jobs in this flow.

***

### onExceeded?

```ts
onExceeded?: "fail" | "pause";
```

Defined in: [glide-mq/src/types.ts:375](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L375)

What happens when budget is exceeded. Default: 'fail'.

***

### tokenWeights?

```ts
tokenWeights?: Record&lt;string, number>;
```

Defined in: [glide-mq/src/types.ts:367](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L367)

Weight multipliers for token categories when computing weighted total for maxTotalTokens.
Unlisted categories default to weight 1.
Example: { reasoning: 4, cachedInput: 0.25 }
