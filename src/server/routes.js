const { userLogin } = require('../controller/authManual/login');
const { userRegist } = require('../controller/authManual/register');
const { loginGoogle } = require('../controller/authGoogle/loginGoogle');
const { callback } = require('../controller/authGoogle/callback');
const { uploadImage } = require('../model/imagePredict');

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
        method: 'POST',
        path: '/predict/upload-disease',
        handler: uploadImage,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
                output: 'stream',
                parse: true,
                maxBytes: 1000000 //batas ukuran untuk maksimum payload
            }
        }
    }
];

module.exports = routes;