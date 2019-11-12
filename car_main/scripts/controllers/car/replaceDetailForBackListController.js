/**
 * Created by John on 2016/12/21.
 */
'use strict';
angular.module('sbAdminApp').controller('ReplaceDetailForBackListCtrl', ['$rootScope', '$scope', 'Init', 'Modal', 'localStorageService', '$timeout', '$interval', 'CheckBrowser','$state','$stateParams', function ($rootScope, $scope, Init, Modal, localStorageService, $timeout, $interval, CheckBrowser,$state,$stateParams) {
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
    $scope.func_money_class = {
        // "display":"flex",
        // "justify-content": "center",
        // "align-items": "center",
        "width":"100%",
        // "height":"80px",
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
        "margin-top": "16px",
        "padding":"10px",
    }
    var id = $stateParams.id;
    var par = {
        id: id,
        replaceId:$stateParams.replaceId
    };
    $scope.contract = {};
    $scope.contractBack = {}
    $scope.contractDeliver = {}
    $scope.cucoPricelist = []
    $scope.roleIds = localStorageService.get("roleIds");
    $scope.financeFlow = {
        ID:"",
        BIZ_ID:id,
        RECEIPT_NO:"",
        BIZ_NAME:"替换车退款",
        actiondate:"",
		MONEY:"",
		RECEIVER_ID:"",
		RECEIVER_NAME:"",
		RECEIVER_PayTitle:"",
		direction:"付",
		SOURCE:"web",
		PAYER_ID:"",
		PAYER_NAME:"",
	}
    $scope.companyModeList = []
    $scope.companyModeSelected = {}
    //弹框参数
    var resolve = {};
    var url = "";
    var ctrlName = "";
    $scope.init = function(){
        Init.iwbhttp('/car/getContract', par, function (data, header, config, status) {
            if(data.resFlag == '0'){
                $scope.contract = data.contract
                if(data.replaceBack && data.replaceBack != null){
                    $scope.contractBack = data.replaceBack;
                }
                if(data.cucoPricelist && data.cucoPricelist != null){
                    $scope.cucoPricelist = data.cucoPricelist;
                }
                if(data.financeFlowList && data.financeFlowList != null){
                    $scope.financeFlowList = data.financeFlowList;
                    // var removeIndex = -1
                    // for(var i = 0 ; i < $scope.financeFlowList.length ; i++){
                    //     if($scope.financeFlowList[i].BIZ_NAME == '替换车退款'){
                    //         removeIndex = i
                    //         $scope.financeFlow.ID = $scope.financeFlowList[i].ID
                    //         $scope.financeFlow.BIZ_ID = $scope.financeFlowList[i].BIZ_ID
                    //         $scope.financeFlow.BIZ_NAME = $scope.financeFlowList[i].BIZ_NAME
                    //         $scope.financeFlow.actiondate = $scope.financeFlowList[i].actiondate
                    //         $scope.financeFlow.MONEY = $scope.financeFlowList[i].MONEY
                    //         $scope.financeFlow.PAYER_ID = $scope.financeFlowList[i].PAYER_ID
                    //         $scope.financeFlow.PAYER_NAME = $scope.financeFlowList[i].PAYER_NAME
                    //         $scope.financeFlow.PAYER_PayTitle = $scope.financeFlowList[i].PAYER_PayTitle
                    //         $scope.financeFlow.RECEIVER_ID = $scope.financeFlowList[i].RECEIVER_ID
                    //         $scope.financeFlow.RECEIVER_NAME = $scope.financeFlowList[i].RECEIVER_NAME
                    //         for(var j = 0 ; j < $scope.companyModeList.length ; j++){
                    //             if($scope.companyModeList[j].ID == $scope.financeFlow.PAYER_ID){
                    //                 $scope.companyModeSelected = $scope.companyModeList[j]
                    //                 break
                    //             }
                    //         }
                    //     }
                    // }
                    // if(removeIndex > 0){
                    //     $scope.financeFlowList.splice(removeIndex,1)
                    // }
                }
            }        
        }, function (data, header, config, status) {
        });
    }
    $timeout(function(){

        $("#PAYER__select option").each(function(index){
            if($(this)[0].innerHTML == $scope.financeFlow.PAYER_PayTitle){
                // console.log($(this))
                $(this)[0].selected = true;
            }
        })
    },200)
    $scope.init_data = function() {
        Init.iwbhttp("/car/initFinanceFlow", {}, function (data, header, config, status) {
			if(data.resFlag == '0'){
                $scope.companyModeList = data.companyPayModeList
                $scope.init();
			}
			// console.log($scope.companyModeList)
		}, function (data, header, config, status) {
		});
    };
    $scope.init_data();

    $scope.collectSub = function(obj){
        $scope.contractBack.ID = $stateParams.replaceId
        var par = {}
        par.replaceBack  = $scope.contractBack
        par.replaceBack.type = obj
        var msg = "请确认后提交?";
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
            Init.iwbhttp('/car/updateReplaceBack', returnData, function (data, header, config, status) {
                if(data.resFlag == '0'){
                    $scope.open(data.msg)
                    $scope.contractBack.STATUS = data.map.STATUS
                    $scope.contractBack.backdate = data.map.backdate
                } else{
                    $scope.open(data.msg)
                }       
            }, function (data, header, config, status) {
            });
        }, function () {

        });
    }

    $scope.financeSub = function(){
        $scope.financeFlow.actiondate= $('#financeFlow_actiondate').val();
        if(!$scope.financeFlow.actiondate ||$scope.financeFlow.actiondate == 'null' || $scope.financeFlow.actiondate == null || $scope.financeFlow.actiondate == ''){
            $scope.open('请输入日期')
            return false;
        }
        if(!$scope.financeFlow.MONEY ||$scope.financeFlow.MONEY == 'null' || $scope.financeFlow.MONEY == null || $scope.financeFlow.MONEY == ''){
            $scope.open("金额不能为空！");
			return;
        }
        if(!$scope.financeFlow.PAYER_PayTitle ||$scope.financeFlow.PAYER_PayTitle == 'null' || $scope.financeFlow.PAYER_PayTitle == null || $scope.financeFlow.PAYER_PayTitle == ''){
            $scope.open('请选择付款方式')
            return false;
        }
        $scope.financeFlow.PAYER_ID = $scope.companyModeSelected.ID
		$scope.financeFlow.PAYER_NAME = $scope.companyModeSelected.NAME
		$scope.financeFlow.RECEIVER_ID = $scope.contract.CU_ID
		$scope.financeFlow.RECEIVER_NAME = $scope.contract.type == '0' ? $scope.contract.CU_NAME : $scope.contract.CU_EP_NAME
        var par = {}
        par.parm  = $scope.financeFlow 
        par.replaceId = $stateParams.replaceId
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
            Init.iwbhttp('/car/saveFinanceFlowForReplace', returnData, function (data, header, config, status) {
                if(data.resFlag == '0'){
                    $scope.updateReplace()
                }else{
                    $scope.open(data.msg)  
                }   
            }, function (data, header, config, status) {
            });
        }, function () {

        });
    }
    $scope.updateReplace = function() {
        Init.iwbhttp("/car/updateReplaceForBack", {id:$stateParams.replaceId}, function (data, header, config, status) {
			if(data.resFlag == '0'){
                $scope.contractBack.BACK_STATUS = '3'
                $scope.open(data.msg)
			}else{
                $scope.open(data.msg) 
            }
			// console.log($scope.companyModeList)
		}, function (data, header, config, status) {
		});
    };

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

    $scope.openCarTableBack = function (){
        url = 'views/dashboard/car/carTableBackModal.html';
        ctrlName = 'CarTableBackBackModalCtrl';
        var parm = {
            id:$scope.contract.ID,
        };
        resolve = {
            parm: function () {
                return parm;
            },
            content: function () {
                return '待还车辆信息';
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
