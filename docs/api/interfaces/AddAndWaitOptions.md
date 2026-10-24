# Interface: AddAndWaitOptions

Defined in: [glide-mq/src/types.ts:290](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L290)

Options for Queue.addAndWait(). Extends JobOptions with a wait timeout.

## Extends

- [`JobOptions`](JobOptions.md)

## Properties

### attempts?

```ts
attempts?: number;
```

Defined in: [glide-mq/src/types.ts:261](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L261)

#### Inherited from

[`JobOptions`](JobOptions.md).[`attempts`](JobOptions.md#attempts)

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

#### Inherited from

[`JobOptions`](JobOptions.md).[`backoff`](JobOptions.md#backoff)

***

### cost?

```ts
cost?: number;
```

Defined in: [glide-mq/src/types.ts:260](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L260)

Job cost in tokens for token bucket rate limiting. Default: 1.

#### Inherited from

[`JobOptions`](JobOptions.md).[`cost`](JobOptions.md#cost)

***

### deduplication?

```ts
deduplication?: DeduplicationOptions;
```

Defined in: [glide-mq/src/types.ts:269](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L269)

#### Inherited from

[`JobOptions`](JobOptions.md).[`deduplication`](JobOptions.md#deduplication)

***

### delay?

```ts
delay?: number;
```

Defined in: [glide-mq/src/types.ts:235](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L235)

#### Inherited from

[`JobOptions`](JobOptions.md).[`delay`](JobOptions.md#delay)

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

#### Inherited from

[`JobOptions`](JobOptions.md).[`fallbacks`](JobOptions.md#fallbacks)

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

#### Inherited from

[`JobOptions`](JobOptions.md).[`jobId`](JobOptions.md#jobid)

***

### lifo?

```ts
lifo?: boolean;
```

Defined in: [glide-mq/src/types.ts:242](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L242)

Process jobs in LIFO (last-in-first-out) order. Cannot be combined with ordering keys.

#### Inherited from

[`JobOptions`](JobOptions.md).[`lifo`](JobOptions.md#lifo)

***

### lockDuration?

```ts
lockDuration?: number;
```

Defined in: [glide-mq/src/types.ts:266](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L266)

Override worker-level lockDuration for this specific job (ms).
 Controls heartbeat frequency and stall detection threshold.

#### Inherited from

[`JobOptions`](JobOptions.md).[`lockDuration`](JobOptions.md#lockduration)

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

#### Inherited from

[`JobOptions`](JobOptions.md).[`ordering`](JobOptions.md#ordering)

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

#### Inherited from

[`JobOptions`](JobOptions.md).[`parent`](JobOptions.md#parent)

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

#### Inherited from

[`JobOptions`](JobOptions.md).[`parents`](JobOptions.md#parents)

***

### priority?

```ts
priority?: number;
```

Defined in: [glide-mq/src/types.ts:240](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L240)

Integer 0-2048. 1 is the highest priority. 0 (default) means no priority: those jobs
run after any waiting job with priority > 0. Other values throw.

#### Inherited from

[`JobOptions`](JobOptions.md).[`priority`](JobOptions.md#priority)

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

#### Inherited from

[`JobOptions`](JobOptions.md).[`removeOnComplete`](JobOptions.md#removeoncomplete)

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

#### Inherited from

[`JobOptions`](JobOptions.md).[`removeOnFail`](JobOptions.md#removeonfail)

***

### signal?

```ts
signal?: AbortSignal;
```

Defined in: [glide-mq/src/types.ts:297](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L297)

Abort the wait early. The job stays enqueued; the call rejects with an AbortError and
releases its dedicated blocking connection.

***

### timeout?

```ts
timeout?: number;
```

Defined in: [glide-mq/src/types.ts:263](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L263)

#### Inherited from

[`JobOptions`](JobOptions.md).[`timeout`](JobOptions.md#timeout)

***

### ttl?

```ts
ttl?: number;
```

Defined in: [glide-mq/src/types.ts:279](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L279)

Time-to-live in milliseconds. Jobs not processed within this window are failed as 'expired'.

#### Inherited from

[`JobOptions`](JobOptions.md).[`ttl`](JobOptions.md#ttl)

***

### waitTimeout?

```ts
waitTimeout?: number;
```

Defined in: [glide-mq/src/types.ts:292](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L292)

Maximum time to wait for a completed/failed event before rejecting. Default: 30000ms.
