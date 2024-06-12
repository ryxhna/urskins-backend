// const predictClassification = require('../services/inferenceService');
// const crypto = require('crypto');
// const { storeData, getFirestoreData, } = require('../firestore/userData');

// async function postPredictHandler(request, h) {
//     //TODO: ganti sesuai kriteria ada apa aja
//     const { image } = request.payload;
//     const { model } = request.server.app;

//     const { confidenceScore, label, suggestion } = await predictClassification(model, image);
//     const id = crypto.randomUUID();
//     const createdAt = new Date().toISOString();

//     const data = {
//         id: id,
//         result: label,
//         suggestion: suggestion,
//         createdAt: createdAt
//     };

//     await storeData(id, data);

//     const response = h.response({
//         status: 'success',
//         message: confidenceScore > 99 ? 'Model is predicted successfully' : 'Model is predicted successfully but under threshold. Please use the correct picture',
//         data
//     });
//     response.code(201);
//     return response;
// }

// module.exports = { postPredictHandler, };