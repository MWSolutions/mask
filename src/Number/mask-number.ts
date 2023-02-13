import { OptionsNumber, ResultNumber, MaskErrorNumber } from './types';
import { convertNumber } from './convertNumber';

/**
 * @See {@link MaskNumber} for details
 */
export class MaskNumber {
  private _result: ResultNumber = {
    value: '',
    original: 0,
    hasErrors: false,
    isValid: false,
    errors: [],
  };

  /**
   *
   * @param value - Input of type number (number that must be converted)
   * @param options - Options that were used to do the coversion. See {@link OptionsNumber} for details
   * @param extraMasks - If you want to define your own masks, you can add them here. This a record containing a key value pair of a string and a value of type {@link TokenString} or {@link EscapeString} (optional)
   */
  constructor(value: number | string, private options: OptionsNumber) {
    this.setValue(value);
  }

  /**
   * @returns the converted value
   */
  get value(): string {
    return this.result.value;
  }

  /**
   * @param - set the input value
   */
  // type must contains string, is needed so getter can be of type string
  set value(value: number | string) {
    this.setValue(value);
  }

  /**
   * @returns the original value
   */
  get original(): number | string {
    return this._result.original;
  }

  /**
   * @returns the input value, converted value, errors ... See {@link ResultNumber} for details
   */
  get result(): ResultNumber {
    return this._result;
  }

  /**
   * @returns true if the conversion was a success
   */
  get isValid(): boolean {
    return this._result.isValid;
  }

  /**
   * @returns true if there are errors during converting, see property {@link errors} for the errors
   */
  get hasErrors(): boolean {
    return this._result.hasErrors;
  }

  /**
   * @returns an array with errors during converting. See {@link MaskErrorNumber} for details
   */
  get errors(): MaskErrorNumber[] {
    return this._result.errors;
  }

  /**
   * @returns prefix
   */
  get prefix(): string | undefined {
    return this._result.prefix;
  }

  /**
   * @returns suffix
   */
  get suffix(): string | undefined {
    return this._result.suffix;
  }

  private setValue(value: number | string) {
    this._result = MaskNumber.convert(value, this.options);
  }

  /**
   * @param value - value that must be converted with a mask (options.mask).
   * @param options - options contains different options for the conversion (eg. the mask, see OptionsString type for all options)
   * @returns See ResultString type for available data
   */
  static convert(value: number | string, options: OptionsNumber): ResultNumber {
    if (typeof value === 'string') {
      return convertNumber(value, options);
    } else {
      return convertNumber(value.toString(), options);
    }
  }
}
