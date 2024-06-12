const { storeData, getFirestoreData } = require('../controller/database');

(async() => {
    try {
        // Store data
        const testData = {
            name: 'John Doe',
            email: 'johndoe@example.com'
        };
        await storeData('test-id-123', testData);
        console.log('Data stored successfully.');

        // Retrieve data
        const data = await getFirestoreData();
        console.log('Retrieved data:', data);
    } catch (error) {
        console.error('Error:', error);
    }
})();