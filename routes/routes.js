module.exports = (app) => {
    const controller = require('../controllers/controller');

    app.get('/info', controller.info);
    app.get('/workouts', controller.workouts);
}