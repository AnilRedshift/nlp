import Lazydict from './lazydict';

const read = () => {
};

class Verb {
  constructor(path = '', format = [], defaults = {}, language = null) {
    this.path = path;
    this.data = new Lazydict(this.load.bind(this));
    return this.data;
  }

  load() {
    const data = read();
    const inverse = {};
    return {
      path: this.path,
      language: this.language,
      infinitives: this.data,
      inflections: inverse,
      TENSES: this.getTenses(),
      lemma: this.lemma.bind(this),
      lexeme: this.lexeme.bind(this),
      conjugate: this.conjugate.bind(this),
      tenses: this.tenses.bind(this),
      findLemma: this.findLemma.bind(this),
      findLexeme: this.findLexeme.bind(this),
    };
  }

  getTenses() {
  }
}

export default Verb;
