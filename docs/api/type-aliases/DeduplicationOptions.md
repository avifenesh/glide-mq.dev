# Type Alias: DeduplicationOptions

```ts
type DeduplicationOptions =
  | {
  id: string;
  mode?: "simple" | "debounce";
  ttl?: never;
}
  | {
  id: string;
  mode: "throttle";
  ttl?: number;
};
```

Defined in: [glide-mq/src/types.ts:222](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L222)

Deduplication options. `ttl` only applies to `mode: 'throttle'`, so only that
variant accepts it. `simple` (the default when `mode` is omitted) skips while the
job holding the id has not finished. `debounce` replaces a job that is still
`delayed` or `prioritized`, by state rather than a time window.
