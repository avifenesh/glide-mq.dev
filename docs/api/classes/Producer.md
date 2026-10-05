# Class: Producer&lt;D&gt;

Defined in: [glide-mq/src/producer.ts:74](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/producer.ts#L74)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `D` | `any` |

## Constructors

### Constructor

```ts
new Producer<D>(name, opts): Producer<D>;
```

Defined in: [glide-mq/src/producer.ts:87](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/producer.ts#L87)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` |
| `opts` | [`ProducerOptions`](../interfaces/ProducerOptions.md) |

#### Returns

`Producer`&lt;`D`&gt;

## Properties

### name

```ts
readonly name: string;
```

Defined in: [glide-mq/src/producer.ts:75](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/producer.ts#L75)

## Accessors

### isClosed

#### Get Signature

```ts
get isClosed(): boolean;
```

Defined in: [glide-mq/src/producer.ts:534](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/producer.ts#L534)

Returns true if close() has been called.

##### Returns

`boolean`

## Methods

### add()

```ts
add(
   name,
   data,
   opts?
): Promise&lt;string | null>;
```

Defined in: [glide-mq/src/producer.ts:274](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/producer.ts#L274)

Add a single job to the queue.
Returns the job ID (string) or null if deduplicated/collision.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` |
| `data` | `D` |
| `opts?` | [`JobOptions`](../interfaces/JobOptions.md) |

#### Returns

`Promise`&lt;`string` \| `null`&gt;

***

### addBulk()

```ts
addBulk(jobs): Promise<(string | null)[]>;
```

Defined in: [glide-mq/src/producer.ts:375](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/producer.ts#L375)

Add multiple jobs in a single pipeline round trip.
Returns an array of job IDs (string or null for dedup/collision).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `jobs` | `object`[] |

#### Returns

`Promise`&lt;(`string` \| `null`)[]&gt;

***

### close()

```ts
close(): Promise&lt;void>;
```

Defined in: [glide-mq/src/producer.ts:542](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/producer.ts#L542)

Close the producer. If the client was created by this producer, it is destroyed.
If an external client was provided, it is not closed.

#### Returns

`Promise`&lt;`void`&gt;
