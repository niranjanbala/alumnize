var express = require('express'),
    path = require('path'),
    http = require('http'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;
var FACEBOOK_APP_ID = "514256625329292"
var FACEBOOK_APP_SECRET = "a5ed124040736814f413ceaf753170a8";
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://http://alumnize-beta.herokuapp.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));
var app = express();
app.use(express.logger());
app.use(express.bodyParser());
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.logger());
  	app.use(express.cookieParser());  
  	app.use(express.methodOverride());
  	app.use(express.session({ secret: 'keyboard cat' }));
  	app.use(passport.initialize());
  	app.use(passport.session());
  	app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/account', ensureAuthenticated, function(req, res){
  //res.render('account', { user: req.user });
  console.log(req.user);
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){
  });

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}