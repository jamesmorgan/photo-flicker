photo-flicker
=============

A simple browser based image gallery application built using angular-js and node.js - WIP 

#### Project inception:

* To be used to display pieces of work by a tattoo artist
* Should be hosted internally on a single low resource machine/laptop
* Can be used on an Phone/Tablet and also on a wall mounted TV using a random/rotate mode.  

#### Requirements

* [node js](http://nodejs.org) : v0.10.15
* [express js](http://expressjs.com) : ~3.4.7
* [angular js](http://angularjs.org) - 1.2.6
* angular-touch
* angular-animate
* angular-ui
* jquery - 2.0.3
* twitter-bootstrap - 3.0.3

#### Running the Application

##### Install me

* `npm install express --save` - install dependencies

##### Start me up

* `nodejs app.js` when inside `angular-photo-flicker-express`

* _OR_ `DEBUG=express:* nodejs app.js` to DEBUG when inside `angular-photo-flicker-express`

* _OR_ `./start-server.js` from project route

* Http Server runs at: `http://localhost:8000/`

##### Configuration

* All photos and sub folder located in `/img/gallery/photos/{{category}}/{{photos}}` will be scanned - Max two level folder structure.
* Refresh app on F5 or click `Refresh` button

##### Tech

* HTML5 - Fullscreen API - http://sindresorhus.com/screenfull.js/
* Each photo JSON Object you get the following fields
````json
	{
	    full_path: "",
	    short_path: "",
	    name: "",
	    pretty_name_without_extension: "",
	    pretty_name: "",
	    modified_time: "",
	    create_time: "",
	    size: ""
	}
````

#### TODO

* Click on Image give full screen version
* Basic search
* Get real test data
* Swipe actions on images
* Small form factor mode - Gestures/swipe enabled, 
* Wall Mounted - rotate images randomly, full screen?
* Responsive css for tablets and TV screens
* Metadata files - possible options for details about category loaded?
* Highlight errors?
* Hosting - is it needed?
* Tests?

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/jamesmorgan/photo-flicker/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

