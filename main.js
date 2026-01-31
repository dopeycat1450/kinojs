// minidependencies

const dot = (vectorA, vectorB) => {
    if (!Array.isArray(vectorA) || !Array.isArray(vectorB)) {
        throw new Error("Both inputs must be arrays");
    }
    if (vectorA.length !== vectorB.length) {
        throw new Error("Vectors must be of the same length");
    }
    return vectorA.reduce((acc, current, index) => {
        return acc + current * vectorB[index];
    }, 0);
}

const randomuint = (max) => {
  return Math.round(Math.random() * max);
}

const randomFloat = (max) => {
  return Math.random() * (max * 2) - max; // Generates a value between -max and max
};

// items in the library

let kinos = [];

const sortKinos = () => {
    kinos.sort((a, b) => b.number - a.number);
};

export default {
    kinos,
    sortKinos,
    init: (form) => {
        kinos.unshift({ai: [], number: 0});
        for(let i1 = 0; i1 < form.length; i1++) {
            kinos[0].ai.push([]); // push layers
            kinos[0].ai[i1].push([]); // push output array
                for(let i2 = 1; i2 < form[i1] + 1; i2++) {
                    if(i1 !== 0) {
                        kinos[0].ai[i1].push({weights: [], bias: 0});
                        for(let i3 = 0; i3 < form[i1 - 1]; i3++) {
                            kinos[0].ai[i1][i2].weights.push(0);
                        }
                    } else {
                        kinos[0].ai[i1].push(null);
                    }
                }
        }
        return kinos[0].ai;
    },
    run: (input, kino) => {
        kinos[0].ai[0][0] = input;
        for(let i1 = 1; i1 < kinos[kino].ai.length; i1++) {

            kinos[kino].ai[i1][0] = []; // reset layer output
            for(let i2 = 1; i2 < kinos[kino].ai[i1].length; i2++) {
                
                kinos[kino].ai[i1][0].push(dot(kinos[kino].ai[i1 - 1][0], kinos[kino].ai[i1][i2].weights) + kinos[kino].ai[i1][i2].bias); // push neuron output to layer output
            }
        }
        return kinos[kino].ai[kinos[kino].ai.length - 1][0];
    },
    train: (split, intensity, unstability, change) => {
        sortKinos();
        // split kinos
        for(let i1 = 0; i1 < split - 1; i1++) {
            for(let i2 = 0; i2 < intensity; i2++) {
                kinos.push(kinos[i1]);
            }
        }
        // mutate kinos
        let r1;
        for(let i1 = 0; i1 < kinos.length; i1++) {
            for(let i1 = 0; i1 < unstability; i1++) {
                r1 = randomuint(kinos[i1].ai.length); // other random values use this value, cannot put into code directly
                if(randomuint(1) == 0) {
                    kinos[i1].ai[r1][randomuint(kinos[i1].ai[r1].length)].weights[randomuint(kinos[i1].ai[r1].weights.length)] += randomFloat(change);
                } else {
                    kinos[i1].ai[r1][randomuint(kinos[i1].ai[r1].length)].bias += randomFloat(change);
                }
            }
        }

    },
    reward: (kino, amount) => {
        kinos[kino].number += amount;
    },
    reduce: (amount) => {
        sortKinos();
        for(let i1 = 0; i1 < amount; i1++) {
            kinos.pop();
        }
    }
}
