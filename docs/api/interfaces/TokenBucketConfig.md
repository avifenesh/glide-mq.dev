# Interface: TokenBucketConfig

Defined in: [glide-mq/src/types.ts:309](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L309)

Configuration for token bucket rate limiting with burst capacity and refill rate.

## Properties

### capacity

```ts
capacity: number;
```

Defined in: [glide-mq/src/types.ts:311](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L311)

Maximum bucket capacity in tokens (burst size).

***

### refillRate

```ts
refillRate: number;
```

Defined in: [glide-mq/src/types.ts:313](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L313)

Refill rate in tokens per second.
