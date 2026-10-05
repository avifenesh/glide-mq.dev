# Interface: IndexCreateOptions

Defined in: [glide-mq/src/types.ts:369](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L369)

Options passed through to FT.CREATE (glide-mq owned, decoupled from speedkey).

## Properties

### language?

```ts
optional language?: string;
```

Defined in: [glide-mq/src/types.ts:373](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L373)

Default language for stemming.

***

### minStemSize?

```ts
optional minStemSize?: number;
```

Defined in: [glide-mq/src/types.ts:377](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L377)

Minimum word length for stemming.

***

### noOffsets?

```ts
optional noOffsets?: boolean;
```

Defined in: [glide-mq/src/types.ts:381](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L381)

Do not store term offsets.

***

### noStopWords?

```ts
optional noStopWords?: boolean;
```

Defined in: [glide-mq/src/types.ts:383](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L383)

Disable stop-word filtering.

***

### punctuation?

```ts
optional punctuation?: string;
```

Defined in: [glide-mq/src/types.ts:387](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L387)

Custom punctuation characters.

***

### score?

```ts
optional score?: number;
```

Defined in: [glide-mq/src/types.ts:371](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L371)

Default score for documents.

***

### skipInitialScan?

```ts
optional skipInitialScan?: boolean;
```

Defined in: [glide-mq/src/types.ts:375](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L375)

Skip indexing existing documents on creation.

***

### stopWords?

```ts
optional stopWords?: string[];
```

Defined in: [glide-mq/src/types.ts:385](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L385)

Custom stop words.

***

### withOffsets?

```ts
optional withOffsets?: boolean;
```

Defined in: [glide-mq/src/types.ts:379](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L379)

Store term offsets.
