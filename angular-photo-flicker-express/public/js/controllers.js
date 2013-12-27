'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngAnimate', 'ngTouch'])
  .controller('NavMenuCtrl', ['$scope', '$log', 'PhotoService', function($scope, $log, PhotoService) {

  	$scope.world = "world!";

    $scope.categories = {};

    $scope.init = function(){
        PhotoService.loadCategories()
            .success(function(data, status, headers) {
                $log.info("Success - status : " + status + " | length : " + data.length + " data : " + data);
                $scope.categories = data;
            })
            .error(function(data, status, headers){
                $log.info("Failure - status : " + status);
            });
    }

  }])
  .controller('PhotoGalleryCtrl', ['$rootScope', '$scope', '$log', 'PhotoService', function($rootScope, $scope, $log, PhotoService) {

    // Set of Photos
    $rootScope.photos = [];

    // initial image index
    $scope._Index = 0;

    // if a current image is the same as requested image
    $scope.isActive = function (index) {
        return $scope._Index === index;
    };

    // show a certain image
    $scope.showPhoto = function (index) {
        $scope._Index = index;
        $log.info("Index : " + $scope._Index);
    };

    $scope.loadPhotos = function (){

        $rootScope.photos = [];

        PhotoService.loadPhotos()
            .success(function(data, status, headers) {
                $log.info("Success - status : " + status + " | length : " + data.length + " data : " + data);
                $rootScope.photos = data;
            })
            .error(function(data, status, headers){
                $log.info("Failure - status : " + status);
            });
    };

}]);
