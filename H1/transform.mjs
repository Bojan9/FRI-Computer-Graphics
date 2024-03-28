import { translation } from './Matrix.mjs';
import { rotationY } from './Matrix.mjs';
import { scaling } from './Matrix.mjs';
import { rotationX } from './Matrix.mjs';
import { rotationZ } from './Matrix.mjs';
import { multiply } from './Matrix.mjs';
import { transform1 } from './Matrix.mjs';

export function transform(points) {
    let temp_matrica = translation([2.8, 0, 0])
    temp_matrica = multiply(rotationY(Math.PI / 4), temp_matrica);
    temp_matrica = multiply(translation([0, 0, 7.15]), temp_matrica);
    temp_matrica = multiply(translation([0, 2.45, 0]), temp_matrica);
    temp_matrica = multiply(scaling([1.8, 1.8, 1]), temp_matrica);
    temp_matrica = multiply(rotationX((5 * Math.PI) / 11), temp_matrica);
    temp_matrica = multiply(rotationZ((9 * Math.PI) / 11), temp_matrica);
    let matrica = [];
    for (let i = 0; i < points.length; i++){
        points[i].push(1);
        let x = (transform1(temp_matrica, points[i])); 
        x.pop();
        matrica.push(x);
    }
    return matrica;
}

