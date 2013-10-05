var express = require('express'),
    path = require('path'),
    http = require('http'),
    facebook = require('facebook-node-sdk');
var app = express();
app.use(express.logger());
app.use(express.bodyParser());
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(facebook.middleware({ appId: '514256625329292', secret: 'a5ed124040736814f413ceaf753170a8' }));
    app.use(express.static(path.join(__dirname, 'public')));
});
app.get('/', facebook.loginRequired(), function (req, res) {
  req.facebook.api('/me', function(err, user) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, ' + user.name + '!');
  });
});
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});