'use strict';
angular.module('sbAdminApp').controller('CustomerwilllistIndexCtrl', ['$state', function ($state) {
    $state.go("dashboard.customerwilllistIndex.customerwilllist");
}]);