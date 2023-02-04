# Mask

![GitHub package.json version](https://img.shields.io/github/package-json/v/mwsolutions/mask)

## MaskString

### Description

- Converts a string via a mask
- Available has function or as object

```ts
import { MaskString } from 'mask';

// Function call
const result = StringMask.convertString('abcd', { mask: 'AAAA' }); // value and object with options
console.log(result.original); // abcd
console.log(result.value); // ABCD
console.log(result.isValid); // true
console.log(result.hasErrors); // false

// variable
const variable = new StringMask('abcd', { mask: 'AAAA' }); // value and object with options,
console.log(variable.original); // abcd
console.log(variable.value); // ABCD
console.log(variable.isValid); // true
console.log(variable.hasErrors); // false
console.log(variable.result); // same output as via function call
console.log(variable.errors); // [], array with object containing information about errors during conversion
console.log(variable.prefix); // undefined, if prefix is added via the options, this property contains the prefix
console.log(variable.suffix); // undefined, if suffix is added via the options, this property contains the suffix
variable.value = 'efgh'; // set a new value, console.log(variable.value) -> EFGH
```

- possible options

```json
{
    mask: string;
    prefix?: string;
    suffix?: string;
    i18n?: {
        decimalSign: string;
        thousandSeparator: string;
    }
}
```

- result (result of property result if variable, return value of method convertString)

```json
{
    value: string;
    original: string;
    hasErrors: boolean;
    isValid: boolean;
    prefix?: string;
    suffix?: string;
    errors: [{
        code: MaskStringErrorCodes;
        description: string;
    }];
  };
```
