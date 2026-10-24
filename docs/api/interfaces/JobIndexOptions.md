# Interface: JobIndexOptions

Defined in: [glide-mq/src/types.ts:417](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L417)

Options for creating a Valkey Search index over job hashes.

## Properties

### createOptions?

```ts
createOptions?: IndexCreateOptions;
```

Defined in: [glide-mq/src/types.ts:434](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L434)

Pass-through options for FT.CREATE (dataType and prefixes are set automatically).

***

### fields?

```ts
fields?: Field[];
```

Defined in: [glide-mq/src/types.ts:421](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L421)

Additional schema fields beyond the auto-included base fields (name, state, timestamp, priority).

***

### name?

```ts
name?: string;
```

Defined in: [glide-mq/src/types.ts:419](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L419)

Index name. Defaults to `{queueName}-idx`.

***

### vectorField?

```ts
vectorField?: object;
```

Defined in: [glide-mq/src/types.ts:423](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L423)

Vector field configuration. When omitted, a minimal placeholder vector field is added (required by valkey-search).

#### algorithm?

```ts
algorithm?: "HNSW" | "FLAT";
```

Indexing algorithm. Default: 'HNSW'.

#### dimensions

```ts
dimensions: number;
```

Number of dimensions in the vector.

#### distanceMetric?

```ts
distanceMetric?: "COSINE" | "L2" | "IP";
```

Distance metric. Default: 'COSINE'.

#### name

```ts
name: string;
```

Field name in the job hash where the vector is stored.
