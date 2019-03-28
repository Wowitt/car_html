'use strict';
angular.module('sbAdminApp').controller('InsureanceIndexCtrl', ['$state', function ($state) {
    $state.go("dashboard.insureanceIndex.insureanceList");
}]);