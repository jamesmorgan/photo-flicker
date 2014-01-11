'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  /**
   * hold, tap, doubletap, transformstart, transform, transformend, dragstart, drag, dragend, release, swipe.
   */
  .directive('onDoubleTap', function () {
     return function (scope, element, attrs) {
       return $(element).hammer({
         prevent_default: false,
         drag_vertical: false
       })
         .bind("doubletap", function (ev) {
           return scope.$apply(attrs['onDoubleTap']);
         });
     };
   });;
