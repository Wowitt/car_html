'use strict';
angular.module('sbAdminApp').controller('CarParkCtrl', ['$scope','$rootScope','$state', function ($scope,$rootScope,$state) {
    // $state.go("dashboard.carIndex.carList");
    $scope.carpark = function(){
        var sub_url = $rootScope.parkUrl;
        window.open(sub_url, '_blank')
    }
}]);