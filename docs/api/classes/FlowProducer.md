# Class: FlowProducer

Defined in: [glide-mq/src/flow-producer.ts:43](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/flow-producer.ts#L43)

Creates parent-child job flows and DAG workflows.
Children are processed first; the parent runs after all children complete.

## Constructors

### Constructor

```ts
new FlowProducer(opts): FlowProducer;
```

Defined in: [glide-mq/src/flow-producer.ts:51](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/flow-producer.ts#L51)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `opts` | [`FlowProducerOptions`](../interfaces/FlowProducerOptions.md) |

#### Returns

`FlowProducer`

## Methods

### add()

```ts
add(flow, flowOpts?): Promise<JobNode>;
```

Defined in: [glide-mq/src/flow-producer.ts:112](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/flow-producer.ts#L112)

Add a flow (parent with children) atomically.
Children can have their own children (recursive flows), which are flattened
into multiple addFlow calls (one per level with children). In cluster mode,
leaf children in a different queue than their parent are created first and
then wired to the parent, since their keys live on another slot.

When `flowOpts.budget` is provided, a budget hash is created in Valkey and
a `budgetKey` field is written to the parent and all child job hashes.
Workers check this key before processing and after completion to enforce
token and cost caps across the entire flow.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `flow` | [`FlowJob`](../interfaces/FlowJob.md) |
| `flowOpts?` | \{ `budget?`: [`BudgetOptions`](../interfaces/BudgetOptions.md); \} |
| `flowOpts.budget?` | [`BudgetOptions`](../interfaces/BudgetOptions.md) |

#### Returns

`Promise`&lt;[`JobNode`](../interfaces/JobNode.md)&gt;

***

### addBulk()

```ts
addBulk(flows): Promise<JobNode[]>;
```

Defined in: [glide-mq/src/flow-producer.ts:223](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/flow-producer.ts#L223)

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

Defined in: [glide-mq/src/flow-producer.ts:536](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/flow-producer.ts#L536)

Add a DAG (Directed Acyclic Graph) flow where jobs can have multiple parents.
Validates the graph for cycles, performs topological sort, and submits nodes
bottom-up (leaves first). For nodes with multiple parents, registers each
parent dependency.

Submission is pipelined by topological level: within a level, all primary
FCALLs are sent in one Batch (non-atomic pipeline), then a child-slot batch
persists parent metadata and cross-queue parent references. Same-queue
registerParent calls and cross-queue parent notifications are completed
after that batch. Before the leaf level is added, every leaf is put in its
dependents' deps sets (auto ids are reserved first), so no leaf completion
can release a parent while a sibling dependency is unregistered. RTT is
O(levels) plus two for that pre-registration and cross-slot wiring.

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

Defined in: [glide-mq/src/flow-producer.ts:1074](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/flow-producer.ts#L1074)

Close the FlowProducer and release the underlying client connection.
Idempotent: safe to call multiple times.

#### Returns

`Promise`&lt;`void`&gt;
