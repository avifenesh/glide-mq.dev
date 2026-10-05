# Function: compileSubjectMatcher()

```ts
function compileSubjectMatcher(patterns): ((subject) => boolean) | null;
```

Defined in: [glide-mq/src/utils.ts:1306](https://github.com/avifenesh/glide-mq/blob/71138fa39675548394a9017a647cdff781c9c6a8/src/utils.ts#L1306)

Compile an array of subject patterns into a single matcher function.
Returns a function that returns true if the subject matches any pattern.
Returns null if patterns is empty or undefined (no filtering).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `patterns` | `string`[] \| `undefined` |

## Returns

((`subject`) => `boolean`) \| `null`
