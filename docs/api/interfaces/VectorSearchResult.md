# Interface: VectorSearchResult&lt;D, R&gt;

Defined in: [glide-mq/src/types.ts:454](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L454)

A single result from a vector similarity search.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-d"></a> `D` | `any` |
| <a id="type-parameter-r"></a> `R` | `any` |

## Properties

### job

```ts
job: Job<D, R>;
```

Defined in: [glide-mq/src/types.ts:456](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L456)

The hydrated Job object.

***

### score

```ts
score: number;
```

Defined in: [glide-mq/src/types.ts:464](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L464)

Distance/similarity score from the vector search.
Interpretation depends on the distance metric used in the index:
- COSINE: 0 = identical, 2 = opposite (lower = more similar)
- L2: 0 = identical (lower = more similar)
- IP (inner product): higher = more similar
