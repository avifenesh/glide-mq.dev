# Function: validateDAG()

```ts
function validateDAG(nodes): void;
```

Defined in: [glide-mq/src/dag-utils.ts:76](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/dag-utils.ts#L76)

Validate that a set of DAG nodes forms a valid DAG (no cycles).
Throws CycleError if a cycle is detected.
Throws Error if a node references a non-existent dependency.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `nodes` | [`DAGNode`](../interfaces/DAGNode.md)[] |

## Returns

`void`
