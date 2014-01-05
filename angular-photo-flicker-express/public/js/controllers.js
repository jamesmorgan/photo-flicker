'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngAnimate', 'ngTouch'])
  .controller('NavMenuCtrl', ['$scope', '$log', 'GalleryService', 'Data', 'ScreenfullService',
    function($scope, $log, GalleryService, Data, ScreenfullService) {

        $scope.data = Data;

        $scope.screenService = ScreenfullService;

        $scope.$watch('data.selectedCategory', function(newVal, oldVal){
            // Reset in preparation for the sub category selection
            Data.selectedPhotos = [];
            Data.selectedSubCategory = -1;
        }, true);

        $scope.$watch('data.selectedSubCategory', function(newVal, oldVal){
            Data.updatedPhotoSelection();
        }, true);

        $scope.goFullScreen = function(){
            ScreenfullService.fullScreen($('#main-window-container')[0]);
        };

        $scope.exitFullScreen = function(){
            ScreenfullService.exit();
        };

        $scope.lookupPhotos = function(val) {
            return Data.queryPhotos(val);
        };
  }])
  .controller('PhotoGalleryCtrl', ['$rootScope', '$scope', '$q', '$timeout', '$log', 'GalleryService', 'ScreenfullService', 'Data',
    function($rootScope, $scope, $q, $timeout, $log, GalleryService, ScreenfullService, Data) {

        $scope.debugCarousel = true;
        $scope.currentIndex = -1;
        $scope.data = Data;

        $scope.init = function() {
            GalleryService.lookupPhotoData();
        };

        $scope.shouldShowCarousel = function(){
            return $scope.data != null && $scope.data.selectedPhotos.length != 0;
        };

        $scope.disabledPreviousCarousel = function(){
            return $scope.currentIndex == 0 || $scope.currentIndex == -1;
        };

        $scope.disabledNextCarousel = function(){
            return $scope.currentIndex == -1 || $scope.currentIndex >= ($scope.data.selectedPhotos.length-1);
        };

        $scope.previous = function(){
            if($scope.disabledPreviousCarousel()){
                return;
            }
            $scope.currentIndex = $scope.currentIndex - 1;    
        };

        $scope.next = function(){
            if($scope.disabledNextCarousel()){
                return;
            }
            $scope.currentIndex = $scope.currentIndex + 1;    
        };

        $scope.goFullScreenImage = function(){
            // alert("Double Tap");
            ScreenfullService.toggle($('.carousel-container')[0]);
        };

}]);
