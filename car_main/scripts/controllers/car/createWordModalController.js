'use strict';
angular.module('sbAdminApp').controller('CreateWordModalCtrl', ['$scope','$modalInstance','Init','parm','content','Modal', function ($scope, $modalInstance,Init,parm,content,Modal){
	//弹框标题
	$scope.content = content;
	//传入参数
    $scope.parm = parm;
    $scope.contract = parm.contract;
	$scope.contractFinance = parm.contractFinance
	$scope.item = {
		id:$scope.contract.ID,
		templateName:"",
		BIZ_ID:$scope.parm.BIZ_ID,
		downloadPath:$scope.contract.filePath,
	}
	//弹框参数
	var resolve = {	};
	var url = "";
	var ctrlName = "";
	$scope.download = function(){
		window.open($scope.item.downloadPath,"_blank");
	}
	//确认
	$scope.sub = function () {
		if($scope.contract.STATUS == '3' && $scope.contractFinance.STATUS == '1'){
			if($scope.item.templateName == ''){
				$scope.open('请选择合同模板')
				return false;
			}
			Init.iwbhttp("/car/createWord", $scope.item, function (data, header, config, status) {
				$scope.open(data.msg);
				if(data.resFlag == '0'){
					$scope.item.downloadPath = data.downloadPath;
					$scope.download();
				}
			}, function (data, header, config, status) {
			});
		}else{
			$scope.open('请先完成流程')
            return false;
		}
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