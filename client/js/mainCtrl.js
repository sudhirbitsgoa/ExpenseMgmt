var app = angular.module('mainApp');

app.controller('mainCtrl', ['$scope', '$rootScope', 'coreService', '$location', '$modal',
    function($scope, $rootScope, coreService, $location, $uibModal) {
        if (!$rootScope.user) {
            $location.path('/')
            return;
        }
        
        $scope.data = {
        	acctSelect: 'saving',
        	amount: 10
        };

        var userId = $rootScope.user._id;
        
        $scope.getAccounts = function() {
            coreService.getAccounts(userId)
                .then(function(data) {
                    $scope.accounts = data;
                });
        }
        
        $scope.getAccounts();
        
        $scope.addAccount = function() {
            coreService.addAccount({
                userId: userId,
                acType: $scope.data.acctSelect,
                amount: $scope.data.amount
            }).then(function(data) {
            	$scope.modalInstance.close()
                $scope.getAccounts();
            });
        }

        $scope.open = function(size) {
            $scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'pages/account_modal.html',
                size:'sm',
                scope: $scope,
                resolve: {
                    items: function() {
                        return $scope.items;
                    }
                }
            });
        };
    }
]);

app.service('coreService', ['$q', '$http', 'BASEURL',
    function($q, $http, BASEURL) {

        this.getAccounts = function(userId) {
            var dfd = $q.defer();
            $http({
                method: 'GET',
                url: BASEURL + 'account',
                params: {
                    userId: userId
                }
            }).then(function(res) {
                return dfd.resolve(res.data);
            }, function(err) {
                dfd.reject(err);
            });
            return dfd.promise;
        }

        this.addAccount = function(data) {
            var dfd = $q.defer();
            $http({
                method: 'POST',
                url: BASEURL + 'account',
                data: data
            }).then(function(res) {
                return dfd.resolve(res.data)
            }, function(err) {
                dfd.reject(err)
            });
            return dfd.promise;
        }
    }
]);