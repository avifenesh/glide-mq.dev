# Interface: GroupRateLimitOptions

Defined in: [glide-mq/src/errors.ts:52](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/errors.ts#L52)

## Properties

### currentJob?

```ts
optional currentJob?: "requeue" | "fail";
```

Defined in: [glide-mq/src/errors.ts:54](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/errors.ts#L54)

What happens to the current job. Default: 'requeue' (re-parks without consuming retry).

***

### extend?

```ts
optional extend?: "max" | "replace";
```

Defined in: [glide-mq/src/errors.ts:58](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/errors.ts#L58)

How to handle existing rate limit. Default: 'max' (never shortens).

***

### requeuePosition?

```ts
optional requeuePosition?: "front" | "back";
```

Defined in: [glide-mq/src/errors.ts:56](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/errors.ts#L56)

Where to re-park the job in the group queue. Default: 'front' (resumes first).
