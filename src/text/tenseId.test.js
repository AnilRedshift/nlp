import { convertArgs } from './tenseId';
import c from './constants';

describe('convertArgs', () => {
  test('with no arguments', () => {
    expect(convertArgs()).toEqual({
      tense: c.INFINITIVE,
      person: null,
      number: null,
      mood: null,
      aspect: null,
      negated: false,
    });
  });
});
