photo-flicker
=============

A simple browser based image gallery application built using angular-js and node.js - WIP 

#### Project inception:

* To be used to display pieces of work by a tattoo artist
* Should be hosted internally on a single low resource machine/laptop
* Should be viewable on the following devices
 * Wall mounted TV - randomise mode
 * Smart phone
 * Tablet - Android/IPad  


#### Libraries Used

* [node-js](http://nodejs.org) : v0.10.15
* [express-js](http://expressjs.com) : ~3.4.7
* [angular-js](http://angularjs.org) - 1.2.6
* [angular-ui](http://angular-ui.github.io/bootstrap/) - 0.9.0
* [angular-touch](http://docs.angularjs.org/api/ngTouch)
* [angular-animate](http://docs.angularjs.org/api/ngAnimate)
* [angular-carousel](https://github.com/revolunet/angular-carousel)
* [bootstrap](http://getbootstrap.com/) - 3.0.3
* [hammer.js](https://github.com/EightMedia/hammer.js)

#### Running the Application

##### Install me

* `npm install express --save` - install dependencies

##### Start me up

* `node app.js` when inside `photo-flicker-web`
* _OR_ `foreman start` from project route
* _OR_ `./start-server.js` from project route
* Http Server runs at: `http://localhost:5000/`

##### Configuration

* All photos and sub folder located in `/img/gallery/photos/{{category}}/{{photos}}` will be scanned - Max two level folder structure.

##### Heroku Stuff

* Visit sample running application at [photo-flicker.herokuapp](http://photo-flicker.herokuapp.com)
* Restart `heroku restart`
* Update instance `git push heroku master`
* View logs `heroku logs`
* Adding nodejs build pack - `heroku config:set BUILDPACK_URL=https://github.com/heroku/heroku-buildpack-nodejs`
* View git remotes `git remote -v`

##### Tech Stuff

* HTML5 - Fullscreen API - http://sindresorhus.com/screenfull.js/ - V1.1.1
* Buffered AngularJS Photo Carousel - https://github.com/revolunet/angular-carousel
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

* Project structure layout - file/folder organisation
* pollyfill EMScript5?
* Install and use Bower?

* Swipe up/down in fullscreen when on mobile?
* touch events - gestures?
* Alert on unable to disable fullscreen
* Global error handler?
* Enhanced logging - http://solutionoptimist.com/2013/10/07/enhance-angularjs-logging-using-decorators/
* Switch UI for random mode/ user mode - https://github.com/nostalgiaz/bootstrap-switch 
* Wall Mounted - rotate images randomly, full screen?
* Progress bar when loading: http://angular-ui.github.io/bootstrap/#/progressbar
* How to display search on mobile?
* Session Favourites - on every session start the ones you are interested in.
* Refactor categories into a separate object without photos
* Remove duplicate variables photos/categories
* Get real test data
* Metadata files - possible options for details about category loaded?
* Tests - http://www.jorisooms.be/testing-your-node-api-with-supertest/?
* Docs / Info?
* FavIcon?

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/jamesmorgan/photo-flicker/trend.png)](https://bitdeli.com/free "Bitdeli Badge")