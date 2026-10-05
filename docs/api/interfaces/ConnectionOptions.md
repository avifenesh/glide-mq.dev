# Interface: ConnectionOptions

Defined in: [glide-mq/src/types.ts:29](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L29)

Options for connecting to a Valkey/Redis server or cluster.

## Properties

### addresses

```ts
addresses: object[];
```

Defined in: [glide-mq/src/types.ts:30](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L30)

#### host

```ts
host: string;
```

#### port

```ts
port: number;
```

***

### clientAz?

```ts
optional clientAz?: string;
```

Defined in: [glide-mq/src/types.ts:49](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L49)

Availability zone of the client (e.g., 'us-east-1a').
Used with readFrom 'AZAffinity' or 'AZAffinityReplicasAndPrimary' to route
read commands to nodes in the same AZ, reducing cross-AZ latency and cost.

***

### clusterMode?

```ts
optional clusterMode?: boolean;
```

Defined in: [glide-mq/src/types.ts:33](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L33)

***

### credentials?

```ts
optional credentials?:
  | PasswordCredentials
  | IamCredentials;
```

Defined in: [glide-mq/src/types.ts:32](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L32)

***

### inflightRequestsLimit?

```ts
optional inflightRequestsLimit?: number;
```

Defined in: [glide-mq/src/types.ts:54](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L54)

Maximum concurrent in-flight requests per client connection.
Passed through to GLIDE. Default: 1000.

***

### readFrom?

```ts
optional readFrom?: ReadFrom;
```

Defined in: [glide-mq/src/types.ts:43](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L43)

Read strategy for the client. Controls how read commands are routed.
- 'primary': Always read from primary (default).
- 'preferReplica': Round-robin across replicas, fallback to primary.
- 'AZAffinity': Route reads to replicas in the same availability zone.
- 'AZAffinityReplicasAndPrimary': Route reads to any node in the same AZ.

AZ-based strategies require `clientAz` to be set.

***

### requestTimeout?

```ts
optional requestTimeout?: number;
```

Defined in: [glide-mq/src/types.ts:61](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L61)

Request timeout in milliseconds. Commands that exceed this timeout
throw a TimeoutError. Default: 500.
Increase for operations that may take longer (e.g. FT.CREATE with many existing keys,
FUNCTION LOAD with large libraries).

***

### useTLS?

```ts
optional useTLS?: boolean;
```

Defined in: [glide-mq/src/types.ts:31](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L31)
