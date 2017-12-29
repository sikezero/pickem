const mongoose      = require('mongoose'),
      Schema        = mongoose.Schema;
      
const GameSchema = new Schema({
  homeTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "team"
  },
  awayTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "team"
  },
  homeTeamScore: {
    type: Number,
    required: [true, "score is required"],
    default: 0
  },
  awayTeamScore: {
    type: Number,
    required: [true, "score is required"],
    default: 0
  },
  date: {
    type: Date,
    required: [true, "date is required"]
  },
  favorite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "team"
  },
  spread: {
    type: Number,
    default: 0
  },
  weekNo: {
    type: Number,
    required: [true, "weekNo is required"],
  },
  year: {
    type: Number,
    required: [true, "year is required"],
  },
  league: {
    // maybe create league Schema
    type: String,
    enum: ["NFL", "NCAAB", "NCAAF", "NBA", "MLB", "NHL"],
    required: [true, "league is required"],
    default: "NFL"
  }
});

GameSchema.pre('save', function(next) {
  var allGood = true;
  if(this.favorite !== this.homeTeam && this.favorite !== this.awayTeam) {
        allGood = false;
  } 
  if (allGood){
    next();
  } else {
    next(new Error('Favorite does not match either team in match up'));
  }
});

const Game = mongoose.model('game', GameSchema);
module.exports = Game;