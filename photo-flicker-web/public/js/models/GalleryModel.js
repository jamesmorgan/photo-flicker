'use strict';

/* Models */

	/**
	 * Shared Application Data
	 */
appModels.factory('GalleryModel', ['$log', '$rootScope', function($log, $rootScope) {

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
				$log.info("hasValidCategorySelection");
                return this.selectedCategory != null && this.selectedSubCategory != null;
            },

			updateMetaData: function(data){
				$log.info("Received Photo Data : " + data);
				this.photos = data;
				this.categories = data;
			},

			selectInitialSubCategory: function(){
				if(this.selectedCategory != null && this.selectedCategory.children.length >= 1){
					$log.info("selectInitialSubCategory");
					this.selectedSubCategory = this.selectedCategory.children[0];					
				}
			},

			onSwipeSubCategoryUp: function(onCategoryChanged){
            	$log.info("onSwipeSubCategoryUp");
				var currentIndex = this.findSelectedSubCategoryIndex();
				if(currentIndex == -1 || currentIndex == (this.selectedCategory.children.length - 1)){
					$log.info("Reached maximum sub category");
					return;
				}
				this.selectedSubCategory = this.selectedCategory.children[currentIndex + 1];					
				onCategoryChanged();
			},

			onSwipeSubCategoryDown: function(onCategoryChanged){
	            $log.info("onSwipeSubCategoryDown");
				var currentIndex = this.findSelectedSubCategoryIndex();
				if(currentIndex == -1 || currentIndex == 0){
					$log.info("Reached maximum sub category");
					return;
				}	
				this.selectedSubCategory = this.selectedCategory.children[currentIndex - 1];
				onCategoryChanged();
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
	                if(cleanVal.indexOf(cleanLookup) != -1){
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
	}]);