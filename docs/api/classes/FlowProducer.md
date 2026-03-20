# Class: FlowProducer

Defined in: [glide-mq/src/flow-producer.ts:29](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/flow-producer.ts#L29)

## Constructors

### Constructor

```ts
new FlowProducer(opts): FlowProducer;
```

Defined in: [glide-mq/src/flow-producer.ts:36](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/flow-producer.ts#L36)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `opts` | [`FlowProducerOptions`](../interfaces/FlowProducerOptions.md) |

#### Returns

`FlowProducer`

## Methods

### add()

```ts
add(flow): Promise<JobNode>;
```

Defined in: [glide-mq/src/flow-producer.ts:70](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/flow-producer.ts#L70)

Add a flow (parent with children) atomically.
Children can have their own children (recursive flows), which are flattened
into multiple addFlow calls (one per level with children).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `flow` | [`FlowJob`](../interfaces/FlowJob.md) |

#### Returns

`Promise`\<[`JobNode`](../interfaces/JobNode.md)\>

***

### addBulk()

```ts
addBulk(flows): Promise<JobNode[]>;
```

Defined in: [glide-mq/src/flow-producer.ts:88](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/flow-producer.ts#L88)

Add multiple independent flows.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `flows` | [`FlowJob`](../interfaces/FlowJob.md)[] |

#### Returns

`Promise`\<[`JobNode`](../interfaces/JobNode.md)[]\>

***

### addDAG()

```ts
addDAG(dag): Promise<Map<string, Job<any, any>>>;
```

Defined in: [glide-mq/src/flow-producer.ts:330](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/flow-producer.ts#L330)

Add a DAG (Directed Acyclic Graph) flow where jobs can have multiple parents.
Validates the graph for cycles, performs topological sort, and submits nodes
bottom-up (leaves first). For nodes with multiple parents, registers each
parent dependency.

Returns a map of node name to Job instance.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `dag` | [`DAGFlow`](../interfaces/DAGFlow.md) |

#### Returns

`Promise`\<`Map`\<`string`, [`Job`](Job.md)\<`any`, `any`\>\>\>

***

### close()

```ts
close(): Promise<void>;
```

Defined in: [glide-mq/src/flow-producer.ts:636](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/flow-producer.ts#L636)

Close the FlowProducer and release the underlying client connection.
Idempotent: safe to call multiple times.

#### Returns

`Promise`\<`void`\>
