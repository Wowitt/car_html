'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('notifications',function(){
		return {
			templateUrl:'scripts/directives/notifications/notifications.html',
			restrict: 'E',
			replace: true,
			controller:function($scope,Init,$rootScope,localStorageService,$modal){
				$scope.finishedTaskFlagI = true;
				$scope.agreementFlagI = false;
				$scope.planFlagI = false;
				$scope.haulFlagI = false;
				$scope.agreementUrlI = "#";
				$scope.planUrlI = "#";
				if(localStorageService.get("userType") == "admin"){
					$scope.agreementUrlI = "dashboard.agreementForAdminIndex.agreementForAdminList";
					$scope.planUrlI = "dashboard.transferForAdminIndex.transferForAdminList";
				}else if(localStorageService.get("userType") == "epAdminCs"){
					$scope.agreementUrlI = "dashboard.agreementIndex.agreementList";
					$scope.planUrlI = "dashboard.transferIndex.transferList";
				}else if(localStorageService.get("userType") == "epAdminCz"){
					$scope.agreementUrlI = "dashboard.agreementIndexCz.agreementListCz";
				}
				var par = {
					"orgCode":localStorageService.get("orgCode"),
					"BTOF_ID":localStorageService.get("btofId"),
					"roleId":localStorageService.get("roleId"),
					"epId":localStorageService.get("epId")
				};
				Init.iwbhttp('/car/getStatistics', par, function (data, header, config, status) {
					if (angular.equals("0", data.resFlag)) {
						$scope.carCount = data.carCount;
						// if(data.agreementNumI >= 0){
						// 	$scope.agreementFlagI = true;
						// 	$scope.agreementNumI = data.agreementNumI;
						// }
						
					} else {
						$scope.open(data.msg);
					}
				}, function (data, header, config, status) {
				});

				//��ʾmodal����
				$scope.open = function (content,data) {
					var modalInstance = $modal.open({
						templateUrl: 'views/modal/promptModal.html',
						controller: 'PromptModalCtrl',
						resolve: {
							content: function () {
								return content;
							},
							data: function () {
								return data;
							}
						}
					});
					modalInstance.result.then(function () {
						//$log.info('success : ' + content);
					}, function () {
						//$log.info('error : ' + new Date());
					});
				};
			}
    	}
	});


