const crypto = require('crypto');
const { getFirestoreData } = require('../database/firestoreFunction');

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// User login handler
async function userLogin(request, h) {
    const { email, password } = request.payload;

    const users = await getFirestoreData();

    // Check if the email is registered
    const user = users.find(user => user.email === email);
    if (!user) {
        const response = h.response({
            status: 'fail',
            message: 'Email not registered'
        });
        response.code(400);
        return response;
    }

    // Check if the password is correct
    const hashedPassword = hashPassword(password);
    if (user.password !== hashedPassword) {
        const response = h.response({
            status: 'fail',
            message: 'Incorrect password'
        });
        response.code(400);
        return response;
    }

    const response = h.response({
        status: 'success',
        message: 'User logged in successfully',
        data: { id: user.id, fullName: user.fullName, email: user.email }
    });
    response.code(200);
    return response;
}

module.exports = { userLogin };