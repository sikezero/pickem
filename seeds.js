var Team = require("./models/team");
var teamData = require("./data/teamData");
var Game = require("./models/game");
var gameData = require('./data/gameData');
var Pick = require("./models/pick");

function loadTeams() {
  var promises = [];
  teamData.forEach((team) => {
    var promise = Team.create(team);
    promises.push(promise);
  });
  return Promise.all(promises)
    .then((teams) => {
      console.log('teams loaded');
      loadGames(teams);
    });
}

function loadGames(teams) {
  var promises = [];
  gameData.forEach((game) => {
    const newHomeTeam = teams.find(team=>team.name === game.homeTeam);
    const newAwayTeam = teams.find(team=>team.name === game.awayTeam);
    const newFavorite = teams.find(team=>team.name === game.favorite);
    game.homeTeam = newHomeTeam;
    game.awayTeam = newAwayTeam;
    game.favorite = newFavorite;
    var promise = Game.create(game);
    promises.push(promise);
  });
  return Promise.all(promises)
    .then(console.log('games loaded'));
}

function clearData() {
  var promises = [];
  promises.push(Team.remove({}));
  promises.push(Game.remove({}));
  promises.push(Pick.remove({}));
  return Promise.all(promises).
    then(console.log('Teams, games, and picks removed'));
}

function seedDB(){
  clearData()
    .then(() => loadTeams())
    .catch((err) => console.log(err));
}

module.exports = seedDB;

