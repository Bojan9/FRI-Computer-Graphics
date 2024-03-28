import { factor } from './Helper.mjs';

export class Bernstein {
    constructor(n, k) {
      this.n = n;
      this.k = k;
    }

    value(x) {
        let n = this.n;
        let k = this.k
        return (factor(n)/(factor(k)*factor(n-k))) * x**k * ((1-x)**(n-k));
    }

    derivative(x) {
      let n = this.n;
      let k = this.k
      let n1 = n - 1;
      let k1 = k - 1;
      const a = new Bernstein(n1, k1);
      const b = new Bernstein(n1, k);
      return n * (a.value(x) - b.value(x));
    }
  }