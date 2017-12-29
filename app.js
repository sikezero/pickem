const express           = require('express'),
      app               = express(),
      bodyParser        = require('body-parser'),
      flash             = require("connect-flash"),
      mongoose          = require('mongoose'),
      passport          = require("passport"),
      LocalStrategy     = require("passport-local"),
      seedDB            = require("./seeds"),
      User              = require('./models/user');
    
// ROUTES    
const apiPickRoutes     = require('./api/routes/picks'),
      pickRoutes        = require('./routes/picks'),
      apiUserRoutes     = require('./api/routes/users'),
      userRoutes        = require('./routes/users');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/pickem', {useMongoClient: true});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.static(__dirname + "/public"));
app.use(flash());
//seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Rudy is definitely the cutest and snuggliest dog ever!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Make sure all routes have access to currentUser variable
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

apiPickRoutes(app);
pickRoutes(app);
apiUserRoutes(app);
userRoutes(app);
      
module.exports = app;