/**
 * Created by John on 2016/12/21.
 */
'use strict';
angular.module('sbAdminApp').controller('BreakrulesListDetailCtrl', ['$rootScope', '$scope', 'Init', 'Modal', 'localStorageService', '$timeout', '$interval', 'CheckBrowser','$state','$stateParams', function ($rootScope, $scope, Init, Modal, localStorageService, $timeout, $interval, CheckBrowser,$state,$stateParams) {
    CheckBrowser.check();
    var ifAdd = $stateParams.ifAdd;
    
    $scope.dataObj = {
        ID:"",
        PLATE_NUM:"",
        BREAKRULES_TIME:"",
        BREAKRULES_ADDRESS:"",
        BREAKRULES_DO:"",
    };
    //弹框参数
    var resolve = {};
    var url = "";
    var ctrlName = "";
    if(ifAdd == 1){
        $scope.dataObj.ID = $stateParams.ID
        $scope.dataObj.PLATE_NUM = $stateParams.PLATE_NUM
        $scope.dataObj.BREAKRULES_TIME = $stateParams.BREAKRULES_TIME
        $scope.dataObj.BREAKRULES_ADDRESS = $stateParams.BREAKRULES_ADDRESS
        $scope.dataObj.BREAKRULES_ADDRESS = $stateParams.BREAKRULES_ADDRESS
        $scope.dataObj.BREAKRULES_DO = $stateParams.BREAKRULES_DO
    }

    //保存
    $scope.save = function () {
        if($scope.dataObj.PLATE_NUM == null || $scope.dataObj.PLATE_NUM == ""){
            $scope.open('请填写牌照号')
            return false;
        }
        if($scope.dataObj.BREAKRULES_TIME == null || $scope.dataObj.BREAKRULES_TIME == ""){
            $scope.open('请填写违章时间')
            return false;
        }
        if($scope.dataObj.BREAKRULES_ADDRESS == null || $scope.dataObj.BREAKRULES_ADDRESS == ""){
            $scope.open('请填写违章地址')
            return false;
        }
        if($scope.dataObj.BREAKRULES_DO == null || $scope.dataObj.BREAKRULES_DO == ""){
            $scope.open('请填写违章行为')
            return false;
        }
        
        var par = {
            obj:$scope.dataObj
        };
        //车辆管理
        Init.iwbhttp('/car/saveBreakRules', par, function (data, header, config, status) {
            if(data.resFlag == '0'){
                $scope.dataObj.ID = data.map.ID;
                console.log($scope.dataObj)
            }
            $scope.open(data.msg)
        }, function (data, header, config, status) {
        });
    }

    //返回
    $scope.back = function(){
        $state.go("dashboard.breakrulesListIndex.breakrulesList");
    }

    //提示modal弹框
    $scope.open = function (content, data) {
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
            //删除车辆信息
            if(data != undefined && data != null && data != "") {
                //判断是否删除成功
                if (data.resFlag == "3") {
                    var i = $scope.carRow;
                    if (i == 0 || i == 1) {
                        return;
                    }
                    var tableobj = document.getElementById("carTable");
                    tableobj.deleteRow(i);
                }
            }
        }, function () {

        });
    };
}]);
