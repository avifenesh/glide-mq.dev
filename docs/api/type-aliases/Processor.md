# Type Alias: Processor&lt;D, R&gt;

```ts
type Processor<D, R> = (job) => Promise<R>;
```

Defined in: [glide-mq/src/types.ts:334](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L334)

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

`Promise`&lt;`R`&gt;
