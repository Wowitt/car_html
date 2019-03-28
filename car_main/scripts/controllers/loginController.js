/**
 * Created by John on 2016/12/21.
 */
'use strict';
angular.module('sbAdminApp').controller('LoginCtrl', ['$rootScope','$scope','Init','Modal','$state','localStorageService','CheckBrowser', '$stateParams',function ($rootScope,$scope,Init,Modal,$state,localStorageService,CheckBrowser,$stateParams) {
    CheckBrowser.check();
    if($stateParams.from != null && $stateParams.from != "" && $stateParams.from == "logout"){
        Init.iwbhttp('/user/logout',{"name":localStorageService.get('userId')},function(data,header,config,status){
            if(data.resFlag == 0){
                var mail = localStorageService.get("MAIL");
                localStorageService.clearAll();
                localStorageService.set("MAIL", mail);
                $state.go("login");
            }
        },function(data,header,config,status){
        });
    }else{
        if(localStorageService.get("IWBSESSION") != undefined && localStorageService.get("IWBSESSION") != null && !angular.equals("", localStorageService.get("IWBSESSION"))) {
            if(localStorageService.get("indexUrl") != undefined && localStorageService.get("indexUrl") != null && !angular.equals("", localStorageService.get("indexUrl"))) {
                $state.go(localStorageService.get("indexUrl"));
                localStorageService.set("collapse",0);
            }else{
                localStorageService.clearAll();
            }
        }
    }

    //弹框参数
    var resolve = {};
    var url = "";
    var ctrlName = "";

    //管理员登录
    $scope.adminSubmit = function (){
        $scope.adminName = $("#adminName").val();
        $scope.adminPwd = $("#adminPwd").val();
        if($scope.adminName == null || angular.equals("", $scope.adminName)){
            $scope.open("用户名不能为空！");
            return;
        }
        if ($scope.adminPwd == null || angular.equals("", $scope.adminPwd)) {
            $scope.open("密码不能为空");
            return;
        }
        if($scope.adminName.length > 64){
            $scope.open("用户名太长！");
            return;
        }
        if($scope.adminPwd.length > 100){
            $scope.open("密码太长！");
            return;
        }
        if($scope.adminPwd.length < 5){
            $scope.open("密码太短！");
            return;
        }
        var patrn=/^[A-Za-z0-9!@#$]+$/;
        if (!patrn.exec($scope.adminPwd)){
            $scope.open("密码格式错误！");
            return;
        }
        //管理员登录
        Init.iwbhttp('/login/adminLogin', {adminName: $scope.adminName, adminPwd: $scope.adminPwd}, function (data, header, config, status) {
            if (angular.equals("0", data.resFlag)) {
                $rootScope.ifLogin = "0";
                localStorageService.set("roleId",data.roleId);
                localStorageService.set("indexUrl","dashboard.index");
                $state.go("dashboard.index");
            } else {
                $scope.open(data.msg);
            }
        }, function (data, header, config, status) {
        });
    }

    //单位管理员登录
    $scope.userSubmit = function (){
        //客户端输入统一码，用户名，密码
        $scope.userId = $("#userId").val();
        $scope.userPwd = $("#userPwd").val();
        if($scope.userId == null || angular.equals("", $scope.userId)){
            $scope.open("登录名不能为空");
            return;
        }
        if ($scope.userPwd == null || angular.equals("", $scope.userPwd)) {
            $scope.open("密码不能为空");
            return;
        }
        if($scope.userId.length > 30){
            $scope.open("登录名太长！");
            return;
        }
        if($scope.userPwd.length > 18){
            $scope.open("密码太长！");
            return;
        }
        if($scope.userPwd.length < 5){
            $scope.open("密码太短！");
            return;
        }
        var patrn=/^[A-Za-z0-9!@#$]+$/;
        if (!patrn.exec($scope.userPwd)){
            $scope.open("密码格式错误！");
            return;
        }
        //单位管理员登录
        Init.iwbhttp('/login/login', {userId:$scope.userId, userPwd: $scope.userPwd}, function (data, header, config, status) {
            if (angular.equals("0", data.resFlag)) {
                $rootScope.ifLogin = "0";
                localStorageService.set("indexUrl","dashboard.index");
                localStorageService.set("roleId",data.roleId);
                $state.go("dashboard.index");
            } else {
                $scope.open(data.msg);
            }
        }, function (data, header, config, status) {
        });
    }

    //提示modal
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

    //单位注册
    $scope.register=function(){
        $state.go("register");
    }

    //返回到index.html
    $scope.back = function (){
        var currentUrl = window.location.href;
        var url = "";
        if(currentUrl.indexOf("/main.html")>0){
            // url = currentUrl.split("/main.html")[0] + "/index.html";
            // url = currentUrl.split("/rd_plan_main/main.html")[0];
            url = currentUrl.split("/car_main/main.html")[0] + "/index.html";
        }
        else{
            url = "/index.html";
        }
        window.location.href = url;
    }
}]);
