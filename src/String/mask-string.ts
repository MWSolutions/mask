import { OptionsString, ResultString, MaskErrorString, TokenString, EscapeString } from './types';
import { convertString } from './convertString';

/**
 * @See {@link MaskString} for details
 */
export class MaskString {
  private _result: ResultString = {
    value: '',
    original: '',
    hasErrors: false,
    isValid: false,
    errors: [],
  };

  /**
   *
   * @param value - Input string (string that must be converted)
   * @param options - Options that were used to do the coversion. See {@link OptionsString} for details
   * @param extraMasks - If you want to define your own masks, you can add them here. This a record containing a key value pair of a string and a value of type {@link TokenString} or {@link EscapeString} (optional)
   */
  constructor(
    value: string,
    private options: OptionsString,
    private extraMasks: Record<string, TokenString | EscapeString> | undefined = undefined,
  ) {
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
  set value(value: string) {
    this.setValue(value);
  }

  /**
   * @returns the original value
   */
  get original(): string {
    return this._result.original;
  }

  /**
   * @returns the input value, converted value, errors ... See {@link ResultString} for details
   */
  get result(): ResultString {
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
   * @returns an array with errors during converting. See {@link MaskErrorString} for details
   */
  get errors(): MaskErrorString[] {
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

  private setValue(value: string) {
    this._result = MaskString.convertString(value, this.options, this.extraMasks);
  }

  /**
   * @param value - value that must be converted with a mask (options.mask).
   * @param options - options contains different options for the conversion (eg. the mask, see OptionsString type for all options)
   * @returns See ResultString type for available data
   */
  static convertString(
    value: string,
    options: OptionsString,
    extraMasks: Record<string, TokenString | EscapeString> | undefined = undefined,
  ): ResultString {
    return convertString(value, options, extraMasks);
  }
}
