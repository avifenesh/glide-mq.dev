# Interface: VectorSearchOptions

Defined in: [glide-mq/src/types.ts:438](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L438)

Options for vector similarity search over indexed jobs.

## Properties

### filter?

```ts
filter?: string;
```

Defined in: [glide-mq/src/types.ts:444](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L444)

Pre-filter expression applied before KNN (e.g. `@state:{completed}`).

***

### indexName?

```ts
indexName?: string;
```

Defined in: [glide-mq/src/types.ts:440](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L440)

Index name to search. Defaults to `{queueName}-idx`.

***

### k?

```ts
k?: number;
```

Defined in: [glide-mq/src/types.ts:442](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L442)

Number of nearest neighbours to return. Default: 10.

***

### returnFields?

```ts
returnFields?: string[];
```

Defined in: [glide-mq/src/types.ts:446](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L446)

Fields to return from each result. When omitted, all indexed fields are returned.

***

### scoreField?

```ts
scoreField?: string;
```

Defined in: [glide-mq/src/types.ts:448](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L448)

Name of the score field in results. Default: `__score`.

***

### searchOptions?

```ts
searchOptions?: SearchQueryOptions;
```

Defined in: [glide-mq/src/types.ts:450](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L450)

Pass-through options for FT.SEARCH (params are set automatically for vector query).
