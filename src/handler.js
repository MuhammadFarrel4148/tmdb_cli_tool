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
        let filteredResult;
        
        switch(UrlAddition) {
            case 'now_playing':
                filteredResult = {
                    dates: data.dates,
                    results: data.results.map(result => ({
                        id: result.id, 
                        title: result.title,
                        overview: result.overview,
                        release_date: result.release_date,
                    }))
                };
                break;
            case 'popular':
                filteredResult = {
                    results: data.results.map(result => ({
                        id: result.id, 
                        title: result.title,
                        overview: result.overview,
                        popularity: result.popularity,
                        release_date: result.release_date,
                    }))
                };
                break;
            case 'top_rated':
                filteredResult = {
                    results: data.results.map(result => ({
                        id: result.id, 
                        title: result.title,
                        overview: result.overview,
                        vote_average: result.vote_average,
                        vote_count: result.vote_count,
                        release_date: result.release_date,
                    }))
                };
                break;
            case 'upcoming': 
                filteredResult = {
                    dates: data.dates,
                    results: data.results.map(result => ({
                        id: result.id, 
                        title: result.title,
                        overview: result.overview,
                        release_date: result.release_date,
                    }))
                };
                break;
        };
        
        const response = h.response({
            status: 'success',
            filteredResult,
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
