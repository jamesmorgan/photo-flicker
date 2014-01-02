'use strict';

/* Services */

angular.module('myApp.services', [])
	/**
	 * App Version
	 */
	.value('version', '0.1')
	/**
	 * Shared Application Data
	 */
	.factory('Data', ['$log', function($log) {

		return {
            
			photos: [],

			categories: [],
			
			selectedPhotos: [],

			selectedCategory: -1,
            selectedSubCategory: -1,

            selectedCategoryName: "Category",
			selectedSubCategoryName: "Sub Category",            

			setMetaData: function(data){
				$log.info("setMetaData : " + data);
				this.photos = data;
				this.categories = data;
			},

			updatedPhotoSelection: function(){
				$log.info("updatedPhotoSelection - Category: " + this.selectedCategory + " | Sub Category: " + this.selectedSubCategory);
				var category = this.photos.children[this.selectedCategory];
				var subCategory = category.children[this.selectedSubCategory];

				this.selectedCategoryName = category.pretty_name;
				this.selectedSubCategoryName = subCategory.pretty_name;

				this.selectedPhotos = subCategory.children; 
			},

			toStringSelected: function(){
				return "Category: " + this.selectedCategory + " | Sub Category: " + this.selectedSubCategory;
			},
		}
	}])
	/**
	 * Gallery Loading Service
	 */
	.factory('GalleryService', ['$rootScope', '$http', '$log', function($rootScope, $http, $log) {

		var HTTP_ENDPOINT = "http://localhost:8000";
		var GALLERY_API = "/api/gallery";

	    var doLoadAllPhotos = function() {
	    	return $http({
	        	method: 'GET',
	        	headers: { "Accept": "application/json", "Content-Type": "application/json" },
	        	url: HTTP_ENDPOINT + GALLERY_API + "/load/all"
	      	});
	    }

	    return {
    		lookupPhotoData: function(){
				return doLoadAllPhotos();
    		},
    	};
  	}])
	/**
	 * Screen Full Service Wrapper
	 */
	.factory('ScreenfullService', ['$document', '$rootScope', '$log', function($document, $rootScope, $log) {
    	
    	var screenfullService = {
    		inFullScreen: false,
    		fullscreenError: false
    	};

		screenfullService.fullScreen = function (element) {
            if (screenfull.enabled) {
                screenfull.request(element);
            }
	    };

		screenfullService.exit = function () {
            screenfull.exit(); 
	    };

		screenfullService.toggle = function (element) {
            if (screenfull.enabled) {
	            screenfull.toggle(element); 
            }
	    };

		$document.on(screenfull.raw.fullscreenchange, function () {
			screenfullService.inFullScreen = screenfull.isFullscreen;
			screenfullService.fullscreenError = false;
			$log.debug('In Full Screen Mode ' + screenfullService.inFullScreen);
			$rootScope.$apply();
		});

		$document.on(screenfull.raw.fullscreenerror, function () {
			screenfullService.inFullScreen = false;
			screenfullService.fullscreenError = true;
			$log.debug('Unable to get into fullscreen mode, enabled = ' + screenfull.enabled);
			$rootScope.$apply();
		});

	    return screenfullService;
	}]);