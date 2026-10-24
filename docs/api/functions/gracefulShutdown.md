# Function: gracefulShutdown()

```ts
function gracefulShutdown(components): GracefulShutdownHandle;
```

Defined in: [glide-mq/src/graceful-shutdown.ts:24](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/graceful-shutdown.ts#L24)

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
