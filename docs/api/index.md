# glide-mq

## Classes

| Class | Description |
| ------ | ------ |
| [BatchError](classes/BatchError.md) | Thrown by batch processors to report per-job results (mixed success/failure). |
| [Broadcast](classes/Broadcast.md) | Broadcast - Fan-out message publisher for pub/sub patterns. |
| [BroadcastWorker](classes/BroadcastWorker.md) | - |
| [ConnectionError](classes/ConnectionError.md) | Thrown when a Valkey/Redis connection cannot be established. |
| [CycleError](classes/CycleError.md) | - |
| [DelayedError](classes/DelayedError.md) | Internal control-flow error thrown by `job.moveToDelayed()`. Caught by the Worker. |
| [FlowProducer](classes/FlowProducer.md) | Creates parent-child job flows and DAG workflows. Children are processed first; the parent runs after all children complete. |
| [GlideMQError](classes/GlideMQError.md) | Base error class for all glide-mq errors. |
| [GroupRateLimitError](classes/GroupRateLimitError.md) | Internal control-flow error thrown by `job.rateLimitGroup()`. Caught by the Worker. |
| [Job](classes/Job.md) | Represents a single job in the queue. Provides methods for reporting usage, streaming chunks, managing state, and interacting with the job lifecycle (delay, suspend, retry, etc.). |
| [Producer](classes/Producer.md) | - |
| [Queue](classes/Queue.md) | Queue manages job submission, retrieval, scheduling, and lifecycle operations. Connects to Valkey/Redis and uses server-side functions for atomic operations. |
| [QueueEvents](classes/QueueEvents.md) | - |
| [ServerlessPool](classes/ServerlessPool.md) | - |
| [SuspendError](classes/SuspendError.md) | Internal control-flow error thrown by `job.suspend()`. Caught by the Worker. |
| [UnrecoverableError](classes/UnrecoverableError.md) | Thrown to signal a job failure that should never be retried, regardless of attempts config. |
| [WaitingChildrenError](classes/WaitingChildrenError.md) | Internal control-flow error thrown by `job.moveToWaitingChildren()`. Caught by the Worker. |
| [Worker](classes/Worker.md) | - |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [AddAndWaitOptions](interfaces/AddAndWaitOptions.md) | Options for Queue.addAndWait(). Extends JobOptions with a wait timeout. |
| [BatchOptions](interfaces/BatchOptions.md) | Configuration for batch processing mode. |
| [BroadcastOptions](interfaces/BroadcastOptions.md) | Configuration options for a Broadcast (pub/sub) queue. |
| [BroadcastWorkerOptions](interfaces/BroadcastWorkerOptions.md) | Configuration options for a BroadcastWorker (subscriber). |
| [BudgetOptions](interfaces/BudgetOptions.md) | Budget constraints for a flow. Caps token usage and/or cost across all jobs. |
| [ConnectionOptions](interfaces/ConnectionOptions.md) | Options for connecting to a Valkey/Redis server or cluster. |
| [DAGFlow](interfaces/DAGFlow.md) | A complete DAG flow definition for submission via FlowProducer.addDAG(). |
| [DAGNode](interfaces/DAGNode.md) | A node in a DAG flow. Each node is a job with optional dependencies on other nodes. The `deps` array lists the names of nodes that must complete before this node can run. |
| [DeadLetterQueueOptions](interfaces/DeadLetterQueueOptions.md) | Configuration for dead letter queue routing. |
| [FlowJob](interfaces/FlowJob.md) | Definition of a job within a flow (parent-child hierarchy). |
| [FlowProducerOptions](interfaces/FlowProducerOptions.md) | Configuration options for creating a FlowProducer instance. |
| [GetJobsOptions](interfaces/GetJobsOptions.md) | Options for getJob() and getJobs() methods. |
| [GroupRateLimitOptions](interfaces/GroupRateLimitOptions.md) | Options controlling behavior when `job.rateLimitGroup()` is called. |
| [IamCredentials](interfaces/IamCredentials.md) | IAM authentication credentials for AWS ElastiCache/MemoryDB. |
| [IndexCreateOptions](interfaces/IndexCreateOptions.md) | Options passed through to FT.CREATE (glide-mq owned, decoupled from speedkey). |
| [JobCounts](interfaces/JobCounts.md) | Count of jobs in each state. |
| [JobData](interfaces/JobData.md) | Generic job data payload type. |
| [JobIndexOptions](interfaces/JobIndexOptions.md) | Options for creating a Valkey Search index over job hashes. |
| [JobNode](interfaces/JobNode.md) | - |
| [JobOptions](interfaces/JobOptions.md) | Options for controlling individual job behavior (delay, priority, retry, etc.). |
| [JobTemplate](interfaces/JobTemplate.md) | Template for jobs created by a scheduler. |
| [JobUsage](interfaces/JobUsage.md) | AI-specific usage metadata reported by a job processor. |
| [Metrics](interfaces/Metrics.md) | Aggregated metrics result with total count and per-minute data points. |
| [MetricsDataPoint](interfaces/MetricsDataPoint.md) | A single per-minute metrics data point. |
| [MetricsOptions](interfaces/MetricsOptions.md) | Options for querying metrics data points. |
| [PasswordCredentials](interfaces/PasswordCredentials.md) | Standard password-based credentials. |
| [ProducerOptions](interfaces/ProducerOptions.md) | - |
| [QueueEventsOptions](interfaces/QueueEventsOptions.md) | Configuration options for creating a QueueEvents listener. |
| [QueueOptions](interfaces/QueueOptions.md) | Configuration options for creating a Queue instance. |
| [RateLimitConfig](interfaces/RateLimitConfig.md) | Configuration for time-window rate limiting. |
| [ReadStreamOptions](interfaces/ReadStreamOptions.md) | Options for readStream() - reading entries from a job's streaming channel. |
| [SandboxOptions](interfaces/SandboxOptions.md) | Options for sandboxed (file-path) processors running in worker threads or child processes. When a job's abort signal fires (timeout or revocation), the abort is forwarded to the processor. If it has not settled 5 seconds later, its worker thread is terminated (or its child process is SIGKILLed) and replaced, so a hung processor cannot hold a sandbox slot. During that window the worker no longer owns the job: `job.updateProgress()`, `job.updateData()` and `job.moveToDelayed()` reject with `Job aborted`; `job.log()` still works. |
| [ScheduleOpts](interfaces/ScheduleOpts.md) | Options for defining a job schedule (cron, interval, or repeat-after-complete). |
| [SchedulerEntry](interfaces/SchedulerEntry.md) | Stored state of a registered job scheduler. |
| [SearchJobsOptions](interfaces/SearchJobsOptions.md) | Options for searchJobs() method. |
| [SearchQueryOptions](interfaces/SearchQueryOptions.md) | Options passed through to FT.SEARCH (glide-mq owned, decoupled from speedkey). |
| [Serializer](interfaces/Serializer.md) | Custom serializer for job data and return values. |
| [SignalEntry](interfaces/SignalEntry.md) | A signal entry delivered to a suspended job on resume. |
| [SuspendOptions](interfaces/SuspendOptions.md) | Options for suspending a job. |
| [TokenBucketConfig](interfaces/TokenBucketConfig.md) | Configuration for token bucket rate limiting with burst capacity and refill rate. |
| [UsageQueueSummary](interfaces/UsageQueueSummary.md) | Aggregated usage totals for a single queue inside a usage summary response. |
| [UsageSummary](interfaces/UsageSummary.md) | Rolling aggregate usage summary across one or more queues. |
| [UsageSummaryOptions](interfaces/UsageSummaryOptions.md) | Options for aggregating reported usage across one or more queues. |
| [VectorSearchOptions](interfaces/VectorSearchOptions.md) | Options for vector similarity search over indexed jobs. |
| [VectorSearchResult](interfaces/VectorSearchResult.md) | A single result from a vector similarity search. |
| [WorkerInfo](interfaces/WorkerInfo.md) | Information about a live worker instance. |
| [WorkerOptions](interfaces/WorkerOptions.md) | Configuration options for creating a Worker instance. Extends QueueOptions. |
| [WorkflowJobDef](interfaces/WorkflowJobDef.md) | - |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [BatchProcessor](type-aliases/BatchProcessor.md) | - |
| [ClosableWorkflow](type-aliases/ClosableWorkflow.md) | Returned workflow tree or DAG map plus close() for an injected client. |
| [Field](type-aliases/Field.md) | - |
| [GracefulShutdownHandle](type-aliases/GracefulShutdownHandle.md) | - |
| [Processor](type-aliases/Processor.md) | - |
| [ReadFrom](type-aliases/ReadFrom.md) | Represents the client's read from strategy. |
| [WorkflowConnection](type-aliases/WorkflowConnection.md) | Connection for helpers. Pass `client` to keep returned jobs usable. |

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
| [gracefulShutdown](functions/gracefulShutdown.md) | Register SIGTERM and SIGINT handlers that gracefully close all provided components. Returns a Promise that resolves when all components have been closed. A second signal while shutdown is still running removes these handlers and re-raises that signal, so the process gets its default handling (exit) instead of the signal being swallowed behind a hung close(). |
| [group](functions/group.md) | Group: execute jobs in parallel. All jobs run concurrently. A synthetic parent job (name: '__group__') waits for all children. When complete, the parent's processor receives all children's results via getChildrenValues(). |
| [isClusterClient](functions/isClusterClient.md) | Detect whether a client is a GlideClusterClient. Uses instanceof with a duck-type fallback for cases where the client comes from a different copy/version of @glidemq/speedkey (dependency duplication). |
| [isTracingEnabled](functions/isTracingEnabled.md) | True when a real OTel API is available (either user-provided or auto-detected). |
| [matchSubject](functions/matchSubject.md) | Match a dot-separated subject against a pattern. - `*` matches exactly one segment - `>` matches one or more trailing segments (must be the last token) - Literal tokens match exactly |
| [setTracer](functions/setTracer.md) | Allow the user to supply their own tracer instance. If not called, the tracer is auto-resolved from @opentelemetry/api. |
| [topoSort](functions/topoSort.md) | Topological sort of DAG nodes using Kahn's algorithm. Returns nodes in submission order (leaves first, roots last). Throws CycleError if a cycle is detected. |
| [validateDAG](functions/validateDAG.md) | Validate that a set of DAG nodes forms a valid DAG (no cycles). Throws CycleError if a cycle is detected. Throws Error if a node references a non-existent dependency. |
