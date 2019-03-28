'use strict';
angular.module('sbAdminApp').controller('CarCountIndexCtrl', ['$state', function ($state) {
    $state.go("dashboard.carCountIndex.carCountList");
}]);