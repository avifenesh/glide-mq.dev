# Interface: JobOptions

Defined in: [glide-mq/src/types.ts:166](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L166)

## Extended by

- [`AddAndWaitOptions`](AddAndWaitOptions.md)

## Properties

### attempts?

```ts
optional attempts?: number;
```

Defined in: [glide-mq/src/types.ts:196](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L196)

***

### backoff?

```ts
optional backoff?: object;
```

Defined in: [glide-mq/src/types.ts:197](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L197)

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

Defined in: [glide-mq/src/types.ts:195](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L195)

Job cost in tokens for token bucket rate limiting. Default: 1.

***

### deduplication?

```ts
optional deduplication?: object;
```

Defined in: [glide-mq/src/types.ts:201](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L201)

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

Defined in: [glide-mq/src/types.ts:174](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L174)

***

### jobId?

```ts
optional jobId?: string;
```

Defined in: [glide-mq/src/types.ts:173](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L173)

Custom job ID. Max 256 characters, must not contain control characters,
curly braces, or colons. If a job with this ID already exists, Queue.add returns null
and FlowProducer.add throws. When combined with deduplication, the dedup
check runs first.

***

### lifo?

```ts
optional lifo?: boolean;
```

Defined in: [glide-mq/src/types.ts:177](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L177)

Process jobs in LIFO (last-in-first-out) order. Cannot be combined with ordering keys.

***

### ordering?

```ts
optional ordering?: object;
```

Defined in: [glide-mq/src/types.ts:185](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L185)

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

Defined in: [glide-mq/src/types.ts:202](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L202)

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

Defined in: [glide-mq/src/types.ts:209](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L209)

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

Defined in: [glide-mq/src/types.ts:175](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L175)

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

Defined in: [glide-mq/src/types.ts:199](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L199)

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

Defined in: [glide-mq/src/types.ts:200](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L200)

***

### timeout?

```ts
optional timeout?: number;
```

Defined in: [glide-mq/src/types.ts:198](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L198)

***

### ttl?

```ts
optional ttl?: number;
```

Defined in: [glide-mq/src/types.ts:211](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L211)

Time-to-live in milliseconds. Jobs not processed within this window are failed as 'expired'.
