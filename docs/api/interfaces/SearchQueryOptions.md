# Interface: SearchQueryOptions

Defined in: [glide-mq/src/types.ts:401](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L401)

Options passed through to FT.SEARCH (glide-mq owned, decoupled from speedkey).

## Properties

### dialect?

```ts
dialect?: number;
```

Defined in: [glide-mq/src/types.ts:405](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L405)

Query dialect version.

***

### inorder?

```ts
inorder?: boolean;
```

Defined in: [glide-mq/src/types.ts:409](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L409)

Proximity terms must be in order.

***

### nocontent?

```ts
nocontent?: boolean;
```

Defined in: [glide-mq/src/types.ts:403](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L403)

Return only document IDs, no field content.

***

### slop?

```ts
slop?: number;
```

Defined in: [glide-mq/src/types.ts:411](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L411)

Slop value for proximity matching.

***

### sortby?

```ts
sortby?: object;
```

Defined in: [glide-mq/src/types.ts:413](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L413)

Sort results by field.

#### field

```ts
field: string;
```

#### order?

```ts
order?: "ASC" | "DESC";
```

***

### verbatim?

```ts
verbatim?: boolean;
```

Defined in: [glide-mq/src/types.ts:407](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L407)

Disable stemming in query.
