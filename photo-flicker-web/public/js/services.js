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
	.factory('Data', ['$log', '$rootScope', function($log, $rootScope) {

		return {
            
			photos: [],
			categories: [],

			selectedPhotos: [],

			selectedCategory: null,
   			selectedSubCategory: null,
   			searchResults: null,

            selectedCategoryName: "Category",
			selectedSubCategoryName: "Sub Category",            

        	resetModel: function(){
   				this.searchResults = null;
	            this.selectedSubCategory = null;
            	this.selectedCategory = null;
            	this.selectedCategoryName = "Category";
				this.selectedSubCategoryName = "Sub Category";
				this.selectedPhotos = [];
        	},

        	hasValidCategorySelection: function(){
                return this.selectedCategory != null && this.selectedSubCategory != null;
            },

			updateMetaData: function(data){
				$log.info("Received Photo Data : " + data);
				this.photos = data;
				this.categories = data;
			},

			selectInitialSubCategory: function(){
				if(this.selectedCategory != null && this.selectedCategory.children.length >= 1){
					this.selectedSubCategory = this.selectedCategory.children[0];					
				}
			},

			onSwipeSubCategoryUp: function(){
            	$log.info("onSwipeSubCategoryUp");
				var currentIndex = this.findSelectedSubCategoryIndex();
				if(currentIndex == -1 || currentIndex == (this.selectedCategory.children.length - 1)){
					$log.info("Reached maximum sub category");
					return;
				}
				this.selectedSubCategory = this.selectedCategory.children[currentIndex + 1];					
			},

			onSwipeSubCategoryDown: function(){
	            $log.info("onSwipeSubCategoryDown");
				var currentIndex = this.findSelectedSubCategoryIndex();
				if(currentIndex == -1 || currentIndex == 0){
					$log.info("Reached maximum sub category");
					return;
				}	
				this.selectedSubCategory = this.selectedCategory.children[currentIndex - 1];
			},

			findSelectedSubCategoryIndex: function(){
				var _self = this;
				var currentIndex = -1;
				angular.forEach(this.selectedCategory.children, function(obj, i) {
	            	if(_self.selectedSubCategory == obj){
						$log.info("Found sub category index: " + i);
		            	currentIndex = i;
	            	}
		        });
		        return currentIndex;
			},

			updatedPhotoSelection: function(){
				if(!this.hasValidCategorySelection()){
					return;
				}
				this.selectedCategoryName = this.selectedCategory.pretty_name;
				this.selectedSubCategoryName = this.selectedSubCategory.pretty_name;

				this.selectedPhotos = this.selectedSubCategory.children; 
				$log.info("Photo Selection Updated : " + this.toStringSelected());
			},

			updateFromSearch: function(){
				if(this.searchResults != null && this.searchResults.children != null && this.searchResults.children.length != 0){
					$log.info("Selection : " + this.searchResults);

					this.selectedCategory = this.searchResults;
					this.selectedSubCategory = this.searchResults.children[0];

					this.updatedPhotoSelection();
				}
			},

            queryPhotos: function(value){
	            var cleanLookup = value.toLowerCase().replace("_","").replace(" ","");
	            $log.info("Lookup - " + cleanLookup);
	            var addresses = [];
	            for(var cat in this.photos.children){
	                var cleanVal = this.photos.children[cat].pretty_name.toLowerCase().replace("_","");
	                if(cleanVal.contains(cleanLookup)){
	                    addresses.push(this.photos.children[cat])
	                }
	            }
	            return addresses;
            },

			toStringSelected: function(){
				return "Category: [" + this.selectedCategory.pretty_name + "] " +
					 	"Sub Category: [" + this.selectedSubCategory.pretty_name + "]";
			},
		}
	}])
	/**
	 * Gallery Loading Service
	 */
	.factory('GalleryService', ['$rootScope', '$http', '$log', 'Data', 
		function($rootScope, $http, $log, Data) {

		var GALLERY_API = "/api/gallery";

	    var doLoadAllPhotos = function() {
	    	return $http({
	        	method: 'GET',
	        	headers: { 
	        		"Accept": "application/json", 
	        		"Content-Type": "application/json" 
	        	},
	        	url: GALLERY_API + "/load/all"
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
            if (this.isEnabled()) {
                screenfull.request(element);
            }
	    };

		screenfullService.exit = function () {
            screenfull.exit(); 
	    };

		screenfullService.toggle = function (element) {
            if (this.isEnabled()) {
	            screenfull.toggle(element); 
            }
	    };

	    screenfullService.isEnabled = function(){
	    	return screenfull && screenfull.enabled;
	    };

		if (screenfullService.isEnabled()) {
			$document.on(screenfull.raw.fullscreenchange, function () {
				screenfullService.inFullScreen = screenfull.isFullscreen;
				screenfullService.fullscreenError = false;
				$log.debug('In full screen mode [' + screenfullService.inFullScreen + ']');
				$rootScope.$apply();
			});
		}

		if (screenfullService.isEnabled()) {
			$document.on(screenfull.raw.fullscreenerror, function () {
				screenfullService.inFullScreen = false;
				screenfullService.fullscreenError = true;
				$log.debug('Unable to get into full screen mode, enabled [' + screenfull.enabled + ']');
				$rootScope.$apply();
			});
		}

	    return screenfullService;
	}]);