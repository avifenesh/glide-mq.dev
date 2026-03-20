# Function: topoSort()

```ts
function topoSort(nodes): DAGNode[];
```

Defined in: [glide-mq/src/dag-utils.ts:113](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/dag-utils.ts#L113)

Topological sort of DAG nodes using Kahn's algorithm.
Returns nodes in submission order (leaves first, roots last).
Throws CycleError if a cycle is detected.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `nodes` | [`DAGNode`](../interfaces/DAGNode.md)[] |

## Returns

[`DAGNode`](../interfaces/DAGNode.md)[]
