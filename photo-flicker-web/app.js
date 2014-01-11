
/**
 * Module dependencies
 */

var express = require('express');
var http 	= require('http');
var path 	= require('path');
var fs 		= require('fs');
var util	= require('util');

var app = module.exports = express();

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 5000);
app.use(express.logger('dev'));		// Log all requests to console
app.use(express.bodyParser()); 		// pull information from html in POST
app.use(express.methodOverride()); 	// simulate DELETE and PUT
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
}

options = {
	filters: [".json", "meta-data"]
}

/**
 * Routes
 */

// Must be defined above static content!
// http://scotch.io/tutorials/javascript/creating-a-single-page-todo-app-with-node-and-angular
// ------------------------------------------------------------------
// ------------------------------- api ------------------------------
// ------------------------------------------------------------------

// Gallery API
app.get('/api/gallery/load/all', 
	function(req, res) {
		var fullList = dirAndFileTree('photo-flicker-web/public/img/gallery/photos')
    	responseJson(res, fullList);
	}
);

// Category API

var responseJson = function(res, data){
	res.status(200);
	res.type('application/json');
	res.json(data); // return in JSON format
}		

// File/Folder Utilities

var buildFileInfo = function(filename, stats){
    var info = {
            full_path: filename,
            short_path: filename.replace("photo-flicker-web/public/",""),
            name: path.basename(filename),
            pretty_name_without_extension: clean(remove_extension(path.basename(filename))),
            pretty_name: clean(path.basename(filename)),
            modified_time: stats.mtime.getTime(),
            create_time: stats.ctime.getTime(),
            size: stats.size
        };
    return info;
}

var clean = function(value){
    return value.replace("_", " ");
}

var EXTENSIONS = ['.jpg', '.jpeg', '.png'];

var remove_extension = function(value) {
    EXTENSIONS.forEach(function(item) {
        value = value.replace(item, "")
    });
    return value;
}

var dirAndFileTree = function(filename) {
    var stats = fs.lstatSync(filename);
    var info = buildFileInfo(filename, stats);

    if (stats.isDirectory()) {
        info.type = "folder";
        info.children = fs.readdirSync(filename).map(function(child) {
            return dirAndFileTree(filename + '/' + child);
        });
    } else {
        // Assuming it's a file. In real life it could be a symlink or something else!
        info.type = "file";
    }
    return info;
}

// ------------------------------------------------------------------
// ----------------------------- angular ----------------------------
// ------------------------------------------------------------------

app.get('*', function(req, res) {
	res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// ------------------------------------------------------------------
// -------------------------- Error Handle --------------------------
// ------------------------------------------------------------------

var logErrors = function(err, req, res, next) {
	console.error(err.stack);
	next(err);
}

var clientErrorHandler = function(err, req, res, next) {
	if (req.xhr) {
		res.send(500, { error: 'Something blew up!' });
	} else {
		next(err);
	}
}

var errorHandler = function(err, req, res, next) {
	res.status(500);
	res.render('error', { error: err });
}

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

/**
 * Start Server
 */
// http.createServer(app)
//     .listen(app.get('port'), function () {
//         console.log('Express server listening on port ' + app.get('port'));
//     });

app.listen(process.env.PORT || app.get('port'), function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});