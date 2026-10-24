# Interface: DAGNode

Defined in: [glide-mq/src/types.ts:632](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L632)

A node in a DAG flow. Each node is a job with optional dependencies on other nodes.
The `deps` array lists the names of nodes that must complete before this node can run.

## Properties

### data

```ts
data: any;
```

Defined in: [glide-mq/src/types.ts:638](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L638)

Job data payload.

***

### deps?

```ts
deps?: string[];
```

Defined in: [glide-mq/src/types.ts:642](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L642)

Names of other nodes in this DAG that must complete before this node runs.

***

### name

```ts
name: string;
```

Defined in: [glide-mq/src/types.ts:634](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L634)

Unique name within this DAG submission. Used as reference in `deps` arrays.

***

### opts?

```ts
opts?: Omit<JobOptions, "parent" | "parents">;
```

Defined in: [glide-mq/src/types.ts:640](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L640)

Job options (delay, priority, etc.). `parent` and `parents` are managed automatically.

***

### queueName

```ts
queueName: string;
```

Defined in: [glide-mq/src/types.ts:636](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L636)

Queue to add this job to.
