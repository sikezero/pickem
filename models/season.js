const mongoose    = require('mongoose'),
      Schema      = mongoose.Schema;
      
const SeasonSchema = new Schema({
  year: {
    type: Number,
    required: [true, "year is required"]
  },
  league: {
    // maybe create league Schema
    type: String,
    enum: ["NFL", "NCAAB", "NCAAF", "NBA", "MLB", "NHL"],
    required: [true, "league is required"],
    default: "NFL"
  },
  weeks: [{
    weekNo: {
      type: Number,
      required: [true, "weekNo is required"]
    },
    games: [{
      type: Schema.Types.ObjectId,
      ref: 'game'
    }]
  }],
  
});

SeasonSchema.pre('save', function(next) {
  var allGood = true;
  this.weeks.forEach((week)=>{
    week.games.forEach((game)=>{
      if(game.favorite !== game.homeTeam && game.favorite !== game.awayTeam) {
        allGood = false;
      } 
    });
  });
  if (allGood){
    next();
  } else {
    next(new Error('Favorite does not match either team in match up'));
  }
});

const Season = mongoose.model('season', SeasonSchema);
module.exports = Season;