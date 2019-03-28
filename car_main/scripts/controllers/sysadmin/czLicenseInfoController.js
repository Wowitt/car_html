/**
 * Created by John on 2016/12/21.
 */
'use strict';
angular.module('sbAdminApp').controller('CzLicenseInfoCtrl', ['$scope','Init','Modal','$state','localStorageService','$stateParams','CheckBrowser', function ($scope,Init,Modal,$state,localStorageService,$stateParams,CheckBrowser) {
    CheckBrowser.check();
    if($stateParams.from == null || $stateParams.from == ""){
        localStorageService.set("collapse", 0);
        $state.go("dashboard.index");
        return;
    }
    //弹框参数
    var resolve = {};
    var url = "";
    var ctrlName = "";
    //角色id
    $scope.epId = $stateParams.epId;
  
    //删除按钮是否显示标志
    $scope.showFlag = true;
    $scope.delFlag = false;
    if($scope.epId != null && $scope.epId != ""){
        //角色信息
        Init.iwbhttp('/admin/queryHandleLicense', {epId:$scope.epId}, function (data, header, config, status) {
            console.log(data)
            if(data.resData != null && data.resData.EP_ID !=null && data.resData.EP_ID !=""){
                $scope.showFlag = false
                $scope.delFlag = true;
                $scope.epId = data.resData.EP_ID;
                $scope.epName = data.resData.EP_NAME;
                $scope.licenseNo = data.resData.LICENSE_NO;
            }else{
                $scope.showFlag = true
                $scope.open(data.msg);
            }
        }, function (data, header, config, status) {
        });
    }


    //返回
    $scope.back = function(){
        $state.go($stateParams.from);
    }

    //保存方法
    $scope.save = function () {
        var par = {};
        if($scope.epId == null || $scope.epId == ""){
            $scope.content = "单位编号不能为空";
            $scope.open($scope.content);
            return;
        }
        if($scope.epName == null || $scope.epName == ""){
            $scope.content = "单位名称不能为空";
            $scope.open($scope.content);
            return;
        }
        if($scope.licenseNo == null || $scope.licenseNo == ""){
            $scope.content = "许可证号不能为空";
            $scope.open($scope.content);
            return;
        }
        par.epId = $scope.epId;
        par.epName = $scope.epName;
        par.licenseNo = $scope.licenseNo;
        //新增或修改角色
        Init.iwbhttp('/admin/addCzLicense', par, function (data, header, config, status) {
            if(angular.equals("0",data.resFlag)){
                url = 'views/modal/promptModal.html';
                ctrlName = 'PromptModalCtrl';
                resolve = {
                    content: function () {
                        return data.msg;
                    },
                    data: function () {
                        return "";
                    }
                };
                var modalInstance = Modal.modal(url, ctrlName, resolve, function () {
                    if(!$scope.delFlag){
                        $scope.delFlag = true;
                    }
                }, function () {

                });
                
            }else{
                $scope.open(data.msg);
            }
        }, function (data, header, config, status) {
        });
    }

    //删除方法
    $scope.delete = function () {
        Init.iwbhttp('/admin/delCzLicense', {epId:$scope.epId}, function (data, header, config, status) {
            if(angular.equals("0",data.resFlag)){
                data.url = $stateParams.from;
            }
            $scope.open(data.msg,data);
        }, function (data, header, config, status) {
        });
    }

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
