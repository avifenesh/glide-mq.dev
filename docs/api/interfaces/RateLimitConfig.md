# Interface: RateLimitConfig

Defined in: [glide-mq/src/types.ts:291](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L291)

Configuration for time-window rate limiting.

## Properties

### duration

```ts
duration: number;
```

Defined in: [glide-mq/src/types.ts:295](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L295)

Time window in milliseconds.

***

### max

```ts
max: number;
```

Defined in: [glide-mq/src/types.ts:293](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L293)

Maximum jobs allowed within the time window.
