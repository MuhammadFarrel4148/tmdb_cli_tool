const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async() => {
    const server = Hapi.server({
        host: 'localhost',
        port: '8080',
    });

    server.route(routes);
    await server.start();
    console.log(`Server berjalan di ${server.info.uri}`);
};

init();
