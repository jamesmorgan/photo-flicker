photo-flicker
=============

A simple browser based image gallery application built using angular-js and node.js - WIP 

#### Requirements

* nodejs : v0.10.15
* express : ~3.4.7
* angular-js - 1.2.6 - http://angularjs.org/
* angular-touch
* angular-annimate
* jquery - 2.0.3
* twitter-bootstrap - 3.0.3

#### Running the Application

* `npm install express --save` - install dependencies

* `nodejs app.js` when inside `angular-photo-flicker-express`

* _OR_ `DEBUG=express:* nodejs app.js` to DEBUG when inside `angular-photo-flicker-express`

* _OR_ `./start-server.js` from project route

* Http Server runs at: `http://localhost:8000/`

* Photo Gallery = `img/gallery/photos/{{category}}/{{photos}}`

#### Thoughts/Ideas

* Users can flick through the site using ideas
* Responsive css

* User can manage the folder structure
* Based on filename
* filename matches database schema which can hold meta data
* Possible folder meta data based on simple JSON format file which is inside each folder

* Run on node.js
* Multi session
* No security required
