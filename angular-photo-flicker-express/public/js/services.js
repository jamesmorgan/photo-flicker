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

			setSelectedPhotos: function(data){
				$log.info("setSelectedPhotos : " + data);
				this.photos = data;
			},

			setCategories: function(data){
				$log.info("setCategories : " + data);
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
		var CATEGORY_API = "/api/category";

	    var doLoadAllCategories = function() {
	    	return $http({
	        	method: 'GET',
	        	headers: { "Accept": "application/json", "Content-Type": "application/json" },
	        	url: HTTP_ENDPOINT + CATEGORY_API + "/load/all"
	      	});
	    }

	    var doLoadAllPhotos = function() {
	    	return $http({
	        	method: 'GET',
	        	headers: { "Accept": "application/json", "Content-Type": "application/json" },
	        	url: HTTP_ENDPOINT + GALLERY_API + "/load/all"
	      	});
	    }

	    return {
    		loadAllPhotos: function(){
				return doLoadAllPhotos();
    		},

			loadCategories: function(){
				return doLoadAllCategories();
			}
    	};
  	}])
	/**
	 * Screen Full Service Wrapper
	 */
	.factory('ScreenfullService', ['$document', '$rootScope', '$log', function($document, $rootScope, $log) {
    	
    	var screenfullService = {
    		inFullScreen: false
    	};

		screenfullService.fullScreen = function (element) {
            if (screenfull.enabled) {
                screenfull.request(element); // TODO fix black backgroup
            }
	    };

		screenfullService.exit = function () {
            screenfull.exit(); 
	    };

		$document.on(screenfull.raw.fullscreenchange, function () {
			screenfullService.inFullScreen = screenfull.isFullscreen;
			$log.debug('In Full Screen Mode ' + screenfullService.inFullScreen);
			$rootScope.$apply();
		});

	    return screenfullService;
	}]);