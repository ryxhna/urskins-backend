const { Storage } = require('@google-cloud/storage');

// Initialize Google Cloud Storage client
const storage = new Storage({
    keyFilename: './serviceAccountKey-storage.json',
    projectId: 'urskin-bangkit2024'
});

const uploadImage = async(req, h) => {
    try {
        const bucketName = 'model-disease';
        const userId = req.params.id;
        const fileBuffer = req.payload.file;
        const filePath = `predict/${userId}.jpg`;

        // Configure metadata for the upload
        const customMetadata = {
            contentType: req.payload.file.hapi.headers['content-type'],
            metadata: {
                type: 'image/jpeg/jpg'
            }
        };

        // Options for uploading the file
        const optionsUploadObject = {
            metadata: customMetadata
        };

        // Upload the file to Google Cloud Storage
        await storage.bucket(bucketName).file(filePath).save(fileBuffer, optionsUploadObject);
        const response = h.response({
            code: 200,
            status: 'OK',
            message: 'Upload Success'
        });
        response.code(200);
        return response;
    } catch (error) {
        console.error('Error uploading image:', error);
        const response = h.response({
            code: 500,
            status: 'Internal Server Error',
            message: error.message
        });
        response.code(500);
        return response;
    }
};

module.exports = { uploadImage };