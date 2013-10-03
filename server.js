require.paths.unshift(__dirname + '/../../lib')
require.paths.unshift(__dirname + '/../../lib/support/express/lib')
require.paths.unshift(__dirname + '/../../lib/support/hashlib/build/default')
var express = require('express'),
    path = require('path'),
    http = require('http');
var app = express();
app.use(express.logger());
app.use(express.bodyParser());
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
