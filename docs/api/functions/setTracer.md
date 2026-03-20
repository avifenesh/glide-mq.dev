# Function: setTracer()

```ts
function setTracer(tracer): void;
```

Defined in: [glide-mq/src/telemetry.ts:72](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/telemetry.ts#L72)

Allow the user to supply their own tracer instance.
If not called, the tracer is auto-resolved from @opentelemetry/api.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `tracer` | `unknown` |

## Returns

`void`
