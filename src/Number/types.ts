/**
 * @param decimalSign - Character that must be used as decimal sign
 * @param thousandSeparator - Character that must be used as thousand separator
 */
export type I18nNumber = {
  decimalSign: string;
  thousandSeparator: string;
};

/**
 * @param mask - Character that must be used as decimal sign
 * @param prefix - Character that must be used as thousand separator (optional)
 * @param suffix - Character that must be used as thousand separator (optional)
 * @param i18n - See {@link I18nNumber} for details (optional)
 */
export type OptionsNumber = {
  mask: string;
  prefix?: string;
  suffix?: string;
  /**
   * @See {@link i18n} for details (optional)
   */
  i18n?: I18nNumber;
};

/**
 * @param code - unique code that identifies the error.
 * @param description - human readable error description
 */
export type MaskErrorNumber = {
  code: MaskNumberErrorCodes;
  description: string;
};

/**
 * @param value - Converted input value, if there were errors converting the input value than this value contains an empty string
 * @param original - Input value
 * @param hasErrors - true if there were errors converting the input string
 * @param isValid - true if converting the input string was a success
 * @param prefix - Prefix is added in fromt of the the converted value (only if there were no errors converting the input value) (optional)
 * @param suffix - Suffix is added at the end of the the converted value (only if there were no errors converting the input value) (optional)
 * @param errors - If there were errors converting the input string, this array contains the errors. See {@link MaskErrorString} for details
 */
export type ResultNumber = {
  value: string;
  original: number | string;
  hasErrors: boolean;
  isValid: boolean;
  prefix?: string;
  suffix?: string;
  /**
   * @See {@link MaskErrorNumber} for details
   */
  errors: MaskErrorNumber[];
};

/**
 * @param pattern - Regular expression that is be used to check if the input is valid
 * @param transform - Function that is executed after the regular expression is checked with success (optional)
 */
export type TokenString = {
  pattern: RegExp;
  transform?: (v: string) => string;
};

/**
 * @param escape - if true, the mask character linked is a escape character, meaning the next character is used as character and not as a mask
 */
export type EscapeString = {
  escape: boolean;
};

export enum MaskNumberErrorCodes {
  mws_mn_0000 = 'mws_mn_0000', // No Error
  mws_mn_0001 = 'mws_mn_0001',
  mws_mn_0002 = 'mws_mn_0002',
  mws_mn_0003 = 'mws_mn_0003',
}
