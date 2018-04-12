const emptyLoad = () => ({});

class Lazydict {
  constructor(load = emptyLoad) {
    this.data = {};
    this.loaded = false;
    const handler = {
      get: (target, key) => {
        if (!this.loaded) {
          this.loaded = true;
          this.data = load();
        }
        return Reflect.get(this.data, key);
      },
    };
    return new Proxy(this.data, handler);
  }
}

export default Lazydict;
