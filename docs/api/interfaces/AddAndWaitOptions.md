# Interface: AddAndWaitOptions

Defined in: [glide-mq/src/types.ts:214](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L214)

## Extends

- [`JobOptions`](JobOptions.md)

## Properties

### attempts?

```ts
optional attempts?: number;
```

Defined in: [glide-mq/src/types.ts:196](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L196)

#### Inherited from

[`JobOptions`](JobOptions.md).[`attempts`](JobOptions.md#attempts)

***

### backoff?

```ts
optional backoff?: object;
```

Defined in: [glide-mq/src/types.ts:197](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L197)

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

Defined in: [glide-mq/src/types.ts:195](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L195)

Job cost in tokens for token bucket rate limiting. Default: 1.

#### Inherited from

[`JobOptions`](JobOptions.md).[`cost`](JobOptions.md#cost)

***

### deduplication?

```ts
optional deduplication?: object;
```

Defined in: [glide-mq/src/types.ts:201](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L201)

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

Defined in: [glide-mq/src/types.ts:174](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L174)

#### Inherited from

[`JobOptions`](JobOptions.md).[`delay`](JobOptions.md#delay)

***

### jobId?

```ts
optional jobId?: string;
```

Defined in: [glide-mq/src/types.ts:173](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L173)

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

Defined in: [glide-mq/src/types.ts:177](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L177)

Process jobs in LIFO (last-in-first-out) order. Cannot be combined with ordering keys.

#### Inherited from

[`JobOptions`](JobOptions.md).[`lifo`](JobOptions.md#lifo)

***

### ordering?

```ts
optional ordering?: object;
```

Defined in: [glide-mq/src/types.ts:185](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L185)

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

Defined in: [glide-mq/src/types.ts:202](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L202)

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

Defined in: [glide-mq/src/types.ts:209](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L209)

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

Defined in: [glide-mq/src/types.ts:175](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L175)

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

Defined in: [glide-mq/src/types.ts:199](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L199)

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

Defined in: [glide-mq/src/types.ts:200](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L200)

#### Inherited from

[`JobOptions`](JobOptions.md).[`removeOnFail`](JobOptions.md#removeonfail)

***

### timeout?

```ts
optional timeout?: number;
```

Defined in: [glide-mq/src/types.ts:198](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L198)

#### Inherited from

[`JobOptions`](JobOptions.md).[`timeout`](JobOptions.md#timeout)

***

### ttl?

```ts
optional ttl?: number;
```

Defined in: [glide-mq/src/types.ts:211](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L211)

Time-to-live in milliseconds. Jobs not processed within this window are failed as 'expired'.

#### Inherited from

[`JobOptions`](JobOptions.md).[`ttl`](JobOptions.md#ttl)

***

### waitTimeout?

```ts
optional waitTimeout?: number;
```

Defined in: [glide-mq/src/types.ts:216](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L216)

Maximum time to wait for a completed/failed event before rejecting. Default: 30000ms.
