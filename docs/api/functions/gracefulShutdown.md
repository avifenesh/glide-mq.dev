# Function: gracefulShutdown()

```ts
function gracefulShutdown(components): GracefulShutdownHandle;
```

Defined in: [glide-mq/src/graceful-shutdown.ts:24](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/graceful-shutdown.ts#L24)

Register SIGTERM and SIGINT handlers that gracefully close all provided components.
Returns a Promise that resolves when all components have been closed.
A second signal while shutdown is still running removes these handlers and
re-raises that signal, so the process gets its default handling (exit)
instead of the signal being swallowed behind a hung close().

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
