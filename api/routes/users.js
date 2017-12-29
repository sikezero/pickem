const UsersController = require('../controllers/users_controller');

module.exports = (app) => {
  
  app.post("/api/users/register", UsersController.create);

//   // Show register form
//   app.get("/register", function(req, res) {
//     res.render("register", {page: 'register'});
//   });

//   // Handle sign up logic
//   app.post("/register", function(req, res){
//     var newUser = new User({username: req.body.username});
//     User.register(newUser, req.body.password, function(err, user){
//       if(err){
//         // req.flash("error", err.message);
//         return res.render("register", {error: err.message});
//       }
//       passport.authenticate("local")(req, res, function(){
//         // req.flash("success", "Welcome to YelpCamp " + user.username);
//         res.redirect("/campgrounds"); 
//       });
//     });
// });

// // show login form
// router.get("/login", function(req, res) {
//     res.render("login", {page: 'login'});
// });

// // handling login logic
// router.post("/login", passport.authenticate("local", 
//     {
//         successRedirect: "/campgrounds", 
//         failureRedirect: "/login"
        
//     }), function(req, res) {
// });

// // logout route
// router.get("/logout", function(req, res) {
//     req.logout();
//     req.flash("success", "Logged you out!");
//     res.redirect("/campgrounds");
// });
}