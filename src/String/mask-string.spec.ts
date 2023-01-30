import { MaskString } from './mask-string';
import { expect, it, describe } from 'vitest';
import { OptionsString } from './types';

describe('MaskString.convertString', () => {
  it('should return 1234', () => {
    const options: OptionsString = { mask: '####' };
    const value = '1234';

    const result = MaskString.convertString(value, options);
    expect(result.value).toBe('1234');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return abcd', () => {
    const options: OptionsString = { mask: 'SSSS' };
    const value = 'abcd';

    const result = MaskString.convertString(value, options);
    expect(result.value).toBe('abcd');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return 1234abc', () => {
    const options: OptionsString = { mask: 'NNNNNNN' };
    const value = '1234abc';

    const result = MaskString.convertString(value, options);
    expect(result.value).toBe('1234abc');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return ABCD', () => {
    const options: OptionsString = { mask: 'AAAA' };
    const value = 'abcd';

    const result = MaskString.convertString(value, options);
    expect(result.value).toBe('ABCD');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return abcd', () => {
    const options: OptionsString = { mask: 'aaaa' };
    const value = 'ABCD';

    const result = MaskString.convertString(value, options);
    expect(result.value).toBe('abcd');
    expect(result.isValid).toBe(true);
    expect(result.hasErrors).toBe(false);
  });

  it('should return ABCD123', () => {
    const options: OptionsString = { mask: 'XXXXXXX' };
    const value = 'abcd123';

    const result = MaskString.convertString(value, options);
    expect(result.value).toBe('ABCD123');
    expect(result.hasErrors).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should return abcd123', () => {
    const options: OptionsString = { mask: 'xxxxxxx' };
    const value = 'ABCD123';

    const result = MaskString.convertString(value, options);
    expect(result.value).toBe('abcd123');
    expect(result.isValid).toBe(true);
    expect(result.hasErrors).toBe(false);
  });

  it('should return aAxXabcd', () => {
    const options: OptionsString = { mask: '!a!A!x!Xaaaa' };
    const value = 'ABCD';

    const result = MaskString.convertString(value, options);
    expect(result.value).toBe('aAxXabcd');
    expect(result.isValid).toBe(true);
    expect(result.hasErrors).toBe(false);
  });

  it('should return OFAF', () => {
    const options: OptionsString = { mask: 'FFFF' };
    const value = '0faf';
    const extraMask = { F: { pattern: /[0-9a-fA-F]/, transform: (v: string) => v.toLocaleUpperCase() } };

    const result = MaskString.convertString(value, options, extraMask);

    expect(result.value).toBe('0FAF');
    expect(result.isValid).toBe(true);
    expect(result.hasErrors).toBe(false);
  });

  it('should return bbabcd', () => {
    const options: OptionsString = { mask: 'bbSSSS' };
    const value = 'abcd';

    const result = MaskString.convertString(value, options);

    expect(result.value).toBe('bbabcd');
    expect(result.isValid).toBe(true);
    expect(result.hasErrors).toBe(false);
  });

  it('should return prefix_abcd', () => {
    const options: OptionsString = { mask: 'SSSS', prefix: 'prefix_' };
    const value = 'abcd';

    const result = MaskString.convertString(value, options);

    expect(result.value).toBe('prefix_abcd');
    expect(result.isValid).toBe(true);
    expect(result.hasErrors).toBe(false);
  });

  it('should return abcd_suffix', () => {
    const options: OptionsString = { mask: 'SSSS', suffix: '_suffix' };
    const value = 'abcd';

    const result = MaskString.convertString(value, options);

    expect(result.value).toBe('abcd_suffix');
    expect(result.isValid).toBe(true);
    expect(result.hasErrors).toBe(false);
  });

  it('should return abcd', () => {
    const options: OptionsString = { mask: 'SSSS' };
    const value = 'abcdef';

    const result = MaskString.convertString(value, options);

    expect(result.value).toBe('abcd');
    expect(result.isValid).toBe(true);
    expect(result.hasErrors).toBe(false);
  });

  it('should return an error', () => {
    const options: OptionsString = { mask: 'SSSS' };
    const value = '1234';

    const result = MaskString.convertString(value, options);

    expect(result.value).toBe('');
    expect(result.isValid).toBe(false);
    expect(result.hasErrors).toBe(true);
  });
});

describe('new Maskstring', () => {
  it('should return abcd', () => {
    const options: OptionsString = { mask: 'SSSS' };

    const variable = new MaskString('', options);
    variable.value = 'abcd';
    expect(variable.value).toBe('abcd');
    expect(variable.hasErrors).toBe(false);
    expect(variable.isValid).toBe(true);
    expect(variable.original).toBe('abcd');
    expect(variable.errors).toStrictEqual([]);
    expect(variable.prefix).toBeUndefined();
    expect(variable.suffix).toBeUndefined();
  });
});
