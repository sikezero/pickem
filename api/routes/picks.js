const PicksController = require('../controllers/picks_controller');

module.exports = (app) => {
  app.get('/api/:league/:year/:weekNo', PicksController.index);
  app.post('/api/picks', PicksController.createPicks);
}