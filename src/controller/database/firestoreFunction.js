//TODO: Re-Write to more simple code
const { firestore } = require('./firestore');

async function storeData(id, data) {
    const userDatabaseCollection = firestore.collection('userData');
    return userDatabaseCollection.doc(id).set(data);
}

async function storePredictionData(id, data) {
    const userDatabaseCollection = firestore.collection('prediction');
    return userDatabaseCollection.doc(id).set(data);
}

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

async function getPredictionData() {
    try {
        const snapshot = await firestore.collection('prediction').get();
        const histories = [];
        snapshot.forEach(doc => {
            histories.push(doc.data());
        });
        return histories.length > 0 ? histories : [];
    } catch (error) {
        console.error('Error in getPredictionData:', error);
        return [];
    }
}

module.exports = { storeData, storePredictionData, getFirestoreData, getPredictionData, };