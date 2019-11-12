'use strict';
angular.module('sbAdminApp').controller('NotPayNumIndexCtrl', ['$state', function ($state) {
    $state.go("dashboard.notPayNumIndex.notPayNumList");
}]);