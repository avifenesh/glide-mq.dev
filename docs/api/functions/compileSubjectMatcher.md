# Function: compileSubjectMatcher()

```ts
function compileSubjectMatcher(patterns): ((subject) => boolean) | null;
```

Defined in: [glide-mq/src/utils.ts:849](https://github.com/avifenesh/glide-mq/blob/195fb052b319e67e504b78342e7d404036dba946/src/utils.ts#L849)

Compile an array of subject patterns into a single matcher function.
Returns a function that returns true if the subject matches any pattern.
Returns null if patterns is empty or undefined (no filtering).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `patterns` | `string`[] \| `undefined` |

## Returns

((`subject`) => `boolean`) \| `null`
