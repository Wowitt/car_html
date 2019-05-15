'use strict';
angular.module('sbAdminApp').controller('CustomerlistIndexCtrl', ['$state', function ($state) {
    $state.go("dashboard.customerlistIndex.customerlist");
}]);