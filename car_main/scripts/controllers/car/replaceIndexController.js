'use strict';
angular.module('sbAdminApp').controller('ReplaceIndexCtrl', ['$state', function ($state) {
    $state.go("dashboard.replaceIndex.replaceList");
}]);