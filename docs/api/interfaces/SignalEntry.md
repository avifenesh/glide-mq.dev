# Interface: SignalEntry

Defined in: [glide-mq/src/types.ts:750](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L750)

A signal entry delivered to a suspended job on resume.

## Properties

### data

```ts
data: any;
```

Defined in: [glide-mq/src/types.ts:754](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L754)

Arbitrary signal payload (deserialized from JSON).

***

### name

```ts
name: string;
```

Defined in: [glide-mq/src/types.ts:752](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L752)

Signal name (e.g. 'approve', 'reject').

***

### receivedAt

```ts
receivedAt: number;
```

Defined in: [glide-mq/src/types.ts:756](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/types.ts#L756)

Epoch ms when the signal was received.
