const { firestore } = require('./firestore');

// menggunakan collection userData pada cloud firestore
async function storeData(id, data) {
    const userDatabaseCollection = firestore.collection('userData');
    return userDatabaseCollection.doc(id).set(data);
}

// membuat fungsi untuk menyimpan database user saat registrasi
async function getFirestoreData() {
    try {
        const snapshot = await firestore.collection('userData').get();
        const histories = [];
        snapshot.forEach(doc => {
            histories.push(doc.data());
        });
        // returns an empty array if no data is found
        return histories.length > 0 ? histories : [];

    } catch (error) {
        console.error('Error in getFirestoreData:', error);
        return [];
    }
}

module.exports = { storeData, getFirestoreData, };