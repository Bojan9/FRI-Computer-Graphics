import { Bernstein } from './Bernstein.mjs';
import { sub } from './Vector.mjs';
import { mulScalar } from './Vector.mjs';

export class Bezier {
    constructor(points){
        this.points = points;
    }

    value(t) {
        let niza = new Array(this.points[0].length).fill(0);
        let n = this.points.length;

        for (let i = 0; i < n; i++) {
            let a = new Bernstein(n-1,i);
            let x = a.value(t);
            for (let j = 0; j < this.points[i].length; j++){
                niza[j] += x * this.points[i][j]
            }
        }

        return niza;
    }

    derivative(t) {
        let n = this.points.length-1;
        let points_first = this.points.slice(1);
        let points_last = this.points.slice(0, -1);

        const a = new Bezier(points_first);
        const b = new Bezier(points_last);

        return mulScalar(sub(a.value(t), b.value(t)), n);
    }
}