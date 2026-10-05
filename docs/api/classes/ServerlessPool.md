# Class: ServerlessPool

Defined in: [glide-mq/src/serverless-pool.ts:70](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/serverless-pool.ts#L70)

## Constructors

### Constructor

```ts
new ServerlessPool(): ServerlessPool;
```

#### Returns

`ServerlessPool`

## Accessors

### size

#### Get Signature

```ts
get size(): number;
```

Defined in: [glide-mq/src/serverless-pool.ts:116](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/serverless-pool.ts#L116)

Number of cached producers.

##### Returns

`number`

## Methods

### closeAll()

```ts
closeAll(): Promise&lt;void>;
```

Defined in: [glide-mq/src/serverless-pool.ts:107](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/serverless-pool.ts#L107)

Close all cached producers and clear the cache.
Call this during Lambda SIGTERM or explicit cleanup.

#### Returns

`Promise`&lt;`void`&gt;

***

### getProducer()

```ts
getProducer<D>(name, opts): Producer<D>;
```

Defined in: [glide-mq/src/serverless-pool.ts:81](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/serverless-pool.ts#L81)

Get or create a Producer for the given queue name and options.
Returns a cached instance if one exists with matching connection parameters.

Note: Injected clients and custom serializers bypass caching to prevent
collisions where different instances could map to the same cache key.

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `D` | `any` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` |
| `opts` | [`ProducerOptions`](../interfaces/ProducerOptions.md) |

#### Returns

[`Producer`](Producer.md)&lt;`D`&gt;
