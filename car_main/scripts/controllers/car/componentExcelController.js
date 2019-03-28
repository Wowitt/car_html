
/**
 * Created by John on 2016/12/21.
 */
'use strict';
angular.module('sbAdminApp').controller('ComponentExcelCtrl', ['$rootScope','$scope','Init','Modal','$state','localStorageService','$stateParams','CheckBrowser', function ($rootScope,$scope,Init,Modal,$state,localStorageService,$stateParams,CheckBrowser) {
    CheckBrowser.check();
    //弹框参数
    var resolve = {};
    var url = "";
    var ctrlName = "";

    $scope.uploadExcel = function () {
        var file = $('#uploadExcel')
        console.log(file)
        var fd = new FormData();
        fd.append('uploadExcel', file[0].files[0]);
        $.ajax({
            url: $rootScope.baseUrl+$rootScope.baseUrlPath+"/demo/uploadComponentExcel",
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            type: 'POST', // For jQuery < 1.9
            success: function(data){
                $scope.open(data.msg)
            }
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
