# Interface: ReadStreamOptions

Defined in: [glide-mq/src/types.ts:654](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L654)

Options for readStream() - reading entries from a job's streaming channel.

## Properties

### block?

```ts
block?: number;
```

Defined in: [glide-mq/src/types.ts:659](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L659)

When set and > 0, use XREAD with BLOCK for long-polling (milliseconds).
 A value of 0 means non-blocking (equivalent to omitting).

***

### count?

```ts
count?: number;
```

Defined in: [glide-mq/src/types.ts:656](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L656)

***

### lastId?

```ts
lastId?: string;
```

Defined in: [glide-mq/src/types.ts:655](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L655)
