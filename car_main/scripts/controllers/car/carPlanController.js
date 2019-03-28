
/**
 * Created by John on 2016/12/21.
 */
'use strict';
angular.module('sbAdminApp').controller('CarPlanCtrl', ['$scope','Init','Modal','$state','localStorageService','$stateParams','CheckBrowser', function ($scope,Init,Modal,$state,localStorageService,$stateParams,CheckBrowser) {
    CheckBrowser.check();
    //弹框参数
    var resolve = {};
    var url = "";
    var ctrlName = "";
    $scope.carPlanName = "";
    Init.iwbhttp('/car/getCarPlan', {}, function (data, header, config, status) {
        if(data.resFlag == "0"){
            $scope.delFlag = true;
            $scope.carPlanName = data.carPlanName;
        }else{
            $scope.open(data.msg);
        }
    }, function (data, header, config, status) {
    });

    //保存方法
    $scope.save = function () {
        var par = {};
        if($scope.carPlanName.length > 20){
            $scope.content = "名称太长";
            $scope.open($scope.content);
            return;
        }
        par.carPlanName = $scope.carPlanName;
        Init.iwbhttp('/car/saveCarPlan', par, function (data, header, config, status) {
            $scope.open(data.msg);
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
