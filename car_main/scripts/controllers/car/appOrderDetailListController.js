/**
 * Created by John on 2016/12/21.
 */
'use strict';
angular.module('sbAdminApp').controller('AppOrderDetailListCtrl', ['$rootScope', '$scope', 'Init', 'Modal', 'localStorageService', '$timeout', '$interval', 'CheckBrowser','$state','$stateParams', function ($rootScope, $scope, Init, Modal, localStorageService, $timeout, $interval, CheckBrowser,$state,$stateParams) {
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
    var id = $stateParams.id;
    var par = {id: id};
    $scope.order = {};
    $scope.offerCode = {
        "ID":"",
        "CODE":"",
        "checkRes":""
    }
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
        Init.iwbhttp('/car/getAppOrder', par, function (data, header, config, status) {
            if(data.resFlag == '0'){
                $scope.order = data.order
                $scope.order.TOTAL_MONEY = parseFloat(data.order.TOTAL_MONEY)
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

    $scope.queryCar = function(){
        Init.iwbhttp('/car/querybyPlateNum',  {"plateNum":$scope.order.CAR_PLATE_NUM}, function(data,header,config,status){
            if(data.resFlag == '0'){
                $scope.order.CAR_FRAME_NUMBER = data.car.FRAME_NUMBER
            }else{
                $scope.order.CAR_FRAME_NUMBER = ""
            }
        },function(data,header,config,status){
        });
    }

    $scope.checkOfferCode = function(){
        Init.iwbhttp('/car/checkOfferCode',  {"code":$scope.offerCode.CODE}, function(data,header,config,status){
            if(data.resData != null){
                $scope.offerCode.ID =  data.resData.ID ;
                $scope.order.offerCode = data.resData.CODE;
                $scope.offerCode.checkRes ="优惠码校验成功"
            }
            else{
                $scope.order.offerCode = "";
                $scope.offerCode.checkRes ="优惠码校验失败"
            }
        },function(data,header,config,status){
        });
    }
    
    $scope.saveOrder = function(){
        $scope.order.begindate = $('#order_begindate').val() 
        $scope.order.enddate = $('#order_enddate').val() 
        if($scope.order.CAR_FRAME_NUMBER == null || $scope.order.CAR_FRAME_NUMBER == ""){
            $scope.open('请输入正确的牌照号')
            return false;
        }
        if($scope.order.TOTAL_MONEY == null || $scope.order.TOTAL_MONEY == ""){
            $scope.open('请输入总金额')
            return false;
        }
        if(!$scope.order.begindate ||$scope.order.begindate == 'null' || $scope.order.begindate == null || $scope.order.begindate == ''){
            $scope.open('请输入开始日期')
            return false;
        }
        if(!$scope.order.enddate ||$scope.order.enddate == 'null' || $scope.order.enddate == null || $scope.order.enddate == ''){
            $scope.open('请输入结束日期')
            return false;
        }
        Init.iwbhttp('/car/saveAppOrder',  {"order":$scope.order}, function(data,header,config,status){
            $scope.open(data.msg)
        },function(data,header,config,status){
        });
    }

    $scope.addFinanceFlow = function (){
        url = 'views/dashboard/car/financeFlowModal.html';
        ctrlName = 'FinanceFlowModalCtrl';
        $scope.order.CU_ID = $scope.order.USER_ID
        $scope.order.CU_NAME = $scope.order.USER_NAME
        $scope.order.TYPE = "0"
        var parm = {
            BIZ_ID:$scope.order.ID,
            contract:$scope.order,
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

    //返回
    $scope.back = function(){
        $state.go("dashboard.appOrderIndex.appOrderList");
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
