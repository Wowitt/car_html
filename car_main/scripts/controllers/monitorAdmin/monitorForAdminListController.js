'use strict';
angular.module('sbAdminApp').controller('MonitorForAdminListCtrl', ['$scope','Init','Modal','$stateParams','$rootScope','localStorageService','$state','CheckBrowser','$location', '$interval','CheckParam',function ($scope,Init,Modal,$stateParams,$rootScope,localStorageService,$state,CheckBrowser,$location,$interval,CheckParam) {
    CheckBrowser.check();

    //弹框参数
    $scope.monitorScale = 50;
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

    $scope.param = {"orgCode": localStorageService.get("orgCode"), "roleId":localStorageService.get("roleId")};
    //table数据
    var table = $('#planTable').DataTable({
        "serverSide": true,
        "columns": [
            {
                "visible": false,
                "data": "EP_ID"
            },
            {
                "visible": false,
                "data": "applyId"
            },
            {
                "visible": false,
                "data": "TP_ID"
            },
            {
                "visible": false,
                "data": "BELONG_SEPA"
            },
            {
                "data": "EP_NAME"
            },
            {
                "data": "SEPA_NAME"
            },
            {
                "data": "sum_num"
            },
            {
                "data": "sum_num_real"
            },
            {
                "data": "UNIT"
            },
            {
                "class": "mytable-center",
                "targets": -1,
                "data": null,
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<div class='btn-group-vertical'><button type='button' class='btn btn-primary btn-sm dropdown-toggle' data-toggle='dropdown' id='a_check'>查看</button></div>");
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
            $scope.param.sepaValue = $scope.sepaValue;
            $scope.param.monitorScale = $scope.monitorScale/100;
            Init.iwbhttp('/admin/queryMonitorList', $scope.param, function(data,header,config,status){
                var returnData = {};
                if(data.resFlag == 0){
                    returnData.recordsTotal = data.totalRow;//返回数据全部记录
                    returnData.recordsFiltered = data.totalRow;//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = data.planList;//返回的数据列表
                    if($scope.sepaList == ""){
                        if(data.sepaList != null && data.sepaList != ""){
                            $scope.sepaList = data.sepaList;
                            $scope.sepaFlag = true;
                        }
                    }
                    if($scope.statusList == ""){
                        $scope.statusList = data.statusList;
                    }
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


    //查看详情
    $('#planTable tbody').on('click', '#a_check', function () {
        var row = table.row($(this).parents('tr'));
        var data = row.data();
        var tpId = data.TP_ID;
        var epId = data.EP_ID;
        var epName = data.EP_NAME;
        var applyId = data.applyId;
        $state.go("dashboard.monitorForAdminIndex.monitorForAdminMain",
        {
            "tpId":tpId,
            "epId":epId,
            "epName":epName,
            "btnFlag":false,
            "applyId":applyId,
            "from":"dashboard.monitorForAdminIndex.monitorForAdminList"
        });
    });

    //单击某个选项三秒单独选中
    var sepaTimeout;
    //全不选
    $scope.sepaMouseDown = function (obj) {
        sepaTimeout = setTimeout(function () {
            $('input[name="sepa"]').prop('checked', false);
        }, 1000);
    }
    //取消sepaMouseDown里要执行的方法
    $scope.sepaMouseUp = function (obj) {
        clearTimeout(sepaTimeout);
    }

    //单击标题三秒全选
    var sepaAllTimeout;
    //全选
    $scope.sepaAllMouseDown = function (obj) {
        sepaAllTimeout = setTimeout(function () {
            $('input[name="sepa"]').prop('checked', true);
            $scope.sepaChoice();
        }, 1000);
    }
    //取消sepaAllMouseDown里要执行的方法
    $scope.sepaAllMouseUp = function (obj) {
        clearTimeout(sepaAllTimeout);
    }

    //所属环保局选项卡
    $scope.sepaChoice = function () {
        var checkLength = $("input[name='sepa']:checked").length;
        if(checkLength==0){
            $('#sepaDivId input[value='+$scope.sepaValue+']').prop('checked', true);
            $scope.open("至少选择一个所属环保局");
            return;
        }
        $scope.sepaContent = "";
        $scope.sepaValue = "";
        //是否全选
        if(checkLength==$scope.sepaList.length){
            $scope.sepaContent = "所属环保局：全部";
            $scope.sepaValue = "";
        }else{
            $('input[name="sepa"]:checked').each(function () {
                var statusVal = $(this).val();
                for (var i = 0; i < $scope.sepaList.length; i++) {
                    if ($scope.sepaList[i].value == statusVal) {
                        if ($scope.sepaContent == null || $scope.sepaContent == "") {
                            $scope.sepaContent = "所属环保局："+$scope.sepaList[i].text;
                            $scope.sepaValue = "'"+$scope.sepaList[i].value+"'";
                        } else {
                            $scope.sepaContent = $scope.sepaContent + "，" + $scope.sepaList[i].text;
                            $scope.sepaValue = $scope.sepaValue + ",'" + $scope.sepaList[i].value+"'";
                        }
                    }
                }
            });
        }
        //请求后台
        $scope.postService();
    }

    //请求后台
    $scope.postService = function (){
        if (table != undefined && table.search() != null) {
            $scope.searchContent = table.search();
        }
        $scope.param.searchContent = $scope.searchContent;
        $scope.param.statusValue = $scope.statusValue;
        $scope.param.sepaValue = $scope.sepaValue;
        $scope.param.monitorScale = $scope.monitorScale/100;
        Init.iwbhttp('/admin/queryMonitorList', $scope.param, function(data,header,config,status){
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

    $scope.$watch(
        function(){
            return $scope.monitorScale
        },function(newVal,oldVal){
            var reg = /^[1-9]\d*\.?\d*$/
            if(reg.test(newVal) && newVal != oldVal && newVal/100){
                //请求后台
                $scope.postService();
            }
        }
    );

}]);