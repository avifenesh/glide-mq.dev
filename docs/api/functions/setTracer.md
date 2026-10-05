# Function: setTracer()

```ts
function setTracer(tracer): void;
```

Defined in: [glide-mq/src/telemetry.ts:72](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/telemetry.ts#L72)

Allow the user to supply their own tracer instance.
If not called, the tracer is auto-resolved from @opentelemetry/api.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `tracer` | `unknown` |

## Returns

`void`
