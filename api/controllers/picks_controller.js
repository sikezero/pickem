const Pick = require('../../models/pick');
const Game = require('../../models/game');
const Team = require('../../models/team');

module.exports = {
  
  index(req, res, next) {
    var picks = [];
    Game.find(req.params)
      .populate({path: 'homeTeam', model: 'team'})
      .populate({path: 'awayTeam', model: 'team'})
      .populate({path: 'favorite', model: 'team'})
      .then((games) => {
        var promises = [];
        games.forEach((game)=>{
          const newPick = new Pick({game: game});
          picks.push(newPick);
          promises.push(newPick.save())
        });
        Promise.all(promises)
          .then(res.send(picks));
      })
      .catch(next);
  },
  
  createPicks(req, res, next) {
    var promises = [];
    Object.keys(req.body).forEach(key => {
      promises.push(Pick.findByIdAndUpdate({_id: key}, {pick: req.body[key]}, {new: true}))
      // console.log(key);          // the name of the current key.
      // console.log(req.body[key]);   // the value of the current key.
    });
    Promise.all(promises)
      .then((picks) => res.send(picks))
      .catch(next);
  }
  
}