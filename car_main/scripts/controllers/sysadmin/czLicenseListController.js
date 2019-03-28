'use strict';
angular.module('sbAdminApp').controller('CzLicenseListCtrl', ['$scope','Init','Modal','$stateParams','$rootScope','localStorageService','$state','CheckBrowser','$location', '$interval','CheckParam',function ($scope,Init,Modal,$stateParams,$rootScope,localStorageService,$state,CheckBrowser,$location,$interval,CheckParam) {
    CheckBrowser.check();

    //弹框参数
    var resolve = {};
    var url = "";
    var ctrlName = "";
    //搜索内容
    $scope.searchContent = "";

    //table当前数据（页面数据页数等）
    $scope.pageData = "";

    $scope.param = {};
    //table数据
    var table = $('#czLicenseTable').DataTable({
        "serverSide": true,
        "columns": [
            {
                "data": "EP_ID"
            },
            {
                "data": "EP_NAME"
            },
            {
                "data": "LICENSE_NO"
            },
            {
                "class": "mytable-center",
                "targets": -1,
                "data": null,
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<div class='btn-group-vertical'><button type='button' class='btn btn-primary btn-sm dropdown-toggle' data-toggle='dropdown' id='a_check'>编辑</button></div>");
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
            Init.iwbhttp('/admin/queryHandleLicenseList', $scope.param, function(data,header,config,status){
                var returnData = {};
                if(data.resFlag == 0){
                    returnData.recordsTotal = data.totalRow;//返回数据全部记录
                    returnData.recordsFiltered = data.totalRow;//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = data.czlicenseList;//返回的数据列表
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
        }
    });

    //新增
    $scope.add = function(){
        $state.go("dashboard.czlicenseIndex.czlicenseInfo",{"epId":"","from":"dashboard.czlicenseIndex.czlicenseList"});
    }

    //查看详情
    $('#czLicenseTable tbody').on('click', '#a_check', function () {
        var row = table.row($(this).parents('tr'));
        var data = row.data();
        var epId = data.EP_ID;
        $state.go("dashboard.czlicenseIndex.czlicenseInfo",
        {
            "epId":epId,
            "from":"dashboard.czlicenseIndex.czlicenseList"
        });
    });

    //请求后台
    $scope.postService = function (){
        if (table != undefined && table.search() != null) {
            $scope.searchContent = table.search();
        }
        $scope.param.searchContent = $scope.searchContent;
        Init.iwbhttp('/admin/queryHandleLicenseList', $scope.param, function(data,header,config,status){
            if (data.resFlag == 0) {
                for(var i = 0 ; i < data.planList.length ; i++)
                {
                    table.row(i).columns = data.planList[i];
                }
                table.draw();
            } else {
                $scope.open(data.msg);
            }
        },function(data,header,config,status){
        });
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