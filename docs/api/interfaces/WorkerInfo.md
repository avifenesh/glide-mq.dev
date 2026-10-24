# Interface: WorkerInfo

Defined in: [glide-mq/src/types.ts:613](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L613)

Information about a live worker instance.

## Properties

### activeJobs

```ts
activeJobs: number;
```

Defined in: [glide-mq/src/types.ts:619](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L619)

***

### addr

```ts
addr: string;
```

Defined in: [glide-mq/src/types.ts:615](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L615)

***

### age

```ts
age: number;
```

Defined in: [glide-mq/src/types.ts:618](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L618)

***

### concurrency?

```ts
concurrency?: number;
```

Defined in: [glide-mq/src/types.ts:625](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L625)

The worker's configured `concurrency` option. In batch mode it counts batches, so up to
`concurrency * batch.size` jobs can be active at once. Absent for a worker that registered with a
glide-mq version that predates this field.

***

### id

```ts
id: string;
```

Defined in: [glide-mq/src/types.ts:614](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L614)

***

### pid

```ts
pid: number;
```

Defined in: [glide-mq/src/types.ts:616](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L616)

***

### startedAt

```ts
startedAt: number;
```

Defined in: [glide-mq/src/types.ts:617](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L617)
