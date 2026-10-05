# Interface: Serializer

Defined in: [glide-mq/src/types.ts:316](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L316)

Custom serializer for job data and return values.

Implementations must satisfy the roundtrip invariant:
`deserialize(serialize(value))` must produce a value equivalent to `value`
for all values the application stores in jobs.

Both methods must be synchronous. If `serialize` throws, the job is treated
as a processor failure (in Worker) or skipped (in Scheduler).

## Methods

### deserialize()

```ts
deserialize(raw): unknown;
```

Defined in: [glide-mq/src/types.ts:320](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L320)

Deserialize a string from Valkey back to a value.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `raw` | `string` |

#### Returns

`unknown`

***

### serialize()

```ts
serialize(data): string;
```

Defined in: [glide-mq/src/types.ts:318](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L318)

Serialize a value to a string for storage in Valkey.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `unknown` |

#### Returns

`string`
