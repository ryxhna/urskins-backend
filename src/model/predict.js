// const tf = require('@tensorflow/tfjs-node');
// const InputError = require('../exceptions/InputError');

// async function predictClassification(model, image) {
//     try {
//         // memproses gambar
//         const tensor = tf.node
//             .decodeJpeg(image)
//             .resizeNearestNeighbor([300, 300])
//             .expandDims()
//             .toFloat()

//         // membuat prediksi berdasarkan tensor gambar yang telah diproses. 
//         // prediksi ini adalah tensor yang berisi array nilai antara 0 dan 1.
//         const predictions = model.predict(tensor);

//         // mengembalikan nilai prediksi dalam bentuk array JavaScript
//         const score = await predictions.data();
//         const confidenceScore = Math.max(...score) * 100;

//         let label, suggestion;

//         if (confidenceScore > 50) {
//             label = 'Cancer';
//             suggestion = "Berdasarkan analisis gambar ditemukan indikasi penyakit kanker, mohon untuk segera konsultasi dengan dokter terdekat untuk pemeriksaan lebih lanjut.";
//         } else {
//             label = 'Non-cancer';
//             suggestion = "Tidak ditemukan indikasi kanker, tetap lakukan pemeriksaan rutin dan menjaga pola hidup sehat.";
//         }

//         return { confidenceScore, label, suggestion };

//     } catch (error) {
//         throw new InputError("Terjadi kesalahan dalam melakukan prediksi");
//     }
// }

// module.exports = predictClassification;