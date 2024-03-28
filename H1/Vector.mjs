// Return vectors as arrays, e.g.:
// return [ 1, 2, 3, 4 ];

export function negate(v) {
    if (!v.some(isNaN)) {     //checking if v is a vector
        let nov_vektor = [];             
        for (let i = 0; i < v.length; i++){
            nov_vektor.push(v[i] *- 1);
        }
        return nov_vektor;
    } else {
        console.log("Not a Vector!");
    }
}

export function add(v, w) {
    let nov_vektor = [];             
    for (let i = 0; i < v.length; i++){
        nov_vektor.push(v[i] + w[i]);
    }
    return nov_vektor;
}

export function subtract(v, w) {
    let nov_vektor = [];             
    for (let i = 0; i < v.length; i++){
        nov_vektor.push(v[i] - w[i]);
    }
    return nov_vektor;
}

export function multiply(v, w) {
    let nov_vektor = [];             
    for (let i = 0; i < v.length; i++){
        nov_vektor.push(v[i] * w[i]);
    }
    return nov_vektor;
}

export function divide(v, w) {
    let nov_vektor = [];             
    for (let i = 0; i < v.length; i++){
        nov_vektor.push(v[i] / w[i]);
    }
    return nov_vektor;
}

export function dot(v, w) {
    let rez = 0;             
    for (let i = 0; i < v.length; i++){
        rez += (v[i] * w[i]);
    }
    return rez;
}

export function cross(v, w) {
    let nov_vektor = [];             
    nov_vektor.push(v[1] * w[2] - v[2] * w[1]);
    nov_vektor.push(v[2] * w[0] - v[0] * w[2]);
    nov_vektor.push(v[0] * w[1] - v[1] * w[0]);
    return nov_vektor;
}

export function length(v) {
    let rez = 0;             
    for (let i = 0; i < v.length; i++){
        rez += (v[i] ** 2);
    }
    return rez;
}

export function normalize(v) {
    let nov_vektor = [];             
    for (let i = 0; i < v.length; i++){
        nov_vektor.push(v[i] / length(v));
    }
    return nov_vektor;
}

export function project(v, w) {
    let nov_vektor = [];             
    for (let i = 0; i < v.length; i++){
        nov_vektor.push(w[i] * dot(v, w) / (length(w) ** 2));
    }
    return nov_vektor;
}

export function reflect(v, w) {
    let nov_vektor = [];             
    for (let i = 0; i < v.length; i++){
        nov_vektor.push(2 * (dot(v, normalize(w))) * w[i]);
    }
    return subtract(v, nov_vektor);
}

export function angle(v, w) {
    return Math.acos(dot(v, w) / (length(v) * length(w)));
}