# Interface: DAGNode

Defined in: [glide-mq/src/types.ts:622](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L622)

A node in a DAG flow. Each node is a job with optional dependencies on other nodes.
The `deps` array lists the names of nodes that must complete before this node can run.

## Properties

### data

```ts
data: any;
```

Defined in: [glide-mq/src/types.ts:628](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L628)

Job data payload.

***

### deps?

```ts
optional deps?: string[];
```

Defined in: [glide-mq/src/types.ts:632](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L632)

Names of other nodes in this DAG that must complete before this node runs.

***

### name

```ts
name: string;
```

Defined in: [glide-mq/src/types.ts:624](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L624)

Unique name within this DAG submission. Used as reference in `deps` arrays.

***

### opts?

```ts
optional opts?: Omit<JobOptions, "parent" | "parents">;
```

Defined in: [glide-mq/src/types.ts:630](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L630)

Job options (delay, priority, etc.). `parent` and `parents` are managed automatically.

***

### queueName

```ts
queueName: string;
```

Defined in: [glide-mq/src/types.ts:626](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L626)

Queue to add this job to.
