require('dotenv').config();
const axios = require('axios');

const movieList = async(request, h) => {
    const { typelist } = request.params;

    try {
        if(!typelist) {
            const response = h.response({
                status: 'fail',
                message: 'invalid typelist, should input correctly',
            });
            response.code(400);
            return response;
        };

        const type = {
            playing: 'now_playing',
            popular: 'popular',
            top: 'top_rated',
            upcoming: 'upcoming',
        };

        const UrlAddition = type[typelist];

        if(!UrlAddition) {
            const response = h.response({
                status: 'fail',
                message: 'invalid endpoint, try again',
            });
            response.code(404);
            return response;
        };
 
        const sendAPI = await axios.get(`${process.env.BASE_URL}/${UrlAddition}`, {
            params: {
                api_key: process.env.API_KEY
            }
        });

        const data = sendAPI.data;

        const response = h.response({
            status: 'success',
            result: data,
        });
        response.code(200);
        return response;

    } catch(error) {
        const response = h.response({
            status: 'fail',
            message: 'Invalid movie list',
        });
        response.code(400);
        return response;
    };
};

module.exports = { movieList };
