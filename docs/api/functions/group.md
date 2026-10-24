# Function: group()

```ts
function group(
   queueName,
   jobs,
   connection,
   prefix?
): Promise<ClosableWorkflow<JobNode>>;
```

Defined in: [glide-mq/src/workflows.ts:104](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/workflows.ts#L104)

Group: execute jobs in parallel. All jobs run concurrently.
A synthetic parent job (name: '__group__') waits for all children.
When complete, the parent's processor receives all children's results
via getChildrenValues().

Returns the JobNode tree. The root is the group parent.
Pass `{ client }` on the connection to keep returned jobs usable.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `queueName` | `string` |
| `jobs` | [`WorkflowJobDef`](../interfaces/WorkflowJobDef.md)[] |
| `connection` | [`WorkflowConnection`](../type-aliases/WorkflowConnection.md) |
| `prefix?` | `string` |

## Returns

`Promise`&lt;[`ClosableWorkflow`](../type-aliases/ClosableWorkflow.md)&lt;[`JobNode`](../interfaces/JobNode.md)&gt;&gt;
