'use strict';
angular.module('sbAdminApp').controller('FinanceFlowModalCtrl', ['$scope','$modalInstance','Init','parm','content','Modal', function ($scope, $modalInstance,Init,parm,content,Modal){
	//弹框标题
	$scope.content = content;
	//传入参数
    $scope.parm = parm;
    $scope.payTypeList = parm.payTypeList;
    $scope.financeFlow = {
        ID:"",
        BIZ_ID:$scope.parm.BIZ_ID,
        RECEIPT_NO:"",
        BIZ_NAME:"",
        actiondate:"",
        MONEY:"",
        TYPE:"",
    }
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
        if(!$scope.financeFlow.TYPE ||$scope.financeFlow.TYPE == 'null' || $scope.financeFlow.TYPE == null || $scope.financeFlow.TYPE == ''){
            $scope.open('请选择付款方式')
            return false;
        }
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