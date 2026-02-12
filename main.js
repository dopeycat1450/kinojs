// minidependencies

const dot = (vectorA, vectorB) => {
    return vectorA.reduce((acc, current, index) => {
        return acc + current * vectorB[index];
    }, 0);
}

// items in the library

let nn = [];

let t = {posdir: true, rewa: 1, prevrewa: 0, layer: 1, neuron: 1, bweight: -1}; // not in the library

export default {
    nn,
    init: (form) => {
        // input layer
        nn.push([]); // push layers
        nn[0].push([]); // push output array
        for(let i1 = 1; i1 < form[0] + 1; i1++) {
            nn[0].push({weights: [], bias: 0}); // push neurons
            for(let i2 = 0; i2 < form[0 - 1]; i2++) {
                nn[0][i1].weights.push(1); // push weights
            }
        }
        // hidden layers (includes output layer)
        for(let i1 = 1; i1 < form.length; i1++) {
            nn.push([]); // push layers
            nn[i1].push([]); // push output array
            for(let i2 = 1; i2 < form[i1] + 1; i2++) {
                nn[i1].push({weights: [], bias: 0}); // push neurons
                for(let i3 = 0; i3 < form[i1 - 1]; i3++) {
                    nn[i1][i2].weights.push(0); // push weights
                }
            }
        }
    },
    run: (input) => {
        nn[0][0] = input;
        for(let i1 = 1; i1 < nn.length; i1++) {

            nn[i1][0] = []; // reset layer output
            for(let i2 = 1; i2 < nn[i1].length; i2++) {
                
                nn[i1][0].push(dot(nn[i1 - 1][0], nn[i1][i2].weights) + nn[i1][i2].bias); // push neuron output to layer output
            }
        }
        return nn[nn.length - 1][0];
    },
    train: (amount) => {
        if(t.rewa < t.prevrewa) {
            t.posdir = !t.posdir;
        }
        let weigh;
        if(t.posdir == true) {
            weigh = amount;
        } else {
            weigh = 0 - amount;
        }
        if(t.bweight = -1) {
            nn[t.layer][t.neuron].bias += weigh;
        } else {
            nn[t.layer][t.neuron].weights[t.bweight] += weigh;
        }
        if(t.bweight == nn[t.layer][t.neuron].weights.length - 1) {
            if(t.neuron == nn[t.layer].length - 1) { // try minus 2 if don't work
                if(t.layer == nn.length - 1) {
                    t.layer = 1; // layer set to one because input layer doesn't need training
                } else {
                    t.layer += 1;
                }
                t.neuron = 1; // neuron set to one because output array is [0]
            } else {
                t.neuron += 1;
            }
            t.bweight = -1; // -1 because -1 means bias
        } else {
            t.bweight += 1;
        }
    },
    reward: (amount) => {
        t.prevrewa = t.rewa;
        t.rewa = amount;
    }
};
