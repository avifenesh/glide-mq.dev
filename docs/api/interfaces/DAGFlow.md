# Interface: DAGFlow

Defined in: [glide-mq/src/types.ts:424](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L424)

A complete DAG flow definition for submission via FlowProducer.addDAG().

## Properties

### nodes

```ts
nodes: DAGNode[];
```

Defined in: [glide-mq/src/types.ts:426](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L426)

The nodes of the DAG. Order does not matter - topological sort is applied.
