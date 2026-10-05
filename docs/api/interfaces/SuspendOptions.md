# Interface: SuspendOptions

Defined in: [glide-mq/src/types.ts:732](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L732)

Options for suspending a job.

## Properties

### reason?

```ts
optional reason?: string;
```

Defined in: [glide-mq/src/types.ts:734](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L734)

Human-readable reason for the suspension.

***

### timeout?

```ts
optional timeout?: number;
```

Defined in: [glide-mq/src/types.ts:736](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L736)

Timeout in milliseconds. 0 means infinite (default).
