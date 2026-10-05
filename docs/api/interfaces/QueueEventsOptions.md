# Interface: QueueEventsOptions

Defined in: [glide-mq/src/types.ts:486](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L486)

Configuration options for creating a QueueEvents listener.

## Properties

### blockTimeout?

```ts
optional blockTimeout?: number;
```

Defined in: [glide-mq/src/types.ts:492](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L492)

XREAD BLOCK timeout in milliseconds. Defaults to 5000.

***

### connection

```ts
connection: ConnectionOptions;
```

Defined in: [glide-mq/src/types.ts:487](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L487)

***

### lastEventId?

```ts
optional lastEventId?: string;
```

Defined in: [glide-mq/src/types.ts:490](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L490)

Starting stream ID. Defaults to '$' (new events only). Use '0' for historical replay.

***

### prefix?

```ts
optional prefix?: string;
```

Defined in: [glide-mq/src/types.ts:488](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L488)
