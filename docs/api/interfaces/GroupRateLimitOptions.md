# Interface: GroupRateLimitOptions

Defined in: [glide-mq/src/errors.ts:67](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/errors.ts#L67)

Options controlling behavior when `job.rateLimitGroup()` is called.

## Properties

### currentJob?

```ts
currentJob?: "requeue" | "fail";
```

Defined in: [glide-mq/src/errors.ts:69](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/errors.ts#L69)

What happens to the current job. Default: 'requeue' (re-parks without consuming retry).

***

### extend?

```ts
extend?: "max" | "replace";
```

Defined in: [glide-mq/src/errors.ts:73](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/errors.ts#L73)

How to handle existing rate limit. Default: 'max' (never shortens).

***

### requeuePosition?

```ts
requeuePosition?: "front" | "back";
```

Defined in: [glide-mq/src/errors.ts:71](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/errors.ts#L71)

Where to re-park the job in the group queue. Default: 'front' (resumes first).
