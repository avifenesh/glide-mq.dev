# Interface: DAGFlow

Defined in: [glide-mq/src/types.ts:638](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L638)

A complete DAG flow definition for submission via FlowProducer.addDAG().

## Properties

### nodes

```ts
nodes: DAGNode[];
```

Defined in: [glide-mq/src/types.ts:640](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L640)

The nodes of the DAG. Order does not matter - topological sort is applied.
