
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

        $scope.disabledPreviousCarousel = function(){
            return GalleryModel.selectedPhotoIndex == 0 || GalleryModel.selectedPhotoIndex == -1;
        };

        $scope.disabledNextCarousel = function(){
            return GalleryModel.selectedPhotoIndex == -1 || GalleryModel.selectedPhotoIndex >= (GalleryModel.selectedPhotos.length-1);
        };

        $scope.previous = function(){
            if($scope.disabledPreviousCarousel()){
                return;
            }
            GalleryModel.selectedPhotoIndex = GalleryModel.selectedPhotoIndex - 1;    
        };

        $scope.shouldShowCarousel = function(){
            return GalleryModel.selectedPhotos.length != 0;
        };

        $scope.next = function(){
            if($scope.disabledNextCarousel()){
                return;
            }
            GalleryModel.selectedPhotoIndex = GalleryModel.selectedPhotoIndex + 1;    
        };

        $scope.toggleFullScreenImage = function(){
            ScreenfullService.toggle($('.carousel-container')[0]);
        };

        $scope.onSwipeUp = function(){
            GalleryModel.onSwipeSubCategoryUp();
        };

        $scope.onSwipeDown = function(){
            GalleryModel.onSwipeSubCategoryDown();
        };
});
