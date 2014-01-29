'use strict';

/**
 * Gallery Loading Service
 */
appServices.factory('GalleryService', function($rootScope, $http, $log, GalleryModel) {

        var GALLERY_API = "/api/gallery";

        var doLoadAllPhotos = function() {
            return $http({
                method: 'GET',
                headers: { 
                    "Accept": "application/json", 
                    "Content-Type": "application/json" 
                },
                url: GALLERY_API + "/load/all"
            });
        }

        return {
            lookupPhotoGalleryModel: function(){
                GalleryModel.resetModel();
                doLoadAllPhotos()
                    .success(function(data, status, headers) {
                        $log.info("lookupPhotoGalleryModel Success - status : " + status + " data : " + data);
                        GalleryModel.updateMetaData(data);
                    })
                    .error(function(data, status, headers){
                        $log.info("Failure - status : " + status);
                    });
            },
        }
});	