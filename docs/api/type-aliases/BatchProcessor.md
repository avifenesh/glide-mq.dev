# Type Alias: BatchProcessor&lt;D, R&gt;

```ts
type BatchProcessor<D, R> = (jobs) => Promise<R[]>;
```

Defined in: [glide-mq/src/types.ts:269](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L269)

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
