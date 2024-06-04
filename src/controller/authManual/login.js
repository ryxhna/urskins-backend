const crypto = require('crypto');
const { getFirestoreData } = require('../../firestore/userData');

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// User login handler
async function userLogin(request, h) {
    const { email, password } = request.payload;

    // Retrieve all user data
    const users = await getFirestoreData();

    // Find the user by username
    const user = users.find(user => user.email === email);
    if (!user) {
        const response = h.response({
            status: 'fail',
            message: 'Invalid username or password'
        });
        response.code(401);
        return response;
    }

    // Hash the incoming password and compare with the stored hash
    const hashedPassword = hashPassword(password);
    if (hashedPassword !== user.password) {
        const response = h.response({
            status: 'fail',
            message: 'Invalid email or password'
        });
        response.code(401);
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