# Interface: AddAndWaitOptions

Defined in: [glide-mq/src/types.ts:280](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L280)

Options for Queue.addAndWait(). Extends JobOptions with a wait timeout.

## Extends

- [`JobOptions`](JobOptions.md)

## Properties

### attempts?

```ts
optional attempts?: number;
```

Defined in: [glide-mq/src/types.ts:251](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L251)

#### Inherited from

[`JobOptions`](JobOptions.md).[`attempts`](JobOptions.md#attempts)

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

#### Inherited from

[`JobOptions`](JobOptions.md).[`backoff`](JobOptions.md#backoff)

***

### cost?

```ts
optional cost?: number;
```

Defined in: [glide-mq/src/types.ts:250](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L250)

Job cost in tokens for token bucket rate limiting. Default: 1.

#### Inherited from

[`JobOptions`](JobOptions.md).[`cost`](JobOptions.md#cost)

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

#### Inherited from

[`JobOptions`](JobOptions.md).[`deduplication`](JobOptions.md#deduplication)

***

### delay?

```ts
optional delay?: number;
```

Defined in: [glide-mq/src/types.ts:225](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L225)

#### Inherited from

[`JobOptions`](JobOptions.md).[`delay`](JobOptions.md#delay)

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

#### Inherited from

[`JobOptions`](JobOptions.md).[`fallbacks`](JobOptions.md#fallbacks)

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

#### Inherited from

[`JobOptions`](JobOptions.md).[`jobId`](JobOptions.md#jobid)

***

### lifo?

```ts
optional lifo?: boolean;
```

Defined in: [glide-mq/src/types.ts:232](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L232)

Process jobs in LIFO (last-in-first-out) order. Cannot be combined with ordering keys.

#### Inherited from

[`JobOptions`](JobOptions.md).[`lifo`](JobOptions.md#lifo)

***

### lockDuration?

```ts
optional lockDuration?: number;
```

Defined in: [glide-mq/src/types.ts:256](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L256)

Override worker-level lockDuration for this specific job (ms).
 Controls heartbeat frequency and stall detection threshold.

#### Inherited from

[`JobOptions`](JobOptions.md).[`lockDuration`](JobOptions.md#lockduration)

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

#### Inherited from

[`JobOptions`](JobOptions.md).[`ordering`](JobOptions.md#ordering)

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

#### Inherited from

[`JobOptions`](JobOptions.md).[`parent`](JobOptions.md#parent)

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

#### Inherited from

[`JobOptions`](JobOptions.md).[`parents`](JobOptions.md#parents)

***

### priority?

```ts
optional priority?: number;
```

Defined in: [glide-mq/src/types.ts:230](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L230)

Integer 0-2048. 1 is the highest priority. 0 (default) means no priority: those jobs
run after any waiting job with priority > 0. Other values throw.

#### Inherited from

[`JobOptions`](JobOptions.md).[`priority`](JobOptions.md#priority)

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

#### Inherited from

[`JobOptions`](JobOptions.md).[`removeOnComplete`](JobOptions.md#removeoncomplete)

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

#### Inherited from

[`JobOptions`](JobOptions.md).[`removeOnFail`](JobOptions.md#removeonfail)

***

### signal?

```ts
optional signal?: AbortSignal;
```

Defined in: [glide-mq/src/types.ts:287](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L287)

Abort the wait early. The job stays enqueued; the call rejects with an AbortError and
releases its dedicated blocking connection.

***

### timeout?

```ts
optional timeout?: number;
```

Defined in: [glide-mq/src/types.ts:253](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L253)

#### Inherited from

[`JobOptions`](JobOptions.md).[`timeout`](JobOptions.md#timeout)

***

### ttl?

```ts
optional ttl?: number;
```

Defined in: [glide-mq/src/types.ts:269](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L269)

Time-to-live in milliseconds. Jobs not processed within this window are failed as 'expired'.

#### Inherited from

[`JobOptions`](JobOptions.md).[`ttl`](JobOptions.md#ttl)

***

### waitTimeout?

```ts
optional waitTimeout?: number;
```

Defined in: [glide-mq/src/types.ts:282](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L282)

Maximum time to wait for a completed/failed event before rejecting. Default: 30000ms.
