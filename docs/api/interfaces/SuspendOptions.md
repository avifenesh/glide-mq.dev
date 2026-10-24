# Interface: SuspendOptions

Defined in: [glide-mq/src/types.ts:742](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L742)

Options for suspending a job.

## Properties

### reason?

```ts
reason?: string;
```

Defined in: [glide-mq/src/types.ts:744](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L744)

Human-readable reason for the suspension.

***

### timeout?

```ts
timeout?: number;
```

Defined in: [glide-mq/src/types.ts:746](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L746)

Timeout in milliseconds. 0 means infinite (default).
