'use strict';
angular.module('sbAdminApp').controller('CzLicenseIndexCtrl', ['$state', function ($state) {
    $state.go("dashboard.czlicenseIndex.czlicenseList");
}]);