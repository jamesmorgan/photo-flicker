'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('NavMenuCtrl', function($scope, $log, GalleryService, GalleryModel, ScreenfullService) {

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
  })
  .controller('PhotoGalleryCtrl', function($scope, $document, $log, GalleryService, ScreenfullService, GalleryModel, appConfig) {

        $scope.debugMode = appConfig.debug;
        $scope.currentIndex = -1;
        $scope.data = GalleryModel;

        angular.element($document).bind("keyup", function(event) {
            if (event.which === 37) {
                $log.info("Move left")
                $scope.previous();
                $scope.$apply();
            } else if (event.which === 39) {
                $log.info("Move right")
                $scope.next();
                $scope.$apply();
            }
        });

        $scope.init = function() {
            GalleryService.lookupPhotoGalleryModel();
        };

        /**
         * TODO this caused problems?
         */
        $scope.shouldShowCarousel = function(){
            // return $scope.data != null && $scope.data.selectedPhotos.length != 0;
            return $scope.data != null && $scope.data.selectedPhotos.length != 0;
        };

        $scope.disabledPreviousCarousel = function(){
            // return $scope.currentIndex == 0 || $scope.currentIndex == -1;
            return $scope.data.selectedPhotoIndex == 0 || $scope.data.selectedPhotoIndex == -1;
        };

        $scope.disabledNextCarousel = function(){
            // return $scope.currentIndex == -1 || $scope.currentIndex >= ($scope.data.selectedPhotos.length-1);
            return $scope.data.selectedPhotoIndex == -1 || $scope.data.selectedPhotoIndex >= ($scope.data.selectedPhotos.length-1);
        };

        $scope.previous = function(){
            if($scope.disabledPreviousCarousel()){
                return;
            }
            // $scope.currentIndex = $scope.currentIndex - 1;    
            $scope.data.selectedPhotoIndex = $scope.data.selectedPhotoIndex - 1;    
        };

        $scope.next = function(){
            if($scope.disabledNextCarousel()){
                return;
            }
            // $scope.currentIndex = $scope.currentIndex - 1;    
            $scope.data.selectedPhotoIndex = $scope.data.selectedPhotoIndex + 1;    
        };

        $scope.toggleFullScreenImage = function(){
            // alert("Double Tap");
            ScreenfullService.toggle($('.carousel-container')[0]);
            // ScreenfullService.toggle($('#main-window-container')[0]);
        };

        $scope.onSwipeUp = function(){
            GalleryModel.onSwipeSubCategoryUp();
        };

        $scope.onSwipeDown = function(){
            GalleryModel.onSwipeSubCategoryDown();
        };
});
