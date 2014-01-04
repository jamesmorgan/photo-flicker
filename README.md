photo-flicker
=============

A simple browser based image gallery application built using angular-js and node.js - WIP 

#### Project inception:

* To be used to display pieces of work by a tattoo artist
* Should be hosted internally on a single low resource machine/laptop
* Can be used on an Phone/Tablet and also on a wall mounted TV using a random/rotate mode.  

#### Requirements

* [node-js](http://nodejs.org) : v0.10.15
* [express-js](http://expressjs.com) : ~3.4.7
* [angular-js](http://angularjs.org) - 1.2.6
* [angular-ui](http://angular-ui.github.io/bootstrap/) - 0.9.0
* [bootstrap](http://getbootstrap.com/) - 3.0.3
* [angular-carousel](https://github.com/revolunet/angular-carousel)

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

##### Tech Stuff

* HTML5 - Fullscreen API - http://sindresorhus.com/screenfull.js/ - V1.1.1
* Buffered AngularJS Photo Carousel - https://github.com/revolunet/angular-carousel
* Each photo JSON Object you get the following fields
````
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

* Fix initial load
* Reset carousel after new category selected
* Next/Previous buttons implementation
* Next/Previous styling
* Disabled next/previous when reached end of photos
* Switch UI for random mode/ user mode - https://github.com/nostalgiaz/bootstrap-switch 
* http://www.jorisooms.be/testing-your-node-api-with-supertest/
* Refactor categories into a seperate object without photos
* FavIcon?
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