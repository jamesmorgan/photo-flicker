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
  .controller('PhotoGalleryCtrl', ['$rootScope', '$scope', '$log', 'GalleryService', 'Data', 
    function($rootScope, $scope, $log, GalleryService, Data) {

        $scope.data = Data;

        $scope.sliderInterval = 30000;

        $scope.init = function() {
            Data.selectedSubCategory = -1;
            Data.selectedCategory = -1;
            GalleryService.lookupPhotoData()
                .success(function(data, status, headers) {
                    $log.info("lookupPhotoData Success - status : " + status + " data : " + data);
                    Data.setMetaData(data);
                })
                .error(function(data, status, headers){
                    $log.info("Failure - status : " + status);
                });
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
