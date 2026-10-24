# Interface: Serializer

Defined in: [glide-mq/src/types.ts:326](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L326)

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

Defined in: [glide-mq/src/types.ts:330](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L330)

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

Defined in: [glide-mq/src/types.ts:328](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L328)

Serialize a value to a string for storage in Valkey.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `unknown` |

#### Returns

`string`
