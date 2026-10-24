# Interface: JobOptions

Defined in: [glide-mq/src/types.ts:227](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L227)

Options for controlling individual job behavior (delay, priority, retry, etc.).

## Extended by

- [`AddAndWaitOptions`](AddAndWaitOptions.md)

## Properties

### attempts?

```ts
attempts?: number;
```

Defined in: [glide-mq/src/types.ts:261](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L261)

***

### backoff?

```ts
backoff?: object;
```

Defined in: [glide-mq/src/types.ts:262](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L262)

#### delay

```ts
delay: number;
```

#### jitter?

```ts
jitter?: number;
```

#### type

```ts
type: string;
```

***

### cost?

```ts
cost?: number;
```

Defined in: [glide-mq/src/types.ts:260](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L260)

Job cost in tokens for token bucket rate limiting. Default: 1.

***

### deduplication?

```ts
deduplication?: DeduplicationOptions;
```

Defined in: [glide-mq/src/types.ts:269](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L269)

***

### delay?

```ts
delay?: number;
```

Defined in: [glide-mq/src/types.ts:235](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L235)

***

### fallbacks?

```ts
fallbacks?: object[];
```

Defined in: [glide-mq/src/types.ts:282](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L282)

Ordered list of fallback configurations tried on retryable failure.
 Each entry provides model/provider info the processor reads via job.currentFallback.

#### metadata?

```ts
metadata?: Record&lt;string, unknown>;
```

#### model

```ts
model: string;
```

#### provider?

```ts
provider?: string;
```

***

### jobId?

```ts
jobId?: string;
```

Defined in: [glide-mq/src/types.ts:234](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L234)

Custom job ID. Max 256 characters, must not contain control characters,
curly braces, or colons. If a job with this ID already exists, Queue.add returns null
and FlowProducer.add throws. When combined with deduplication, the dedup
check runs first.

***

### lifo?

```ts
lifo?: boolean;
```

Defined in: [glide-mq/src/types.ts:242](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L242)

Process jobs in LIFO (last-in-first-out) order. Cannot be combined with ordering keys.

***

### lockDuration?

```ts
lockDuration?: number;
```

Defined in: [glide-mq/src/types.ts:266](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L266)

Override worker-level lockDuration for this specific job (ms).
 Controls heartbeat frequency and stall detection threshold.

***

### ordering?

```ts
ordering?: object;
```

Defined in: [glide-mq/src/types.ts:250](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L250)

Per-key ordering and group concurrency control.
Jobs sharing the same key are constrained to run at most `concurrency`
instances simultaneously across all workers.
When concurrency is 1 (default), jobs run sequentially in enqueue order.
When concurrency > 1, up to N jobs per key run in parallel.

#### concurrency?

```ts
concurrency?: number;
```

Max concurrent jobs for this ordering key. Default: 1 (sequential).

#### key

```ts
key: string;
```

#### rateLimit?

```ts
rateLimit?: RateLimitConfig;
```

Per-group rate limit: max N jobs per time window for this ordering key.

#### tokenBucket?

```ts
tokenBucket?: TokenBucketConfig;
```

Cost-based token bucket: capacity + refill rate. Jobs consume tokens based on cost.

***

### parent?

```ts
parent?: object;
```

Defined in: [glide-mq/src/types.ts:270](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L270)

#### id

```ts
id: string;
```

#### queue

```ts
queue: string;
```

***

### parents?

```ts
parents?: object[];
```

Defined in: [glide-mq/src/types.ts:277](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L277)

Multiple parent dependencies for DAG flows.
When set, this job waits for ALL parents to complete before it can run.
Each parent tracks this job as a child in its deps SET.
Mutually exclusive with `parent` - use one or the other.

#### id

```ts
id: string;
```

#### queue

```ts
queue: string;
```

***

### priority?

```ts
priority?: number;
```

Defined in: [glide-mq/src/types.ts:240](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L240)

Integer 0-2048. 1 is the highest priority. 0 (default) means no priority: those jobs
run after any waiting job with priority > 0. Other values throw.

***

### removeOnComplete?

```ts
removeOnComplete?:
  | number
  | boolean
  | {
  age: number;
  count: number;
};
```

Defined in: [glide-mq/src/types.ts:267](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L267)

***

### removeOnFail?

```ts
removeOnFail?:
  | number
  | boolean
  | {
  age: number;
  count: number;
};
```

Defined in: [glide-mq/src/types.ts:268](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L268)

***

### timeout?

```ts
timeout?: number;
```

Defined in: [glide-mq/src/types.ts:263](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L263)

***

### ttl?

```ts
ttl?: number;
```

Defined in: [glide-mq/src/types.ts:279](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L279)

Time-to-live in milliseconds. Jobs not processed within this window are failed as 'expired'.
