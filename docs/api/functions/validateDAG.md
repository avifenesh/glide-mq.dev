# Function: validateDAG()

```ts
function validateDAG(nodes): void;
```

Defined in: [glide-mq/src/dag-utils.ts:76](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/dag-utils.ts#L76)

Validate that a set of DAG nodes forms a valid DAG (no cycles).
Throws CycleError if a cycle is detected.
Throws Error if a node references a non-existent dependency.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `nodes` | [`DAGNode`](../interfaces/DAGNode.md)[] |

## Returns

`void`
