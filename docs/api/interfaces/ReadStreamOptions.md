# Interface: ReadStreamOptions

Defined in: [glide-mq/src/types.ts:644](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L644)

Options for readStream() - reading entries from a job's streaming channel.

## Properties

### block?

```ts
optional block?: number;
```

Defined in: [glide-mq/src/types.ts:649](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L649)

When set and > 0, use XREAD with BLOCK for long-polling (milliseconds).
 A value of 0 means non-blocking (equivalent to omitting).

***

### count?

```ts
optional count?: number;
```

Defined in: [glide-mq/src/types.ts:646](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L646)

***

### lastId?

```ts
optional lastId?: string;
```

Defined in: [glide-mq/src/types.ts:645](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L645)
