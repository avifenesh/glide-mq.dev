# Interface: ConnectionOptions

Defined in: [glide-mq/src/types.ts:28](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L28)

## Properties

### addresses

```ts
addresses: object[];
```

Defined in: [glide-mq/src/types.ts:29](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L29)

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

Defined in: [glide-mq/src/types.ts:48](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L48)

Availability zone of the client (e.g., 'us-east-1a').
Used with readFrom 'AZAffinity' or 'AZAffinityReplicasAndPrimary' to route
read commands to nodes in the same AZ, reducing cross-AZ latency and cost.

***

### clusterMode?

```ts
optional clusterMode?: boolean;
```

Defined in: [glide-mq/src/types.ts:32](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L32)

***

### credentials?

```ts
optional credentials?: 
  | PasswordCredentials
  | IamCredentials;
```

Defined in: [glide-mq/src/types.ts:31](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L31)

***

### inflightRequestsLimit?

```ts
optional inflightRequestsLimit?: number;
```

Defined in: [glide-mq/src/types.ts:53](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L53)

Maximum concurrent in-flight requests per client connection.
Passed through to GLIDE. Default: 1000.

***

### readFrom?

```ts
optional readFrom?: ReadFrom;
```

Defined in: [glide-mq/src/types.ts:42](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L42)

Read strategy for the client. Controls how read commands are routed.
- 'primary': Always read from primary (default).
- 'preferReplica': Round-robin across replicas, fallback to primary.
- 'AZAffinity': Route reads to replicas in the same availability zone.
- 'AZAffinityReplicasAndPrimary': Route reads to any node in the same AZ.

AZ-based strategies require `clientAz` to be set.

***

### useTLS?

```ts
optional useTLS?: boolean;
```

Defined in: [glide-mq/src/types.ts:30](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L30)
