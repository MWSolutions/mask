import { MaskString } from './mask-string';
import { expect, it } from 'vitest';
import { OptionsString } from './types';

it('should return abcd', () => {
  const options: OptionsString = { mask: 'SSSS' };
  const value = 'abcd';

  const result = MaskString.convertString(value, options);
  expect(result.value.converted).toBe('abcd');
  expect(result.hasErrors).toBe(false);
  expect(result.isValid).toBe(true);
});

it('should return ABCD', () => {
  const options: OptionsString = { mask: 'AAAA' };
  const value = 'abcd';

  const result = MaskString.convertString(value, options);
  expect(result.value.converted).toBe('ABCD');
  expect(result.hasErrors).toBe(false);
  expect(result.isValid).toBe(true);
});

it('should return abcd', () => {
  const options: OptionsString = { mask: 'aaaa' };
  const value = 'ABCD';

  const result = MaskString.convertString(value, options);
  expect(result.value.converted).toBe('abcd');
  expect(result.isValid).toBe(true);
});
