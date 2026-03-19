# Function: matchSubject()

```ts
function matchSubject(pattern, subject): boolean;
```

Defined in: [glide-mq/src/utils.ts:826](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/utils.ts#L826)

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
