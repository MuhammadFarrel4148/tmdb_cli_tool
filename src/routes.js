const { movieList } = require("./handler");

const routes = [
    {
        method: 'GET',
        path: '/{typelist}',
        handler: movieList,
    }
];

module.exports = routes;
