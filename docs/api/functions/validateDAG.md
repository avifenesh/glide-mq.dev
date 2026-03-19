# Function: validateDAG()

```ts
function validateDAG(nodes): void;
```

Defined in: [glide-mq/src/dag-utils.ts:76](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/dag-utils.ts#L76)

Validate that a set of DAG nodes forms a valid DAG (no cycles).
Throws CycleError if a cycle is detected.
Throws Error if a node references a non-existent dependency.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `nodes` | [`DAGNode`](../interfaces/DAGNode.md)[] |

## Returns

`void`
