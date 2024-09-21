// train.js
const model = require('./model');
const data = require('./data');

model.fit(data.xs, data.ys, { epochs: 100 });