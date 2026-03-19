# Type Alias: BatchProcessor&lt;D, R&gt;

```ts
type BatchProcessor<D, R> = (jobs) => Promise<R[]>;
```

Defined in: [glide-mq/src/types.ts:269](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L269)

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
