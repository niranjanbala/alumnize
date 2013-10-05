var express = require('express'),
    path = require('path'),
    http = require('http'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;
  passport.use(new FacebookStrategy({
    clientID: 514256625329292,
    clientSecret: a5ed124040736814f413ceaf753170a8,
    callbackURL: "http://alumnize-beta.herokuapp.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
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
    //app.use(facebook.middleware({ appId: '514256625329292', secret: 'a5ed124040736814f413ceaf753170a8' }));
    app.use(express.static(path.join(__dirname, 'public')));
});
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email,publish_stream,user_about_me,user_education_history,user_location,user_work_history']] });
);
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});