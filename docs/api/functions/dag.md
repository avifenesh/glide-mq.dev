# Function: dag()

```ts
function dag(
   nodes,
   connection,
   prefix?
): Promise<ClosableWorkflow<Map&lt;string, Job&lt;any, any>>>>;
```

Defined in: [glide-mq/src/workflows.ts:175](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/workflows.ts#L175)

DAG: submit a directed acyclic graph of jobs where each job can depend on
multiple other jobs. The graph is validated for cycles and submitted in
topological order (leaves first).

Returns a Map of node name to Job instance.
Pass `{ client }` on the connection to keep returned jobs usable.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `nodes` | [`DAGNode`](../interfaces/DAGNode.md)[] |
| `connection` | [`WorkflowConnection`](../type-aliases/WorkflowConnection.md) |
| `prefix?` | `string` |

## Returns

`Promise`&lt;[`ClosableWorkflow`](../type-aliases/ClosableWorkflow.md)&lt;`Map`&lt;`string`, [`Job`](../classes/Job.md)&lt;`any`, `any`&gt;&gt;&gt;&gt;
