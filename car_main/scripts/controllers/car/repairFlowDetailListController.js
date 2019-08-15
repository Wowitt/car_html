/**
 * Created by John on 2016/12/21.
 */
'use strict';
angular.module('sbAdminApp').controller('RepairFlowDetailListCtrl', ['$rootScope', '$scope', 'Init', 'Modal', 'localStorageService', '$timeout', '$interval', 'CheckBrowser','$state','$stateParams', function ($rootScope, $scope, Init, Modal, localStorageService, $timeout, $interval, CheckBrowser,$state,$stateParams) {
    CheckBrowser.check();
    $scope.func_class = {
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
    $scope.carRow = 0;
    $scope.plateNum = "";
    var flowId = $stateParams.flowId;
    var ifAdd = $stateParams.ifAdd;
    var par = {flowId: flowId};
    $scope.carData = new Array();
    $scope.componentList = new Array();
    $scope.detailListData = new Array();
    $scope.dataFlow = {
        "ID":"",
        "NAME":"",
    }
    $scope.financeFlow = {
        ID:"",
        BIZ_ID:"",
        RECEIPT_NO:"",
        BIZ_NAME:"零件入库",
        actiondate:"",
		MONEY:"",
		RECEIVER_ID:"",
		RECEIVER_NAME:"",
		RECEIVER_PayTitle:"",
		direction:"出",
		SOURCE:"web",
		PAYER_ID:"",
		PAYER_NAME:"",
	}
    $scope.companyModeList = []
    $scope.companyModeSelected = {}
    $scope.companyModeList_Pay = []
	$scope.companyModeSelected_Pay = {}
    //弹框参数
    var resolve = {};
    var url = "";
    var ctrlName = "";
    $scope.init = function(){
		//initFinanceFlow
		Init.iwbhttp("/car/initFinanceFlow", {}, function (data, header, config, status) {
			if(data.resFlag == '0'){
				$scope.companyModeList = data.companyPayModeList
                $scope.companyModeList_Pay = data.companyPayModeList
                if(ifAdd == 1){
                    for(var i = 0 ; i < $scope.companyModeList.length ; i++){
                        if($scope.companyModeList[i].ID == $scope.financeFlow.RECEIVER_ID){
                            $scope.companyModeSelected = $scope.companyModeList[i]
                            break
                        }
                    }
                    for(var i = 0 ; i < $scope.companyModeList_Pay.length ; i++){
                        if($scope.companyModeList_Pay[i].ID == $scope.financeFlow.PAYER_ID){
                            $scope.companyModeSelected_Pay = $scope.companyModeList_Pay[i]
                            break
                        }
                    }
                }
			}
			// console.log($scope.companyModeList)
		}, function (data, header, config, status) {
		});
	}
	
    if(ifAdd == 1){
        //查询单位信息
        Init.iwbhttp('/car/queryRepairFlow', par, function (data, header, config, status) {
            $scope.dataFlow = data.dataFlow
            $scope.financeFlow.ID = data.financeFlow.ID
            $scope.financeFlow.BIZ_ID = data.financeFlow.BIZ_ID
            $scope.financeFlow.BIZ_NAME = data.financeFlow.BIZ_NAME
            $scope.financeFlow.RECEIPT_NO = data.financeFlow.RECEIPT_NO
            $scope.financeFlow.MONEY = data.financeFlow.MONEY
            $scope.financeFlow.PAYER_ID = data.financeFlow.PAYER_ID
            $scope.financeFlow.PAYER_NAME = data.financeFlow.PAYER_NAME
            $scope.financeFlow.PAYER_PayTitle = data.financeFlow.PAYER_PayTitle
            $scope.financeFlow.RECEIVER_ID = data.financeFlow.RECEIVER_ID
            $scope.financeFlow.RECEIVER_NAME = data.financeFlow.RECEIVER_NAME
            $scope.financeFlow.RECEIVER_PayTitle = data.financeFlow.RECEIVER_PayTitle
            $scope.financeFlow.actiondate = data.financeFlow.actiondate
            $scope.init()
        }, function (data, header, config, status) {
        });
    }
    else{
        $scope.init()
    }
    $timeout(function(){
        $("#RECEIVER_select option").each(function(index){
            if($(this)[0].innerHTML == $scope.financeFlow.RECEIVER_PayTitle){
                // console.log($(this))
                $(this)[0].selected = true;
            }
        })
        $("#PAYER__select option").each(function(index){
            if($(this)[0].innerHTML == $scope.financeFlow.PAYER_PayTitle){
                // console.log($(this))
                $(this)[0].selected = true;
            }
        })
    },300)
    //获取车辆类型
    $scope.carType = new Array();
    Init.iwbhttp('/car/queryComponentList', {}, function (data, header, config, status) {
        $scope.componentList = data.componentList;
    }, function (data, header, config, status) {
    });

    Init.iwbhttp('/car/queryCompanyList', {}, function (data, header, config, status) {
        $scope.companyList = data.companyList;
    }, function (data, header, config, status) {
    });

    //保存
    $scope.save = function () { 
        $scope.financeFlow.actiondate= $('#financeFlow_actiondate').val();
        $scope.dataFlow.actiondate= $('#financeFlow_actiondate').val();
        if($scope.dataFlow.NAME == null || $scope.dataFlow.NAME == ""){
            $scope.open('请选择零件')
            return false;
        }
        if(!$scope.financeFlow.PAYER_PayTitle ||$scope.financeFlow.PAYER_PayTitle == 'null' || $scope.financeFlow.PAYER_PayTitle == null || $scope.financeFlow.PAYER_PayTitle == ''){
            $scope.open('请选择付款方式')
            return false;
        }
        $scope.financeFlow.PAYER_ID = $scope.companyModeSelected_Pay.ID
        $scope.financeFlow.PAYER_NAME = $scope.companyModeSelected_Pay.NAME
        var par = {
            dataFlow: $scope.dataFlow,
            financeFlow: $scope.financeFlow
        };
        //车辆管理
        Init.iwbhttp('/car/saveRepairFlow', par, function (data, header, config, status) {
            if(data.resFlag == '0'){
                $scope.dataFlow.ID = data.dataFlowId;
                $scope.financeFlow.ID = data.financeFlow.ID
                $scope.financeFlow.BIZ_ID = data.financeFlow.BIZ_ID
            }
            $scope.open(data.msg)
        }, function (data, header, config, status) {
        });
    }

    //返回
    $scope.back = function(){
        $state.go("dashboard.repairFlowIndex.repairFlowList");
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
