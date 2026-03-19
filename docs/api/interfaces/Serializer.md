# Interface: Serializer

Defined in: [glide-mq/src/types.ts:243](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L243)

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

Defined in: [glide-mq/src/types.ts:247](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L247)

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

Defined in: [glide-mq/src/types.ts:245](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L245)

Serialize a value to a string for storage in Valkey.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `unknown` |

#### Returns

`string`
