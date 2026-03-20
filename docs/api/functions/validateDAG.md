# Function: validateDAG()

```ts
function validateDAG(nodes): void;
```

Defined in: [glide-mq/src/dag-utils.ts:76](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/dag-utils.ts#L76)

Validate that a set of DAG nodes forms a valid DAG (no cycles).
Throws CycleError if a cycle is detected.
Throws Error if a node references a non-existent dependency.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `nodes` | [`DAGNode`](../interfaces/DAGNode.md)[] |

## Returns

`void`
