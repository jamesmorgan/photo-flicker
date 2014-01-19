'use strict';

/**
 * Screen Full Service Wrapper
 */
appServices.factory('ScreenfullService', ['$document', '$rootScope', '$log', function($document, $rootScope, $log) {
		
	var screenfullService = {
		inFullScreen: false,
		fullscreenError: false
	};

	screenfullService.fullScreen = function (element) {
        if (this.isEnabled()) {
            screenfull.request(element);
        }
    };

	screenfullService.exit = function () {
        screenfull.exit(); 
    };

	screenfullService.toggle = function (element) {
        if (this.isEnabled()) {
            screenfull.toggle(element); 
        }
    };

    screenfullService.isEnabled = function(){
    	return screenfull && screenfull.enabled;
    };

	if (screenfullService.isEnabled()) {
		$document.on(screenfull.raw.fullscreenchange, function () {
			screenfullService.inFullScreen = screenfull.isFullscreen;
			screenfullService.fullscreenError = false;
			$log.debug('In full screen mode [' + screenfullService.inFullScreen + ']');
			$rootScope.$apply();
		});
	}

	if (screenfullService.isEnabled()) {
		$document.on(screenfull.raw.fullscreenerror, function () {
			screenfullService.inFullScreen = false;
			screenfullService.fullscreenError = true;
			$log.debug('Unable to get into full screen mode, enabled [' + screenfull.enabled + ']');
			$rootScope.$apply();
		});
	}

    return screenfullService;
}]);