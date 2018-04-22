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

const constants = {
  INFINITIVE,
  PRESENT,
  PAST,
  FUTURE,
  SINGULAR,
  PLURAL,
  INDICATIVE,
  IMPERATIVE,
  CONDITIONAL,
  SUBJUNCTIVE,
  IMPERFECTIVE,
  PERFECTIVE,
  PROGRESSIVE,
  IMPERFECT,
  PRETERITE,
  PARTICIPLE,
  GERUND,
  CONTINUOUS,
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
