'use strict';
angular.module('sbAdminApp').controller('NotPayNumListCtrl', ['$scope','Init','Modal','$state','CheckBrowser','CheckParam', function ($scope,Init,Modal,$state,CheckBrowser,CheckParam) {
    CheckBrowser.check();
    $.extend( $.fn.dataTable.defaults, {
        searching: true,
        ordering:  true
    } );
    //弹框参数
    var resolve = {};
    var url = "";
    var ctrlName = "";
    //搜索内容
    $scope.searchContent = "";
    //状态列表
    $scope.statusList = "";
    //所属环保局列表
    $scope.sepaList = "";
    //所属环保局默认全选
    $scope.sepaContent = "所属环保局：全部";
    $scope.sepaFlag = false;
    //状态默认全选
    $scope.statusContent = "状态：全部";

    //table当前数据（页面数据页数等）
    $scope.pageData = "";
    $scope.param = {};
    var table = $('#contractTable').DataTable({
        "serverSide": true,
        "columns": [
            {
                "data": "ID"
            },
            {
                "mDataProp": "CU_TYPE",
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    if(sData == "1")
                    {
                        $(nTd).html("公司");
                    }else
                    {
                        $(nTd).html("个人");
                    }
                }
            },
            {
                "data": "CU_EP_NAME"
            },
            {
                "data": "CU_NAME"
            },
            {
                "data": "TYPE"
            },
            {
                "data": "STATUSNAME"
            },
            {
                "class": "mytable-center",
                "targets": -1,
                "data": null,
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<div style='display:flex;justify-content:space-around'><button type='button' class='btn btn-primary btn-sm'  id='a_check'>卖/租流程</button><button type='button' class='btn btn-success btn-sm'  id='backCarId'>还车流程</button></div>");
                }
            }
        ],
        ajax:function(data, callback, settings){
            $scope.param.ps = data.length +"";
            $scope.param.start = data.start + "";
            $scope.param.pn = ((data.start/data.length) +1)+"";
            if(table != undefined && table.search() != null){
                $scope.searchContent = table.search();
            }
            $scope.param.searchContent = CheckParam.checkSql($scope.searchContent);
            Init.iwbhttp('/car/notPayNumList', $scope.param, function(data,header,config,status){
                var returnData = {};
                if(data.resFlag == 0){
                    returnData.recordsTotal = data.totalRow;//返回数据全部记录
                    returnData.recordsFiltered = data.totalRow;//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = data.dataList;//返回的数据列表
                    callback(returnData);
                }else{
                    $scope.open(data.msg);
                }
            },function(data,header,config,status){
            });
        },
        "ordering":  false,
        "searching": true,
        "language": {
            "lengthMenu": "每页 _MENU_ 条记录 ",
            "zeroRecords": "没有找到记录",
            "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页,共_TOTAL_条 )",
            "infoEmpty": "无记录",
            "search": "搜索 : _INPUT_",
            "paginate": {
                "first": "首页",
                "last": "尾页",
                "next": "下一页",
                "previous": "前一页"
            },
            "infoFiltered": "(从 _MAX_ 条记录过滤)"
        },
        "pagingType": "full_numbers",
        "scrollX": true,
        "scrollXInner": "100%",
        "scrollY": "350px",
        "scrollCollapse": true,
        "fixedColumns":   {
            leftColumns:0,
            rightColumns: 1
        },

        "dom": 'Zlfrtip',

    });

    //卖租车
    $('#contractTable tbody').on('click', '#a_check', function () {
        var row = table.row($(this).parents('tr'));
        var data = row.data();
        var id = data.ID;
        $state.go("dashboard.notPayNumIndex.contractDetailList",
        {
            "id":id,
            "from":"dashboard.notPayNumIndex.notPayNumList"
        });
    });
    //还车
    $('#contractTable tbody').on('click', '#backCarId', function () {
        var row = table.row($(this).parents('tr'));
        var data = row.data();
        var id = data.ID;
        $state.go("dashboard.notPayNumIndex.contractDetailForBackList",
        {
            "id":id,
            "from":"dashboard.notPayNumIndex.notPayNumList"
        });
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