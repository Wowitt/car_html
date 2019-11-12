'use strict';
angular.module('sbAdminApp').controller('CarModalCtrl', ['$scope','$modalInstance','parm','content','Modal','Init', function ($scope, $modalInstance,parm,content,Modal,Init){
	//弹框标题
	$scope.content = content;
	//传入参数
	$scope.car = parm
	//弹框参数
	var resolve = {	};
	var url = "";
	var ctrlName = "";
	//确认
	$scope.sub = function () {
        if(!$scope.car.STATUS ||$scope.car.STATUS == 'null' || $scope.car.STATUS == null || $scope.car.STATUS == ''){
            $scope.open('请选择状态')
            return false;
		}
		if($scope.car.STATUS == "0"){
			$scope.car.STATUSNAME = "可放"
		}
		else if($scope.car.STATUS == "1"){
			$scope.car.STATUSNAME = "租赁"
		}
		else if($scope.car.STATUS == "2"){
			$scope.car.STATUSNAME = "分期"
		}
		else if($scope.car.STATUS == "3"){
			$scope.car.STATUSNAME = "全款"
		}
		else if($scope.car.STATUS == "4"){
			$scope.car.STATUSNAME = "替换专用"
		}
		else if($scope.car.STATUS == "5"){
			$scope.car.STATUSNAME = "故障"
		}
		else if($scope.car.STATUS == "6"){
			$scope.car.STATUSNAME = "自用"
		}
		else if($scope.car.STATUS == "7"){
			$scope.car.STATUSNAME = "借出"
		}
		else if($scope.car.STATUS == "8"){
			$scope.car.STATUSNAME = "试车"
		}
		else if($scope.car.STATUS == "9"){
			$scope.car.STATUSNAME = "验车"
		}
		Init.iwbhttp("/car/updateCarStatus", {parm:$scope.car}, function (data, header, config, status) {
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