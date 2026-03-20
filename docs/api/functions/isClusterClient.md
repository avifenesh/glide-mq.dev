# Function: isClusterClient()

```ts
function isClusterClient(client): boolean;
```

Defined in: [glide-mq/src/connection.ts:73](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/connection.ts#L73)

Detect whether a client is a GlideClusterClient.
Uses instanceof with a duck-type fallback for cases where the client
comes from a different copy/version of @glidemq/speedkey (dependency duplication).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | `Client` |

## Returns

`boolean`
