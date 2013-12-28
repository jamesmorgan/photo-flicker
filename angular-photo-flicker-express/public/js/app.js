'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'ui.bootstrap'
]).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/gallery', { templateUrl: 'partials/gallery.html', controller: 'PhotoGalleryCtrl' });
  $routeProvider.otherwise({redirectTo: '/gallery'});
  $locationProvider.html5Mode(false);
}]);
