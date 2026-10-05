# Interface: JobUsage

Defined in: [glide-mq/src/types.ts:653](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L653)

AI-specific usage metadata reported by a job processor.

## Properties

### cached?

```ts
optional cached?: boolean;
```

Defined in: [glide-mq/src/types.ts:677](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L677)

Whether the response came from a cache hit.

***

### costs?

```ts
optional costs?: Record&lt;string, number>;
```

Defined in: [glide-mq/src/types.ts:669](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L669)

Cost breakdown by category. Values are in whatever unit `costUnit` specifies.
Any string key is accepted.

***

### costUnit?

```ts
optional costUnit?: string;
```

Defined in: [glide-mq/src/types.ts:673](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L673)

Unit for cost values (e.g. 'usd', 'credits', 'ils'). Informational only.

***

### latencyMs?

```ts
optional latencyMs?: number;
```

Defined in: [glide-mq/src/types.ts:675](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L675)

Inference latency in milliseconds (not including queue wait time).

***

### model?

```ts
optional model?: string;
```

Defined in: [glide-mq/src/types.ts:655](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L655)

Model identifier (e.g. 'gpt-5.4', 'claude-sonnet-4-20250514').

***

### provider?

```ts
optional provider?: string;
```

Defined in: [glide-mq/src/types.ts:657](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L657)

Provider identifier (e.g. 'openai', 'anthropic').

***

### tokens?

```ts
optional tokens?: Record&lt;string, number>;
```

Defined in: [glide-mq/src/types.ts:662](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L662)

Token counts by category. Any string key is accepted.
Well-known keys: input, output, reasoning, cachedInput, cachedOutput.

***

### totalCost?

```ts
optional totalCost?: number;
```

Defined in: [glide-mq/src/types.ts:671](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L671)

Total cost (auto-computed as sum of all values in `costs` if not provided).

***

### totalTokens?

```ts
optional totalTokens?: number;
```

Defined in: [glide-mq/src/types.ts:664](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L664)

Total tokens (auto-computed as sum of all values in `tokens` if not provided).
