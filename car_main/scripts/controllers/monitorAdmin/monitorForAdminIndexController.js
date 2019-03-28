'use strict';
angular.module('sbAdminApp').controller('MonitorForAdminIndexCtrl', ['$state', function ($state) {
    $state.go("dashboard.monitorForAdminIndex.monitorForAdminList");
}]);