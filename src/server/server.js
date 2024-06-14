require('dotenv').config();
const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const loadModel = require('../model/loadModel');
const InputError = require('../controller/exceptions/InputError');

(async() => {
    try {
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

        const model = await loadModel();
        server.app.model = model;

        server.route(routes);

        await server.start();
        console.log(`Server berjalan pada ${server.info.uri}`);

        server.ext('onPreResponse', (request, h) => {
            const response = request.response;

            if (response instanceof InputError) {
                const newResponse = h.response({
                    status: 'fail',
                    message: 'Terjadi kesalahan dalam melakukan prediksi',
                });
                newResponse.code(response.statusCode);
                return newResponse;
            }

            if (request.payload && request.payload.length > 1000000) {
                const newResponse = h.response({
                    status: 'fail',
                    message: 'Payload content length greater than maximum allowed: 1000000',
                });
                newResponse.code(413);
                return newResponse;
            }

            return h.continue;
        });

    } catch (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
})();

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});