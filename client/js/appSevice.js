var app = angular.module('mainApp');

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

        this.doTransaction = function(data) {
            var dfd = $q.defer();
            $http({
                method: 'POST',
                url: BASEURL + 'transaction',
                data: {
                    userId: data.userId,
                    amount: data.amount,
                    tags: [data.tags],
                    fromAcct: data.fromAcct,
                    toAcct: data.toAcct
                }
            }).then(function(res) {
                return dfd.resolve(res.data)
            }, function(err) {
                dfd.reject(err)
            });
            return dfd.promise;
        }

        this.getTransactions = function(userId) {
            var dfd = $q.defer();
            $http({
                method: 'GET',
                url: BASEURL + 'transaction',
                params: {
                    userId: userId
                }
            }).then(function(res){
                dfd.resolve(res.data);
            },function(err){
                dfd.reject(err);
            });
            return dfd.promise;
        }
    }
]);