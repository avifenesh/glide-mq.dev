# Function: compileSubjectMatcher()

```ts
function compileSubjectMatcher(patterns): ((subject) => boolean) | null;
```

Defined in: [glide-mq/src/utils.ts:850](https://github.com/avifenesh/glide-mq/blob/8549c9d107cc7d61894a77c728c6336ae29eed82/src/utils.ts#L850)

Compile an array of subject patterns into a single matcher function.
Returns a function that returns true if the subject matches any pattern.
Returns null if patterns is empty or undefined (no filtering).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `patterns` | `string`[] \| `undefined` |

## Returns

((`subject`) => `boolean`) \| `null`
