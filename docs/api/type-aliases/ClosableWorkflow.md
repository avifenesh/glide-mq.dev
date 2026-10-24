# Type Alias: ClosableWorkflow&lt;T&gt;

```ts
type ClosableWorkflow<T> = T & object;
```

Defined in: [glide-mq/src/workflows.ts:15](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/workflows.ts#L15)

Returned workflow tree or DAG map plus close() for an injected client.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Type Declaration

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `close()` | () => `Promise`&lt;`void`&gt; | [glide-mq/src/workflows.ts:15](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/workflows.ts#L15) |
