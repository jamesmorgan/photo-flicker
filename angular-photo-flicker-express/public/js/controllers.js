'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngAnimate', 'ngTouch'])
  .controller('NavMenuCtrl', ['$scope', '$log', 'GalleryService', 'Data', 'ScreenfullService', 
    function($scope, $log, GalleryService, Data, ScreenfullService) {

      	$scope.screenService = ScreenfullService;

        $scope.data = Data;

        $scope.init = function() {
            $scope.loadCategories();
        }

        $scope.loadCategories = function (){
            Data.selectedSubCategory = -1;
            Data.selectedCategory = -1;
            GalleryService.loadCategories()
                .success(function(data, status, headers) {
                    $log.info("loadCategories Success - status : " + status + " data : " + data);
                    Data.setCategories(data);
                })
                .error(function(data, status, headers){
                    $log.info("Failure - status : " + status);
                });
        }

        $scope.showImages = function(){
            $log.info($scope.data.toStringSelected())
            Data.updatedPhotoSelection();
        }

        $scope.goFullScreen = function(){
            ScreenfullService.fullScreen($('.container')[0]);
        }

        $scope.exitFullScreen = function(){
            ScreenfullService.exit();
        }

        $scope.fullScreenPicture = function(element){
            ScreenfullService.fullScreen(element)
        }

  }])
  .controller('PhotoGalleryCtrl', ['$rootScope', '$scope', '$log', 'GalleryService', 'Data', 
    function($rootScope, $scope, $log, GalleryService, Data) {

        $scope.data = Data;

        $scope.sliderInterval = 30000;

        $scope.init = function(){
            $scope.loadPhotos();
        }

        $scope.loadPhotos = function (){
            GalleryService.loadAllPhotos()
                    .success(function(data, status, headers) {
                        $log.info("loadPhotos Success - status : " + status + " | length : " + data.length + " data : " + data);
                        Data.setSelectedPhotos(data);
                    })
                    .error(function(data, status, headers){
                        $log.info("Failure - status : " + status);
                    });
        }

}]);
