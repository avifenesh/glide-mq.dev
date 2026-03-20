# Class: Producer\<D\>

Defined in: [glide-mq/src/producer.ts:73](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/producer.ts#L73)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `D` | `any` |

## Constructors

### Constructor

```ts
new Producer<D>(name, opts): Producer<D>;
```

Defined in: [glide-mq/src/producer.ts:86](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/producer.ts#L86)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` |
| `opts` | [`ProducerOptions`](../interfaces/ProducerOptions.md) |

#### Returns

`Producer`\<`D`\>

## Properties

### name

```ts
readonly name: string;
```

Defined in: [glide-mq/src/producer.ts:74](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/producer.ts#L74)

## Accessors

### isClosed

#### Get Signature

```ts
get isClosed(): boolean;
```

Defined in: [glide-mq/src/producer.ts:515](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/producer.ts#L515)

Returns true if close() has been called.

##### Returns

`boolean`

## Methods

### add()

```ts
add(
   name, 
   data, 
opts?): Promise<string | null>;
```

Defined in: [glide-mq/src/producer.ts:273](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/producer.ts#L273)

Add a single job to the queue.
Returns the job ID (string) or null if deduplicated/collision.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` |
| `data` | `D` |
| `opts?` | [`JobOptions`](../interfaces/JobOptions.md) |

#### Returns

`Promise`\<`string` \| `null`\>

***

### addBulk()

```ts
addBulk(jobs): Promise<(string | null)[]>;
```

Defined in: [glide-mq/src/producer.ts:374](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/producer.ts#L374)

Add multiple jobs in a single pipeline round trip.
Returns an array of job IDs (string or null for dedup/collision).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `jobs` | `object`[] |

#### Returns

`Promise`\<(`string` \| `null`)[]\>

***

### close()

```ts
close(): Promise<void>;
```

Defined in: [glide-mq/src/producer.ts:523](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/producer.ts#L523)

Close the producer. If the client was created by this producer, it is destroyed.
If an external client was provided, it is not closed.

#### Returns

`Promise`\<`void`\>
