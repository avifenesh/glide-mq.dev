# Function: compileSubjectMatcher()

```ts
function compileSubjectMatcher(patterns): ((subject) => boolean) | null;
```

Defined in: [glide-mq/src/utils.ts:1431](https://github.com/avifenesh/glide-mq/blob/47c4d1bc1a43508382107c8029ffd4a6304d342c/src/utils.ts#L1431)

Compile an array of subject patterns into a single matcher function.
Returns a function that returns true if the subject matches any pattern.
Returns null if patterns is empty or undefined (no filtering).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `patterns` | `string`[] \| `undefined` |

## Returns

((`subject`) => `boolean`) \| `null`
