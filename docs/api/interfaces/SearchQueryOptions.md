# Interface: SearchQueryOptions

Defined in: [glide-mq/src/types.ts:391](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L391)

Options passed through to FT.SEARCH (glide-mq owned, decoupled from speedkey).

## Properties

### dialect?

```ts
optional dialect?: number;
```

Defined in: [glide-mq/src/types.ts:395](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L395)

Query dialect version.

***

### inorder?

```ts
optional inorder?: boolean;
```

Defined in: [glide-mq/src/types.ts:399](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L399)

Proximity terms must be in order.

***

### nocontent?

```ts
optional nocontent?: boolean;
```

Defined in: [glide-mq/src/types.ts:393](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L393)

Return only document IDs, no field content.

***

### slop?

```ts
optional slop?: number;
```

Defined in: [glide-mq/src/types.ts:401](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L401)

Slop value for proximity matching.

***

### sortby?

```ts
optional sortby?: object;
```

Defined in: [glide-mq/src/types.ts:403](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L403)

Sort results by field.

#### field

```ts
field: string;
```

#### order?

```ts
optional order?: "ASC" | "DESC";
```

***

### verbatim?

```ts
optional verbatim?: boolean;
```

Defined in: [glide-mq/src/types.ts:397](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L397)

Disable stemming in query.
