# Function: matchSubject()

```ts
function matchSubject(pattern, subject): boolean;
```

Defined in: [glide-mq/src/utils.ts:1283](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/utils.ts#L1283)

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
