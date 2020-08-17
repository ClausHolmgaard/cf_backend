const axios = require('axios');
require('dotenv').config();

const baseUrl = 'https://api.sugarwod.com/v2/';

exports.tracks = async (req, res) => {
    console.log(`Processing tracks request from ${req.hostname}`);

    const dates = req.query.dates;

    const trackUrl = new URL(`${baseUrl}/tracks`);
    trackUrl.searchParams.append('apiKey', process.env.SUGARWOD_API_KEY);
    if(!dates === undefined) {
        trackUrl.searchParams.append('dates', dates);
    }

    axios.get(trackUrl.toString())
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.log('Error Found:');
            console.log(error);
            res.status(500).send('Something went wrong');
        })
}