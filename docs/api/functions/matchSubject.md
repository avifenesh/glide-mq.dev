# Function: matchSubject()

```ts
function matchSubject(pattern, subject): boolean;
```

Defined in: [glide-mq/src/utils.ts:1408](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/utils.ts#L1408)

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
