// model.js
const tf = require('@tensorflow/tfjs');
const brain = require('brain.js');

const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
model.add(tf.layers.dense({ units: 1 }));
model.compile({ optimizer: tf.optimizers.adam(), loss: 'meanSquaredError' });

module.exports = model;