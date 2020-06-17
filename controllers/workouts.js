const axios = require('axios');
require('dotenv').config();

const baseUrl = 'https://api.sugarwod.com/v2/';

exports.workouts = async (req, res) => {

    const dates = req.query.dates;
    const track_id = req.query.track_id;

    //console.log(`dates: ${dates}`);
    //console.log(`track_id: ${track_id}`);

    if(dates === undefined || track_id === undefined) {
        console.log('dates or track_id not defined');
        res.status(400).send('Both date and track_id parameters must be defined');
        return;
    }

    const workoutUrl = new URL(`${baseUrl}/workouts`);
    workoutUrl.searchParams.append('apiKey', process.env.SUGARWOD_API_KEY);
    workoutUrl.searchParams.append('dates', dates);
    workoutUrl.searchParams.append('track_id', track_id);

    console.log(`Processing workouts request from ${req.hostname}`);

    axios.get(workoutUrl.toString())
        .then(response => {
            //console.log(JSON.stringify(response.data));
            res.json(response.data);
        })
        .catch(error => {
            console.log('Error Found:');
            console.log(error);
            res.status(500).send('Something went wrong');
        })
}