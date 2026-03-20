# Interface: DeadLetterQueueOptions

Defined in: [glide-mq/src/types.ts:56](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L56)

## Properties

### maxRetries?

```ts
optional maxRetries?: number;
```

Defined in: [glide-mq/src/types.ts:60](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L60)

Max retries before moving to DLQ. If not set, uses the job's own attempts config.

***

### name

```ts
name: string;
```

Defined in: [glide-mq/src/types.ts:58](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L58)

Queue name to use as the dead letter queue.
