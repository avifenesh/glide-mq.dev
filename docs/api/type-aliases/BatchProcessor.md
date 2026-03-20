# Type Alias: BatchProcessor\<D, R\>

```ts
type BatchProcessor<D, R> = (jobs) => Promise<R[]>;
```

Defined in: [glide-mq/src/types.ts:269](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L269)

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

`Promise`\<`R`[]\>
