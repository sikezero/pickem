const mongoose    = require('mongoose'),
      Schema      = mongoose.Schema;
      
const TeamSchema = new Schema({
  city: String,
  name: String,
  abbreviation: String
});

const Team = mongoose.model('team', TeamSchema);
module.exports = Team;