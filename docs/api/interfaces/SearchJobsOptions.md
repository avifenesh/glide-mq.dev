# Interface: SearchJobsOptions

Defined in: [glide-mq/src/types.ts:593](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L593)

Options for searchJobs() method.

## Properties

### data?

```ts
optional data?: Record&lt;string, unknown>;
```

Defined in: [glide-mq/src/types.ts:596](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L596)

***

### excludeData?

```ts
optional excludeData?: boolean;
```

Defined in: [glide-mq/src/types.ts:599](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L599)

When true, excludes `data` and `returnvalue` fields from returned jobs.

***

### limit?

```ts
optional limit?: number;
```

Defined in: [glide-mq/src/types.ts:597](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L597)

***

### name?

```ts
optional name?: string;
```

Defined in: [glide-mq/src/types.ts:595](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L595)

***

### state?

```ts
optional state?: "completed" | "failed" | "delayed" | "active" | "waiting";
```

Defined in: [glide-mq/src/types.ts:594](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L594)
