'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngAnimate', 'ngTouch'])
  .controller('NavMenuCtrl', ['$scope', function($scope) {

  	$scope.world = "world!"

  }])
  .controller('PhotoGalleryCtrl', ['$scope', '$log', 'PhotoService', function($scope, $log, PhotoService) {

    // Set of Photos
    $scope.photos = PhotoService.staticPhotos();

    // initial image index
    $scope._Index = 0;

    // if a current image is the same as requested image
    $scope.isActive = function (index) {
        return $scope._Index === index;
    };

    // show prev image
    $scope.showPrev = function () {
        $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
    };

    // show next image
    $scope.showNext = function () {
        $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
    };

    // show a certain image
    $scope.showPhoto = function (index) {
        $scope._Index = index;
    };

    $scope.loadPhotos = function (){
        PhotoService.loadPhotos()
            .success(function(data, status, headers) {
                $log.info("Success - data : " + data)
            })
            .error(function(data, status, headers){
                $log.info("Failure")
            });
    }
}]);
