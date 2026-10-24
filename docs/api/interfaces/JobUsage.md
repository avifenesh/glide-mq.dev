# Interface: JobUsage

Defined in: [glide-mq/src/types.ts:663](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L663)

AI-specific usage metadata reported by a job processor.

## Properties

### cached?

```ts
cached?: boolean;
```

Defined in: [glide-mq/src/types.ts:687](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L687)

Whether the response came from a cache hit.

***

### costs?

```ts
costs?: Record&lt;string, number>;
```

Defined in: [glide-mq/src/types.ts:679](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L679)

Cost breakdown by category. Values are in whatever unit `costUnit` specifies.
Any string key is accepted.

***

### costUnit?

```ts
costUnit?: string;
```

Defined in: [glide-mq/src/types.ts:683](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L683)

Unit for cost values (e.g. 'usd', 'credits', 'ils'). Informational only.

***

### latencyMs?

```ts
latencyMs?: number;
```

Defined in: [glide-mq/src/types.ts:685](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L685)

Inference latency in milliseconds (not including queue wait time).

***

### model?

```ts
model?: string;
```

Defined in: [glide-mq/src/types.ts:665](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L665)

Model identifier (e.g. 'gpt-5.4', 'claude-sonnet-4-20250514').

***

### provider?

```ts
provider?: string;
```

Defined in: [glide-mq/src/types.ts:667](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L667)

Provider identifier (e.g. 'openai', 'anthropic').

***

### tokens?

```ts
tokens?: Record&lt;string, number>;
```

Defined in: [glide-mq/src/types.ts:672](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L672)

Token counts by category. Any string key is accepted.
Well-known keys: input, output, reasoning, cachedInput, cachedOutput.

***

### totalCost?

```ts
totalCost?: number;
```

Defined in: [glide-mq/src/types.ts:681](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L681)

Total cost (auto-computed as sum of all values in `costs` if not provided).

***

### totalTokens?

```ts
totalTokens?: number;
```

Defined in: [glide-mq/src/types.ts:674](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L674)

Total tokens (auto-computed as sum of all values in `tokens` if not provided).
