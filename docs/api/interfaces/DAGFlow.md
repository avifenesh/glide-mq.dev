# Interface: DAGFlow

Defined in: [glide-mq/src/types.ts:648](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L648)

A complete DAG flow definition for submission via FlowProducer.addDAG().

## Properties

### nodes

```ts
nodes: DAGNode[];
```

Defined in: [glide-mq/src/types.ts:650](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L650)

The nodes of the DAG. Order does not matter - topological sort is applied.
