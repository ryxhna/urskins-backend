const { Storage } = require('@google-cloud/storage');
const serviceAccountKey = require('./serviceaccountkey-storage.json');

const storage = new Storage({
    credentials: serviceAccountKey,
});

const uploadImage = async(request, h) => {
    try {
        const userId = request.params.id;
        const bucketPhoto = storage.bucket("profile-user-storage");

        // mengambil gambar dari request payload
        const { image } = request.payload;
        if (!image) {
            throw new Error('No image provided in request payload.');
        }

        // menentukan path file untuk menyimpan gambar ke storage bucket
        const imageFile = bucketPhoto.file(`image-user/${userId}.jpg`);
        await imageFile.save(image._data, {
            contentType: image.hapi.headers['content-type'],
            resumable: false
        });

        const response = h.response({
            status: 'Success',
            message: 'Upload Success',
        });
        response.code(200);
        return response;

    } catch (error) {
        // respon bila terjadi error saat proses upload gambar
        console.error('Error uploading image:', error);
        const response = h.response({
            status: 'Error',
            message: error.message || 'Internal Server Error',
        });
        response.code(500);
        return response;
    }
};

const getImage = async(request, h) => {
    try {
        const userId = request.params.id;
        const bucketPhoto = storage.bucket("profile-user-storage");

        // proses mendapatkan metadata dari storage bucket
        const imageFile = bucketPhoto.file(`image-user/${userId}.jpg`);
        const [metadata] = await imageFile.getMetadata();
        const fileType = metadata.contentType;

        // membuat readable stream agar dapat mengirim gambar
        const stream = imageFile.createReadStream();

        return h.response(stream)
            .header('Content-Type', fileType)
            .code(200);

    } catch (error) {
        const response = h.response({
            status: 'Error',
            message: error.message,
        });
        response.code(500);
        return response;
    }
};

module.exports = { uploadImage, getImage };