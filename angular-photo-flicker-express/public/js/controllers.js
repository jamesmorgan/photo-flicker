'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngAnimate', 'ngTouch'])
  .controller('NavMenuCtrl', ['$scope', '$log', 'GalleryService', 'Data', 'ScreenfullService',
    function($scope, $log, GalleryService, Data, ScreenfullService) {

      	$scope.screenService = ScreenfullService;

        $scope.data = Data;

        $scope.showImages = function(){
            $log.info($scope.data.toStringSelected())
            Data.updatedPhotoSelection();
        };

        $scope.goFullScreen = function(){
            ScreenfullService.fullScreen($('.container')[0]);
        };

        $scope.exitFullScreen = function(){
            ScreenfullService.exit();
        };

        $scope.fullScreenPicture = function(element){
            ScreenfullService.fullScreen(element)
        };

        $scope.lookupPhotos = function(val) {
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
        };
  }])
  .controller('PhotoGalleryCtrl', ['$rootScope', '$scope', '$q', '$timeout', '$log', 'GalleryService', 'Data',
    function($rootScope, $scope, $q, $timeout, $log, GalleryService, Data) {

        $scope.debugCarousel = false;
        $scope.data = Data;

        $scope.init = function() {
            GalleryService.lookupPhotoData()
                .success(function(data, status, headers) {
                    $log.info("lookupPhotoData Success - status : " + status + " data : " + data);
                    Data.setMetaData(data);
                })
                .error(function(data, status, headers){
                    $log.info("Failure - status : " + status);
                });
        }

        $scope.shouldShowCarousel = function(){
            var value = $scope.data != null && $scope.data.selectedPhotos.length != 0;
            $log.info("shouldShowCarousel : " + value)
            return value;
        }

        $scope.disabledPreviousCarousel = function(){
            var value = $scope.currentIndex == -1 || ($scope.data.selectedPhotos[$scope.currentIndex - 1] == undefined);
            $log.info("disabledPreviousCarousel : " + value)
            return value;
       }

        $scope.disabledNextCarousel = function(){
            var value =  $scope.currentIndex == -1 || ($scope.data.selectedPhotos[$scope.currentIndex + 1] == undefined);
            $log.info("disabledNextCarousel : " + value)
            return value;
        }

        $scope.currentIndex = -1;

        $scope.next = function(item, currentIndex){
            $scope.currentIndex = currentIndex;
            if($scope.data.selectedPhotos == null 
                || $scope.data.selectedPhotos.length == 0
                || $scope.data.selectedPhotos[currentIndex] == undefined){
                $log.info("Next : No photos yet, unable to show one!")
                return;
            }

            $log.info("next : currentIndex = " + currentIndex + " length = " + $scope.data.selectedPhotos.length);
            $scope.image = $scope.data.selectedPhotos[currentIndex];
            var defer = $q.defer();

            $timeout(function() {
                $log.info('http://localhost:8000/' + $scope.image.short_path);
                defer.resolve($scope.image);
            });
            return defer;
        }

        $scope.previous = function(item, currentIndex){
            $scope.currentIndex = currentIndex;
            if($scope.data.selectedPhotos == null 
                || $scope.data.selectedPhotos.length == 0
                || $scope.data.selectedPhotos[currentIndex - 1] == undefined){
                $log.info("Previous : No photos yet, unable to show one!")
                return;
            }

            $log.info("previous : currentIndex = " + currentIndex + " length = " + $scope.data.selectedPhotos.length);

            $scope.image = $scope.data.selectedPhotos[currentIndex - 1];
            var defer = $q.defer();

            $timeout(function() {
                $log.info('http://localhost:8000/' + $scope.image.short_path);
                 defer.resolve($scope.image);
           });
            return defer;
        }

        // $scope.init = function(){
        //     $scope.loadPhotos();
        // }

        // $scope.loadPhotos = function (){
        //     GalleryService.loadAllPhotos()
        //             .success(function(data, status, headers) {
        //                 $log.info("loadPhotos Success - status : " + status + " | length : " + data.length + " data : " + data);
        //                 Data.setSelectedPhotos(data);
        //             })
        //             .error(function(data, status, headers){
        //                 $log.info("Failure - status : " + status);
        //             });
        // }
}]);
