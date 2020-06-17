const uuid = require('../helpers/uuid');
const axios = require('axios');
require('dotenv').config();

// Get all info entry id's, if no id parameter is set
// Get all a single info entry, if id parameter is set
exports.info = async (req, res) => {
    console.log(`Info get request from ${req.hostname}`);

    const infoUrl = 'http://127.0.0.1:3400/info';
    const id = req.query.id;

    if(id === undefined) {
        axios.get(infoUrl)
            .then(response => {
                res.status(200).json(response.data);
            })
            .catch(error => {
                console.log('Error Found:');
                console.log(error);
                res.status(500).send('Something went wrong');
            })
    } else {
        axios.get(`${infoUrl}/${id}`)
            .then(response => {
                res.status(200).json(response.data);
            })
            .catch(error => {
                res.status(404).send(`Info entry with id ${id} not found`);
            })
    }
}

// Post a new info entry and generate id
exports.postInfo = async (req, res) => {
    console.log(`Info post request from ${req.hostname}`);

    const infoText = req.body['Text'];
    const newInfoUuid = uuid.generate();

    axios.post('http://localhost:3400/info', {
        id: newInfoUuid,
        Text: infoText === undefined ? '' : infoText
    })
        .then(response => {
            res.status(response.status).send('Success');
        })
        .catch(error => {
            console.log('Error during posting of info entry:');
            console.log(error);
            res.status(500).send('Something went wrong');
        })
}

// Update an existing info entry
exports.putInfo = (req, res) => {
    const infoUrl = 'http://127.0.0.1:3400/info';
    const id = req.query.id;
    const infoText = req.body['Text'];

    console.log(`Info put request from ${req.hostname}. ID: ${id}, TEXT: ${infoText}`);

    if(id === undefined) {
        res.status(400).send('No id defined');
        return;
    }

    axios.put(`${infoUrl}/${id}`, {
        Text: infoText === undefined ? '' : infoText
    })
        .then(response => {
            res.status(response.status).send('Success');
        })
        .catch(error => {
            console.log('Error during posting of info entry:');
            console.log(error);
            res.status(500).send('Something went wrong');
        })
}

// Delete an info entry
exports.deleteInfo = (req, res) => {
    console.log(`Info delete request from ${req.hostname}`);

    const infoUrl = 'http://127.0.0.1:3400/info';
    const id = req.query.id;

    if(id === undefined) {
        res.status(400).send('No id defined');
        return;
    }

    axios.delete(`${infoUrl}/${id}`)
        .then(response => {
            res.status(response.status).send('Success');
        })
        .catch(error => {
            res.status(500).send('Something went wrong');
        })
}