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

  test('first arg is [present, participle]', () => {
    expect(convertArgs([c.PRESENT, c.PARTICIPLE])).toEqual({
      tense: c.PRESENT,
      person: null,
      number: null,
      mood: c.INDICATIVE,
      aspect: c.PROGRESSIVE,
      negated: false,
    });
  });

  test('first arg is [past, participle]', () => {
    expect(convertArgs([c.PAST, c.PARTICIPLE])).toEqual({
      tense: c.PAST,
      person: null,
      number: null,
      mood: c.INDICATIVE,
      aspect: c.PROGRESSIVE,
      negated: false,
    });
  });
});
