const { userLogin } = require('../controller/authManual/login');
const { userRegist } = require('../controller/authManual/register');
const { loginGoogle } = require('../controller/authGoogle/loginGoogle');
const { callback } = require('../controller/authGoogle/callback');
const { getProfile } = require('../controller/profile/getDatabaseUser');
const { uploadImage, getImage } = require('../controller/profile/profilePhoto');

const routes = [{
        method: 'POST',
        path: '/register',
        handler: userRegist,
    },
    {
        method: 'POST',
        path: '/login',
        handler: userLogin,
    },
    {
        method: 'GET',
        path: '/auth/google',
        handler: loginGoogle,
    },
    {
        method: 'GET',
        path: '/auth/google/callback',
        handler: callback,
    },
    {
        method: 'GET',
        path: '/profile/{userId}',
        handler: getProfile,
    },
    {
        method: 'POST',
        path: '/profile/uploadPhoto',
        handler: uploadImage,
        options: {
            payload: {
                maxBytes: 1000000,
                output: 'stream',
                parse: true,
                multipart: true,
                allow: 'multipart/form-data'
            }
        }
    },
    {
        method: 'GET',
        path: '/profile/getPhoto',
        handler: getImage,
    }
];

module.exports = routes;