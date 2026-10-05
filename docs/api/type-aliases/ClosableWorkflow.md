# Type Alias: ClosableWorkflow&lt;T&gt;

```ts
type ClosableWorkflow<T> = T & object;
```

Defined in: [glide-mq/src/workflows.ts:15](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/workflows.ts#L15)

Returned workflow tree or DAG map plus close() for an injected client.

## Type Declaration

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `close()` | () => `Promise`&lt;`void`&gt; | [glide-mq/src/workflows.ts:15](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/workflows.ts#L15) |

## Type Parameters

| Type Parameter |
| ------ |
| `T` |
