# Type Alias: Processor\<D, R\>

```ts
type Processor<D, R> = (job) => Promise<R>;
```

Defined in: [glide-mq/src/types.ts:260](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L260)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `D` | `any` |
| `R` | `any` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `job` | [`Job`](../classes/Job.md) |

## Returns

`Promise`\<`R`\>
