# Function: topoSort()

```ts
function topoSort(nodes): DAGNode[];
```

Defined in: [glide-mq/src/dag-utils.ts:113](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/dag-utils.ts#L113)

Topological sort of DAG nodes using Kahn's algorithm.
Returns nodes in submission order (leaves first, roots last).
Throws CycleError if a cycle is detected.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `nodes` | [`DAGNode`](../interfaces/DAGNode.md)[] |

## Returns

[`DAGNode`](../interfaces/DAGNode.md)[]
