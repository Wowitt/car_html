'use strict';
angular.module('sbAdminApp').controller('ContractIndexCtrl', ['$state', function ($state) {
    $state.go("dashboard.contractIndex.contractList");
}]);