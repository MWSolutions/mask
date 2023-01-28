/**
 * @param decimalSign - Character that must be used as decimal sign
 * @param thousandSeparator - Character that must be used as thousand separator
 */
export type I18nString = {
  decimalSign: string;
  thousandSeparator: string;
};

/**
 * @param mask - Character that must be used as decimal sign
 * @param prefix - Character that must be used as thousand separator (optional)
 * @param suffix - Character that must be used as thousand separator (optional)
 * @param i18n - See {@link I18nString} for details (optional)
 */
export type OptionsString = {
  mask: string;
  prefix?: string;
  suffix?: string;
  /**
   * @See {@link i18n} for details (optional)
   */
  i18n?: I18nString;
};

/**
 * @param code - unique code that identifies the error.
 * @param description - human readable error description
 */
export type MaskErrorString = {
  code: string;
  description: string;
};

/**
 * @param original - Input value
 * @param converted - Converted input value, if there were errors converting the input value than this value contains an empty string
 * @param prefix - Prefix is added in fromt of the the converted value (only if there were no errors converting the input value) (optional)
 * @param suffix - Suffix is added at the end of the the converted value (only if there were no errors converting the input value) (optional)
 */
export type ResultValueString = {
  original: string;
  converted: string;
  prefix?: string;
  suffix?: string;
};

/**
 * @param value - See {@link ResultValueString} for details
 * @param hasErrors - true if there were errors converting the input string
 * @param isValid - true if converting the input string was a success
 * @param errors - If there were errors converting the input string, this array contains the errors. See {@link MaskErrorString} for details
 */
export type ResultString = {
  /**
   * @See {@link ResultValueString} for details
   */
  value: ResultValueString;
  hasErrors: boolean;
  isValid: boolean;
  /**
   * @See {@link MaskErrorString} for details
   */
  errors: MaskErrorString[];
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
