# Function: matchSubject()

```ts
function matchSubject(pattern, subject): boolean;
```

Defined in: [glide-mq/src/utils.ts:827](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/utils.ts#L827)

Match a dot-separated subject against a pattern.
- `*` matches exactly one segment
- `>` matches one or more trailing segments (must be the last token)
- Literal tokens match exactly

## Parameters

| Parameter | Type |
| ------ | ------ |
| `pattern` | `string` |
| `subject` | `string` |

## Returns

`boolean`
