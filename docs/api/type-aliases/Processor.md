# Type Alias: Processor&lt;D, R&gt;

```ts
type Processor<D, R> = (job) => Promise<R>;
```

Defined in: [glide-mq/src/types.ts:344](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L344)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-d"></a> `D` | `any` |
| <a id="type-parameter-r"></a> `R` | `any` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `job` | [`Job`](../classes/Job.md) |

## Returns

`Promise`&lt;`R`&gt;
