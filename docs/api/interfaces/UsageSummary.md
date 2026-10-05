# Interface: UsageSummary

Defined in: [glide-mq/src/types.ts:716](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L716)

Rolling aggregate usage summary across one or more queues.

## Properties

### bucketSizeMs

```ts
bucketSizeMs: number;
```

Defined in: [glide-mq/src/types.ts:719](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L719)

***

### costs

```ts
costs: Record&lt;string, number>;
```

Defined in: [glide-mq/src/types.ts:724](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L724)

***

### costUnit?

```ts
optional costUnit?: string;
```

Defined in: [glide-mq/src/types.ts:726](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L726)

***

### endTime

```ts
endTime: number;
```

Defined in: [glide-mq/src/types.ts:718](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L718)

***

### jobCount

```ts
jobCount: number;
```

Defined in: [glide-mq/src/types.ts:721](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L721)

***

### models

```ts
models: Record&lt;string, number>;
```

Defined in: [glide-mq/src/types.ts:727](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L727)

***

### perQueue

```ts
perQueue: Record&lt;string, UsageQueueSummary>;
```

Defined in: [glide-mq/src/types.ts:728](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L728)

***

### queues

```ts
queues: string[];
```

Defined in: [glide-mq/src/types.ts:720](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L720)

***

### startTime

```ts
startTime: number;
```

Defined in: [glide-mq/src/types.ts:717](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L717)

***

### tokens

```ts
tokens: Record&lt;string, number>;
```

Defined in: [glide-mq/src/types.ts:722](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L722)

***

### totalCost

```ts
totalCost: number;
```

Defined in: [glide-mq/src/types.ts:725](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L725)

***

### totalTokens

```ts
totalTokens: number;
```

Defined in: [glide-mq/src/types.ts:723](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L723)
