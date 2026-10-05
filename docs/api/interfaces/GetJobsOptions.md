# Interface: GetJobsOptions

Defined in: [glide-mq/src/types.ts:587](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L587)

Options for getJob() and getJobs() methods.

## Properties

### excludeData?

```ts
optional excludeData?: boolean;
```

Defined in: [glide-mq/src/types.ts:589](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L589)

When true, excludes `data` and `returnvalue` fields from returned jobs.
