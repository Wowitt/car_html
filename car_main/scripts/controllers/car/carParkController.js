'use strict';
angular.module('sbAdminApp').controller('CarParkCtrl', ['$scope','$rootScope','$state','Init','Modal', function ($scope,$rootScope,$state,Init,Modal) {
    // $state.go("dashboard.carIndex.carList");
    $scope.dataList = []
    $scope.len = 0
    $scope.carpark = function(obj){
        var sub_url = $rootScope.parkUrl+"?fieldId="+obj;
        window.open(sub_url, '_blank')
    }
    $scope.init = function () {
        Init.iwbhttp('/car/carparkList', {}, function (data, header, config, status) {
            $scope.dataList = data.dataList
            $scope.len = data.dataList.length
        }, function (data, header, config, status) {
        });
    }
    $scope.init()
    $scope.add = function(){
        if($scope.len+1 == $scope.dataList.length){
            $scope.open("请先保存一行")
            return 
        }
        $scope.dataList.push({
            ID:$scope.dataList.length+1,
            NAME:""
        })
    }
    $scope.save = function(){
        Init.iwbhttp('/car/savecarpark', {list:$scope.dataList}, function (data, header, config, status) {
            if(data.resFlag == "0"){
                $scope.open(data.msg)
                $scope.dataList = data.dataList
                $scope.len = data.dataList.length
            }
        }, function (data, header, config, status) {
        });
    }
    //弹框参数
    var resolve = {};
    var url = "";
    var ctrlName = "";
    //提示modal弹框
    $scope.open = function (content,data) {
        url = 'views/modal/promptModal.html';
        ctrlName = 'PromptModalCtrl';
        resolve = {
            content: function () {
                return content;
            },
            data: function () {
                return data;
            }
        };
        var modalInstance = Modal.modal(url, ctrlName, resolve, function () {

        }, function () {

        });
    };
}]);