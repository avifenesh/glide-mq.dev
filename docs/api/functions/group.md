# Function: group()

```ts
function group(
   queueName,
   jobs,
   connection,
   prefix?
): Promise<ClosableWorkflow<JobNode>>;
```

Defined in: [glide-mq/src/workflows.ts:104](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/workflows.ts#L104)

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
