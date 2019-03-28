'use strict';
angular.module('sbAdminApp').controller('RepairIndexCtrl', ['$state', function ($state) {
    $state.go("dashboard.repairIndex.repairList");
}]);