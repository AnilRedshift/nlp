import Verbs from './verbs';

test('Sets the path', () => {
  const readFile = () => '';
  const v = new Verbs({ readFile, path: 'hello' });
  expect(v.path).toBe('hello');
});
