# MaskString

## Description

- Converts a string via a mask
- Available has function or as object

```ts
import { MaskString } from 'mask';

const result = StringMask.convertString('abcd', { mask: 'AAAA' });
console.log(result.original); // abcd
console.log(result.value); // ABCD
console.log(result.isValid); // true
console.log(result.hasErrors); // false

const variable = new StringMask('abcd', { mask: 'AAAA' });
console.log(variable.original); // abcd
console.log(variable.value); // ABCD
console.log(variable.isValid); // true
console.log(variable.hasErrors); // false
```
