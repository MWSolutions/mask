import { OptionsString, ResultString, ResultValueString, MaskErrorString, TokenString, EscapeString } from './types';

export function convertString(
  value: string,
  options: OptionsString,
  extraMasks: Record<string, TokenString | EscapeString> | undefined = undefined,
): ResultString {
  const tokens: Record<string, TokenString | EscapeString> = {
    '#': { pattern: /\d/ },
    S: { pattern: /[a-zA-Z]/ },
    N: { pattern: /[0-9a-zA-Z]/ },
    A: { pattern: /[a-zA-Z]/, transform: (v: string) => v.toLocaleUpperCase() },
    a: { pattern: /[a-zA-Z]/, transform: (v: string) => v.toLocaleLowerCase() },
    X: { pattern: /[0-9a-zA-Z]/, transform: (v: string) => v.toLocaleUpperCase() },
    x: { pattern: /[0-9a-zA-Z]/, transform: (v: string) => v.toLocaleLowerCase() },
    '!': { escape: true },
  };
  const errors: MaskErrorString[] = [];
  const resultValue: ResultValueString = { original: value, converted: '' };

  if (typeof extraMasks !== 'undefined') {
    Object.assign(tokens, extraMasks);
  }

  const mask = options.mask;
  let maskCounter = 0;
  let valueCounter = 0;
  let converted = '';

  while (maskCounter < mask.length && valueCounter < value.length) {
    const masker = tokens[mask[maskCounter]];
    const valueChar = value[valueCounter];
    if (!masker) {
      converted = converted + mask[maskCounter];
      maskCounter++;
    } else {
      if ('pattern' in masker) {
        if (masker.pattern.test(valueChar)) {
          if (masker.transform !== undefined) {
            converted = converted + masker.transform(valueChar);
          } else {
            converted = converted + valueChar;
          }
          maskCounter++;
          valueCounter++;
        } else {
          errors.push({
            code: 'mws-sm-0001',
            description: 'Invalid value "' + valueChar + '" for mask "' + mask[maskCounter] + '"',
          });
          maskCounter = mask.length + 1;
        }
      }
      if ('escape' in masker) {
        maskCounter++;
        converted = converted + mask[maskCounter];
        maskCounter++;
      }
    }
  }

  if (options.prefix !== undefined) {
    converted = options.prefix + converted;
    resultValue.prefix = options.prefix;
  }
  if (options.suffix !== undefined) {
    converted = converted + options.suffix;
    resultValue.suffix = options.suffix;
  }

  resultValue.original = value;
  resultValue.converted = errors.length === 0 ? converted : '';

  return {
    value: resultValue,
    errors,
    hasErrors: errors.length > 0,
    isValid: errors.length === 0,
  };
}
