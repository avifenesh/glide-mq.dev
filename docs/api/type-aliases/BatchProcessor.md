# Type Alias: BatchProcessor&lt;D, R&gt;

```ts
type BatchProcessor<D, R> = (jobs) => Promise<R[]>;
```

Defined in: [glide-mq/src/types.ts:344](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L344)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `D` | `any` |
| `R` | `any` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `jobs` | [`Job`](../classes/Job.md)[] |

## Returns

`Promise`&lt;`R`[]&gt;
