const sum = (nums) => {
    return nums.reduce((total, n) => total + Number(n), 0);
}

const dot = (vectorA, vectorB) => {
    return vectorA.reduce((acc, current, index) => {
        return acc + current * vectorB[index];
    }, 0);
}

let ai = {
    layers: [],
    kinos: [], // k-ee-n-ow-s
    init: function(form) {
        for(let i1 = 0; i1 < form.length; i1++) {
            this.layers.push([]);
            this.layers[i1].push([]);
            if(i1 !== 0) {
                for(let i2 = 1; i2 < form[i1]; i2++) {
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
    start: function(number, split) {
        this.kinos = [{ai: this.layers, number: number}]; // if number is less than 1 the ai dies, the reward is added to number every time train is called, an ai splits if it is within the top split ais, if it isn't then it mutates
    },
    select: function(kino) {
        if(kino == null) {
            let largest = 0;
            for(let i1 = 0; i1 < this.kinos.length; i1++) {
                if(this.kinos[i1].number > this.kinos[largest].number) {
                    largest = i1;
                }
            }
        } else {
            this.layers = this.kinos[kino].ai;
        }
    },
    train: function(split) {
        let largest = 1;
        for(let i1 = 1; i1 < this.kinos.length; i1++) {
            if(this.kinos[i1].number > this.kinos[largest].number) {
                largest = i1;
            }
        }
    }
}
