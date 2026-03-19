# Interface: DAGNode

Defined in: [glide-mq/src/types.ts:408](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L408)

A node in a DAG flow. Each node is a job with optional dependencies on other nodes.
The `deps` array lists the names of nodes that must complete before this node can run.

## Properties

### data

```ts
data: any;
```

Defined in: [glide-mq/src/types.ts:414](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L414)

Job data payload.

***

### deps?

```ts
optional deps?: string[];
```

Defined in: [glide-mq/src/types.ts:418](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L418)

Names of other nodes in this DAG that must complete before this node runs.

***

### name

```ts
name: string;
```

Defined in: [glide-mq/src/types.ts:410](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L410)

Unique name within this DAG submission. Used as reference in `deps` arrays.

***

### opts?

```ts
optional opts?: Omit<JobOptions, "parent" | "parents">;
```

Defined in: [glide-mq/src/types.ts:416](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L416)

Job options (delay, priority, etc.). `parent` and `parents` are managed automatically.

***

### queueName

```ts
queueName: string;
```

Defined in: [glide-mq/src/types.ts:412](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L412)

Queue to add this job to.
