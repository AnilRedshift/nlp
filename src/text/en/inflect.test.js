import csv from 'csvtojson';
import { singularize } from './inflect';
import wordforms from '../../../test/corpora/wordforms-en-celex.csv';

describe('singularize', () => {
  test('words ending in s should be singular', () => {
    expect(singularize('appointments')).toBe('appointment');
  });

  test('corpora matches', (done) => {
    csv({ noheader: true, headers: ['singular', 'plural'] })
      .fromString(wordforms)
      .on('json', ({ singular, plural }) => {
        expect(singularize(plural)).toBe(singular);
      })
      .on('done', done);
  });
});
