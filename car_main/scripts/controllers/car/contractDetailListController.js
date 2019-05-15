/**
 * Created by John on 2016/12/21.
 */
'use strict';
angular.module('sbAdminApp').controller('ContractDetailListCtrl', ['$rootScope', '$scope', 'Init', 'Modal', 'localStorageService', '$timeout', '$interval', 'CheckBrowser','$state','$stateParams', function ($rootScope, $scope, Init, Modal, localStorageService, $timeout, $interval, CheckBrowser,$state,$stateParams) {
    CheckBrowser.check();
    var id = $stateParams.id;
    var par = {id: id};
    $scope.contract = {};
    $scope.contractFinance = {};
    $scope.contractDeliver = {}
    $scope.agentList = []
    $scope.payPeriodList = []
    $scope.payTypeList = []
    $scope.cucoPricelist = []
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
                if(data.financeFlowList && data.financeFlowList != null){
                    $scope.financeFlowList = data.financeFlowList;
                }
            }        
        }, function (data, header, config, status) {
        });
    }
    $scope.init_data = function() {
        Init.iwbhttp('/car/contractDetailWebInit',  {}, function(data,header,config,status){
            if(data.resFlag == '0'){
                $scope.agentList = data.agentList
                $scope.payPeriodList = data.payPeriodList
                $scope.payTypeList = data.payTypeList
                $scope.init();
            }
        },function(data,header,config,status){
        });
    };
    $scope.init_data();
    
    $scope.financeSave = function(){
        $scope.contractFinance['ID'] = $scope.contract.ID;
        $scope.contractFinance['STATUS'] = 0;
        var par = {}
        par.contractFinance = $scope.contractFinance;
        Init.iwbhttp('/car/saveContractFinance', par, function (data, header, config, status) {
            if(data.resFlag == '0'){
                $scope.open(data.msg)
            } else{
                $scope.open(data.msg)
            }       
        }, function (data, header, config, status) {
        });
    }

    $scope.financeSub = function(){
        if(!$scope.contractFinance.IF_CONTRACT ||$scope.contractFinance.IF_CONTRACT == 'null' || $scope.contractFinance.IF_CONTRACT == null || $scope.contractFinance.IF_CONTRACT == ''){
            $scope.open('是否签订合同')
            return false;
        }
        if($scope.financeFlowList.length < 1){
            $scope.open('请输入收款信息')
            return false;
        }
        $scope.contractFinance['ID'] = $scope.contract.ID;
        $scope.contractFinance['STATUS'] = 1;
        var par = {}
        par.contractFinance = $scope.contractFinance;

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
            Init.iwbhttp('/car/saveContractFinance', returnData, function (data, header, config, status) {
                if(data.resFlag == '0'){
                    $scope.contractFinance['STATUS'] = 1;
                    $scope.open(data.msg)
                } else{
                    $scope.contractFinance['STATUS'] = 0;
                    $scope.open(data.msg)
                }       
            }, function (data, header, config, status) {
            });
        }, function () {

        });
    }

    $scope.carManageSub = function(){
        var par = {}
        par.contractCarManage = {
            ID:$scope.contract.ID,
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
            Init.iwbhttp('/car/saveContractCarManage', returnData, function (data, header, config, status) {
                if(data.resFlag == '0'){
                    $scope.contract['CARMANAGE_STATUS'] = 1;
                    $scope.open(data.msg)
                } else{
                    $scope.contract['CARMANAGE_STATUS'] = 0;
                    $scope.open(data.msg)
                }
            }, function (data, header, config, status) {
            });
        }, function () {

        });
    }

    $scope.deliverSub = function(){
        var par = {}
        par.contractDeliver = {
            ID:$scope.contract.ID,
            DELIVER_STATUS:"1"
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
            Init.iwbhttp('/car/saveContractDeliver', returnData, function (data, header, config, status) {
                if(data.resFlag == '0'){
                    $scope.contract['DELIVER_STATUS'] = 1;
                    $scope.open(data.msg)
                } else{
                    $scope.contract['DELIVER_STATUS'] = 0;
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
            BIZ_ID:$scope.contract.ID,
            payTypeList:$scope.payTypeList,
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
        Init.iwbhttp('/car/queryFinanceFlowList', par, function (data, header, config, status) {
            if(data.resFlag == '0'){
                $scope.financeFlowList = data.dataList;
            } 
        }, function (data, header, config, status) {
        });
    }

    $scope.openCarTable = function (){
        url = 'views/dashboard/car/carTableModal.html';
        ctrlName = 'CarTableModalCtrl';
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

    $scope.openCarTableRead = function (){
        url = 'views/dashboard/car/carTableReadModal.html';
        ctrlName = 'CarTableReadModalCtrl';
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
        $state.go("dashboard.contractIndex.contractList");
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
