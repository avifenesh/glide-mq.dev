# Interface: VectorSearchOptions

Defined in: [glide-mq/src/types.ts:428](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L428)

Options for vector similarity search over indexed jobs.

## Properties

### filter?

```ts
optional filter?: string;
```

Defined in: [glide-mq/src/types.ts:434](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L434)

Pre-filter expression applied before KNN (e.g. `@state:{completed}`).

***

### indexName?

```ts
optional indexName?: string;
```

Defined in: [glide-mq/src/types.ts:430](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L430)

Index name to search. Defaults to `{queueName}-idx`.

***

### k?

```ts
optional k?: number;
```

Defined in: [glide-mq/src/types.ts:432](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L432)

Number of nearest neighbours to return. Default: 10.

***

### returnFields?

```ts
optional returnFields?: string[];
```

Defined in: [glide-mq/src/types.ts:436](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L436)

Fields to return from each result. When omitted, all indexed fields are returned.

***

### scoreField?

```ts
optional scoreField?: string;
```

Defined in: [glide-mq/src/types.ts:438](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L438)

Name of the score field in results. Default: `__score`.

***

### searchOptions?

```ts
optional searchOptions?: SearchQueryOptions;
```

Defined in: [glide-mq/src/types.ts:440](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L440)

Pass-through options for FT.SEARCH (params are set automatically for vector query).
