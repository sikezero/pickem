const mongoose    = require('mongoose'),
      Schema      = mongoose.Schema;
      
const PickSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
    //required: [true, 'User is required.']
  },
  game: {
    type: Schema.Types.ObjectId,
    ref: 'game',
    required: [true, 'Game is required.']
  },
  pick: {
    type: String,
    enum: ["home", "away"]
  },
  confidence: {
    type: Number,
    default: 0
  }
});

const Pick = mongoose.model('pick', PickSchema);
module.exports = Pick;
  