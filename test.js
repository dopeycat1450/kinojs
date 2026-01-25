let ai = require('./main.js');

ai.init([3, 4, 4]);

console.log(ai.layers[0][0] + ai.layers[1][1].weights);