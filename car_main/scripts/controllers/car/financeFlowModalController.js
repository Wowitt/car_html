'use strict';
angular.module('sbAdminApp').controller('FinanceFlowModalCtrl', ['$scope','$modalInstance','Init','parm','content','Modal', function ($scope, $modalInstance,Init,parm,content,Modal){
	//弹框标题
	$scope.content = content;
	//传入参数
    $scope.parm = parm;
    $scope.contract = parm.contract;
    $scope.financeFlow = {
        ID:"",
        BIZ_ID:$scope.parm.BIZ_ID,
        RECEIPT_NO:"",
        BIZ_NAME:"",
        actiondate:"",
		MONEY:"",
		RECEIVER_ID:"",
		RECEIVER_NAME:"",
		RECEIVER_PayTitle:"",
		direction:"收",
		SOURCE:"web",
		PAYER_ID:$scope.contract.CU_ID,
		PAYER_NAME:$scope.contract.TYPE=='0' ? $scope.contract.CU_NAME : $scope.contract.CU_EP_NAME,
	}
	$scope.companyModeList = []
	$scope.companyModeSelected = {}
	$scope.init = function(){
		//initFinanceFlow
		Init.iwbhttp("/car/initFinanceFlow", {}, function (data, header, config, status) {
			if(data.resFlag == '0'){
				$scope.companyModeList = data.companyPayModeList
			}
			// console.log($scope.companyModeList)
		}, function (data, header, config, status) {
		});
	}
	$scope.init()
	//弹框参数
	var resolve = {	};
	var url = "";
	var ctrlName = "";
	//确认
	$scope.sub = function () {
        $scope.financeFlow.actiondate= $('#financeFlow_actiondate').val();
        if(!$scope.financeFlow.RECEIPT_NO ||$scope.financeFlow.RECEIPT_NO == 'null' || $scope.financeFlow.RECEIPT_NO == null || $scope.financeFlow.RECEIPT_NO == ''){
            $scope.open('请输入收据号')
            return false;
        }
        if(!$scope.financeFlow.BIZ_NAME ||$scope.financeFlow.BIZ_NAME == 'null' || $scope.financeFlow.BIZ_NAME == null || $scope.financeFlow.BIZ_NAME == ''){
            $scope.open('请选择收费项')
            return false;
        }
        if(!$scope.financeFlow.actiondate ||$scope.financeFlow.actiondate == 'null' || $scope.financeFlow.actiondate == null || $scope.financeFlow.actiondate == ''){
            $scope.open('请输入日期')
            return false;
        }
        if(!$scope.financeFlow.MONEY ||$scope.financeFlow.MONEY == 'null' || $scope.financeFlow.MONEY == null || $scope.financeFlow.MONEY == ''){
            $scope.open("金额不能为空！");
			return;
        }
        if(!$scope.financeFlow.RECEIVER_PayTitle ||$scope.financeFlow.RECEIVER_PayTitle == 'null' || $scope.financeFlow.RECEIVER_PayTitle == null || $scope.financeFlow.RECEIVER_PayTitle == ''){
            $scope.open('请选择收款方式')
            return false;
		}
		$scope.financeFlow.RECEIVER_ID = $scope.companyModeSelected.ID
		$scope.financeFlow.RECEIVER_NAME = $scope.companyModeSelected.NAME
		Init.iwbhttp("/car/saveFinanceFlow", {parm:$scope.financeFlow}, function (data, header, config, status) {
			$scope.open(data.msg);
			if($scope.closeFlag = true){
				if(data.resFlag == '0'){
					$modalInstance.close('succeed');
				}
			}
		}, function (data, header, config, status) {
		});
	};
	//取消
	$scope.cancel = function () {
		$modalInstance.close('cancel');
	};

	//弹框提示
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
			$scope.closeFlag = true;
		}, function () {
		});
	};
}]);