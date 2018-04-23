import Lazydict from './lazydict';

describe('lazydict without a loader', () => {
  let l;
  beforeEach(() => {
    l = new Lazydict();
  });

  test('Calling get as the first operation succeeds', () => {
    expect(l.foo).toBe(undefined);
  });

  test('Calling set then get succeeds', () => {
    l.foo = 'bar';
    expect(l.foo).toBe('bar');
  });
});

describe('lazydict with a loader', () => {
  const load = () => ({ a: 1, b: 2 });
  let l;
  beforeEach(() => {
    l = new Lazydict(load);
  });

  test('getting a default value succeeds', () => {
    expect(l.a).toBe(1);
  });

  test('overriding a default value succeeds', () => {
    l.a = 42;
    expect(l.a).toBe(42);
  });
});
