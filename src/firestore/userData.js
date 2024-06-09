const { Firestore } = require('@google-cloud/firestore');

async function storeData(id, data) {
    const db = new Firestore();

    const userDatabaseCollection = db.collection('userData');
    return userDatabaseCollection.doc(id).set(data);
}

async function getFirestoreData() {
    try {
        const db = new Firestore();

        const snapshot = await db.collection('userData').get();
        const histories = [];
        snapshot.forEach(doc => {
            histories.push(doc.data());
        });
        // bakal ngasih array kosong kalo datanya gaada
        return histories.length > 0 ? histories : [];

    } catch (error) {
        console.error('Error in getFirestoreData:', error);
        return [];
    }
}

module.exports = { storeData, getFirestoreData, };