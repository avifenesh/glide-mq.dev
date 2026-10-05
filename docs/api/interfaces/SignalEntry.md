# Interface: SignalEntry

Defined in: [glide-mq/src/types.ts:740](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L740)

A signal entry delivered to a suspended job on resume.

## Properties

### data

```ts
data: any;
```

Defined in: [glide-mq/src/types.ts:744](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L744)

Arbitrary signal payload (deserialized from JSON).

***

### name

```ts
name: string;
```

Defined in: [glide-mq/src/types.ts:742](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L742)

Signal name (e.g. 'approve', 'reject').

***

### receivedAt

```ts
receivedAt: number;
```

Defined in: [glide-mq/src/types.ts:746](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/types.ts#L746)

Epoch ms when the signal was received.
