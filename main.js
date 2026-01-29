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

const randomInt = (max) => {
  return Math.floor(Math.random() * max);
}

const kinos = [];

export default {
    kinos: kinos,
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
    },
    run: (input, kino) => {
        kinos[0].ai[0][0] = input;
        for(let i1 = 1; i1 < kinos[kino].ai.length; i1++) {

            for(let i2 = 1; i2 < kinos[kino].ai[i1].length; i2++) {
                
                kinos[kino].ai[i1][0] = dot(kinos[kino].ai[i1 - 1][0], kinos[kino].ai[i1][i2].weights);
            }
        }
        return kinos[kino].ai[kinos[kino].ai.length][0];
    },
    sortKinos: () => {
        kinos.sort((a, b) => b.number - a.number);
    },
    train: (split, intensity, unstability) => {
        this.sortKinos();
        // split kinos
        for(let i1 = 0; i1 < split - 1; i1++) {
            for(let i2 = 0; i2 < intensity; i2++) {
                kinos.push(kinos[i1]);
            }
        }
        // mutate kinos
        if(unstability != 0) {
            for(let i1 = 0; i1 < kinos.length; i1++) {
                for(let i1 = 0; i1 < unstability; i1++) {
                    const r1 = randomInt(kinos[i1].ai.length);
                    const r2 = randomInt(kinos[i1].ai[r1].length);
                    const r3 = randomInt(2);
                    const r4 = randomInt(kinos[i1].ai[r1].weights.length);
                    const r5 = randomInt(2);
                    let r6 = undefined;

                    if (r5 == 0) {
                        r6 = Math.random();
                    } else {
                        r6 = 0 - Math.random();
                    }

                    if (r3 == 0) {
                        kinos[i1].ai[r1][r2].weights[r4] += r6;
                    }
                }
            }
        }
    },
    reward: (kino, amount) => {
        kinos[kino].number += amount;
    }
}
