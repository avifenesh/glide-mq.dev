# Interface: QueueEventsOptions

Defined in: [glide-mq/src/types.ts:297](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L297)

## Properties

### blockTimeout?

```ts
optional blockTimeout?: number;
```

Defined in: [glide-mq/src/types.ts:303](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L303)

XREAD BLOCK timeout in milliseconds. Defaults to 5000.

***

### connection

```ts
connection: ConnectionOptions;
```

Defined in: [glide-mq/src/types.ts:298](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L298)

***

### lastEventId?

```ts
optional lastEventId?: string;
```

Defined in: [glide-mq/src/types.ts:301](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L301)

Starting stream ID. Defaults to '$' (new events only). Use '0' for historical replay.

***

### prefix?

```ts
optional prefix?: string;
```

Defined in: [glide-mq/src/types.ts:299](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L299)
