
/**
 * Module dependencies
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = module.exports = express();

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 8000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};

/**
 * Routes
 */

// Must be defined above static content!
// ------------------------------------------------------------------
// ------------------------------- api ------------------------------
// ------------------------------------------------------------------

// Gallery API
app.get('/api/gallery/load/all', 
	function(req, res) {

		res.json({ 'A':1, 'B':2, 'C':3 }); // return in JSON format
	}
);

// ------------------------------------------------------------------
// ----------------------------- angular ----------------------------
// ------------------------------------------------------------------

app.get('*', function(req, res) {
	res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});



/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
