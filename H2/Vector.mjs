export function len(v) {
    let rez = 0;             
    for (let i = 0; i < v.length; i++){
        rez += (v[i] ** 2);
    }
    return rez;
}

export function add(a, b) {
    let nov_vektor = [];             
    for (let i = 0; i < a.length; i++){
        nov_vektor.push(a[i] + b[i]);
    }
    return nov_vektor;
}

export function sub(a, b) {
    let nov_vektor = [];             
    for (let i = 0; i < a.length; i++){
        nov_vektor.push(a[i] - b[i]);
    }
    return nov_vektor;
}

export function mul(a, b) {
    let nov_vektor = [];             
    for (let i = 0; i < a.length; i++){
        nov_vektor.push(a[i] * b[i]);
    }
    return nov_vektor;
}

export function div(a, b) {
    let nov_vektor = [];             
    for (let i = 0; i < a.length; i++){
        nov_vektor.push(a[i] / b[i]);
    }
    return nov_vektor;
}

export function mulScalar(a, s) {
    let nov_vektor = [];             
    for (let i = 0; i < a.length; i++){
        nov_vektor.push(a[i] * s);
    }
    return nov_vektor;
}

export function divScalar(a, s) {
    let nov_vektor = [];             
    for (let i = 0; i < a.length; i++){
        nov_vektor.push(a[i] / s);
    }
    return nov_vektor;
}