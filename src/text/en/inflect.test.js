/* eslint-env node, jest */

import csv from 'csvtojson';
import fs from 'fs';
import { singularize } from './inflect';
import wordforms from '../../../test/corpora/wordforms-en-celex.csv';

describe('singularize', () => {
  test('words ending in s should be singular', () => {
    expect(singularize('appointments')).toBe('appointment');
  });

  test('corpora matches', (done) => {
    let total = 0;
    let correct = 0;
    const failures = [];
    csv({ noheader: true, headers: ['singular', 'plural'] })
      .fromString(wordforms)
      .on('json', ({ singular, plural }) => {
        const result = singularize(plural);
        if (result === singular) {
          correct += 1;
        } else {
          failures.push([plural, result]);
        }
        total += 1;
      })
      .on('done', () => {
        fs.writeFileSync('failures.log', JSON.stringify(failures, null, 2), 'utf8');
        const accuracy = correct / total;
        console.log(`singularize accuracy is ${accuracy.toFixed(2)}`);
        expect(accuracy).toBeGreaterThan(0.95);
        done();
      });
  });
});
