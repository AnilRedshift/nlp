import tenseId, { convertArgs } from './tenseId';
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

  test('first arg is [PRESENT, 1, SINGULAR]', () => {
    expect(convertArgs([c.PRESENT, 1, c.SINGULAR])).toEqual({
      tense: c.PRESENT,
      person: 1,
      number: c.SINGULAR,
      mood: c.INDICATIVE,
      aspect: c.IMPERFECTIVE,
      negated: false,
    });
  });

  test('empty kwargs', () => {
    expect(convertArgs({})).toEqual({
      tense: c.INFINITIVE,
      person: null,
      number: null,
      mood: null,
      aspect: null,
      negated: false,
    });
  });

  test('kwargs overrides args', () => {
    expect(convertArgs(c.PRESENT, { tense: c.PAST })).toEqual({
      tense: c.PAST,
      person: 3,
      number: c.SINGULAR,
      mood: c.INDICATIVE,
      aspect: c.IMPERFECTIVE,
      negated: false,
    });
  });

  test('use args if no kwargs', () => {
    expect(convertArgs(c.PRESENT, 2, c.PLURAL, c.IMPERATIVE, c.PERFECTIVE, true)).toEqual({
      tense: c.PRESENT,
      person: 2,
      number: c.PLURAL,
      mood: c.IMPERATIVE,
      aspect: c.PERFECTIVE,
      negated: true,
    });
  });

  test('0 person becomes null', () => {
    expect(convertArgs({ person: 0 }).person).toBe(null);
  });

  test('fix perfective mood', () => {
    expect(convertArgs({ mood: c.PERFECTIVE })).toMatchObject({
      mood: c.INDICATIVE,
      aspect: c.PERFECTIVE,
    });
  });

  test('fix imperfective mood', () => {
    expect(convertArgs({ mood: c.IMPERFECTIVE })).toMatchObject({
      mood: c.INDICATIVE,
      aspect: c.IMPERFECTIVE,
    });
  });

  test('fix imperfect tense', () => {
    expect(convertArgs({ tense: c.IMPERFECT })).toMatchObject({
      tense: c.PAST,
      aspect: c.IMPERFECTIVE,
    });
  });

  test('fix preterite tense', () => {
    expect(convertArgs({ tense: c.PRETERITE })).toMatchObject({
      tense: c.PAST,
      aspect: c.PERFECTIVE,
    });
  });

  test('fix continuous aspect', () => {
    expect(convertArgs({ aspect: c.CONTINUOUS })).toMatchObject({
      aspect: c.PROGRESSIVE,
    });
  });

  test('conditional tense and indicative mood', () => {
    expect(convertArgs({ tense: c.CONDITIONAL, mood: c.INDICATIVE })).toMatchObject({
      tense: c.PRESENT,
      mood: c.CONDITIONAL,
    });
  });

  describe('tenseId', () => {
    test('infinitive', () => {
      expect(tenseId(c.INFINITIVE)).toBe(0);
    });

    test('combo w/negated false', () => {
      const id = tenseId({
        tense: c.PRESENT,
        person: 3,
        number: c.SINGULAR,
        mood: c.INDICATIVE,
        aspect: c.IMPERFECTIVE,
        negated: false,
      });
      expect(id).toBe(3);
    });

    test('combo w/negated true', () => {
      const id = tenseId({
        tense: c.PRESENT,
        person: 3,
        number: c.SINGULAR,
        mood: c.INDICATIVE,
        aspect: c.IMPERFECTIVE,
        negated: true,
      });
      expect(id).toBe(11);
    });
  });
});
