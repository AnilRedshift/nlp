const NOUN = 'NN';

const singularRules = [
  [/(.)ae$/i, '$1a'],
  [/(.)itis$/i, '$1itis'],
  [/(.)eaux$/i, '$1eau'],
  [/(quiz)zes$/i, '$1'],
  [/(matr)ices$/i, '$1ix'],
  [/(ap|vert|ind)ices$/i, '$1ex'],
  [/^(ox)en/i, '$1'],
  [/(alias|status)es$/i, '$1'],
  [/([octop|vir])i$/i, '$1us'],
  [/(cris|ax|test)es$/i, '$1is'],
  [/(shoe)s$/i, '$1'],
  [/(o)es$/i, '$1'],
  [/(bus)es$/i, '$1'],
  [/([m|l])ice$/i, '$1ouse'],
  [/(x|ch|ss|sh)es$/i, '$1'],
  [/(m)ovies$/i, '$1ovie'],
  [/(.)ombies$/i, '$1ombie'],
  [/(s)eries$/i, '$1eries'],
  [/([^aeiouy]|qu)ies$/i, '$1y'],
  // -f, -fe sometimes take -ves in the plural
  // (e.g., lives, wolves).
  [/([aeo]l)ves$/, '$1f'],
  [/([^d]ea)ves$/, '$1f'],
  [/arves$/, 'arf'],
  [/erves$/, 'erve'],
  [/([nlw]i)ves$/, '$1fe'],
  [/([lr])ves$/i, '$1f'],
  [/([aeo])ves$/, '$1ve'],
  [/(sive)s$/i, '$1'],
  [/(tive)s$/i, '$1'],
  [/(hive)s$/i, '$1'],
  [/([^f])ves$/i, '$1fe'],
  // -ses suffixes.
  [/(^analy)ses$/i, '$1sis'],
  [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, '$1$2sis'],
  [/(.)opses$/i, '$1opsis'],
  [/(.)yses$/i, '$1ysis'],
  [/(h|d|r|o|n|b|cl|p)oses$/i, '$1ose'],
  [/(fruct|gluc|galact|lact|ket|malt|rib|sacchar|cellul)ose$/i, '$1ose'],
  [/(.)oses$/i, '$1osis'],
  // -a
  [/([ti])a$/i, '$1um'],
  [/(n)ews$/i, '$1ews'],
  [/s$/i, ''],
];


const pluralPrepositions = new Set([
  'about', 'before', 'during', 'of', 'till',
  'above', 'behind', 'except', 'off', 'to',
  'across', 'below', 'fo/, /on', 'under',
  'afte/, /beneath', 'from', 'onto', 'until',
  'among', 'beside', 'in', 'out', 'unto',
  'around', 'besides', 'into', 'ove/, /upon',
  'at', 'between', 'nea/, /since', 'with',
  'athwart', 'betwixt',
  'beyond',
  'but',
  'by',
]);

const singularUninflected = new Set([
  'bison', 'debris', 'headquarters', 'pincers', 'trout',
  'bream', 'diabetes', 'herpes', 'pliers', 'tuna',
  'breeches', 'djinn', 'high-jinks', 'proceedings', 'whiting',
  'britches', 'eland', 'homework', 'rabies', 'wildebeest',
  'carp', 'elk', 'innings', 'salmon',
  'chassis', 'flounde/, /jackanapes', 'scissors',
  'christmas', 'gallows', 'mackerel', 'series',
  'clippers', 'georgia', 'measles', 'shears',
  'cod', 'graffiti', 'mews', 'species',
  'contretemps', 'mumps', 'swine',
  'corps', 'news', 'swiss',
]);

const singularUncountable = new Set([
  'advice', 'equipment', 'happiness', 'luggage', 'news', 'software',
  'bread', 'fruit', 'information', 'mathematics', 'progress', 'understanding',
  'butte/, /furniture', 'ketchup', 'mayonnaise', 'research', 'water',
  'cheese', 'garbage', 'knowledge', 'meat', 'rice',
  'electricity', 'gravel', 'love', 'mustard', 'sand',
]);

const singularIe = new Set([
  'alergie', 'cutie', 'hoagie', 'newbie', 'softie', 'veggie',
  'auntie', 'doggie', 'hottie', 'nightie', 'sortie', 'weenie',
  'beanie', 'eyrie', 'indie', 'oldie', 'stoolie', 'yuppie',
  'birdie', 'freebie', 'junkie', '^pie', 'sweetie', 'zombie',
  'bogie', 'goonie', 'laddie', 'pixie', 'techie',
  'bombie', 'groupie', 'laramie', 'quickie', '^tie',
  'collie', 'hankie', 'lingerie', 'reverie', 'toughie',
  'cookie', 'hippie', 'meanie', 'rookie', 'valkyrie',
]);

const singularIrregular = {
  atlantes: 'atlas',
  atlases: 'atlas',
  axes: 'axe',
  beeves: 'beef',
  brethren: 'brother',
  children: 'child',
  corpora: 'corpus',
  corpuses: 'corpus',
  ephemerides: 'ephemeris',
  feet: 'foot',
  ganglia: 'ganglion',
  geese: 'goose',
  genera: 'genus',
  genii: 'genie',
  graffiti: 'graffito',
  helves: 'helve',
  kine: 'cow',
  leaves: 'leaf',
  loaves: 'loaf',
  men: 'man',
  mongooses: 'mongoose',
  monies: 'money',
  moves: 'move',
  mythoi: 'mythos',
  numena: 'numen',
  occipita: 'occiput',
  octopodes: 'octopus',
  opera: 'opus',
  opuses: 'opus',
  our: 'my',
  oxen: 'ox',
  penes: 'penis',
  penises: 'penis',
  people: 'person',
  sexes: 'sex',
  soliloquies: 'soliloquy',
  teeth: 'tooth',
  testes: 'testis',
  trilbys: 'trilby',
  turves: 'turf',
  zoa: 'zoon',
};


const singularize = (word, pos = NOUN, custom = {}) => {
  if (word in custom) {
    return custom[word];
  }

  if (word.includes('-')) {
    const w = word.split('-');
    if (word.length > 1 && pluralPrepositions.has(w[1])) {
      const firstWord = singularize(w[0], pos, custom);
      const secondWord = w.slice(1).join('-');
      return `${firstWord}-${secondWord}`;
    }
  }

  if (word.endsWith("'")) {
    return `${singularize(word.slice(0, -1))}'s`;
  }
  const w = word.toLowerCase();

  for (const x of singularUninflected) {
    if (x.endsWith(w)) {
      return word;
    }
  }

  for (const x of singularUncountable) {
    if (x.endsWith(w)) {
      return word;
    }
  }

  for (const x of singularIe) {
    if (w.endsWith(`${x}s`)) {
      return x;
    }
  }

  for (const x of Object.keys(singularIrregular)) {
    if (w.endsWith(x)) {
      const re = new RegExp(`${x}$`, 'i');
      return word.replace(re, singularIrregular[x]);
    }
  }

  // eslint-disable-next-line prefer-const
  for (let [suffix, inflection] of singularRules) {
    const m = word.match(suffix);
    const g = (m || []).slice(1);
    if (m) {
      for (let k = 0; k < g.length; k += 1) {
        if (!g[k]) {
          inflection = inflection.replace(`$${k + 1}`, '');
        }
      }
      return word.replace(suffix, inflection);
    }
  }
  return word;
};

// eslint-disable-next-line import/prefer-default-export
export { singularize };
