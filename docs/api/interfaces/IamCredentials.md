# Interface: IamCredentials

Defined in: [glide-mq/src/types.ts:14](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L14)

IAM authentication credentials for AWS ElastiCache/MemoryDB.

## Properties

### clusterName

```ts
clusterName: string;
```

Defined in: [glide-mq/src/types.ts:23](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L23)

The ElastiCache/MemoryDB cluster name.

***

### refreshIntervalSeconds?

```ts
optional refreshIntervalSeconds?: number;
```

Defined in: [glide-mq/src/types.ts:25](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L25)

Token refresh interval in seconds. Defaults to 300 (5 min).

***

### region

```ts
region: string;
```

Defined in: [glide-mq/src/types.ts:19](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L19)

AWS region (e.g. 'us-east-1').

***

### serviceType

```ts
serviceType: "elasticache" | "memorydb";
```

Defined in: [glide-mq/src/types.ts:17](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L17)

ElastiCache or MemoryDB.

***

### type

```ts
type: "iam";
```

Defined in: [glide-mq/src/types.ts:15](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L15)

***

### userId

```ts
userId: string;
```

Defined in: [glide-mq/src/types.ts:21](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/types.ts#L21)

The IAM user ID used for authentication. Maps to username in Valkey AUTH.
