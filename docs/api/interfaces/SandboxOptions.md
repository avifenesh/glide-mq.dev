# Interface: SandboxOptions

Defined in: [glide-mq/src/types.ts:90](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L90)

## Properties

### maxWorkers?

```ts
optional maxWorkers?: number;
```

Defined in: [glide-mq/src/types.ts:94](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L94)

Maximum number of concurrent sandbox workers. Defaults to the Worker concurrency.

***

### useWorkerThreads?

```ts
optional useWorkerThreads?: boolean;
```

Defined in: [glide-mq/src/types.ts:92](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/types.ts#L92)

Use worker_threads (default: true). When false, uses child_process.fork.
