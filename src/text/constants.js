const INFINITIVE = 'infinitive';
const PRESENT = 'present';
const PAST = 'past';
const FUTURE = 'future';

const SINGULAR = 'singular';
const PLURAL = 'plural';

const INDICATIVE = 'indicative';
const IMPERATIVE = 'imperative';
const CONDITIONAL = 'conditional';
const SUBJUNCTIVE = 'subjunctive';

const IMPERFECTIVE = 'imperfective';
const PERFECTIVE = 'perfective';
const PROGRESSIVE = 'progressive';

const IMPERFECT = 'imperfect';
const PRETERITE = 'preterite';

const PARTICIPLE = 'participle';
const GERUND = 'gerund';

const CONTINUOUS = 'continuous';

const _ = null;
const SG = SINGULAR;
const PL = PLURAL;
const INF = INFINITIVE;
const PRES = PRESENT;
const PST = PAST;
const FUT = FUTURE;
const IND = INDICATIVE;
const IMP = IMPERATIVE;
const COND = CONDITIONAL;
const SJV = SUBJUNCTIVE;
const IPFV = IMPERFECTIVE;
const PFV = PERFECTIVE;
const PROG = PROGRESSIVE;
const TENSES = {
  [null]: [null, _, _, _, _, false, [null]], //       ENGLISH   SPANISH   GERMAN    DUTCH     FRENCH
  0: [INF, _, _, _, _, false, ['inf']], //       to be     ser       sein      zijn      être
  1: [PRES, 1, SG, IND, IPFV, false, ['1sg']], //     I am        soy       bin       ben       suis
  2: [PRES, 2, SG, IND, IPFV, false, ['2sg']], //   you are       eres      bist      bent      es
  3: [PRES, 3, SG, IND, IPFV, false, ['3sg']], // (s)he is        es        ist       is        est
  4: [PRES, 1, PL, IND, IPFV, false, ['1pl']], //    we are       somos     sind      zijn      sommes
  5: [PRES, 2, PL, IND, IPFV, false, ['2pl']], //   you are       sois      seid      zijn      êtes
  6: [PRES, 3, PL, IND, IPFV, false, ['3pl']], //  they are       son       sind      zijn      sont
  7: [PRES, _, PL, IND, IPFV, false, ['pl']], //       are
  8: [PRES, _, _, IND, PROG, false, ['part']], //       being     siendo              zijnd     étant
  9: [PRES, 1, SG, IND, IPFV, true, ['1sg-']], //     I am not
  10: [PRES, 2, SG, IND, IPFV, true, ['2sg-']], //   you aren't
  11: [PRES, 3, SG, IND, IPFV, true, ['3sg-']], // (s)he isn't
  12: [PRES, 1, PL, IND, IPFV, true, ['1pl-']], //    we aren't
  13: [PRES, 2, PL, IND, IPFV, true, ['2pl-']], //   you aren't
  14: [PRES, 3, PL, IND, IPFV, true, ['3pl-']], //  they aren't
  15: [PRES, _, PL, IND, IPFV, true, ['pl-']], //       aren't
  16: [PRES, _, _, IND, IPFV, true, ['-']], //       isn't
  17: [PST, 1, SG, IND, IPFV, false, ['1sgp']], //     I was       era       war       was       étais
  18: [PST, 2, SG, IND, IPFV, false, ['2sgp']], //   you were      eras      warst     was       étais
  19: [PST, 3, SG, IND, IPFV, false, ['3sgp']], // (s)he was       era       war       was       était
  20: [PST, 1, PL, IND, IPFV, false, ['1ppl']], //    we were      éramos    waren     waren     étions
  21: [PST, 2, PL, IND, IPFV, false, ['2ppl']], //   you were      erais     wart      waren     étiez
  22: [PST, 3, PL, IND, IPFV, false, ['3ppl']], //  they were      eran      waren     waren     étaient
  23: [PST, _, PL, IND, IPFV, false, ['ppl']], //       were
  24: [PST, _, _, IND, PROG, false, ['ppart']], //       been      sido      gewesen   geweest   été
  25: [PST, _, _, IND, IPFV, false, ['p']], //       was
  26: [PST, 1, SG, IND, IPFV, true, ['1sgp-']], //     I wasn't
  27: [PST, 2, SG, IND, IPFV, true, ['2sgp-']], //   you weren't
  28: [PST, 3, SG, IND, IPFV, true, ['3sgp-']], // (s)he wasn't
  29: [PST, 1, PL, IND, IPFV, true, ['1ppl-']], //    we weren't
  30: [PST, 2, PL, IND, IPFV, true, ['2ppl-']], //   you weren't
  31: [PST, 3, PL, IND, IPFV, true, ['3ppl-']], //  they weren't
  32: [PST, _, PL, IND, IPFV, true, ['ppl-']], //       weren't
  33: [PST, _, _, IND, IPFV, true, ['p-']], //       wasn't
  34: [PST, 1, SG, IND, PFV, false, ['1sg+']], //     I           fui                           fus
  35: [PST, 2, SG, IND, PFV, false, ['2sg+']], //   you           fuiste                        fus
  36: [PST, 3, SG, IND, PFV, false, ['3sg+']], // (s)he           fue                           fut
  37: [PST, 1, PL, IND, PFV, false, ['1pl+']], //    we           fuimos                        fûmes
  38: [PST, 2, PL, IND, PFV, false, ['2pl+']], //   you           fuisteis                      fûtes
  39: [PST, 3, PL, IND, PFV, false, ['3pl+']], //  they           fueron                        furent
  40: [FUT, 1, SG, IND, IPFV, false, ['1sgf']], //     I           seré                          serai
  41: [FUT, 2, SG, IND, IPFV, false, ['2sgf']], //   you           serás                         seras
  42: [FUT, 3, SG, IND, IPFV, false, ['3sgf']], // (s)he           será                          sera
  43: [FUT, 1, PL, IND, IPFV, false, ['1plf']], //    we           seremos                       serons
  44: [FUT, 2, PL, IND, IPFV, false, ['2plf']], //   you           seréis                        serez
  45: [FUT, 3, PL, IND, IPFV, false, ['3plf']], //  they           serán                         seron
  46: [PRES, 1, SG, COND, IPFV, false, ['1sg->']], //     I           sería                         serais
  47: [PRES, 2, SG, COND, IPFV, false, ['2sg->']], //   you           serías                        serais
  48: [PRES, 3, SG, COND, IPFV, false, ['3sg->']], // (s)he           sería                         serait
  49: [PRES, 1, PL, COND, IPFV, false, ['1pl->']], //    we           seríamos                      serions
  50: [PRES, 2, PL, COND, IPFV, false, ['2pl->']], //   you           seríais                       seriez
  51: [PRES, 3, PL, COND, IPFV, false, ['3pl->']], //  they           serían                        seraient
  52: [PRES, 2, SG, IMP, IPFV, false, ['2sg!']], //   you           sé        sei                 sois
  521: [PRES, 3, SG, IMP, IPFV, false, ['3sg!']], // (s)he
  53: [PRES, 1, PL, IMP, IPFV, false, ['1pl!']], //    we                     seien               soyons
  54: [PRES, 2, PL, IMP, IPFV, false, ['2pl!']], //   you           sed       seid                soyez
  541: [PRES, 3, PL, IMP, IPFV, false, ['3pl!']], //   you
  55: [PRES, 1, SG, SJV, IPFV, false, ['1sg?']], //     I           sea       sei                 sois
  56: [PRES, 2, SG, SJV, IPFV, false, ['2sg?']], //   you           seas      seist               sois
  57: [PRES, 3, SG, SJV, IPFV, false, ['3sg?']], // (s)he           sea       sei                 soit
  58: [PRES, 1, PL, SJV, IPFV, false, ['1pl?']], //    we           seamos    seien               soyons
  59: [PRES, 2, PL, SJV, IPFV, false, ['2pl?']], //   you           seáis     seiet               soyez
  60: [PRES, 3, PL, SJV, IPFV, false, ['3pl?']], //  they           sean      seien               soient
  61: [PRES, 1, SG, SJV, PFV, false, ['1sg?+']], //     I
  62: [PRES, 2, SG, SJV, PFV, false, ['2sg?+']], //   you
  63: [PRES, 3, SG, SJV, PFV, false, ['3sg?+']], // (s)he
  64: [PRES, 1, PL, SJV, PFV, false, ['1pl?+']], //    we
  65: [PRES, 2, PL, SJV, PFV, false, ['2pl?+']], //   you
  66: [PRES, 3, PL, SJV, PFV, false, ['3pl?+']], //  they
  67: [PST, 1, SG, SJV, IPFV, false, ['1sgp?']], //     I           fuera     wäre                fusse
  68: [PST, 2, SG, SJV, IPFV, false, ['2sgp?']], //   you           fueras    wärest              fusses
  69: [PST, 3, SG, SJV, IPFV, false, ['3sgp?']], // (s)he           fuera     wäre                fût
  70: [PST, 1, PL, SJV, IPFV, false, ['1ppl?']], //    we           fuéramos  wären               fussions
  71: [PST, 2, PL, SJV, IPFV, false, ['2ppl?']], //   you           fuerais   wäret               fussiez
  72: [PST, 3, PL, SJV, IPFV, false, ['3ppl?']], //  they           fueran    wären               fussent
};

const TENSES_ID = new Map();
TENSES_ID.set(INFINITIVE, 0);
for (const [i, [tense, person, number, mood, aspect, negated, aliases]] of Object.entries(TENSES)) {
  for (const a of aliases.concat([i])) {
    TENSES_ID.set(i, i);
    TENSES_ID.set(a, i);
    TENSES_ID.set([tense, person, number, mood, aspect, negated], i);
  }

  if (number === SINGULAR) {
    for (const sg of ['s', 'sg', 'singular']) {
      TENSES_ID.set([tense, person, sg, mood, aspect, negated], i);
    }
  }

  if (number === PLURAL) {
    for (const pl of ['p', 'pl', 'plural']) {
      TENSES_ID.set([tense, person, pl, mood, aspect, negated], i);
    }
  }
}

const treebankTags = [
  ['VB', 0], // infinitive
  ['VBP', 1], // present 1 singular
  ['VBZ', 3], // present 3 singular
  ['VBG', 8], // present participle
  ['VBN', 24], // past participle
  ['VBD', 25], // past
];

for (const [tag, tense] of treebankTags) {
  TENSES_ID.set(tag.toLowerCase(), tense);
}

const constants = {
  CONDITIONAL,
  CONTINUOUS,
  FUTURE,
  GERUND,
  IMPERATIVE,
  IMPERFECT,
  IMPERFECTIVE,
  INDICATIVE,
  INFINITIVE,
  PARTICIPLE,
  PAST,
  PERFECTIVE,
  PLURAL,
  PRESENT,
  PRETERITE,
  PROGRESSIVE,
  SINGULAR,
  SUBJUNCTIVE,
  TENSES,
  TENSES_ID,
};

const proxy = new Proxy(constants, {
  get(obj, prop) {
    if (!Reflect.has(obj, prop)) {
      throw new Error(`Undefined constant ${prop}`);
    }
    return Reflect.get(obj, prop);
  },
});

export default proxy;
