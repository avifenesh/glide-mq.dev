# Function: chain()

```ts
function chain(
   queueName, 
   jobs, 
   connection, 
prefix?): Promise<JobNode>;
```

Defined in: [glide-mq/src/workflows.ts:20](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/workflows.ts#L20)

Chain: execute jobs sequentially. Each step becomes a child of the next,
so step N+1 only runs after step N completes. The last job in the array
runs first; the first job in the array runs last and is the top-level parent.

Returns the JobNode tree. The top-level job (jobs[0]) is the root.
When the chain completes, the root's processor can call getChildrenValues()
to access results from children.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `queueName` | `string` |
| `jobs` | [`WorkflowJobDef`](../interfaces/WorkflowJobDef.md)[] |
| `connection` | [`ConnectionOptions`](../interfaces/ConnectionOptions.md) |
| `prefix?` | `string` |

## Returns

`Promise`&lt;[`JobNode`](../interfaces/JobNode.md)&gt;
