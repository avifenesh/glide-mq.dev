# Function: dag()

```ts
function dag(
   nodes, 
   connection, 
prefix?): Promise<Map&lt;string, Job&lt;any, any>>>;
```

Defined in: [glide-mq/src/workflows.ts:165](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/workflows.ts#L165)

DAG: submit a directed acyclic graph of jobs where each job can depend on
multiple other jobs. The graph is validated for cycles and submitted in
topological order (leaves first).

Returns a Map of node name to Job instance.

Example - diamond dependency:
```
const jobs = await dag([
  { name: 'A', queueName: 'q', data: {}, deps: [] },
  { name: 'B', queueName: 'q', data: {}, deps: ['A'] },
  { name: 'C', queueName: 'q', data: {}, deps: ['A'] },
  { name: 'D', queueName: 'q', data: {}, deps: ['B', 'C'] },
], connection);
```

## Parameters

| Parameter | Type |
| ------ | ------ |
| `nodes` | [`DAGNode`](../interfaces/DAGNode.md)[] |
| `connection` | [`ConnectionOptions`](../interfaces/ConnectionOptions.md) |
| `prefix?` | `string` |

## Returns

`Promise`&lt;`Map`&lt;`string`, [`Job`](../classes/Job.md)&lt;`any`, `any`&gt;&gt;&gt;
