'use strict';
angular.module('sbAdminApp').controller('CarCountDetailListCtrl', ['$scope','Init','Modal','$state','CheckBrowser','$stateParams', function ($scope,Init,Modal,$state,CheckBrowser,$stateParams) {
    CheckBrowser.check();
    if($stateParams.from == null || $stateParams.from == ""){
        localStorageService.set("collapse", 0);
        $state.go("dashboard.index");
        return;
    }
    $.extend( $.fn.dataTable.defaults, {
        searching: true,
        ordering:  true
    } );

    //弹框参数
    var resolve = {};
    var url = "";
    var ctrlName = "";

    var deltable = "";
    var table = "";
    //table数据
    $scope.appData = [];
    Init.iwbhttp('/car/queryCarCountDetailList', {planName:$stateParams.planName}, function (data, header, config, status) {
        if (angular.equals("0", data.resFlag)) {
            $scope.appData = data.carCountDetailList;
            table = $('#roleTable').DataTable({
                "data": $scope.appData,
                "columns": [
                    {
                        "data": "PLATE_NUM"
                    },
                    {
                        "data": "fieldName"
                    },
                    {
                        "data": "userName"
                    },
                    {
                        "data": "actiondate"
                    },
                   
                ],
                "ordering":  false,
                "language": {
                    "lengthMenu": "每页 _MENU_ 条记录 ",
                    "zeroRecords": "没有找到记录",
                    "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页,共_TOTAL_条 )",
                    "infoEmpty": "无记录",
                    "search": "搜索 : ",
                    "paginate": {
                        "first": "首页",
                        "last": "尾页",
                        "next": "下一页",
                        "previous": "前一页"
                    },
                    "infoFiltered": "(从 _MAX_ 条记录过滤)"
                },
                "pagingType": "full_numbers",
                "columnDefs": [
                    {
                        searchable: true,
                        targets: 0
                    }
                ]
            });
        } else {
            $scope.open(data.msg);
        }
        //角色维护
        $('#roleTable tbody').on('click', '#a_role', function () {
            var row = table.row($(this).parents('tr'));
            var data = row.data();
            var roleId = data.ROLE_ID;
            $state.go("dashboard.roleIndex.roleInfo",{"roleId":roleId,"from":"dashboard.roleIndex.roleList"});
        });

        //角色-菜单维护
        $('#roleTable tbody').on('click', '#a_menu', function () {
            var row = table.row($(this).parents('tr'));
            var data = row.data();
            var roleId = data.ROLE_ID;
            $state.go("dashboard.roleIndex.roleMenu",{"roleId":roleId,"from":"dashboard.roleIndex.roleList"});
        });

        //角色-人员维护
        $('#roleTable tbody').on('click', '#a_user', function () {
            var row = table.row($(this).parents('tr'));
            var data = row.data();
            var roleId = data.ROLE_ID;
            $state.go("dashboard.roleIndex.roleUser",{"roleId":roleId,"from":"dashboard.roleIndex.roleList"});
        });

    }, function (data, header, config, status) {
    });



    //返回
    $scope.back = function(){
        $state.go("dashboard.carCountIndex.carCountList");
    }

    //提示modal弹框
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

        }, function () {

        });
    };

}]);