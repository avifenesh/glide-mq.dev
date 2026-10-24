# Function: isClusterClient()

```ts
function isClusterClient(client): boolean;
```

Defined in: [glide-mq/src/connection.ts:76](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/connection.ts#L76)

Detect whether a client is a GlideClusterClient.
Uses instanceof with a duck-type fallback for cases where the client
comes from a different copy/version of @glidemq/speedkey (dependency duplication).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | `Client` |

## Returns

`boolean`
