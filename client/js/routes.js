/**
 * Config -------------------------------------------------------------------------
 */
 var app = angular.module('mainApp')
	.config(['$routeProvider', function($routeProvider) {
	    $routeProvider.when('/home', {templateUrl: 'pages/content.html', controller: 'mainCtrl'});
	    $routeProvider.when('/', {templateUrl: 'pages/login.html', controller: 'loginCtrl'});
	}])