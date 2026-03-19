# Function: setTracer()

```ts
function setTracer(tracer): void;
```

Defined in: [glide-mq/src/telemetry.ts:72](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/telemetry.ts#L72)

Allow the user to supply their own tracer instance.
If not called, the tracer is auto-resolved from @opentelemetry/api.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `tracer` | `unknown` |

## Returns

`void`
