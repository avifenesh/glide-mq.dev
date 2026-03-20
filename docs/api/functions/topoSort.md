# Function: topoSort()

```ts
function topoSort(nodes): DAGNode[];
```

Defined in: [glide-mq/src/dag-utils.ts:113](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/dag-utils.ts#L113)

Topological sort of DAG nodes using Kahn's algorithm.
Returns nodes in submission order (leaves first, roots last).
Throws CycleError if a cycle is detected.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `nodes` | [`DAGNode`](../interfaces/DAGNode.md)[] |

## Returns

[`DAGNode`](../interfaces/DAGNode.md)[]
