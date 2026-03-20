# Function: chord()

```ts
function chord(
   queueName, 
   groupJobs, 
   callback, 
   connection, 
prefix?): Promise<JobNode>;
```

Defined in: [glide-mq/src/workflows.ts:115](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/workflows.ts#L115)

Chord: run a group of jobs in parallel, then execute a callback job
with the results. The callback is the parent, the group members are children.

Returns the JobNode tree. The root is the callback job.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `queueName` | `string` |
| `groupJobs` | [`WorkflowJobDef`](../interfaces/WorkflowJobDef.md)[] |
| `callback` | [`WorkflowJobDef`](../interfaces/WorkflowJobDef.md) |
| `connection` | [`ConnectionOptions`](../interfaces/ConnectionOptions.md) |
| `prefix?` | `string` |

## Returns

`Promise`\<[`JobNode`](../interfaces/JobNode.md)\>
