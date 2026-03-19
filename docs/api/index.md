# glide-mq

## Classes

| Class | Description |
| ------ | ------ |
| [BatchError](classes/BatchError.md) | - |
| [Broadcast](classes/Broadcast.md) | Broadcast - Fan-out message publisher for pub/sub patterns. |
| [BroadcastWorker](classes/BroadcastWorker.md) | - |
| [ConnectionError](classes/ConnectionError.md) | - |
| [CycleError](classes/CycleError.md) | - |
| [DelayedError](classes/DelayedError.md) | - |
| [FlowProducer](classes/FlowProducer.md) | - |
| [GlideMQError](classes/GlideMQError.md) | - |
| [Job](classes/Job.md) | - |
| [Producer](classes/Producer.md) | - |
| [Queue](classes/Queue.md) | - |
| [QueueEvents](classes/QueueEvents.md) | - |
| [ServerlessPool](classes/ServerlessPool.md) | - |
| [UnrecoverableError](classes/UnrecoverableError.md) | - |
| [WaitingChildrenError](classes/WaitingChildrenError.md) | - |
| [Worker](classes/Worker.md) | - |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [AddAndWaitOptions](interfaces/AddAndWaitOptions.md) | - |
| [BatchOptions](interfaces/BatchOptions.md) | - |
| [BroadcastOptions](interfaces/BroadcastOptions.md) | - |
| [BroadcastWorkerOptions](interfaces/BroadcastWorkerOptions.md) | - |
| [ConnectionOptions](interfaces/ConnectionOptions.md) | - |
| [DAGFlow](interfaces/DAGFlow.md) | A complete DAG flow definition for submission via FlowProducer.addDAG(). |
| [DAGNode](interfaces/DAGNode.md) | A node in a DAG flow. Each node is a job with optional dependencies on other nodes. The `deps` array lists the names of nodes that must complete before this node can run. |
| [DeadLetterQueueOptions](interfaces/DeadLetterQueueOptions.md) | - |
| [FlowJob](interfaces/FlowJob.md) | - |
| [FlowProducerOptions](interfaces/FlowProducerOptions.md) | - |
| [GetJobsOptions](interfaces/GetJobsOptions.md) | - |
| [IamCredentials](interfaces/IamCredentials.md) | IAM authentication credentials for AWS ElastiCache/MemoryDB. |
| [JobCounts](interfaces/JobCounts.md) | - |
| [JobData](interfaces/JobData.md) | - |
| [JobNode](interfaces/JobNode.md) | - |
| [JobOptions](interfaces/JobOptions.md) | - |
| [JobTemplate](interfaces/JobTemplate.md) | - |
| [Metrics](interfaces/Metrics.md) | - |
| [MetricsDataPoint](interfaces/MetricsDataPoint.md) | - |
| [MetricsOptions](interfaces/MetricsOptions.md) | - |
| [PasswordCredentials](interfaces/PasswordCredentials.md) | Standard password-based credentials. |
| [ProducerOptions](interfaces/ProducerOptions.md) | - |
| [QueueEventsOptions](interfaces/QueueEventsOptions.md) | - |
| [QueueOptions](interfaces/QueueOptions.md) | - |
| [RateLimitConfig](interfaces/RateLimitConfig.md) | - |
| [SandboxOptions](interfaces/SandboxOptions.md) | - |
| [ScheduleOpts](interfaces/ScheduleOpts.md) | - |
| [SchedulerEntry](interfaces/SchedulerEntry.md) | - |
| [SearchJobsOptions](interfaces/SearchJobsOptions.md) | - |
| [Serializer](interfaces/Serializer.md) | Custom serializer for job data and return values. |
| [TokenBucketConfig](interfaces/TokenBucketConfig.md) | - |
| [WorkerInfo](interfaces/WorkerInfo.md) | - |
| [WorkerOptions](interfaces/WorkerOptions.md) | - |
| [WorkflowJobDef](interfaces/WorkflowJobDef.md) | - |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [BatchProcessor](type-aliases/BatchProcessor.md) | - |
| [GracefulShutdownHandle](type-aliases/GracefulShutdownHandle.md) | - |
| [Processor](type-aliases/Processor.md) | - |
| [ReadFrom](type-aliases/ReadFrom.md) | Represents the client's read from strategy. |

## Variables

| Variable | Description |
| ------ | ------ |
| [JSON\_SERIALIZER](variables/JSON_SERIALIZER.md) | Default JSON serializer used when no custom serializer is provided. |
| [serverlessPool](variables/serverlessPool.md) | Module-level singleton for convenient use in serverless handlers. |

## Functions

| Function | Description |
| ------ | ------ |
| [chain](functions/chain.md) | Chain: execute jobs sequentially. Each step becomes a child of the next, so step N+1 only runs after step N completes. The last job in the array runs first; the first job in the array runs last and is the top-level parent. |
| [chord](functions/chord.md) | Chord: run a group of jobs in parallel, then execute a callback job with the results. The callback is the parent, the group members are children. |
| [compileSubjectMatcher](functions/compileSubjectMatcher.md) | Compile an array of subject patterns into a single matcher function. Returns a function that returns true if the subject matches any pattern. Returns null if patterns is empty or undefined (no filtering). |
| [dag](functions/dag.md) | DAG: submit a directed acyclic graph of jobs where each job can depend on multiple other jobs. The graph is validated for cycles and submitted in topological order (leaves first). |
| [gracefulShutdown](functions/gracefulShutdown.md) | Register SIGTERM and SIGINT handlers that gracefully close all provided components. Returns a Promise that resolves when all components have been closed. |
| [group](functions/group.md) | Group: execute jobs in parallel. All jobs run concurrently. A synthetic parent job (name: '__group__') waits for all children. When complete, the parent's processor receives all children's results via getChildrenValues(). |
| [isClusterClient](functions/isClusterClient.md) | Detect whether a client is a GlideClusterClient. Uses instanceof with a duck-type fallback for cases where the client comes from a different copy/version of @glidemq/speedkey (dependency duplication). |
| [isTracingEnabled](functions/isTracingEnabled.md) | True when a real OTel API is available (either user-provided or auto-detected). |
| [matchSubject](functions/matchSubject.md) | Match a dot-separated subject against a pattern. - `*` matches exactly one segment - `>` matches one or more trailing segments (must be the last token) - Literal tokens match exactly |
| [setTracer](functions/setTracer.md) | Allow the user to supply their own tracer instance. If not called, the tracer is auto-resolved from @opentelemetry/api. |
| [topoSort](functions/topoSort.md) | Topological sort of DAG nodes using Kahn's algorithm. Returns nodes in submission order (leaves first, roots last). Throws CycleError if a cycle is detected. |
| [validateDAG](functions/validateDAG.md) | Validate that a set of DAG nodes forms a valid DAG (no cycles). Throws CycleError if a cycle is detected. Throws Error if a node references a non-existent dependency. |
