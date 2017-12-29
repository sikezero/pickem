const User = require('../../models/user');
const passport = require("passport");

module.exports = {
  
  create(req, res, next) {
    var newUser = new User({username: req.body.username, email: req.body.email});
    User.register(newUser, req.body.password, function(err, user){
      if(err){
        //console.log(err);
        //const error = new Error(err.message);
        //console.log(error);
        res.status(500).send(err)
      }
      passport.authenticate("local")(req, res, function(){
        res.status(200).send(user);
      });
    });
  },

  
}