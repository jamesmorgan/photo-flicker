'use strict';

/*
 * 
 */
appControllers.controller('TvGalleryController', ['$scope', '$log', 'GalleryModel', 'ScreenfullService', 'NavigationService',
    function($scope, $log, GalleryModel, ScreenfullService, NavigationService) {

        $scope.data = GalleryModel;

        $scope.screenService = ScreenfullService;


}]);
