var request = require('request');
var User = require('../models/user');
var passport = require("passport");

module.exports = (app) => {
  
  app.get('/login', (req, res) => {
    res.render('login', {page: 'login'});
  });
  
  app.post("/login", passport.authenticate("local", 
      {
          successRedirect: "/", 
          failureRedirect: "/login"
          
      }), function(req, res) {
  });
  
  app.get('/users/:id', (req, res) => {
    User.findOne({_id: req.params.id})
      .then(user => res.render('user', {user: user}))
  });
  
  app.get('/register', (req, res) => {
    res.render('register', {page: 'register'});
  });
  
  app.post('/register', (req, res) => {
    const url = 'http://127.0.0.1:' + process.env.PORT + '/api/users/register';
    request({
      url: url,
      method: 'POST',
      form: req.body
    }, function(error, response, body) {
        if(error){
          res.redirect('/register');
        } else {
          if(JSON.parse(body).username){
            req.flash("success", "Welcome " + JSON.parse(body).username);
            res.redirect('/users/' + JSON.parse(body)._id);
          } else {
            req.flash("error", JSON.parse(body).message);
            res.redirect('/register');            
          }
        }
    });
  });
  
  // logout route
  app.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
  });
  
  app.get('/', (req, res) => {
    res.render('index', {page: 'index'});
  });
  
}