'use strict';
angular.module('sbAdminApp').controller('BreakrulesListIndexCtrl', ['$state', function ($state) {
    $state.go("dashboard.breakrulesListIndex.breakrulesList");
}]);