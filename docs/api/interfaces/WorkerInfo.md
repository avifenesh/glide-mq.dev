# Interface: WorkerInfo

Defined in: [glide-mq/src/types.ts:603](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L603)

Information about a live worker instance.

## Properties

### activeJobs

```ts
activeJobs: number;
```

Defined in: [glide-mq/src/types.ts:609](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L609)

***

### addr

```ts
addr: string;
```

Defined in: [glide-mq/src/types.ts:605](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L605)

***

### age

```ts
age: number;
```

Defined in: [glide-mq/src/types.ts:608](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L608)

***

### concurrency?

```ts
optional concurrency?: number;
```

Defined in: [glide-mq/src/types.ts:615](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L615)

The worker's configured `concurrency` option. In batch mode it counts batches, so up to
`concurrency * batch.size` jobs can be active at once. Absent for a worker that registered with a
glide-mq version that predates this field.

***

### id

```ts
id: string;
```

Defined in: [glide-mq/src/types.ts:604](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L604)

***

### pid

```ts
pid: number;
```

Defined in: [glide-mq/src/types.ts:606](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L606)

***

### startedAt

```ts
startedAt: number;
```

Defined in: [glide-mq/src/types.ts:607](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L607)
