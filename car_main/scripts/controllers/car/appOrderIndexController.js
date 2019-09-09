'use strict';
angular.module('sbAdminApp').controller('AppOrderIndexCtrl', ['$state', function ($state) {
    $state.go("dashboard.appOrderIndex.appOrderList");
}]);