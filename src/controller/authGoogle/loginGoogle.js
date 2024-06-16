const { google } = require('googleapis');
const process = require('process');

// fitur login by google menggunakan konsep OAuth 2.0
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3000/auth/google/callback'
);

// menggunakan scopes untuk menentukan akses yang dipakai
const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
];

const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true,
});

const loginGoogle = (request, h) => {
    return h.redirect(authorizationUrl);
};

module.exports = { loginGoogle };