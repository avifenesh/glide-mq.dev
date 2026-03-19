# Interface: DAGFlow

Defined in: [glide-mq/src/types.ts:424](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L424)

A complete DAG flow definition for submission via FlowProducer.addDAG().

## Properties

### nodes

```ts
nodes: DAGNode[];
```

Defined in: [glide-mq/src/types.ts:426](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L426)

The nodes of the DAG. Order does not matter - topological sort is applied.
