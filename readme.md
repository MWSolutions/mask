# Mask

![GitHub package.json version](https://img.shields.io/github/package-json/v/mwsolutions/mask)

## MaskString

### Description

- Converts a string via a mask
- Available has function or as object

```ts
import { MaskString } from 'mask';

// Function call
const result = StringMask.convert('abcd', { mask: 'AAAA' }); // value and object with options
console.log(result.original); // 'abcd'
console.log(result.value); // 'ABCD'
console.log(result.isValid); // true
console.log(result.hasErrors); // false

// variable
const variable = new StringMask('abcd', { mask: 'AAAA' }); // value and object with options,
console.log(variable.original); // 'abcd'
console.log(variable.value); // 'ABCD'
console.log(variable.isValid); // true
console.log(variable.hasErrors); // false
console.log(variable.result); // same output as via function call
console.log(variable.errors); // [], array with object containing information about errors during conversion
console.log(variable.prefix); // undefined, if prefix is added via the options, this property contains the prefix
console.log(variable.suffix); // undefined, if suffix is added via the options, this property contains the suffix
variable.value = 'efgh'; // set a new value, console.log(variable.value) -> 'EFGH'
```

- possible options

```js
options = {
    mask: string;
    prefix?: string;
    suffix?: string;
}
```

- result (result of property result if variable, return value of method convertString)

```js
options = {
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

### Available masks

| Mask | available characters  | conversion |
| ---- | --------------------- | ---------- |
| #    | digit                 | none       |
| S    | a-z, A-Z              | none       |
| N    | a-z A-Z 0-9           | none       |
| A    | a-z A-Z               | upercase   |
| a    | a-z A-Z               | lowercase  |
| X    | a-z A-Z 0-9           | upercase   |
| x    | a-z A-Z 0-9           | lowercase  |
| !    | escape next character | none       |

#### Custom masks

- it's possible to define your own masks

```js
const extraMask = { F: { pattern: /[0-9a-fA-F]/, transform: (v: string) => v.toUpperCase() } };
```

- Characters not listed in table (or defined as custom masks) are placed in the result of the conversion

## MaskNumber

### Description

- Converts a number (type number or string) via a mask (result is always a string)
- Available has function or as object

```ts
import { MaskNumber } from 'mask';

// Function call
const result = StringNumber.convert(1234, { mask: '####' }); // value and object with options
console.log(result.original); // 1234
console.log(result.value); // '1234'
console.log(result.isValid); // true
console.log(result.hasErrors); // false

// variable
const variable = new StringMask(1234, { mask: '####' }); // value and object with options,
console.log(variable.original); // 1234
console.log(variable.value); // '1234'
console.log(variable.isValid); // true
console.log(variable.hasErrors); // false
console.log(variable.result); // same output as via function call
console.log(variable.errors); // [], array with object containing information about errors during conversion
console.log(variable.prefix); // undefined, if prefix is added via the options, this property contains the prefix
console.log(variable.suffix); // undefined, if suffix is added via the options, this property contains the suffix
variable.value = 4789; // set a new value, console.log(variable.value) -> '4789'
```

- possible options

```js
options = {
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

```js
options = {
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

### Available masks

| Mask | available characters                                                             |
| ---- | -------------------------------------------------------------------------------- |
| #    | digit                                                                            |
| 9    | same as # except when not given replaced by 0                                    |
| T    | result must include the thousandseparator (may be placed everywhere in the mask) |
| D    | place of the decimal sign                                                        |
