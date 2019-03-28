'use strict';
angular.module('sbAdminApp').controller('ComponentIndexCtrl', ['$state', function ($state) {
    $state.go("dashboard.componentIndex.componentList");
}]);