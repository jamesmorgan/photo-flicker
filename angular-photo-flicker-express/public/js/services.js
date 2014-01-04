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

        	resetModel: function(){
	            this.selectedSubCategory = -1;
            	this.selectedCategory = -1;
            	this.selectedCategoryName = "Category";
				this.selectedSubCategoryName = "Sub Category";
				this.selectedPhotos = [];
        	},

			updateMetaData: function(data){
				$log.info("Recieved Photo Data : " + data);
				this.photos = data;
				this.categories = data;
			},

			updatedPhotoSelection: function(){
				if(this.selectedCategory == -1 || this.selectedSubCategory == -1){
					return;
				}
				var category = this.photos.children[this.selectedCategory];
				var subCategory = category.children[this.selectedSubCategory];

				this.selectedCategoryName = category.pretty_name;
				this.selectedSubCategoryName = subCategory.pretty_name;

				this.selectedPhotos = subCategory.children; 
				$log.info("Photo Selection Updated : " + this.toStringSelected());
			},

            queryPhotos: function(value){
	            var cleanLookup = val.toLowerCase().replace("_","").replace(" ","");
	            $log.info("Lookup - " + cleanLookup);
	            var addresses = [];
	            for(var cat in Data.photos.children){
	                var cleanVal = Data.photos.children[cat].pretty_name.toLowerCase().replace("_","");
	                if(cleanVal.contains(cleanLookup)){
	                    addresses.push(Data.photos.children[cat].pretty_name)
	                }
	            }
	            return addresses;
            },

			toStringSelected: function(){
				return "Category: [" + this.selectedCategoryName + "], Index: [" + this.selectedCategory +"], " + 
					 	"Sub Category: [" + this.selectedSubCategoryName + "], Index: [" + this.selectedSubCategory +"]";
			},
		}
	}])
	/**
	 * Gallery Loading Service
	 */
	.factory('GalleryService', ['$rootScope', '$http', '$log', 'Data', 
		function($rootScope, $http, $log, Data) {

		var HTTP_ENDPOINT = "http://localhost:8000";
		var GALLERY_API = "/api/gallery";

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

	    return {
    		lookupPhotoData: function(){
	            Data.resetModel();
				doLoadAllPhotos()
					.success(function(data, status, headers) {
	                    $log.info("lookupPhotoData Success - status : " + status + " data : " + data);
	                    Data.updateMetaData(data);
	                })
	                .error(function(data, status, headers){
	                    $log.info("Failure - status : " + status);
	                });
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