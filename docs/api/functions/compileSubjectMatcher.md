# Function: compileSubjectMatcher()

```ts
function compileSubjectMatcher(patterns): ((subject) => boolean) | null;
```

Defined in: [glide-mq/src/utils.ts:850](https://github.com/avifenesh/glide-mq/blob/f6a5c7595ff743e61619f5819e55b798fd4c1306/src/utils.ts#L850)

Compile an array of subject patterns into a single matcher function.
Returns a function that returns true if the subject matches any pattern.
Returns null if patterns is empty or undefined (no filtering).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `patterns` | `string`[] \| `undefined` |

## Returns

((`subject`) => `boolean`) \| `null`
