'use strict';
angular.module('sbAdminApp').controller('YearchecklistIndexCtrl', ['$state', function ($state) {
    $state.go("dashboard.yearchecklistIndex.yearchecklist");
}]);