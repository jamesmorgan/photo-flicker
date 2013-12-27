'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

angular.module('myApp.services', [])
	/**
	 * App Version
	 */
	.value('version', '0.1')
	/**
	 * Photo Loading Service
	 */
	.factory('PhotoService', ['$http', function($http) {

		var HTTP_ENDPOINT = "http://localhost:8000";

	    var static_photos = [
	    			{src: 'http://farm9.staticflickr.com/8042/7918423710_e6dd168d7c_b.jpg', desc: 'Image 01'},
			        {src: 'http://farm9.staticflickr.com/8449/7918424278_4835c85e7a_b.jpg', desc: 'Image 02'},
			        {src: 'http://farm9.staticflickr.com/8457/7918424412_bb641455c7_b.jpg', desc: 'Image 03'},
			        {src: 'http://farm9.staticflickr.com/8179/7918424842_c79f7e345c_b.jpg', desc: 'Image 04'},
			        {src: 'http://farm9.staticflickr.com/8315/7918425138_b739f0df53_b.jpg', desc: 'Image 05'},
			        {src: 'http://farm9.staticflickr.com/8461/7918425364_fe6753aa75_b.jpg', desc: 'Image 06'}
		        ];

	    var doLoadAllPhotos = function() {
	    	return $http({
	        	method: 'GET',
	        	headers: {
	        		"Accept": "application/json", 
	        		"Content-Type": "application/json" 
	        	},
	        	url: HTTP_ENDPOINT + "/api/gallery/load/all"
	      	});
	    }

	    return {
	      staticPhotos: function() { 
	      	return static_photos; 
	      },

	      loadPhotos: function() { 
	      	return doLoadAllPhotos();
	      },

    	};
  	}])
	.factory('PhotoImageScanning', ['$http', function($http) {


  	}]);