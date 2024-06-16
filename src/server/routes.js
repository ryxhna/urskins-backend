const { userLogin } = require('../controller/authManual/login');
const { userRegist } = require('../controller/authManual/register');
const { loginGoogle } = require('../controller/authGoogle/loginGoogle');
const { callback } = require('../controller/authGoogle/callback');
const { getProfile } = require('../controller/database/profileUser');

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
    }
];

module.exports = routes;