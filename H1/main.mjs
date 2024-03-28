import { transform } from './transform.mjs';

const input = document.getElementById('input');
const output = document.getElementById('output');

input.addEventListener('change', e => {
    const points = JSON.parse(input.value);
    const transformedPoints = transform(points);
    output.value = JSON.stringify(transformedPoints);
});

let points = [[1,2,3],[2,3,4],[3,4,5],[4,5,6]]; //test
console.log(transform(points));