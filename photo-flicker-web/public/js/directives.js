'use strict';

/* Directives */


angular.module('myApp.directives', [])
  .directive('appVersion', function(appConfig) {
    return function(scope, elm, attrs) {
      elm.text(appConfig.version);
    };
  })
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
   })
  .directive('onSwipeUp', function () {
   return function (scope, element, attrs) {
     return $(element).hammer({
       prevent_default: false
     })
       .bind("swipeup", function (ev) {
         return scope.$apply(attrs['onSwipeUp']);
       });
   };
  })
  .directive('onSwipeDown', function () {
   return function (scope, element, attrs) {
     return $(element).hammer({
       prevent_default: false
     })
       .bind("swipedown", function (ev) {
         return scope.$apply(attrs['onSwipeDown']);
       });
   };
  })