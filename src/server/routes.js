const { userLogin } = require('../controller/authManual/login');
const { userRegist } = require('../controller/authManual/register');

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
];

module.exports = routes;