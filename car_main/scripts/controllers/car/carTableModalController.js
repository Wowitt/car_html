'use strict';
angular.module('sbAdminApp').controller('CarTableModalCtrl', ['$scope','$modalInstance','Init','content','parm','Modal', function ($scope, $modalInstance,Init,content,parm,Modal){
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
			$scope.dataList[i].DRIVING_LICENSE = $scope.dataList[i].DRIVING_LICENSE == '1' ? true : false;
			$scope.dataList[i].MAINTENANCE_SIGN = $scope.dataList[i].MAINTENANCE_SIGN =='1' ? true : false;
			$scope.dataList[i].CAR_KEY = $scope.dataList[i].CAR_KEY == '1' ? true : false;
			$scope.dataList[i].INSURANCE = $scope.dataList[i].INSURANCE == '1' ? true : false;
			$scope.dataList[i].YEAR_CHECK_FLAG = $scope.dataList[i].YEAR_CHECK_FLAG == '1' ? true : false;
		}
	}, function (data, header, config, status) {
	});

	//取消
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	$scope.save = function(){
		for(var i = 0 ;i<$scope.dataList.length; i++){
			$scope.dataList[i].DRIVING_LICENSE = $scope.dataList[i].DRIVING_LICENSE == true ? '1' : '0';
			$scope.dataList[i].MAINTENANCE_SIGN = $scope.dataList[i].MAINTENANCE_SIGN == true ? '1' : '0';
			$scope.dataList[i].CAR_KEY  = $scope.dataList[i].CAR_KEY == true ? '1' : '0';
			$scope.dataList[i].INSURANCE = $scope.dataList[i].INSURANCE == true ? '1' : '0';
			$scope.dataList[i].YEAR_CHECK_FLAG= $scope.dataList[i].YEAR_CHECK_FLAG == true ? '1' : '0';
		}
		Init.iwbhttp('/car/saveCarTable', {list:$scope.dataList}, function (data, header, config, status) {
			$scope.open(data.msg);
			for(var i = 0 ;i<$scope.dataList.length; i++){
				$scope.dataList[i].DRIVING_LICENSE = $scope.dataList[i].DRIVING_LICENSE == '1' ? true : false;
				$scope.dataList[i].MAINTENANCE_SIGN = $scope.dataList[i].MAINTENANCE_SIGN =='1' ? true : false;
				$scope.dataList[i].CAR_KEY = $scope.dataList[i].CAR_KEY == '1' ? true : false;
				$scope.dataList[i].INSURANCE = $scope.dataList[i].INSURANCE == '1' ? true : false;
				$scope.dataList[i].YEAR_CHECK_FLAG = $scope.dataList[i].YEAR_CHECK_FLAG == '1' ? true : false;
			}
		}, function (data, header, config, status) {
		});
	}

	$scope.del = function(obj,index){
		Init.iwbhttp('/car/delCarTable', {obj:obj}, function (data, header, config, status) {
			if(data.resFlag == 0){
				$scope.dataList.splice(index,1)
				$scope.open(data.msg);
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