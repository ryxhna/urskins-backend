const crypto = require('crypto');
const { storeData, getFirestoreData } = require('../../firestore/userData');

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// User registration handler
async function userRegist(request, h) {
    const { fullName, email, password } = request.payload;

    const users = await getFirestoreData();

    // Check if the email is already registered
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        const response = h.response({
            status: 'fail',
            message: 'Email is already registered'
        });
        response.code(400);
        return response;
    }

    // Hash the password
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

    // Store user data
    await storeData(userId, userData);

    const response = h.response({
        status: 'success',
        message: 'User registered successfully',
        data: { id: userId, fullName: fullName, email: email }
    });
    response.code(201);
    return response;
}

module.exports = { userRegist };