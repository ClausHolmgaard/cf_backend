module.exports = (app) => {
    const workouts = require('../controllers/workouts');
    const info = require('../controllers/info');
    const coaches = require('../controllers/coaches');

    app.get('/info', info.info);
    app.get('/workouts', workouts.workouts);
    app.get('/coaches', coaches.coaches);
}