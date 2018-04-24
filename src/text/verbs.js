import c from './constants';
import Lazydict from './lazydict';

const comment = ';;;';
const read = data => data.split('\n')
  .filter(line => line && !line.startsWith(comment));

class Verbs {
  constructor({
    readFile,
    path = '',
    format = [],
    defaults = {},
    language = null,
  }) {
    this.path = path;
    this.language = language;
    this.format = new Map(format.map((item, i) => [item, i]));
    this.defaults = defaults;
    this.inverse = new Map();
    this.readFile = readFile;
    this.data = new Lazydict(this.load.bind(this));
    return this.data;
  }

  load() {
    const output = {};
    const infId = c.TENSES_ID.get(c.INFINITIVE);
    const id = this.format.get(infId);
    const data = read(this.readFile(this.path));
    for (const line of data) {
      const items = line.split(',');
      output[items[id]] = items;
      for (const x of items) {
        if (x) {
          this.inverse.set(x, items[id]);
        }
      }
    }
    return Object.assign(output, {
      path: this.path,
      language: this.language,
      infinitives: this.data,
      inflections: this.inverse,
    });
  }
}

export default Verbs;
