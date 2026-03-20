# Function: gracefulShutdown()

```ts
function gracefulShutdown(components): GracefulShutdownHandle;
```

Defined in: [glide-mq/src/graceful-shutdown.ts:21](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/graceful-shutdown.ts#L21)

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
