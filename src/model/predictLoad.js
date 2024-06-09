const tf = require('@tensorflow/tfjs-node');

async function predict() {
    return tf.loadGraphModel(process.env.MODEL_URL);
}

module.exports = predict;