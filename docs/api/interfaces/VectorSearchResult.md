# Interface: VectorSearchResult&lt;D, R&gt;

Defined in: [glide-mq/src/types.ts:444](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L444)

A single result from a vector similarity search.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `D` | `any` |
| `R` | `any` |

## Properties

### job

```ts
job: Job<D, R>;
```

Defined in: [glide-mq/src/types.ts:446](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L446)

The hydrated Job object.

***

### score

```ts
score: number;
```

Defined in: [glide-mq/src/types.ts:454](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L454)

Distance/similarity score from the vector search.
Interpretation depends on the distance metric used in the index:
- COSINE: 0 = identical, 2 = opposite (lower = more similar)
- L2: 0 = identical (lower = more similar)
- IP (inner product): higher = more similar
