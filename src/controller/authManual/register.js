const crypto = require('crypto');
const { storeData, getFirestoreData } = require('../database/firestoreFunction');

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// fungsi registrasi secara manual
async function userRegist(request, h) {
    const { fullName, email, password } = request.payload;

    // database user akan disimpan menggunakan cloud firestore
    const users = await getFirestoreData();

    // cek email apakah user sudah pernah melakukan registrasi
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        const response = h.response({
            status: 'fail',
            message: 'Email is already registered'
        });
        response.code(400);
        return response;
    }

    // melakukan hash password menggunakan hash dan membuat id dengan uuid
    const hashedPassword = hashPassword(password);
    const userId = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const userData = {
        id: userId,
        fullName: fullName,
        email: email,
        password: hashedPassword,
        createdAt: createdAt
    };

    await storeData(userId, userData);

    const response = h.response({
        status: 'success',
        message: 'User registered successfully',
        data: {
            id: userId,
            fullName: fullName,
            email: email
        }
    });
    response.code(201);
    return response;
}

module.exports = { userRegist };