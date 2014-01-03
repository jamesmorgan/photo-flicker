'use strict';


// Declare app level module which depends on filters, and services

var dependencies = ['ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'ui.bootstrap',
  'angular-carousel'
];
angular.module('myApp', dependencies).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/gallery', { templateUrl: 'partials/gallery.html', controller: 'PhotoGalleryCtrl' });
  $routeProvider.otherwise({redirectTo: '/gallery'});
  $locationProvider.html5Mode(false);
}]);
