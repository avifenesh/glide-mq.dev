# Interface: SandboxOptions

Defined in: [glide-mq/src/types.ts:116](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L116)

Options for sandboxed (file-path) processors running in worker threads or child processes.
When a job's abort signal fires (timeout or revocation), the abort is forwarded to the processor.
If it has not settled 5 seconds later, its worker thread is terminated (or its child process is
SIGKILLed) and replaced, so a hung processor cannot hold a sandbox slot. During that window the
worker no longer owns the job: `job.updateProgress()`, `job.updateData()` and `job.moveToDelayed()`
reject with `Job aborted`; `job.log()` still works.

## Properties

### maxWorkers?

```ts
maxWorkers?: number;
```

Defined in: [glide-mq/src/types.ts:120](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L120)

Maximum number of concurrent sandbox workers. Defaults to the Worker concurrency.

***

### useWorkerThreads?

```ts
useWorkerThreads?: boolean;
```

Defined in: [glide-mq/src/types.ts:118](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L118)

Use worker_threads (default: true). When false, uses child_process.fork.
