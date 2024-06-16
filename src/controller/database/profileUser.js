const admin = require('firebase-admin');
const firestore = admin.firestore(); // Assuming `admin` is already initialized

const getProfile = async(request, h) => {
    const userId = request.params.userId;

    try {
        const userDoc = await firestore.collection('userData').doc(userId).get();

        if (!userDoc.exists) {
            const response = h.response({
                status: 'fail',
                message: 'Profile not found',
            });
            response.code(404);
            return response;
        }

        const profile = userDoc.data();

        const response = h.response({
            status: 'success',
            data: {
                userData: {
                    fullName: profile.fullName,
                    email: profile.email,
                },
            },
        });
        response.code(200);
        return response;

    } catch (error) {
        console.error("Error fetching profile:", error); // Log specific error details

        const response = h.response({
            status: 'error',
            message: 'An error occurred while fetching the profile',
        });
        response.code(500);
        return response;
    }
};

module.exports = { getProfile, };