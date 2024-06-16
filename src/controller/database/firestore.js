// melakukan inisialisasi dan konfigurasi firebase menggunakan firebase admin sdk
const admin = require('firebase-admin');
const serviceAccount = require('../../firebase-config/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

module.exports = { firestore };