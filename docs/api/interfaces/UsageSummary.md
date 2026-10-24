# Interface: UsageSummary

Defined in: [glide-mq/src/types.ts:726](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L726)

Rolling aggregate usage summary across one or more queues.

## Properties

### bucketSizeMs

```ts
bucketSizeMs: number;
```

Defined in: [glide-mq/src/types.ts:729](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L729)

***

### costs

```ts
costs: Record&lt;string, number>;
```

Defined in: [glide-mq/src/types.ts:734](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L734)

***

### costUnit?

```ts
costUnit?: string;
```

Defined in: [glide-mq/src/types.ts:736](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L736)

***

### endTime

```ts
endTime: number;
```

Defined in: [glide-mq/src/types.ts:728](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L728)

***

### jobCount

```ts
jobCount: number;
```

Defined in: [glide-mq/src/types.ts:731](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L731)

***

### models

```ts
models: Record&lt;string, number>;
```

Defined in: [glide-mq/src/types.ts:737](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L737)

***

### perQueue

```ts
perQueue: Record&lt;string, UsageQueueSummary>;
```

Defined in: [glide-mq/src/types.ts:738](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L738)

***

### queues

```ts
queues: string[];
```

Defined in: [glide-mq/src/types.ts:730](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L730)

***

### startTime

```ts
startTime: number;
```

Defined in: [glide-mq/src/types.ts:727](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L727)

***

### tokens

```ts
tokens: Record&lt;string, number>;
```

Defined in: [glide-mq/src/types.ts:732](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L732)

***

### totalCost

```ts
totalCost: number;
```

Defined in: [glide-mq/src/types.ts:735](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L735)

***

### totalTokens

```ts
totalTokens: number;
```

Defined in: [glide-mq/src/types.ts:733](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L733)
