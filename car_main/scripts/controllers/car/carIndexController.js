'use strict';
angular.module('sbAdminApp').controller('CarIndexCtrl', ['$state', function ($state) {
    $state.go("dashboard.carIndex.carList");
}]);