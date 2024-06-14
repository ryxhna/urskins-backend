const crypto = require('crypto');
const predictClassification = require('../model/predict');
const { storePredictionData, getPredictionData, } = require('../controller/database/firestoreFunction');

async function PredictOnProcess(request, h) {
    try {
        const { image } = request.payload;
        const { model } = request.server.app;
        const { confidenceScore, label, suggestion } = await predictClassification(model, image);

        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();
        const data = {
            userId: id,
            result: label,
            suggestion: suggestion,
            createdAt: createdAt
        };

        await storePredictionData(id, data);

        const response = h.response({
            status: 'success',
            message: confidenceScore > 99 ? 'Model is predicted successfully' : 'Model is predicted successfully but under threshold. Please use the correct picture',
            data
        });
        response.code(201);
        return response;

    } catch (error) {
        console.error('Error during prediction process:', error);
        const response = h.response({
            status: 'error',
            message: 'Prediction failed',
            error: error.message
        });
        response.code(500);
        return response;
    }
}

// TODO: bikin fungsi baru untuk histories
async function PredictOnHistory(request, h) {
    try {
        const histories = await getPredictionData();

        const response = h.response({
            status: 'success',
            data: histories
        });
        response.code(200);
        return response;
    } catch (error) {
        console.error('Error fetching prediction history:', error);
        const response = h.response({
            status: 'error',
            message: 'Failed to fetch prediction history',
            error: error.message
        });
        response.code(500);
        return response;
    }
}

module.exports = { PredictOnProcess, PredictOnHistory, };