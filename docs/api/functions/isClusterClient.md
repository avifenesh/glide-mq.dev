# Function: isClusterClient()

```ts
function isClusterClient(client): boolean;
```

Defined in: [glide-mq/src/connection.ts:76](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/connection.ts#L76)

Detect whether a client is a GlideClusterClient.
Uses instanceof with a duck-type fallback for cases where the client
comes from a different copy/version of @glidemq/speedkey (dependency duplication).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | `Client` |

## Returns

`boolean`
