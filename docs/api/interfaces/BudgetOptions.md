# Interface: BudgetOptions

Defined in: [glide-mq/src/types.ts:347](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L347)

Budget constraints for a flow. Caps token usage and/or cost across all jobs.

## Properties

### costUnit?

```ts
optional costUnit?: string;
```

Defined in: [glide-mq/src/types.ts:363](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L363)

Unit for cost values (informational, e.g. 'usd', 'credits', 'ils').

***

### maxCosts?

```ts
optional maxCosts?: Record&lt;string, number>;
```

Defined in: [glide-mq/src/types.ts:361](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L361)

Per-category cost caps. Each independently enforced.

***

### maxTokens?

```ts
optional maxTokens?: Record&lt;string, number>;
```

Defined in: [glide-mq/src/types.ts:351](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L351)

Per-category token caps (e.g. { input: 50000, reasoning: 5000 }). Each independently enforced.

***

### maxTotalCost?

```ts
optional maxTotalCost?: number;
```

Defined in: [glide-mq/src/types.ts:359](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L359)

Hard cap on total cost across all jobs in this flow.

***

### maxTotalTokens?

```ts
optional maxTotalTokens?: number;
```

Defined in: [glide-mq/src/types.ts:349](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L349)

Hard cap on weighted total tokens across all jobs in this flow.

***

### onExceeded?

```ts
optional onExceeded?: "fail" | "pause";
```

Defined in: [glide-mq/src/types.ts:365](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L365)

What happens when budget is exceeded. Default: 'fail'.

***

### tokenWeights?

```ts
optional tokenWeights?: Record&lt;string, number>;
```

Defined in: [glide-mq/src/types.ts:357](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L357)

Weight multipliers for token categories when computing weighted total for maxTotalTokens.
Unlisted categories default to weight 1.
Example: { reasoning: 4, cachedInput: 0.25 }
