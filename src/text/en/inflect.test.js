import { singularize } from './inflect';

describe('singularize', () => {
  test('words ending in s should be singular', () => {
    expect(singularize('appointments')).toBe('appointment');
  });
});
