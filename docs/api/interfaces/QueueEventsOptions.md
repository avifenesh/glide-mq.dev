# Interface: QueueEventsOptions

Defined in: [glide-mq/src/types.ts:496](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L496)

Configuration options for creating a QueueEvents listener.

## Properties

### blockTimeout?

```ts
blockTimeout?: number;
```

Defined in: [glide-mq/src/types.ts:502](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L502)

XREAD BLOCK timeout in milliseconds. Defaults to 5000.

***

### connection

```ts
connection: ConnectionOptions;
```

Defined in: [glide-mq/src/types.ts:497](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L497)

***

### lastEventId?

```ts
lastEventId?: string;
```

Defined in: [glide-mq/src/types.ts:500](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L500)

Starting stream ID. Defaults to '$' (new events only). Use '0' for historical replay.

***

### prefix?

```ts
prefix?: string;
```

Defined in: [glide-mq/src/types.ts:498](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L498)
