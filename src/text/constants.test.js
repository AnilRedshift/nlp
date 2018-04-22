import c from './constants';

describe('constants', () => {
  test('retrieve an existing constant', () => {
    expect(c.PAST).toBe('past');
  });

  test('rerieving a non-existant constant throws an exception', () => {
    expect(() => {
      c.NOTACONSTANT; // eslint-disable-line no-unused-expressions
    }).toThrow();
  });
});
