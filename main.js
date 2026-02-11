// minidependencies

const dot = (vectorA, vectorB) => {
    return vectorA.reduce((acc, current, index) => {
        return acc + current * vectorB[index];
    }, 0);
}

// items in the library

let ai = [];

let t = {posdir: true, rewa: 0, prevrewa: 0, layer: 1, neuron: 1, bweight: -1};

export default {
    kino,
    sortkino,
    init: (form) => {
        for(let i1 = 0; i1 < form.length; i1++) {
            ai.push([]); // push layers
            ai[i1].push([]); // push output array
                for(let i2 = 1; i2 < form[i1] + 1; i2++) {
                    ai[i1].push({weights: [], bias: 0}); // push neurons
                    for(let i3 = 0; i3 < form[i1 - 1]; i3++) {
                        ai[i1][i2].weights.push(1); // push weights
                    }
                }
        }
        return ai;
    },
    run: (input, kino) => {
        ai[0][0] = input;
        for(let i1 = 1; i1 < kino[kino].ai.length; i1++) {

            ai[i1][0] = []; // reset layer output
            for(let i2 = 1; i2 < ai[i1].length; i2++) {
                
                ai[i1][0].push(dot(ai[i1 - 1][0], ai[i1][i2].weights) + ai[i1][i2].bias); // push neuron output to layer output
            }
        }
        return ai[ai.length - 1][0];
    },
    singleTrain: (amount) => {
        let weigh;
        if(t.posdir == true) {
            weigh = amount;
        } else {
            weigh = 0 - amount;
        }
        if(t.bweight = -1) {
            ai[t.layer][t.neuron].bias += weigh;
        } else {
            ai[t.layer][t.neuron].weights[t.bweight] += weigh;
        }
    },
    reward: (amount) => {
        t.rewa = amount;
    }
};
