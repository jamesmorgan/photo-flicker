'use strict';

/**
 * 
 */
appServices.factory('NavigationService', ['$location', '$log', 'GalleryModel', 
	function($location, $log, GalleryModel) {
	    return {
    		navigateWallMountedMode: function(){
    			$log.info("launchTvMounted");
    			$location.path('/gallery/tv')
    		},

    		navigateGalleryMode: function(){
    			$log.info("launchTvMounted");
    			$location.path('/gallery')
    		},
		}
}]);	
