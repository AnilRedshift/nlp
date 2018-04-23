const emptyLoad = () => ({});

class Lazydict {
  constructor(load = emptyLoad) {
    this.data = {};
    this.load = load;
    this.loaded = false;
    const handler = {
      get: (target, key) => {
        this.ensureLoaded();
        return Reflect.get(this.data, key);
      },
      set: (target, key, value) => {
        this.ensureLoaded();
        return Reflect.set(this.data, key, value);
      },
    };
    return new Proxy(this.data, handler);
  }

  ensureLoaded() {
    if (!this.loaded) {
      this.loaded = true;
      this.data = this.load();
    }
  }
}

export default Lazydict;
