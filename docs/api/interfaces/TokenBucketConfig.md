# Interface: TokenBucketConfig

Defined in: [glide-mq/src/types.ts:299](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L299)

Configuration for token bucket rate limiting with burst capacity and refill rate.

## Properties

### capacity

```ts
capacity: number;
```

Defined in: [glide-mq/src/types.ts:301](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L301)

Maximum bucket capacity in tokens (burst size).

***

### refillRate

```ts
refillRate: number;
```

Defined in: [glide-mq/src/types.ts:303](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L303)

Refill rate in tokens per second.
