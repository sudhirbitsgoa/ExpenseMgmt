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

        $scope.transaction = {
            type: 'buy',
            amount: 0,
            acctSelect: 'saving',
            fromAcct: '',
            toAcct: ''
        };

        $scope.$watchCollection('transaction', function() {
            if ($scope.transaction.type === 'buy') {
                $scope.transType = false;
                $scope.transaction.toAcct = '';
            } else {
                $scope.transType = true;
                $scope.transaction.toAcct = getAccountId($scope.transaction.acctSelect);
            }
        });

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
                size: 'sm',
                scope: $scope
            });
        };

        coreService.getTransactions(userId)
            .then(function(data) {
                $scope.transactionsData = data;
            })

        $scope.doTransaction = function(selAcct) {
            $scope.seltAcct = selAcct;
            $scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'pages/transaction-modal.html',
                size: 'sm',
                scope: $scope
            });
        }

        function getAccountId(type) {
            var actId;
            $scope.accounts.forEach(function(acct) {
                if (acct.acType == type) {
                    actId = acct._id;
                }
            });
            return actId;
        }

        $scope.doTransfer = function() {
            $scope.transaction.userId = userId;
            $scope.transaction.amount = parseInt($scope.transaction.amount, 10);
            if ($scope.transaction.amount > $scope.seltAcct.amount) {
                $scope.errMsg = 'Balance is low';
                return;
            }
            $scope.transaction.fromAcct = $scope.seltAcct._id;
            coreService.doTransaction($scope.transaction)
                .then(function(data) {
                    $scope.transactionsData = data;
                    $scope.getAccounts();
                    $scope.modalInstance.close();
                });
        }


        $scope.gridOptions = {
            enableFiltering: true,
            data : $scope.transactionsData,
            onRegisterApi: function(gridApi) {
                $scope.gridApi = gridApi;
            },
            columnDefs:[
                { field: 'name', headerCellClass: $scope.highlightFilteredHeader },
                { field: 'name', headerCellClass: $scope.highlightFilteredHeader },
                { field: 'name', headerCellClass: $scope.highlightFilteredHeader },
                { field: 'name', headerCellClass: $scope.highlightFilteredHeader },
                { field: 'name', headerCellClass: $scope.highlightFilteredHeader }
            ]
        };
    }
]);