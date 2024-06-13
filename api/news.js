// api/news.js

const axios = require('axios');

const API_KEY = '8f61b51c0d9940809c05e1a88becc769';
const URL = 'https://newsapi.org/v2/everything';

module.exports = async (req, res) => {
    const { query } = req.query;

    try {
        const response = await axios.get(URL, {
            params: {
                q: query,
                apiKey: API_KEY
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
