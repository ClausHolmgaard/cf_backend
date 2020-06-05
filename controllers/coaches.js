const axios = require('axios');
require('dotenv').config();

const baseUrl = 'https://api.sugarwod.com/v2/';

exports.coaches = async (req, res) => {

    const coachUrl = new URL(`${baseUrl}/athletes`);
    coachUrl.searchParams.append('apiKey', process.env.SUGARWOD_API_KEY);
    coachUrl.searchParams.append('role', 'coach');

    console.log(`Processing coaches request from ${req.hostname}`);

    axios.get(coachUrl.toString())
        .then(response => {
            //console.log(JSON.stringify(response.data));
            res.json(response.data);
        })
        .catch(error => {
            console.log('Error Found:');
            console.log(error);
            res.status(500);
            res.send('Something went wrong');
        })
}