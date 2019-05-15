'use strict';
angular.module('sbAdminApp').controller('CarTableDeliverModalCtrl', ['$scope','$modalInstance','Init','content','parm','Modal', function ($scope, $modalInstance,Init,content,parm,Modal){
	//弹框标题
	$scope.content = content;
	//传入参数
	$scope.parm = parm;
	$scope.dataList = [];
	//弹框参数
	var resolve = {	};
	var url = "";
	var ctrlName = "";
	//查询申请的流程列表
	Init.iwbhttp('/car/queryCarTable', {id:$scope.parm.id}, function (data, header, config, status) {
		$scope.dataList = data.dataList;
		for(var i = 0 ;i<$scope.dataList.length; i++){
			$scope.dataList[i].CHARGE_GUN = $scope.dataList[i].CHARGE_GUN == '1' ? true : false;
			$scope.dataList[i].TOOL_KIT = $scope.dataList[i].TOOL_KIT == '1' ? true : false;
			$scope.dataList[i].TRIPOD = $scope.dataList[i].TRIPOD =='1' ? true : false;
			$scope.dataList[i].FIRE_EXTINGUISHER = $scope.dataList[i].FIRE_EXTINGUISHER == '1' ? true : false;
			$scope.dataList[i].MAINTENANCE = $scope.dataList[i].MAINTENANCE == '1' ? true : false;
			$scope.dataList[i].AD = $scope.dataList[i].AD == '1' ? true : false;
		}
	}, function (data, header, config, status) {
	});

	//取消
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	$scope.save = function(){
		for(var i = 0 ;i<$scope.dataList.length; i++){
			$scope.dataList[i].CHARGE_GUN = $scope.dataList[i].CHARGE_GUN == true ? '1' : '0';
			$scope.dataList[i].TOOL_KIT = $scope.dataList[i].TOOL_KIT == true ? '1' : '0';
			$scope.dataList[i].TRIPOD = $scope.dataList[i].TRIPOD ==true ? '1' : '0';
			$scope.dataList[i].FIRE_EXTINGUISHER = $scope.dataList[i].FIRE_EXTINGUISHER == true ? '1' : '0';
			$scope.dataList[i].MAINTENANCE = $scope.dataList[i].MAINTENANCE == true ? '1' : '0';
			$scope.dataList[i].AD = $scope.dataList[i].AD == true ? '1' : '0';
		}
		Init.iwbhttp('/car/saveCarTableDeliver', {list:$scope.dataList}, function (data, header, config, status) {
			$scope.open(data.msg);
			for(var i = 0 ;i<$scope.dataList.length; i++){
				$scope.dataList[i].CHARGE_GUN = $scope.dataList[i].CHARGE_GUN == '1' ? true : false;
				$scope.dataList[i].TOOL_KIT = $scope.dataList[i].TOOL_KIT == '1' ? true : false;
				$scope.dataList[i].TRIPOD = $scope.dataList[i].TRIPOD =='1' ? true : false;
				$scope.dataList[i].FIRE_EXTINGUISHER = $scope.dataList[i].FIRE_EXTINGUISHER == '1' ? true : false;
				$scope.dataList[i].MAINTENANCE = $scope.dataList[i].MAINTENANCE == '1' ? true : false;
				$scope.dataList[i].AD = $scope.dataList[i].AD == '1' ? true : false;
			}
		}, function (data, header, config, status) {
		});
	}

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