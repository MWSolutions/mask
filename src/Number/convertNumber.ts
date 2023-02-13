import { OptionsNumber, ResultNumber, MaskNumberErrorCodes, MaskErrorNumber } from './types';
import isNumeric from 'voca/is_numeric';
import isDigit from 'voca/is_digit';
import padRight from 'voca/pad_right';

function reverseString(input: string): string {
  return input.split('').reverse().join('');
}

export function convertNumber(value: string, options: OptionsNumber): ResultNumber {
  let result = '';
  const errors: MaskErrorNumber[] = [];
  const resultValue: ResultNumber = { value: '', original: value, hasErrors: false, isValid: true, errors: errors };
  let mask = reverseString(options.mask);
  let decimalSeparator: string | undefined;
  let thousandSeparator: string | undefined;

  value = value.replace(',', '.');
  let tempValue = reverseString(value);

  // Define separators
  if ('i18n' in options) {
    decimalSeparator = options.i18n?.decimalSign;
    thousandSeparator = options.i18n?.thousandSeparator;
  } else {
    decimalSeparator = '.';
    thousandSeparator = ',';
  }
  // Check mask against dataType, set mask if needed
  if (!isNumeric(value)) {
    errors.push({ code: MaskNumberErrorCodes.mws_mn_0001, description: 'value "' + value + '" is not a numeric value' });
  } else {
    const thousandSignPlacesMask = mask.indexOf('T');
    let decimalPlacesMask = mask.indexOf('D');
    if (thousandSignPlacesMask >= 0 && thousandSignPlacesMask < decimalPlacesMask) {
      decimalPlacesMask--;
    }
    const decimalPlacesValue = tempValue.indexOf('.');

    if (decimalPlacesValue >= 0 && decimalPlacesMask === -1) {
      errors.push({
        code: MaskNumberErrorCodes.mws_mn_0003,
        description: 'value "' + value + '" contains a decimal part, mask doesn\'t contains a decimal placeholder',
      });
    }
    // less decimal places in mask than in value -> round value to decimal places in mask
    //    if (decimalPlacesMask >= 0 && decimalPlacesValue >= 0 && decimalPlacesMask !== decimalPlacesValue) {
    if (decimalPlacesMask >= 0 && decimalPlacesMask !== decimalPlacesValue) {
      tempValue =
        '' + (Math.round(+value * Math.pow(10, decimalPlacesMask)) / Math.pow(10, decimalPlacesMask)).toFixed(decimalPlacesMask);
      tempValue = reverseString(tempValue);
    }
    // Decimal places in mask
    // Add extra # to the integer part of the mask depending to the length of value
    mask = padRight(mask, value.length + 5, '#');
    if (errors.length === 0) {
      // Loop through mask
      let valueCounter = 0;
      let decimalSignAdded = false;
      let thousandSignCounter = 0;
      for (let maskCounter = 0; maskCounter < mask.length; maskCounter++) {
        switch (mask[maskCounter]) {
          case '#':
          case '9':
            if (isDigit(tempValue[valueCounter])) {
              result = result + tempValue[valueCounter];
              valueCounter++;
            } else {
              if (
                mask[maskCounter] === '9' ||
                (decimalPlacesMask >= 0 && !decimalSignAdded) ||
                result[result.length - 1] === decimalSeparator
              ) {
                result = result + '0';
              }
            }
            if (thousandSignPlacesMask >= 0 && (decimalSignAdded || decimalPlacesMask === -1)) {
              thousandSignCounter++;
              if (thousandSignCounter >= 3 && valueCounter < tempValue.length) {
                result = result + thousandSeparator;
                thousandSignCounter = 0;
              }
            }
            break;
          case 'D':
            result = result + decimalSeparator;
            if (tempValue[valueCounter] === '.' || tempValue[valueCounter] === ',') {
              valueCounter++;
            }
            decimalSignAdded = true;
            break;
          case 'T':
            if (tempValue[valueCounter] === '.' || tempValue[valueCounter] === ',') {
              valueCounter++;
            }
            break;
          default:
            errors.push({
              code: MaskNumberErrorCodes.mws_mn_0002,
              description: 'Invalid mask "' + mask[maskCounter] + '" for numeric data only #, 9, T and D are allowed',
            });
        }
      }
    }
  }
  result = reverseString(result);
  if ('prefix' in options) {
    result = options.prefix + result;
    resultValue.prefix = options.prefix;
  }
  if ('suffix' in options) {
    result = result + options.suffix;
    resultValue.suffix = options.suffix;
  }
  resultValue.value = errors.length === 0 ? result : '';
  resultValue.hasErrors = errors.length > 0;
  resultValue.isValid = errors.length === 0;
  return resultValue;
}
