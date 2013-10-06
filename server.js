var express = require('express'),
    path = require('path'),
    http = require('http'),
    users = require('./routes/users'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google').Strategy,
    LinkedInStrategy = require('passport-linkedin').Strategy;
var FACEBOOK_APP_ID = "629803890376356"
var FACEBOOK_APP_SECRET = "e08df1dcb0bc79deed0d78946791e1de";
var LINKEDIN_API_KEY = "12sy2ze5kvxl";
var LINKEDIN_SECRET_KEY = "qNXH12sq4DaZpYPR";
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://alumnize-beta.herokuapp.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    users.findOrCreateFaceBookUser(accessToken, refreshToken, profile, done);
  }
));

passport.use(new GoogleStrategy({
    returnURL: 'http://alumnize-beta.herokuapp.com/auth/google/return',
    realm: 'http://alumnize-beta.herokuapp.com/'
  },
  function(identifier, profile, done) {
    users.findOrCreateGoogleUser(identifier, profile, done);
  }
));
passport.use(new LinkedInStrategy({
    consumerKey: LINKEDIN_API_KEY,
    consumerSecret: LINKEDIN_SECRET_KEY,
    callbackURL: "http://alumnize-beta.herokuapp.com/auth/linkedin/callback" 
  },
  function(token, tokenSecret, profile, done) {
    users.findOrCreateLinkedInUser(token, tokenSecret, profile, done);
  }
));

var app = express();
app.use(express.logger());
app.use(express.bodyParser());
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
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
  res.jsonp(req.user);
});

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email','publish_stream','user_about_me','user_education_history','user_location','user_work_history'] })
);

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/#home',
                                      failureRedirect: '/#login' }));
app.get('/auth/google', 
  passport.authenticate('google')
);

app.get('/auth/google/return', 
  passport.authenticate('google', { successRedirect: '/#home',
                                    failureRedirect: '/#login' }));

app.get('/auth/linkedin',
  passport.authenticate('linkedin', { scope: ["r_fullprofile", "r_emailaddress","r_contactinfo"] })
);
app.get('/auth/linkedin/callback',
  passport.authenticate('linkedin',  { successRedirect: '/#home',
                                    failureRedirect: '/#login' })
);
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/#login')
}
