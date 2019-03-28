'use strict';
angular.module('sbAdminApp').controller('CarCountListCtrl', ['$scope','Init','Modal','$state','CheckBrowser', function ($scope,Init,Modal,$state,CheckBrowser) {
    CheckBrowser.check();
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
    Init.iwbhttp('/car/queryCarCountGroup', {}, function (data, header, config, status) {
        if (angular.equals("0", data.resFlag)) {
            $scope.appData = data.carCountList;
            table = $('#roleTable').DataTable({
                "data": $scope.appData,
                "columns": [
                    {
                        "data": "planName"
                    },
                    {
                        "data": "num"
                    },
                    {
                        "class": "mytable-center",
                        "targets": -1,
                        "data": null,
                        "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html("<div class='btn-group-vertical'><button type='button' class='btn btn-primary btn-sm dropdown-toggle' data-toggle='dropdown' id='a_check'>查看</div>");
                        }
                    }
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
                        searchable: false,
                        targets: 0
                    }
                ]
            });
        } else {
            $scope.open(data.msg);
        }

        //查看详情
        $('#roleTable tbody').on('click', '#a_check', function () {
            var row = table.row($(this).parents('tr'));
            var data = row.data();
            var planName = data.planName;
            $state.go("dashboard.carCountIndex.carCountDetailList",
            {
                "planName":planName,
                "from":"dashboard.carCountIndex.carCountList"
            });
        });

    }, function (data, header, config, status) {
    });


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