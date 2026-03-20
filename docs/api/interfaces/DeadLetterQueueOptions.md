# Interface: DeadLetterQueueOptions

Defined in: [glide-mq/src/types.ts:56](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L56)

## Properties

### maxRetries?

```ts
optional maxRetries?: number;
```

Defined in: [glide-mq/src/types.ts:60](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L60)

Max retries before moving to DLQ. If not set, uses the job's own attempts config.

***

### name

```ts
name: string;
```

Defined in: [glide-mq/src/types.ts:58](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L58)

Queue name to use as the dead letter queue.
