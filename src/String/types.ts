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
};

/**
 * @param code - unique code that identifies the error.
 * @param description - human readable error description
 */
export type MaskErrorString = {
  code: MaskStringErrorCodes;
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
export type ResultString = {
  value: string;
  original: string;
  hasErrors: boolean;
  isValid: boolean;
  prefix?: string;
  suffix?: string;
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

export enum MaskStringErrorCodes {
  mws_ms_0000 = 'mws_ms_0000', // No Error
  mws_ms_0001 = 'mws_ms_0001',
}
