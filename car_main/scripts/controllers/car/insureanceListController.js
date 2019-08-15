'use strict';
angular.module('sbAdminApp').controller('InsureanceListCtrl', ['$scope','Init','Modal','$state','CheckBrowser','CheckParam', function ($scope,Init,Modal,$state,CheckBrowser,CheckParam) {
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
    var table = $('#insureanceTable').DataTable({
        "serverSide": true,
        "columns": [
            {
                "visible": false,
                "data": "ID"
            },
            {
                "data": "PLATE_NUM"
            },
            {
                "data": "ENGINE_NUMBER"
            },
            {
                "data": "FORCE_IS",
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    if(oData.force_remark == '1'){
                        $(nTd).css('background-color','#FF663F')
                    }
                    if(oData.force_remark == '2'){
                        $(nTd).css('background-color','#22D0C6')
                    }
                    $(nTd).html("<input value='"+sData+"'>");
                }
            },
            {
                "data": "FORCE_DATE",
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    if(sData == null){
                        sData=""
                    }
                    if(oData.force_remark == '1'){
                        $(nTd).css('background-color','#FF663F')
                    }
                    if(oData.force_remark == '2'){
                        $(nTd).css('background-color','#22D0C6')
                    }
                    
                    $(nTd).html("<input placeholder='yyyy-mm-dd'  value='"+sData+"'>");
                }
            },
            {
                "data": "BUS_IS",
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    if(oData.bus_remark == '1'){
                        $(nTd).css('background-color','#FF663F')
                    }
                    if(oData.bus_remark == '2'){
                        $(nTd).css('background-color','#22D0C6')
                    }
                    $(nTd).html("<input value='"+sData+"'>");
                }
            },
            {
                "data": "BUS_DATE",
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    if(sData == null){
                        sData=""
                    }
                    if(oData.bus_remark == '1'){
                        $(nTd).css('background-color','#FF663F')
                    }
                    if(oData.bus_remark == '2'){
                        $(nTd).css('background-color','#22D0C6')
                    }
                    $(nTd).html("<input placeholder='yyyy-mm-dd' value='"+sData+"'>");
                }
            },  
            {
                "class": "mytable-center",
                "targets": -1,
                "data": null,
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<div class='btn-group-vertical'><button type='button' class='btn btn-primary btn-sm dropdown-toggle' data-toggle='dropdown' id='a_check'>保存</button></div>");
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
            Init.iwbhttp('/car/insureanceList', $scope.param, function(data,header,config,status){
                var returnData = {};
                if(data.resFlag == 0){
                    returnData.recordsTotal = data.totalRow;//返回数据全部记录
                    returnData.recordsFiltered = data.totalRow;//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = data.insureanceList;//返回的数据列表
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
    $('#insureanceTable tbody').on('click', '#a_check', function () {
        var row = table.row($(this).parents('tr'));
        var data = row.data();
        var param = {}
        param.ID = data.ID
        param.PLATE_NUM = data.PLATE_NUM
        param.ENGINE_NUMBER = data.ENGINE_NUMBER
        param.FORCE_IS = $($(row.node()).find("input")[0]).val()
        param.FORCE_DATE = $($(row.node()).find("input")[1]).val()
        var patrn=/^(\d{4})(-)(\d{2})(-)(\d{2})$/;
        if (param.FORCE_DATE != '' && !patrn.exec(param.FORCE_DATE)){
            $scope.open("日期格式错误！");
            return;
        }
        param.BUS_IS = $($(row.node()).find("input")[2]).val()
        param.BUS_DATE = $($(row.node()).find("input")[3]).val()
        if (param.BUS_DATE != '' && !patrn.exec(param.BUS_DATE)){
            $scope.open("日期格式错误！");
            return;
        }
        Init.iwbhttp('/car/updateInsureance', {obj:param}, function(data,header,config,status){
            if(data.resFlag == 0){
                $scope.open(data.msg);
            }else{
                $scope.open(data.msg);
            }
        },function(data,header,config,status){
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