# Type Alias: Processor&lt;D, R&gt;

```ts
type Processor<D, R> = (job) => Promise<R>;
```

Defined in: [glide-mq/src/types.ts:260](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L260)

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
