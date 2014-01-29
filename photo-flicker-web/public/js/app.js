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
	'myApp.models',
	'myApp.directives',
	'myApp.controllers',
];
angular.module('myApp', dependencies)
/**
 * Routing Configuration
 */
.config(function($routeProvider, $locationProvider) {
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
})
/**
 * App Config
 */
.constant('appConfig', {
	version: '0.1',
	debug: false
})

var appControllers = angular.module('myApp.controllers', []);
var appServices = angular.module('myApp.services', []);
var appModels = angular.module('myApp.models', []);
