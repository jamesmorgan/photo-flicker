'use strict';

/* Controllers */

appControllers.controller('NavMenuCtrl', 
    function NavMenuCtrl($scope, $log, GalleryService, GalleryModel, ScreenfullService) {

        $scope.data = GalleryModel;

        $scope.screenService = ScreenfullService;

        $scope.$watch('data.selectedCategory', function(newVal, oldVal){
            // Reset in preparation for the sub category selection
            GalleryModel.selectedPhotos = [];
            GalleryModel.selectInitialSubCategory();
        }, true);

        $scope.$watch('data.selectedSubCategory', function(newVal, oldVal){
            GalleryModel.updatedPhotoSelection();
        }, true);

        $scope.$watch('data.searchResults', function(newVal, oldVal){
            GalleryModel.updateFromSearch();
        }, true);

        $scope.goFullScreen = function(){
            // ScreenfullService.fullScreen($('#main-window-container')[0]);
            ScreenfullService.toggle($('.carousel-container')[0]);
        };

        $scope.exitFullScreen = function(){
            ScreenfullService.exit();
        };

        $scope.lookupPhotos = function(val) {
            return GalleryModel.queryPhotos(val);
        };

        $scope.updateFromSearch = function(){
            GalleryModel.updateFromSearch();
        };
  });