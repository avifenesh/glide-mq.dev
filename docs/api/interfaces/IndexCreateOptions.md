# Interface: IndexCreateOptions

Defined in: [glide-mq/src/types.ts:379](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L379)

Options passed through to FT.CREATE (glide-mq owned, decoupled from speedkey).

## Properties

### language?

```ts
language?: string;
```

Defined in: [glide-mq/src/types.ts:383](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L383)

Default language for stemming.

***

### minStemSize?

```ts
minStemSize?: number;
```

Defined in: [glide-mq/src/types.ts:387](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L387)

Minimum word length for stemming.

***

### noOffsets?

```ts
noOffsets?: boolean;
```

Defined in: [glide-mq/src/types.ts:391](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L391)

Do not store term offsets.

***

### noStopWords?

```ts
noStopWords?: boolean;
```

Defined in: [glide-mq/src/types.ts:393](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L393)

Disable stop-word filtering.

***

### punctuation?

```ts
punctuation?: string;
```

Defined in: [glide-mq/src/types.ts:397](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L397)

Custom punctuation characters.

***

### score?

```ts
score?: number;
```

Defined in: [glide-mq/src/types.ts:381](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L381)

Default score for documents.

***

### skipInitialScan?

```ts
skipInitialScan?: boolean;
```

Defined in: [glide-mq/src/types.ts:385](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L385)

Skip indexing existing documents on creation.

***

### stopWords?

```ts
stopWords?: string[];
```

Defined in: [glide-mq/src/types.ts:395](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L395)

Custom stop words.

***

### withOffsets?

```ts
withOffsets?: boolean;
```

Defined in: [glide-mq/src/types.ts:389](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L389)

Store term offsets.
