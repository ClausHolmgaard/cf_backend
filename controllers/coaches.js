const axios = require('axios');
const exp = require('express');
require('dotenv').config();

/*
* Name and picture from SugarWOD
* Info text from local database
*
* Currently, all coach info fetched from backend on every config, and local db checked for ID's and updated.
* It would probably be a better solution, to keep all data sent to front end in the local database,
* and then have an 'import from SugarWOD' button in the front end.
* */

const baseUrl = 'https://api.sugarwod.com/v2/';
const coachUrl = process.env.DATABASE_IP + '/coaches';

// Get list of coaches, and make sure local db is updated
// TODO: Consider making it possible to request coaches without updating local db (only needed in config)
exports.coaches = async (req, res) => {
    const coachUrl = new URL(`${baseUrl}/athletes`);
    coachUrl.searchParams.append('apiKey', process.env.SUGARWOD_API_KEY);
    coachUrl.searchParams.append('role', 'coaches');

    console.log(`Processing coaches request from ${req.hostname}`);

    axios.get(coachUrl.toString())
        .then(async (response) => {
            //console.log(JSON.stringify(response.data));
            const coachIds = response.data['data'].map(i => i['id']);
            // Attempt to post all coach id's to local db
            // id's that fail are assumed to exist
            coachIds.map(x => coachesPost(x));

            const newResponse = response.data['data'].map(async (x) => {
                const info = await getCoachInfo(x['id']);
                x['data'] = info;
                return x;
            })

            const responseDone = await Promise.all(newResponse);
            //console.log(responseDone);

            return res.json(responseDone);
        })
        .catch(error => {
            console.log('Error when processing coaches request:');
            //console.log(error);
            res.status(500);
            res.send('Something went wrong');
        })
}

// Post new coach id to local db
const coachesPost = async (coachId) => {
    axios.post(coachUrl, {
        id: coachId
    })
        .then(response => {
            return true;
        })
        .catch(error => {
            return false;
        })
}

// Get infoText from single coach
const getCoachInfo = async (coachId) => {
    const info = axios.get(`${coachUrl}/${coachId}`)
        .then(response => {
            //console.log('info for ' + coachId + ': ' + response.data["Text"]);
            const resp = {
                Text: response.data['Text'] === undefined ? '' : response.data['Text'],
                Show: response.data['Show'] === undefined ? true : response.data['Show']
            }

            return resp;
        })
        .catch(error => {
            console.log('Error getting coach info for id: ' + coachId);
            console.log('\tRequest: ' + `${coachUrl}/${coachId}`)
        })

    return await info;
}

// Update info for a coach
// Expects a coach json string, with id and info text
exports.coachesPut = async (req, res) => {
    const id = req.query.id;
    const coachText = req.body['Text'];
    const coachShow = req.body['Show'];

    if(id === undefined) {
        res.status(400).send('No id defined');
        return;
    }

    axios.put(`${coachUrl}/${id}`, {
        Text: coachText === undefined ? '' : coachText,
        Show: coachShow === undefined ? true : coachShow
    })
        .then(response => {
            res.status(response.status).send('Success');
        })
        .catch(error => {
            console.log('Error during posting of info entry:');
            //console.log(error);
            res.status(500).send('Something went wrong');
        })
}

