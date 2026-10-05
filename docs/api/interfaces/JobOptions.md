# Interface: JobOptions

Defined in: [glide-mq/src/types.ts:217](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L217)

Options for controlling individual job behavior (delay, priority, retry, etc.).

## Extended by

- [`AddAndWaitOptions`](AddAndWaitOptions.md)

## Properties

### attempts?

```ts
optional attempts?: number;
```

Defined in: [glide-mq/src/types.ts:251](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L251)

***

### backoff?

```ts
optional backoff?: object;
```

Defined in: [glide-mq/src/types.ts:252](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L252)

#### delay

```ts
delay: number;
```

#### jitter?

```ts
optional jitter?: number;
```

#### type

```ts
type: string;
```

***

### cost?

```ts
optional cost?: number;
```

Defined in: [glide-mq/src/types.ts:250](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L250)

Job cost in tokens for token bucket rate limiting. Default: 1.

***

### deduplication?

```ts
optional deduplication?: object;
```

Defined in: [glide-mq/src/types.ts:259](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L259)

#### id

```ts
id: string;
```

#### mode?

```ts
optional mode?: "simple" | "throttle" | "debounce";
```

#### ttl?

```ts
optional ttl?: number;
```

***

### delay?

```ts
optional delay?: number;
```

Defined in: [glide-mq/src/types.ts:225](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L225)

***

### fallbacks?

```ts
optional fallbacks?: object[];
```

Defined in: [glide-mq/src/types.ts:272](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L272)

Ordered list of fallback configurations tried on retryable failure.
 Each entry provides model/provider info the processor reads via job.currentFallback.

#### metadata?

```ts
optional metadata?: Record&lt;string, unknown>;
```

#### model

```ts
model: string;
```

#### provider?

```ts
optional provider?: string;
```

***

### jobId?

```ts
optional jobId?: string;
```

Defined in: [glide-mq/src/types.ts:224](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L224)

Custom job ID. Max 256 characters, must not contain control characters,
curly braces, or colons. If a job with this ID already exists, Queue.add returns null
and FlowProducer.add throws. When combined with deduplication, the dedup
check runs first.

***

### lifo?

```ts
optional lifo?: boolean;
```

Defined in: [glide-mq/src/types.ts:232](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L232)

Process jobs in LIFO (last-in-first-out) order. Cannot be combined with ordering keys.

***

### lockDuration?

```ts
optional lockDuration?: number;
```

Defined in: [glide-mq/src/types.ts:256](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L256)

Override worker-level lockDuration for this specific job (ms).
 Controls heartbeat frequency and stall detection threshold.

***

### ordering?

```ts
optional ordering?: object;
```

Defined in: [glide-mq/src/types.ts:240](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L240)

Per-key ordering and group concurrency control.
Jobs sharing the same key are constrained to run at most `concurrency`
instances simultaneously across all workers.
When concurrency is 1 (default), jobs run sequentially in enqueue order.
When concurrency > 1, up to N jobs per key run in parallel.

#### concurrency?

```ts
optional concurrency?: number;
```

Max concurrent jobs for this ordering key. Default: 1 (sequential).

#### key

```ts
key: string;
```

#### rateLimit?

```ts
optional rateLimit?: RateLimitConfig;
```

Per-group rate limit: max N jobs per time window for this ordering key.

#### tokenBucket?

```ts
optional tokenBucket?: TokenBucketConfig;
```

Cost-based token bucket: capacity + refill rate. Jobs consume tokens based on cost.

***

### parent?

```ts
optional parent?: object;
```

Defined in: [glide-mq/src/types.ts:260](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L260)

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
optional parents?: object[];
```

Defined in: [glide-mq/src/types.ts:267](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L267)

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
optional priority?: number;
```

Defined in: [glide-mq/src/types.ts:230](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L230)

Integer 0-2048. 1 is the highest priority. 0 (default) means no priority: those jobs
run after any waiting job with priority > 0. Other values throw.

***

### removeOnComplete?

```ts
optional removeOnComplete?:
  | number
  | boolean
  | {
  age: number;
  count: number;
};
```

Defined in: [glide-mq/src/types.ts:257](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L257)

***

### removeOnFail?

```ts
optional removeOnFail?:
  | number
  | boolean
  | {
  age: number;
  count: number;
};
```

Defined in: [glide-mq/src/types.ts:258](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L258)

***

### timeout?

```ts
optional timeout?: number;
```

Defined in: [glide-mq/src/types.ts:253](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L253)

***

### ttl?

```ts
optional ttl?: number;
```

Defined in: [glide-mq/src/types.ts:269](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L269)

Time-to-live in milliseconds. Jobs not processed within this window are failed as 'expired'.
