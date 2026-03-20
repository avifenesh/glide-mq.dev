# Class: FlowProducer

Defined in: [glide-mq/src/flow-producer.ts:29](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/flow-producer.ts#L29)

## Constructors

### Constructor

```ts
new FlowProducer(opts): FlowProducer;
```

Defined in: [glide-mq/src/flow-producer.ts:36](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/flow-producer.ts#L36)

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

Defined in: [glide-mq/src/flow-producer.ts:70](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/flow-producer.ts#L70)

Add a flow (parent with children) atomically.
Children can have their own children (recursive flows), which are flattened
into multiple addFlow calls (one per level with children).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `flow` | [`FlowJob`](../interfaces/FlowJob.md) |

#### Returns

`Promise`&lt;[`JobNode`](../interfaces/JobNode.md)&gt;

***

### addBulk()

```ts
addBulk(flows): Promise<JobNode[]>;
```

Defined in: [glide-mq/src/flow-producer.ts:88](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/flow-producer.ts#L88)

Add multiple independent flows.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `flows` | [`FlowJob`](../interfaces/FlowJob.md)[] |

#### Returns

`Promise`&lt;[`JobNode`](../interfaces/JobNode.md)[]&gt;

***

### addDAG()

```ts
addDAG(dag): Promise<Map&lt;string, Job&lt;any, any>>>;
```

Defined in: [glide-mq/src/flow-producer.ts:330](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/flow-producer.ts#L330)

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

`Promise`&lt;`Map`&lt;`string`, [`Job`](Job.md)&lt;`any`, `any`&gt;&gt;&gt;

***

### close()

```ts
close(): Promise&lt;void>;
```

Defined in: [glide-mq/src/flow-producer.ts:636](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/flow-producer.ts#L636)

Close the FlowProducer and release the underlying client connection.
Idempotent: safe to call multiple times.

#### Returns

`Promise`&lt;`void`&gt;
