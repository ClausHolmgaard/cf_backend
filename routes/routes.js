module.exports = (app) => {
    const workouts = require('../controllers/workouts');
    const info = require('../controllers/info');
    const coaches = require('../controllers/coaches');
    const tracks = require('../controllers/tracks');

    app.get('/info', info.info);
    app.post('/info', info.postInfo);
    app.put('/info', info.putInfo);
    app.delete('/info', info.deleteInfo);

    app.get('/coaches', coaches.coaches);
    app.put('/coaches', coaches.coachesPut);
    
    app.get('/workouts', workouts.workouts);

    app.get('/tracks', tracks.tracks);

}