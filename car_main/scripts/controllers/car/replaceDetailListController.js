/**
 * Created by John on 2016/12/21.
 */
'use strict';
angular.module('sbAdminApp').controller('ReplaceDetailListCtrl', ['$rootScope', '$scope', 'Init', 'Modal', 'localStorageService', '$timeout', '$interval', 'CheckBrowser','$state','$stateParams', function ($rootScope, $scope, Init, Modal, localStorageService, $timeout, $interval, CheckBrowser,$state,$stateParams) {
    CheckBrowser.check();
    $scope.func_class = {
        "display":"flex",
        // "justify-content": "center",
        "align-items": "center",
        "width":"100%",
        "height":"30px",
        "border-radius": "5px",
        "border-width": "1px",
        "border-color":"#fafafa",
        "border-style": "solid",
        "-moz-box-shadow":"1px 3px 6px #33333360",
        "-webkit-box-shadow":"1px 3px 6px #33333360",
        "box-shadow":"1px 3px 6px #33333360",
        "background-color": "#fafafa",
        "color":"#343434",
        "margin-right": "38px",
        "margin-top": "6px",
        "padding":"10px",
    }
    var obj = $stateParams.obj
    console.log("obj==>>",obj)
    var id = obj.ID;
    var CO_ID = obj.CO_ID;
    var par = {id: CO_ID};
    $scope.contract = {};
    $scope.contractFinance = {};
    $scope.contractDeliver = {}
    $scope.replaceCar = {}
    $scope.carTable = {}
    $scope.roleIds = localStorageService.get("roleIds");
    
    //弹框参数
    var resolve = {};
    var url = "";
    var ctrlName = "";
    $scope.init = function(){
        Init.iwbhttp('/car/getContract', par, function (data, header, config, status) {
            if(data.resFlag == '0'){
                $scope.contract = data.contract
                if(data.contractFinance && data.contractFinance != null){
                    $scope.contractFinance = data.contractFinance
                }
                if(data.cucoPricelist && data.cucoPricelist != null){
                    $scope.cucoPricelist = data.cucoPricelist;
                }
            }        
        }, function (data, header, config, status) {
        });
    }
    $scope.init_data = function() {
        var par = {}
        par = {obj:obj}
        Init.iwbhttp("/car/replaceCarInfo", par, function (data, header, config, status) {
			if(data.resFlag == '0'){
                $scope.replaceCar = data.replaceCar
                $scope.carTable = data.carTable
                if(data.financeFlowList && data.financeFlowList != null){
                    $scope.financeFlowList = data.financeFlowList;
                }
                $scope.init();
			}
			// console.log($scope.companyModeList)
		}, function (data, header, config, status) {
		});
    };
    $scope.init_data();
    
    $scope.repairSave = function(){
        $scope.replaceCar.actiondate= $('#replaceCar_actiondate').val();
        if(!$scope.carTable.DRIVER_NUM ||$scope.carTable.DRIVER_NUM == 'null' || $scope.carTable.DRIVER_NUM == null || $scope.carTable.DRIVER_NUM == ''){
            $scope.open('原车里程数不能为空')
            return false;
        }
        if(!$scope.replaceCar.PLATE_NUM ||$scope.replaceCar.PLATE_NUM == 'null' || $scope.replaceCar.PLATE_NUM == null || $scope.replaceCar.PLATE_NUM == ''){
            $scope.open('替换车牌照不能为空')
            return false;
        }
        if(!$scope.replaceCar.DRIVER_NUM ||$scope.replaceCar.DRIVER_NUM == 'null' || $scope.replaceCar.DRIVER_NUM == null || $scope.replaceCar.DRIVER_NUM == ''){
            $scope.open('替换车里程数不能为空')
            return false;
        }
        var par = {}
        par.replaceCar = $scope.replaceCar
        par.carTable = $scope.carTable
        Init.iwbhttp('/car/saveReplaceOfRepair', par, function (data, header, config, status) {
            if(data.resFlag == '0'){
                $scope.open(data.msg)
            } else{
                $scope.open(data.msg)
            }       
        }, function (data, header, config, status) {
        });
    }

    $scope.carManageSub = function(){
        var par = {}
        par.replaceCarManage = {
            ID:obj.ID,
            CO_ID:CO_ID,
            CARMANAGE_STATUS:"1"
        };
        var msg = "一旦提交无法再次修改,请确认?";
        url = 'views/modal/confirmModal.html';
        ctrlName = 'ConfirmModalCtrl';
        resolve = {
            content: function () {
                return msg;
            },
            data: function () {
                return par;
            }
        };
        var modalInstance = Modal.modal(url, ctrlName, resolve, function (returnData) {
            Init.iwbhttp('/car/saveReplaceCarManage', returnData, function (data, header, config, status) {
                if(data.resFlag == '0'){
                    $scope.replaceCar['CARMANAGE_STATUS'] = 1;
                    $scope.open(data.msg)
                } else{
                    $scope.replaceCar['CARMANAGE_STATUS'] = 0;
                    $scope.open(data.msg)
                }
            }, function (data, header, config, status) {
            });
        }, function () {

        });
    }

    $scope.addFinanceFlow = function (){
        url = 'views/dashboard/car/financeFlowModal.html';
        ctrlName = 'FinanceFlowModalCtrl';
        var parm = {
            BIZ_ID:obj.ID,
            contract:$scope.contract,
        };
        resolve = {
            parm: function () {
                return parm;
            },
            content: function () {
                return '录入财务流水';
            },
        };
        var modalInstance = Modal.modal(url, ctrlName, resolve, function (result) {
            if(angular.equals("succeed",result)){
                $scope.queryFinanceFlowList()
            }
        }, function () {

        });
    }    

    $scope.delFinanceFlow = function (id){
        Init.iwbhttp('/car/delFinanceFlow', {id:id}, function (data, header, config, status) {
            if(data.resFlag == '0'){
                $scope.queryFinanceFlowList()
            } 
        }, function (data, header, config, status) {
        });
    }

    $scope.queryFinanceFlowList = function(){
        var par = {}
        par = {id:id}
        Init.iwbhttp('/car/queryFinanceFlowList', par, function (data, header, config, status) {
            if(data.resFlag == '0'){
                $scope.financeFlowList = data.dataList;
            } 
        }, function (data, header, config, status) {
        });
    }

    $scope.openCarTable = function (){
        url = 'views/dashboard/car/carTableReplaceModal.html';
        ctrlName = 'CarTableReplaceModalCtrl';
        var parm = {
            id:obj.ID,
        };
        resolve = {
            parm: function () {
                return parm;
            },
            content: function () {
                return '合同内车辆列表';
            },
        };
        var modalInstance = Modal.modal(url, ctrlName, resolve, function (result) {
            if(angular.equals("succeed",result)){
            }
        }, function () {

        });
    }  

    $scope.openCarTableDeliver = function (){
        url = 'views/dashboard/car/carTableDeliverModal.html';
        ctrlName = 'CarTableDeliverModalCtrl';
        var parm = {
            id:$scope.contract.ID,
        };
        resolve = {
            parm: function () {
                return parm;
            },
            content: function () {
                return '合同内车辆列表';
            },
        };
        var modalInstance = Modal.modal(url, ctrlName, resolve, function (result) {
            if(angular.equals("succeed",result)){
            }
        }, function () {

        });
    } 

    //返回
    $scope.back = function(){
        $state.go("dashboard.replaceIndex.replaceList");
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
