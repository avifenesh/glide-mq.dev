---
title: Vector Search
description: Semantic search over jobs using Valkey Search with KNN vector similarity, index creation, and vector storage.
---

# Vector Search

glide-mq integrates with Valkey Search to enable vector similarity search over job hashes. Store embeddings on jobs, create an index, and query by KNN similarity - all through the Queue API.

## Table of Contents

- [Requirements](#requirements)
- [Creating an Index](#creating-an-index)
- [Storing Vectors](#storing-vectors)
- [Searching by Similarity](#searching-by-similarity)
- [Pre-Filtering](#pre-filtering)
- [Index Schema Options](#index-schema-options)
- [Dropping an Index](#dropping-an-index)
- [Testing Mode](#testing-mode)

---

## Requirements

- **Valkey with the Search module** (`valkey-search`). The Docker image `valkey/valkey:8` includes it. The `valkey-bundle` image includes all modules.
- **Standalone mode only**. Valkey Search does not currently support cluster mode.

```bash
# Docker with search module
docker run -p 6379:6379 valkey/valkey:8 --loadmodule /usr/lib/valkey/modules/search.so
```

---

## Creating an Index

`queue.createJobIndex()` creates a Valkey Search index over this queue's job hashes. Base fields (name, state, timestamp, priority) are always included.

```typescript
import { Queue } from 'glide-mq';

const queue = new Queue('documents', { connection });

// Basic index (no vector field - adds a minimal placeholder)
await queue.createJobIndex();

// Index with a vector field for similarity search
await queue.createJobIndex({
  vectorField: {
    name: 'embedding',       // hash field name where vectors are stored
    dimensions: 1536,        // must match your embedding model
    algorithm: 'HNSW',       // 'HNSW' (default) or 'FLAT'
    distanceMetric: 'COSINE', // 'COSINE' (default), 'L2', or 'IP'
  },
});

// Index with additional schema fields
await queue.createJobIndex({
  fields: [
    { type: 'TAG', name: 'category' },
    { type: 'NUMERIC', name: 'score' },
    { type: 'TEXT', name: 'title' },
  ],
  vectorField: {
    name: 'embedding',
    dimensions: 768,
    distanceMetric: 'COSINE',
  },
});
```

### The `JobIndexOptions` interface

```typescript
interface JobIndexOptions {
  name?: string;           // Index name. Default: '{queueName}-idx'
  fields?: Field[];        // Additional schema fields
  vectorField?: {
    name: string;          // Hash field for the vector
    dimensions: number;    // Vector dimensionality
    algorithm?: 'HNSW' | 'FLAT';  // Default: 'HNSW'
    distanceMetric?: 'COSINE' | 'L2' | 'IP';  // Default: 'COSINE'
  };
  createOptions?: IndexCreateOptions;  // Pass-through to FT.CREATE
}
```

**Auto-included base fields** (always indexed):

| Field | Type | Description |
|-------|------|-------------|
| `name` | TAG | Job name |
| `state` | TAG | Job state (waiting, active, completed, failed, delayed) |
| `timestamp` | NUMERIC | Job creation timestamp |
| `priority` | NUMERIC | Job priority |

---

## Storing Vectors

Use `job.storeVector()` to write an embedding to a job's hash field. The vector is stored as a raw Float32Array buffer compatible with Valkey Search indexing.

```typescript
// After adding a job
const job = await queue.add('document', {
  title: 'Introduction to Message Queues',
  content: '...',
});

// Generate embedding (using your preferred model)
const embedding = await openai.embeddings.create({
  model: 'text-embedding-3-small',
  input: job.data.content,
});

// Store the vector
await job.storeVector('embedding', embedding.data[0].embedding);
```

The `field` parameter must match the `vectorField.name` used when creating the index.

---

## Searching by Similarity

`queue.vectorSearch()` performs KNN (K-Nearest Neighbors) search over indexed jobs.

```typescript
// Generate a query embedding
const queryEmbedding = await embed('How do message queues work?');

// Search for similar jobs
const results = await queue.vectorSearch(queryEmbedding, {
  k: 10,                        // return top 10 matches
  filter: '@state:{completed}', // only search completed jobs
});

for (const { job, score } of results) {
  console.log(`[${score.toFixed(3)}] ${job.name}: ${job.data.title}`);
}
```

### The `VectorSearchOptions` interface

```typescript
interface VectorSearchOptions {
  indexName?: string;     // Default: '{queueName}-idx'
  k?: number;            // Number of neighbours. Default: 10
  filter?: string;       // Pre-filter expression. Default: '*' (no filter)
  returnFields?: string[]; // Fields to return from search results
  scoreField?: string;   // Score field name in results. Default: '__score'
  searchOptions?: SearchQueryOptions;  // Pass-through to FT.SEARCH
}
```

### The `VectorSearchResult` interface

```typescript
interface VectorSearchResult<D, R> {
  job: Job<D, R>;   // The full hydrated Job object
  score: number;    // Distance/similarity score
}
```

Score interpretation depends on the distance metric:
- **COSINE**: 0 = identical, 2 = opposite (lower is more similar)
- **L2**: 0 = identical (lower is more similar)
- **IP** (inner product): higher is more similar

---

## Pre-Filtering

The `filter` parameter accepts Valkey Search query syntax. Filters are applied before the KNN search, reducing the candidate set.

```typescript
// Only completed jobs
const results = await queue.vectorSearch(embedding, {
  filter: '@state:{completed}',
});

// Only jobs named 'document' with priority < 5
const results = await queue.vectorSearch(embedding, {
  filter: '@name:{document} @priority:[0 5]',
});

// Tag filter on a custom field
const results = await queue.vectorSearch(embedding, {
  filter: '@category:{ml|ai}',
});

// No filter (search all indexed jobs)
const results = await queue.vectorSearch(embedding, {
  filter: '*',
});
```

---

## Index Schema Options

### Supported field types

| Type | Example | Use case |
|------|---------|----------|
| `TAG` | `{ type: 'TAG', name: 'category' }` | Exact-match filtering (`@category:{ml}`) |
| `NUMERIC` | `{ type: 'NUMERIC', name: 'score' }` | Range queries (`@score:[80 100]`) |
| `TEXT` | `{ type: 'TEXT', name: 'title' }` | Full-text search (`@title:queue`) |
| `VECTOR` | See `vectorField` option | KNN similarity search |

### Algorithm comparison

| | HNSW | FLAT |
|---|---|---|
| **Speed** | Fast approximate KNN | Exact brute-force KNN |
| **Memory** | Higher (builds a graph) | Lower (stores raw vectors) |
| **Accuracy** | Approximate (tunable) | Exact |
| **Best for** | Large datasets (>10K vectors) | Small datasets, exact results |

---

## Dropping an Index

Remove the index without affecting the underlying job hashes.

```typescript
// Drop the default index
await queue.dropJobIndex();

// Drop a named index
await queue.dropJobIndex('my-custom-index');
```

---

## Testing Mode

`TestQueue` supports `createJobIndex`, `storeVector`, and `vectorSearch` in-memory for testing without Valkey Search.

```typescript
import { TestQueue, TestWorker } from 'glide-mq/testing';

const queue = new TestQueue('docs');
const worker = new TestWorker(queue, async (job) => {
  await job.storeVector('embedding', [0.1, 0.2, 0.3]);
  return { indexed: true };
});

await queue.add('doc', { title: 'Test' });

// In-memory vector search uses cosine similarity
const results = await queue.vectorSearch([0.1, 0.2, 0.3], {
  k: 5,
});
```

Note: in-memory vector search uses cosine similarity and does not support the full Valkey Search query syntax for pre-filters. Use integration tests with a real Valkey instance for full filter testing.
