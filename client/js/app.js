'use strict';

var app = angular.module('mainApp', ['ngRoute', 'ui.bootstrap'])

    .controller('loginCtrl', function($scope, $rootScope, $q, $http, $location) {
        $scope.main = {};

        function register() {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                data: {
                    name: $scope.main.user
                },
                url: 'http://localhost:3000/user'
            }).then(function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
            });
            return deferred.promise;
        }

        $rootScope.signout = function() {
            $location.path('/');
            $rootScope.user = null;
        }
        setInterval(1000, function() {
            $scope.register_login();
        });
        $scope.register_login = function() {
            register().then(function(res) {
                $location.path('/home');
                $rootScope.user = res;
            });
        }
    })

    .constant('BASEURL', 'http://localhost:3000/')