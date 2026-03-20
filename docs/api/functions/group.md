# Function: group()

```ts
function group(
   queueName, 
   jobs, 
   connection, 
prefix?): Promise<JobNode>;
```

Defined in: [glide-mq/src/workflows.ts:78](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/workflows.ts#L78)

Group: execute jobs in parallel. All jobs run concurrently.
A synthetic parent job (name: '__group__') waits for all children.
When complete, the parent's processor receives all children's results
via getChildrenValues().

Returns the JobNode tree. The root is the group parent.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `queueName` | `string` |
| `jobs` | [`WorkflowJobDef`](../interfaces/WorkflowJobDef.md)[] |
| `connection` | [`ConnectionOptions`](../interfaces/ConnectionOptions.md) |
| `prefix?` | `string` |

## Returns

`Promise`&lt;[`JobNode`](../interfaces/JobNode.md)&gt;
