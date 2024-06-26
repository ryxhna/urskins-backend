const { google } = require('googleapis');
const process = require('process');
const { storeData } = require('../database/firestoreFunction');
const { firestore } = require('../database/firestore');

// fitur login by google menggunakan konsep OAuth 2.0
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:${port}/auth/google/callback'
);

// membuat fungsi callback 
const callback = async(request, h) => {
    try {
        const { code } = request.query;
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        });

        const { data } = await oauth2.userinfo.get();

        if (!data) {
            return h.response({ data: null }).code(400);
        }

        // cek apakah data user sudah ada di database
        const userRef = firestore.collection('userData').doc(data.id);
        const doc = await userRef.get();

        if (!doc.exists) {
            // jika data user belum ada maka akan diminta untuk membuat baru
            await storeData(data.id, {
                id: data.id,
                email: data.email,
                name: data.name,
            });
        } else {
            await userRef.update({
                email: data.email,
                name: data.name,
            });
        }

        return h.response({ data }).code(200);
    } catch (error) {
        console.error('Error during Google OAuth callback:', error);
        return h.response({
            error: 'Internal Server Error'
        }).code(500);
    }
};

module.exports = { callback };