# Function: matchSubject()

```ts
function matchSubject(pattern, subject): boolean;
```

Defined in: [glide-mq/src/utils.ts:827](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/utils.ts#L827)

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
