import { singularize } from './inflect';

describe('singularize', () => {
  expect(singularize('appointments')).toBe('appointment');
});
