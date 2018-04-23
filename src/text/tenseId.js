import c from './constants';

const arraysEqual = (a, b) => (a instanceof Array &&
  b instanceof Array &&
  a.length === b.length &&
  a.every((val, i) => val === b[i]));

const get = ({
  args,
  kwargs,
  name,
  i,
  defaultVal,
}) => {
  let val;
  if (Object.prototype.hasOwnProperty.call(kwargs, name)) {
    val = kwargs[name];
  } else if (i < args.length) {
    val = args[i];
  } else {
    val = defaultVal;
  }
  return val;
};

const convertArgs = (...args) => {
  const defaults = [
    ['tense', c.PRESENT],
    ['person', null],
    ['number', c.SINGULAR],
    ['mood', c.INDICATIVE],
    ['aspect', c.IMPERFECTIVE],
    ['negated', false],
  ];

  const opts = {};
  if ((args.length === 1) &&
      (args[0] instanceof Array) &&
      !arraysEqual(args[0], [c.PRESENT, c.PARTICIPLE]) &&
      !arraysEqual(args[0], [c.PAST, c.PARTICIPLE])
  ) {
    // eslint-disable-next-line prefer-destructuring
    args = args[0];
  }

  let kwargs = {};
  if (args.length > 0) {
    const lastArg = args[args.length - 1];
    if ((typeof lastArg === 'object') &&
        !(lastArg instanceof Array) &&
        !(lastArg instanceof String)) {
      kwargs = lastArg;
      args.length -= 1;
    }
  }

  if (args.length === 0 && Object.keys(kwargs).length === 0) {
    defaults[0][1] = c.INFINITIVE;
  }

  defaults.forEach(([name, defaultVal], i) => {
    opts[name] = get({
      args,
      kwargs,
      name,
      i,
      defaultVal,
    });
  });

  if ([c.PERFECTIVE, c.IMPERFECTIVE].includes(opts.mood)) {
    opts.aspect = opts.mood;
    opts.mood = c.INDICATIVE;
  }

  if (opts.tense === c.INFINITIVE) {
    opts.person = null;
    opts.number = null;
    opts.mood = null;
    opts.aspect = null;
    opts.negated = false;
  }

  if (arraysEqual(opts.tense, [c.PRESENT, c.PARTICIPLE]) ||
    (opts.tense === c.PRESENT + c.PARTICIPLE) ||
    (opts.tense === c.PARTICIPLE) ||
    (opts.tense === c.GERUND)
  ) {
    opts.tense = c.PRESENT;
    opts.aspect = c.PROGRESSIVE;
  }

  if (arraysEqual(opts.tense, [c.PAST, c.PARTICIPLE]) ||
    (opts.tense === c.PAST + c.PARTICIPLE)
  ) {
    opts.tense = c.PAST;
    opts.aspect = c.PROGRESSIVE;
  }

  if (opts.tense === c.IMPERFECT) {
    opts.tense = c.PAST;
    opts.aspect = c.IMPERFECTIVE;
  }

  if (opts.tense === c.PRETERITE) {
    opts.tense = c.PAST;
    opts.aspect = c.PERFECTIVE;
  }

  if ([c.CONTINUOUS, c.PARTICIPLE, c.GERUND].includes(opts.aspect)) {
    opts.aspect = c.PROGRESSIVE;
  }

  if (opts.aspect === c.PROGRESSIVE) {
    opts.person = null;
    opts.number = null;
  }

  if (opts.tense === c.CONDITIONAL && opts.mood === c.INDICATIVE) {
    opts.tense = c.PRESENT;
    opts.mood = c.CONDITIONAL;
  }
  return opts;
};

const tenseId = (...args) => {
  // eslint-disable-next-line
  const opts = convertArgs(...args);
};

export { convertArgs };
export default tenseId;
