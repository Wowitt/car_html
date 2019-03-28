'use strict';
angular.module('sbAdminApp').controller('PlanIndexCtrl', ['$state', function ($state) {
    // $state.go("dashboard.planIndex.planMain");
    $state.go("dashboard.planIndex.planList");
}]);