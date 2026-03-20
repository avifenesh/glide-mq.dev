# Interface: SearchJobsOptions

Defined in: [glide-mq/src/types.ts:386](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L386)

## Properties

### data?

```ts
optional data?: Record&lt;string, unknown>;
```

Defined in: [glide-mq/src/types.ts:389](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L389)

***

### excludeData?

```ts
optional excludeData?: boolean;
```

Defined in: [glide-mq/src/types.ts:392](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L392)

When true, excludes `data` and `returnvalue` fields from returned jobs.

***

### limit?

```ts
optional limit?: number;
```

Defined in: [glide-mq/src/types.ts:390](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L390)

***

### name?

```ts
optional name?: string;
```

Defined in: [glide-mq/src/types.ts:388](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L388)

***

### state?

```ts
optional state?: "completed" | "failed" | "delayed" | "active" | "waiting";
```

Defined in: [glide-mq/src/types.ts:387](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L387)
