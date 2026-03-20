# Function: isClusterClient()

```ts
function isClusterClient(client): boolean;
```

Defined in: [glide-mq/src/connection.ts:73](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/connection.ts#L73)

Detect whether a client is a GlideClusterClient.
Uses instanceof with a duck-type fallback for cases where the client
comes from a different copy/version of @glidemq/speedkey (dependency duplication).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | `Client` |

## Returns

`boolean`
