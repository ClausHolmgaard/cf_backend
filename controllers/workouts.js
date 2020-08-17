const axios = require('axios');
require('dotenv').config();

const baseUrl = 'https://api.sugarwod.com/v2/';

exports.workouts = async (req, res) => {

    console.log(`Processing workouts request from ${req.hostname}`);

    const dates = req.query.dates;
    const track_id = req.query.track_id;

    const workoutUrl = new URL(`${baseUrl}/workouts`);
    workoutUrl.searchParams.append('apiKey', process.env.SUGARWOD_API_KEY);
    if(!dates === undefined) {
        workoutUrl.searchParams.append('dates', dates);
    }
    if(!track_id === undefined) {
        workoutUrl.searchParams.append('track_id', track_id);
    }

    axios.get(workoutUrl.toString())
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.log('Error processing workouts request:');
            //console.log(error);
            res.status(500).send('Something went wrong');
        })
}