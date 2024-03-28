import { Bezier } from './Bezier.mjs';
import { add } from './Vector.mjs';
import { sub } from './Vector.mjs';
import { divScalar } from './Vector.mjs';

export class Spline{
    constructor(curves){
        this.curves = curves;
    }

    value(t) {
        let y = Math.trunc(t);
        let x = t - y;

        if (y == this.curves.length){
            y = this.curves.length - 1;
            x = 1;
        }
        let a = new Bezier(this.curves[y].points);

        return a.value(x);
    }

    derivative(t) {
        let y = Math.trunc(t);
        let x = t - y;

        if (y == this.curves.length){
            y = this.curves.length - 1;
            x = 1;
        }
        let a = new Bezier(this.curves[y].points);

        return a.derivative(x);
    }

    makeContinuous() {
        for (let i = 0; i < this.curves.length-1; i++) {
            let x = this.curves[i+1].points[0];
            let y = this.curves[i].points[this.curves[i].points.length-1];

            this.curves[i+1].points[0] = divScalar((add(x,y)),2);
            this.curves[i].points[this.curves[i].points.length-1] = divScalar((add(x,y)),2);
        }
    }

    makeSmooth() {
        for (let i = 0; i < this.curves.length-1; i++){
            let n = this.curves[i].points.length-1;

            let points = this.curves[i].points;
            let points1 = this.curves[i+1].points;

            let a = new Bezier(points);
            let b = new Bezier(points1);

            let x = a.derivative(1);
            let y = b.derivative(0);
            let w = divScalar(divScalar((add(x,y)),2),n);

            let c = new Bezier(points.slice(1));
            let d = new Bezier(points1.slice(0, -1));

            this.curves[i].points[n-1] = sub(c.value(1),w);
            this.curves[i+1].points[1] = add(d.value(0),w);
        } 
    }
}