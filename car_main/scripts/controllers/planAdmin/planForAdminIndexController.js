'use strict';
angular.module('sbAdminApp').controller('PlanForAdminIndexCtrl', ['$state', function ($state) {
    $state.go("dashboard.planForAdminIndex.planForAdminList");
}]);