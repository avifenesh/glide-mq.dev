# Interface: JobTemplate

Defined in: [glide-mq/src/types.ts:522](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L522)

Template for jobs created by a scheduler.

## Properties

### data?

```ts
optional data?: any;
```

Defined in: [glide-mq/src/types.ts:524](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L524)

***

### name?

```ts
optional name?: string;
```

Defined in: [glide-mq/src/types.ts:523](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L523)

***

### opts?

```ts
optional opts?: Omit<JobOptions, "delay" | "jobId" | "deduplication" | "parent">;
```

Defined in: [glide-mq/src/types.ts:525](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L525)
