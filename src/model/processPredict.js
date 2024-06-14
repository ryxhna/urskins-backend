const tf = require('@tensorflow/tfjs-node');
const disease = require('./classification');
const InputError = require('../controller/exceptions/InputError');

async function predictClassification(model, image) {
    try {
        // Process the image
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([365, 388])
            .expandDims()
            .toFloat()
            .div(tf.scalar(255.0));

        // Make predictions based on the processed image tensor
        const input = tensor.expandDims(0);
        const predictions = model.predict(input);
        const score = await predictions.data();
        const confidenceScore = Math.max(...score) * 100;
        const predictedIndex = score.indexOf(Math.max(...score));

        // Get the disease name based on the predicted index
        const label = disease[predictedIndex];
        const suggestion = `Predicted disease is ${label} with a confidence of ${confidenceScore.toFixed(2)}%`;

        console.log(suggestion);
        return { confidenceScore, label, suggestion };

    } catch (error) {
        throw new InputError("Terjadi kesalahan dalam melakukan prediksi");
    }
}

module.exports = predictClassification;