# Interface: SandboxOptions

Defined in: [glide-mq/src/types.ts:90](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L90)

## Properties

### maxWorkers?

```ts
optional maxWorkers?: number;
```

Defined in: [glide-mq/src/types.ts:94](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L94)

Maximum number of concurrent sandbox workers. Defaults to the Worker concurrency.

***

### useWorkerThreads?

```ts
optional useWorkerThreads?: boolean;
```

Defined in: [glide-mq/src/types.ts:92](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/types.ts#L92)

Use worker_threads (default: true). When false, uses child_process.fork.
