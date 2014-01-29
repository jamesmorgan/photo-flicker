
appControllers.controller('PhotoGalleryCtrl', 
    function PhotoGalleryCtrl($scope, $document, $log, GalleryService, ScreenfullService, GalleryModel, appConfig) {

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
