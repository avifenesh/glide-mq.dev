# Function: gracefulShutdown()

```ts
function gracefulShutdown(components): GracefulShutdownHandle;
```

Defined in: [glide-mq/src/graceful-shutdown.ts:21](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/graceful-shutdown.ts#L21)

Register SIGTERM and SIGINT handlers that gracefully close all provided components.
Returns a Promise that resolves when all components have been closed.

Usage:
  const shutdown = gracefulShutdown([queue, worker, queueEvents]);
  // ... later, on signal or manually:
  await shutdown;

## Parameters

| Parameter | Type |
| ------ | ------ |
| `components` | `Closeable`[] |

## Returns

[`GracefulShutdownHandle`](../type-aliases/GracefulShutdownHandle.md)
