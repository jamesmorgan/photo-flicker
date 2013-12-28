
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

options = {
	followLinks: false,
	filters: ["Temp", "_Temp", "meta-data"] // directories with these keys will be skipped
};

/**
 * Routes
 */

// Must be defined above static content!
// http://scotch.io/tutorials/javascript/creating-a-single-page-todo-app-with-node-and-angular
// ------------------------------------------------------------------
// ------------------------------- api ------------------------------
// ------------------------------------------------------------------

var static_photos = [
	{src: 'http://farm9.staticflickr.com/8042/7918423710_e6dd168d7c_b.jpg', desc: 'Image 01'},
	{src: 'http://farm9.staticflickr.com/8449/7918424278_4835c85e7a_b.jpg', desc: 'Image 02'},
	{src: 'http://farm9.staticflickr.com/8457/7918424412_bb641455c7_b.jpg', desc: 'Image 03'},
	{src: 'http://farm9.staticflickr.com/8179/7918424842_c79f7e345c_b.jpg', desc: 'Image 04'},
	{src: 'http://farm9.staticflickr.com/8315/7918425138_b739f0df53_b.jpg', desc: 'Image 05'},
	{src: 'http://farm9.staticflickr.com/8461/7918425364_fe6753aa75_b.jpg', desc: 'Image 06'}
];

// Gallery API
app.get('/api/gallery/load/all', 
	function(req, res) {
    	responseJson(res, static_photos);
	}
);

// Category API
app.get('/api/category/load/all', 
	function(req, res) {

		var dirTreeList = loadFolderTree('public/img/gallery/photos')
		console.log(dirTreeList) 
		console.log(dirTreeList.children) 
		console.log(dirTreeList.children[0].children[0]) 

    	responseJson(res, dirTreeList);	
	}
);

var responseJson = function(res, data){
	res.status(200);
	res.type('application/json');
	res.json(data); // return in JSON format
}		

// File/Folder Utilities

var buildFileInfo = function(filename, stats){
    var info = {
            full_path: filename,
            short_path: filename.replace("public/",""),
            name: path.basename(filename),
            pretty_name: path.basename(filename).replace("_", " "),
            modified_time: stats.mtime.getTime(),
            create_time: stats.ctime.getTime(),
            size: stats.size
        };
    return info;
}

var loadFolderTree = function(filename){
    var stats = fs.lstatSync(filename);
    if (stats.isDirectory()) {
	    var info = buildFileInfo(filename, stats);
        info.type = "folder";
        info.children = fs.readdirSync(filename).map(function(child) {
            return loadFolderTree(filename + '/' + child);
        });
		return info;
	}
	return;
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
        // Assuming it's a file. In real life it could be a symlink or
        // something else!
        info.type = "file";
    }
    return info;
}

var dirTree = function(filename) {
    var stats = fs.lstatSync(filename);
    var info = buildFileInfo(filename, stats);

    if (stats.isDirectory()) {
        info.type = "folder";
        info.children = fs.readdirSync(filename).map(function(child) {
            return dirTree(filename + '/' + child);
        });
    } else {
        // Assuming it's a file. In real life it could be a symlink or
        // something else!
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

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
