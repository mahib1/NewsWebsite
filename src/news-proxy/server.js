const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;

const API_KEY = '8f61b51c0d9940809c05e1a88becc769';
const URL = 'https://newsapi.org/v2/everything';

app.use(cors());

app.get('/news', async (req, res) => {
    const query = req.query.q;
    try {
        const response = await axios.get(`${URL}`, {
            params: {
                q: query,
                apiKey: API_KEY
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

