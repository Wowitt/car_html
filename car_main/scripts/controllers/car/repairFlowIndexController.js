'use strict';
angular.module('sbAdminApp').controller('RepairFlowIndexCtrl', ['$state', function ($state) {
    $state.go("dashboard.repairFlowIndex.repairFlowList");
}]);