'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngAnimate', 'ngTouch'])
  .controller('NavMenuCtrl', ['$scope', '$log', 'GalleryService', 'Data', 
    function($scope, $log, GalleryService, Data) {

      	$scope.world = "world!";

        $scope.data = Data;

        $scope.init = function(){
            GalleryService.loadCategories()
                .success(function(data, status, headers) {
                    $log.info("loadCategories Success - status : " + status + " data : " + data);
                    Data.setCategories(data);
                })
                .error(function(data, status, headers){
                    $log.info("Failure - status : " + status);
                });
        }

        $scope.selectCategory = function(index){
            $log.info("Category clicked - " + index);
            $log.info("Sub Category clicked - parentIndex = " + $scope.categories.children[index]);
        }

        $scope.selectSubCategory = function(parentIndex, index){
            $log.info("Sub Category clicked - parentIndex = " + parentIndex + " | index : " + index);
            $log.info("Sub Category Objects - parentIndex = " + $scope.categories.children[parentIndex] + " | index : " + $scope.categories.children[parentIndex].children[index]);
        }

  }])
  .controller('PhotoGalleryCtrl', ['$rootScope', '$scope', '$log', 'GalleryService', 'Data', 
    function($rootScope, $scope, $log, GalleryService, Data) {

        // Set of Photos
        $scope.data = Data;

        // initial image index
        $scope._Index = 0;

        // if a current image is the same as requested image
        $scope.isActive = function (index) {
            return $scope._Index === index;
        }

        // show a certain image
        $scope.showPhoto = function (index) {
            $scope._Index = index;
            $log.info("Index : " + $scope._Index);
        }

        $scope.loadPhotos = function (){

            GalleryService.loadPhotos()
                .success(function(data, status, headers) {
                    $log.info("loadPhotos Success - status : " + status + " | length : " + data.length + " data : " + data);
                    Data.setSelectedPhotos(data);
                })
                .error(function(data, status, headers){
                    $log.info("Failure - status : " + status);
                });
        }

}]);
