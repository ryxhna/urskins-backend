const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async() => {
    // mengaktifkan CORS diseluruh router yang ada diserver 
    const server = Hapi.server({
        // // Mendefinisikan port di docker, jadi gak langsung
        // port: process.env.PORT,
        // host: '0.0.0.0',

        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    // Menambahkan rute-rute dari router.js ke server
    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();