# Function: setTracer()

```ts
function setTracer(tracer): void;
```

Defined in: [glide-mq/src/telemetry.ts:72](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/telemetry.ts#L72)

Allow the user to supply their own tracer instance.
If not called, the tracer is auto-resolved from @opentelemetry/api.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `tracer` | `unknown` |

## Returns

`void`
