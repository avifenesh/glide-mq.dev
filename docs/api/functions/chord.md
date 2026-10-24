# Function: chord()

```ts
function chord(
   queueName,
   groupJobs,
   callback,
   connection,
   prefix?
): Promise<ClosableWorkflow<JobNode>>;
```

Defined in: [glide-mq/src/workflows.ts:138](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/workflows.ts#L138)

Chord: run a group of jobs in parallel, then execute a callback job
with the results. The callback is the parent, the group members are children.

Returns the JobNode tree. The root is the callback job.
Pass `{ client }` on the connection to keep returned jobs usable.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `queueName` | `string` |
| `groupJobs` | [`WorkflowJobDef`](../interfaces/WorkflowJobDef.md)[] |
| `callback` | [`WorkflowJobDef`](../interfaces/WorkflowJobDef.md) |
| `connection` | [`WorkflowConnection`](../type-aliases/WorkflowConnection.md) |
| `prefix?` | `string` |

## Returns

`Promise`&lt;[`ClosableWorkflow`](../type-aliases/ClosableWorkflow.md)&lt;[`JobNode`](../interfaces/JobNode.md)&gt;&gt;
