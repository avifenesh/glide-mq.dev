# Function: setTracer()

```ts
function setTracer(tracer): void;
```

Defined in: [glide-mq/src/telemetry.ts:72](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/telemetry.ts#L72)

Allow the user to supply their own tracer instance.
If not called, the tracer is auto-resolved from @opentelemetry/api.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `tracer` | `unknown` |

## Returns

`void`
