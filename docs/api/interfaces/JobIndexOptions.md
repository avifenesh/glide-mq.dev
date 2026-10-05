# Interface: JobIndexOptions

Defined in: [glide-mq/src/types.ts:407](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L407)

Options for creating a Valkey Search index over job hashes.

## Properties

### createOptions?

```ts
optional createOptions?: IndexCreateOptions;
```

Defined in: [glide-mq/src/types.ts:424](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L424)

Pass-through options for FT.CREATE (dataType and prefixes are set automatically).

***

### fields?

```ts
optional fields?: Field[];
```

Defined in: [glide-mq/src/types.ts:411](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L411)

Additional schema fields beyond the auto-included base fields (name, state, timestamp, priority).

***

### name?

```ts
optional name?: string;
```

Defined in: [glide-mq/src/types.ts:409](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L409)

Index name. Defaults to `{queueName}-idx`.

***

### vectorField?

```ts
optional vectorField?: object;
```

Defined in: [glide-mq/src/types.ts:413](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L413)

Vector field configuration. When omitted, a minimal placeholder vector field is added (required by valkey-search).

#### algorithm?

```ts
optional algorithm?: "HNSW" | "FLAT";
```

Indexing algorithm. Default: 'HNSW'.

#### dimensions

```ts
dimensions: number;
```

Number of dimensions in the vector.

#### distanceMetric?

```ts
optional distanceMetric?: "COSINE" | "L2" | "IP";
```

Distance metric. Default: 'COSINE'.

#### name

```ts
name: string;
```

Field name in the job hash where the vector is stored.
