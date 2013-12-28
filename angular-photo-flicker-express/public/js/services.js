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

	.factory('SelectionService', ['$log', function($log) {
		
		var photoMetaData = [];
		var categoriesMetaData = [];

		return {
			getSelectedPhotos: function(){
				$log.info("getSelectedPhotos : " + photoMetaData);
				return photoMetaData;
			},

			setSelectedPhotos: function(data){
				$log.info("setSelectedPhotos : " + data);
				photoMetaData = data;
			},

			getCategories: function(){
				$log.info("getCategories : " + categoriesMetaData);
				return categoriesMetaData;
			},

			setCategories: function(data){
				$log.info("setCategories : " + data);
				categoriesMetaData = data;
			},
		}
	}])
	.factory('GalleryService', ['$rootScope', '$http', '$log', function($rootScope, $http, $log) {

		var HTTP_ENDPOINT = "http://localhost:8000";
		var GALLERY_API = "/api/gallery";
		var CATEGORY_API = "/api/category";

	    var doLoadAllPhotos = function() {
	    	return $http({
	        	method: 'GET',
	        	headers: {
	        		"Accept": "application/json", 
	        		"Content-Type": "application/json" 
	        	},
	        	url: HTTP_ENDPOINT + GALLERY_API + "/load/all"
	      	});
	    }

	    var doLoadAllCategories = function() {
	    	return $http({
	        	method: 'GET',
	        	headers: {
	        		"Accept": "application/json", 
	        		"Content-Type": "application/json" 
	        	},
	        	url: HTTP_ENDPOINT + CATEGORY_API + "/load/all"
	      	});
	    }

	    return {
	      	loadPhotos: function() { 
		      	return doLoadAllPhotos();
  			},

			loadCategories: function(){
				return doLoadAllCategories();
			}
    	};
  	}]);