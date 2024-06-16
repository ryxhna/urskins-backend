require('dotenv').config();
const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const process = require('process');

const init = async() => {
    // Mendefinisikan port di docker, jadi gak langsung
    // port: process.env.PORT,
    // host: '0.0.0.0',
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
            payload: {
                maxBytes: 1000000,
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on('unhandledRejection', (error) => {
    console.log(error);
    process.exit(1);
});

init();