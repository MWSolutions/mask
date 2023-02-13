import { MaskNumber } from './mask-number';
import { expect, it, describe } from 'vitest';
import { OptionsNumber } from './types';

describe('MaskNumber.convert', () => {
  it('should return 1234', () => {
    const options: OptionsNumber = { mask: '####' };
    const value = '1234';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('1234');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return 12,34', () => {
    const options: OptionsNumber = { mask: '##D##', i18n: { decimalSign: ',', thousandSeparator: '.' } };
    const value = '12.34';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('12,34');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return 1.234,00', () => {
    const options: OptionsNumber = { mask: '##TD##', i18n: { decimalSign: ',', thousandSeparator: '.' } };
    const value = '1234';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('1.234,00');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return 12,337', () => {
    const options: OptionsNumber = { mask: '##D###', i18n: { decimalSign: ',', thousandSeparator: '.' } };
    const value = '12.3367';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('12,337');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return 12,110', () => {
    const options: OptionsNumber = { mask: '##D###', i18n: { decimalSign: ',', thousandSeparator: '.' } };
    const value = '12.11';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('12,110');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return 12,200', () => {
    const options: OptionsNumber = { mask: '##D###', i18n: { decimalSign: ',', thousandSeparator: '.' } };
    const value = '12.1999';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('12,200');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return 1.234,19', () => {
    const options: OptionsNumber = { mask: '####TD##', i18n: { decimalSign: ',', thousandSeparator: '.' } };
    const value = '1234.19';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('1.234,19');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return 1.234,19', () => {
    const options: OptionsNumber = { mask: '####DT##', i18n: { decimalSign: ',', thousandSeparator: '.' } };
    const value = '1234.19';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('1.234,19');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return 1.234,19', () => {
    const options: OptionsNumber = { mask: '#DT##', i18n: { decimalSign: ',', thousandSeparator: '.' } };
    const value = '1234.19';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('1.234,19');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return 234,19', () => {
    const options: OptionsNumber = { mask: '#DT##', i18n: { decimalSign: ',', thousandSeparator: '.' } };
    const value = '234.19';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('234,19');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return 1.234.567,19', () => {
    const options: OptionsNumber = { mask: '#DT##', i18n: { decimalSign: ',', thousandSeparator: '.' } };
    const value = '1234567.19';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('1.234.567,19');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return 123.456,19', () => {
    const options: OptionsNumber = { mask: '#DT##', i18n: { decimalSign: ',', thousandSeparator: '.' } };
    const value = '123456.19';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('123.456,19');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return 123.456,20', () => {
    const options: OptionsNumber = { mask: '#DT##', i18n: { decimalSign: ',', thousandSeparator: '.' } };
    const value = '123456.199';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('123.456,20');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return 123.456,20', () => {
    const options: OptionsNumber = { mask: '9DT99', i18n: { decimalSign: ',', thousandSeparator: '.' } };
    const value = '123456.199';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('123.456,20');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return 9', () => {
    const options: OptionsNumber = { mask: '#####', i18n: { decimalSign: ',', thousandSeparator: '.' } };
    const value = '9';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('9');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return 00009', () => {
    const options: OptionsNumber = { mask: '99999', i18n: { decimalSign: ',', thousandSeparator: '.' } };
    const value = '9';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('00009');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return 00009', () => {
    const options: OptionsNumber = { mask: '99999' };
    const value = '9';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('00009');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return 9,00', () => {
    const options: OptionsNumber = { mask: '#TD99', i18n: { decimalSign: ',', thousandSeparator: '.' } };
    const value = '9';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('9,00');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return 0,09', () => {
    const options: OptionsNumber = { mask: '9TD99', i18n: { decimalSign: ',', thousandSeparator: '.' } };
    const value = 0.09;

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('0,09');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return 0,09', () => {
    const options: OptionsNumber = { mask: '#TD##', i18n: { decimalSign: ',', thousandSeparator: '.' } };
    const value = '0.09';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('0,09');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return 0.09', () => {
    const options: OptionsNumber = { mask: '#TD##' };
    const value = '0,09';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('0.09');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return 0.99', () => {
    const options: OptionsNumber = { mask: '#TD##' };
    const value = '0,99';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('0.99');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return prefix_0,99_suffix', () => {
    const options: OptionsNumber = { mask: '#TD##', prefix: 'prefix_', suffix: '_suffix' };
    const value = '0.99';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('prefix_0.99_suffix');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return an error', () => {
    const options: OptionsNumber = { mask: '#TD##' };
    const value = 'aa9';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('');
    expect(result.hasErrors).toBe(true);
    expect(result.isValid).toBe(false);
  });

  it('should return an error', () => {
    const options: OptionsNumber = { mask: 'ABC' };
    const value = '9';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('');
    expect(result.hasErrors).toBe(true);
    expect(result.isValid).toBe(false);
  });

  it('should return an error', () => {
    const options: OptionsNumber = { mask: '####' };
    const value = '2,99';

    const result = MaskNumber.convert(value, options);
    expect(result.value).toBe('');
    expect(result.hasErrors).toBe(true);
    expect(result.isValid).toBe(false);
  });
});

describe('new MaskNumber', () => {
  it('should return 9999', () => {
    const options: OptionsNumber = { mask: '####' };

    const variable = new MaskNumber(0, options);
    variable.value = '9999';
    expect(variable.value).toBe('9999');
    expect(variable.hasErrors).toBe(false);
    expect(variable.isValid).toBe(true);
    expect(variable.original).toBe('9999');
    expect(variable.errors).toStrictEqual([]);
    expect(variable.prefix).toBeUndefined();
    expect(variable.suffix).toBeUndefined();
  });

  it('should return 0,09', () => {
    const options: OptionsNumber = { mask: '#TD##', i18n: { decimalSign: ',', thousandSeparator: '.' } };
    const value = '0.09';

    const variable = new MaskNumber(0, options);
    variable.value = value;
    expect(variable.value).toBe('0,09');
    expect(variable.hasErrors).toBe(false);
    expect(variable.isValid).toBe(true);
  });
});
