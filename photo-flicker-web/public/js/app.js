'use strict';


// Declare app level module which depends on filters, and services

var dependencies = [
	// Angular Add-ons
	'ngRoute',
	'ngTouch',
	'ui.bootstrap',
  	'angular-carousel',
	// Application Dependencies
	'myApp.filters',
	'myApp.services',
	'myApp.directives',
	'myApp.controllers',
];
angular.module('myApp', dependencies).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider.when('/gallery', { 
			templateUrl	: 'partials/gallery.html', 
			controller	: 'PhotoGalleryCtrl' 
	}).when('/gallery/tv', { 
			templateUrl	: 'partials/wallmount.html', 
			controller	: 'TvGalleryCtrl' 
	}).otherwise({ 
		redirectTo: '/gallery' 
	});
  	$locationProvider.html5Mode(false);

}]);
