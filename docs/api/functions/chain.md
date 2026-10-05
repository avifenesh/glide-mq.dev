# Function: chain()

```ts
function chain(
   queueName,
   jobs,
   connection,
   prefix?
): Promise<ClosableWorkflow<JobNode>>;
```

Defined in: [glide-mq/src/workflows.ts:54](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/workflows.ts#L54)

Chain: execute jobs sequentially. Each step becomes a child of the next,
so step N+1 only runs after step N completes. The last job in the array
runs first; the first job in the array runs last and is the top-level parent.

Returns the JobNode tree. The top-level job (jobs[0]) is the root.
Pass `{ client }` on the connection to keep returned jobs usable; otherwise
the owned client is closed after submit. Call close() when using a shared client.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `queueName` | `string` |
| `jobs` | [`WorkflowJobDef`](../interfaces/WorkflowJobDef.md)[] |
| `connection` | [`WorkflowConnection`](../type-aliases/WorkflowConnection.md) |
| `prefix?` | `string` |

## Returns

`Promise`&lt;[`ClosableWorkflow`](../type-aliases/ClosableWorkflow.md)&lt;[`JobNode`](../interfaces/JobNode.md)&gt;&gt;
