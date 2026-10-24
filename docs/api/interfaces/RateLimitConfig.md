# Interface: RateLimitConfig

Defined in: [glide-mq/src/types.ts:301](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L301)

Configuration for time-window rate limiting.

## Properties

### duration

```ts
duration: number;
```

Defined in: [glide-mq/src/types.ts:305](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L305)

Time window in milliseconds.

***

### max

```ts
max: number;
```

Defined in: [glide-mq/src/types.ts:303](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L303)

Maximum jobs allowed within the time window.
