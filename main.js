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

let ai = {
    layers: [],
    kinos: [], // k-ee-n-ow-s
    init: function(form) {
        for(let i1 = 0; i1 < form.length; i1++) {
            this.layers.push([]);
            this.layers[i1].push([]);
            if(i1 !== 0) {
                for(let i2 = 1; i2 < form[i1] + 1; i2++) {
                    this.layers[i1].push({weights: [], bias: 0});
                    for(let i3 = 0; i3 < form[i1 - 1]; i3++) {
                        this.layers[i1][i2].weights.push(0);
                    }
                }
            }
        }
    },
    run: function(input) {
        this.layers[0][0] = input;
        for(let i1 = 1; i1 < this.layers.length; i1++) {
            for(let i2 = 1; i2 < this.layers[i1].length; i2++) {
                this.layers[i1][0] = dot(this.layers[i1 - 1][0], this.layers[i1][i2].weights);
            }
        }
        return this.layers[this.layers.length][0];
    },
    sortKinos: function() {
        this.kinos.sort((a, b) => b.number - a.number)
    },
    start: function(number, split) {
        this.kinos = [{ai: this.layers, number: number}]; // if number is less than 1 the ai dies, the reward is added to number every time train is called, an ai splits if it is within the top split ais, if it isn't then it mutates
    },
    select: function(kino) {
        if(kino == undefined) {
            this.sortKinos();
            this.layers = this.kinos[0].ai;
        } else {
            this.layers = this.kinos[kino].ai;
        }
    },
    train: function(split, intensity, unstability) {
        this.sortKinos();
        // split kinos
        for(let i1 = 0; i1 < split - 1; i1++) {
            for(let i2 = 0; i2 < intensity; i2++) {
                this.kinos.push(this.kinos[i1]);
            }
        }
        // mutate kinos
        for(let i1 = 0; i1 < this.kinos.length - 1; i1++) {
            for(let i1 = 0; i1 < this.kinos.length - 1; i1++) {
                const r1 = randomInt(this.kinos[i1].ai.length);
                const r2 = randomInt(this.kinos[i1].ai[r1].length);
                const r3 = randomInt(2);
                const r4 = randomInt(this.kinos[i1].ai[r1].weights.length);
                const r5 = randomInt(2);
                let r6 = undefined;

                if (r5 == 0) {
                    r6 = Math.random();
                } else {
                    r6 = 0 - Math.random();
                }

                if (r3 == 0) {
                    this.kinos[i1].ai[r1][r2].weights[r4] += r6;
                }
            }
        }
    }
}

module.exports = ai;