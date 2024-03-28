// Return matrices as 2D arrays in row-major order, e.g.:
// return [
//     [ 1, 2, 3, 4 ],
//     [ 5, 6, 7, 8 ],
//     [ 7, 6, 5, 4 ],
//     [ 3, 2, 1, 0 ],
// ];

export function identity() {
    let nova_matrica = [];
    for (let i = 0; i < 4; i++){
        let temp = [];
        for (let j = 0; j < 4; j++){
            if (i == j){
                temp[j] = 1;
            } else {
                temp[j] = 0;
            }
        }
        nova_matrica.push(temp);
    }
    return nova_matrica;
}

export function translation(t) {
    let nova_matrica = identity();
    for (let i = 0; i < t.length; i++){
        nova_matrica[i][t.length] = t[i];
    }
    return nova_matrica;
}

export function scaling(s) {
    let nova_matrica = identity();
    for (let i = 0; i < s.length; i++){
        nova_matrica[i][i] = s[i];
    }
    return nova_matrica;
}

export function rotationX(angle) {
    return [
        [1,       0,        0,     0],
        [0,  Math.cos(angle),  -Math.sin(angle),     0],
        [0,  Math.sin(angle),   Math.cos(angle),     0],
        [0,       0,        0,     1]
   ];
}

export function rotationY(angle) {
    return [
        [Math.cos(angle),   0, Math.sin(angle),   0],
        [     0,   1,      0,   0],
        [-Math.sin(angle),   0, Math.cos(angle),   0],
        [     0,   0,      0,   1]
     ];   
}

export function rotationZ(angle) {
    return [
        [Math.cos(angle), -Math.sin(angle),    0,    0],
        [Math.sin(angle),  Math.cos(angle),    0,    0],
        [     0,       0,    1,    0],
        [     0,       0,    0,    1]
      ];
}

export function negate(m) {
    let nova_matrica = [];
    for (let i = 0; i < m.length; i++){
        let temp = [];
        for (let j = 0; j < m[0].length; j++){
            temp[j] = m[i][j] * -1;
        }
        nova_matrica.push(temp);
    }
    return nova_matrica;
}

export function add(m, n) {
    let nova_matrica = [];
    for (let i = 0; i < m.length; i++){
        let temp = [];
        for (let j = 0; j < m[0].length; j++){
            temp[j] = m[i][j] + n[i][j];
        }
        nova_matrica.push(temp);
    }
    return nova_matrica;
}

export function subtract(m, n) {
    let nova_matrica = [];
    for (let i = 0; i < m.length; i++){
        let temp = [];
        for (let j = 0; j < m[0].length; j++){
            temp[j] = m[i][j] - n[i][j];
        }
        nova_matrica.push(temp);
    }
    return nova_matrica;
}

export function transpose(m) {
    let nova_matrica = [];
    for (let i = 0; i < m.length; i++){
        let temp = [];
        for (let j = 0; j < m[0].length; j++){
            temp[j] = m[j][i];
        }
        nova_matrica.push(temp);
    }
    return nova_matrica;
}

export function multiply(m, n) {
    let nova_matrica = [];
    for (let i = 0; i < m.length; i++){
        nova_matrica[i] = [];
        for (let j = 0; j < n[0].length; j++){
            var sum = 0;
            for (let k = 0; k < m[0].length; k++){
                sum += m[i][k] * n[k][j];
            }
            nova_matrica[i][j] = sum;
        }
    }
    return nova_matrica;
}

export function transform1(m, v) {
    let nova_matrica = [];
    for (let i = 0; i < m.length; i++){
        let temp = [];
        for (let j = 0; j < m[0].length; j++){
            temp[j] = m[i][j] * v[j];
        }
        let temp2 = 0;
        for (let z = 0; z < temp.length; z++){
            temp2 += temp[z];
        }
        nova_matrica.push(temp2);
    }
    return nova_matrica;
}