# Interface: GroupRateLimitOptions

Defined in: [glide-mq/src/errors.ts:67](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/errors.ts#L67)

Options controlling behavior when `job.rateLimitGroup()` is called.

## Properties

### currentJob?

```ts
optional currentJob?: "requeue" | "fail";
```

Defined in: [glide-mq/src/errors.ts:69](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/errors.ts#L69)

What happens to the current job. Default: 'requeue' (re-parks without consuming retry).

***

### extend?

```ts
optional extend?: "max" | "replace";
```

Defined in: [glide-mq/src/errors.ts:73](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/errors.ts#L73)

How to handle existing rate limit. Default: 'max' (never shortens).

***

### requeuePosition?

```ts
optional requeuePosition?: "front" | "back";
```

Defined in: [glide-mq/src/errors.ts:71](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/errors.ts#L71)

Where to re-park the job in the group queue. Default: 'front' (resumes first).
