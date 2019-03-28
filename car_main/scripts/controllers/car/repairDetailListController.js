/**
 * Created by John on 2016/12/21.
 */
'use strict';
angular.module('sbAdminApp').controller('RepairDetailListCtrl', ['$rootScope', '$scope', 'Init', 'Modal', 'localStorageService', '$timeout', '$interval', 'CheckBrowser','$state','$stateParams', function ($rootScope, $scope, Init, Modal, localStorageService, $timeout, $interval, CheckBrowser,$state,$stateParams) {
    CheckBrowser.check();
    $scope.carRow = 0;
    $scope.plateNum = "";
    var repairId = $stateParams.repairId;
    var ifAdd = $stateParams.ifAdd;
    var par = {repairId: repairId};
    $scope.carData = new Array();
    $scope.componentList = new Array();
    $scope.detailListData = new Array();
    $scope.repairData = {
        paymentType:0,
        paymentTypeFlag:true,
        companyData:{},
        RE_DESC:"",
    };
    //弹框参数
    var resolve = {};
    var url = "";
    var ctrlName = "";
    if(ifAdd == 1){
        //查询单位信息
        Init.iwbhttp('/car/queryRepair', par, function (data, header, config, status) {
            $scope.repairData.ID = data.repairData.ID;
            $scope.repairData.carId = data.repairData.CAR_ID;
            $scope.repairData.plateNum = data.repairData.PLATE_NUM;
            $scope.repairData.engineNumber = data.repairData.ENGINE_NUMBER;
            $scope.repairData.statusname = data.repairData.CAR_STATUSNAME;
            $scope.repairData.saleUserId = data.repairData.SALE_USERID;
            $scope.repairData.saleUserName = data.repairData.SALE_USERNAME;
            $scope.repairData.paymentType = data.repairData.PAYMENTTYPE;
            $scope.repairData.RE_DESC = data.repairData.RE_DESC;
            $scope.repairData.begindate = data.repairData.begindate;
            if($scope.repairData.paymentType == "0"){
                $scope.repairData.paymentTypeFlag = true;
                $scope.repairData.companyData = {};
            }else{
                $scope.repairData.paymentTypeFlag = false;
                $scope.repairData.companyData = {};
                $scope.repairData.companyData.ID = data.repairData.COMPANY_ID
                $scope.repairData.companyData.NAME = data.repairData.COMPANY_NAME
            }
            $scope.detailListData = data.detailListData;
            
        }, function (data, header, config, status) {
        });
    }
    $timeout(function(){
        if(!$scope.repairData.paymentTypeFlag){
            $("#companySelect option").each(function(){
                if($(this)[0].innerHTML == $scope.repairData.companyData.NAME){
                    // console.log($(this))
                    $(this)[0].selected = true;
                }
            })
        }
        if($scope.detailListData.length>0){
            for(var i=0;i<$scope.detailListData.length;i++){
                //每行用户类型标签id
                var selectid = "#componentNameT"+$scope.detailListData[i].ID;
                // var json = {}
                // json.ID = $scope.detailListData[i].CO_ID;
                // json.NAME = $scope.detailListData[i].NAME;
                // json.NUM = $scope.detailListData[i].NUM;
                // json.SALE_PRICE = $scope.detailListData[i].SALE_PRICE;
                // json.BAR_CODE = $scope.detailListData[i].BAR_CODE;
                // json.KIND = $scope.detailListData[i].KIND;
                // json.UNIT = $scope.detailListData[i].UNIT;
                // $(selectid).val(JSON.stringify(json));
                $(selectid+" option").each(function(){
                    if($(this)[0].innerHTML == $scope.detailListData[i].NAME){
                        // console.log($(this))
                        $(this)[0].selected = true;
                    }
                })
            }
        }
    },200)
    //获取车辆类型
    $scope.carType = new Array();
    Init.iwbhttp('/car/queryComponentList', {}, function (data, header, config, status) {
        $scope.componentList = data.componentList;
    }, function (data, header, config, status) {
    });

    Init.iwbhttp('/car/queryCompanyList', {}, function (data, header, config, status) {
        $scope.companyList = data.companyList;
    }, function (data, header, config, status) {
    });

    $scope.queryCarInfo = function(obj){
        if(obj == ""){
            $scope.open('请输入牌照号')
        }
        var param = {plateNum:obj}
        Init.iwbhttp('/car/querybyPlateNum', param, function (data, header, config, status) {
            if(data.resFlag == '0'){
                $scope.repairData.carId = data.car.ID;
                $scope.repairData.plateNum = data.car.PLATE_NUM;
                $scope.repairData.engineNumber = data.car.ENGINE_NUMBER;
                $scope.repairData.statusname = data.car.STATUSNAME;
                $scope.repairData.saleUserId = data.car.USER_ID;
                $scope.repairData.saleUserName = data.car.USER_NAME;
            }else{
                $scope.open(data.msg)
            }
        }, function (data, header, config, status) {
        });
    }

    $scope.changePaymentType = function(result){
        if(result){
            $scope.repairData.companyData={}
            $scope.repairData.paymentType = 0
        }else{
            $scope.repairData.paymentType = 1
        }
    }

    //拼接select下拉框
    function spellStr(componentT,index){
        var str = "";
        var func = "javascript:"+
        "if(this.options[this.options.selectedIndex].value != \"\")"+
        "{"+
        "document.getElementById(\"kindT"+index+"\").innerHTML = JSON.parse(this.options[this.options.selectedIndex].value).KIND; "+
        "document.getElementById(\"barCodeT"+index+"\").innerHTML = JSON.parse(this.options[this.options.selectedIndex].value).BAR_CODE; "+
        "document.getElementById(\"priceT"+index+"\").innerHTML = JSON.parse(this.options[this.options.selectedIndex].value).SALE_PRICE; "+
        "document.getElementById(\"unitT"+index+"\").innerHTML = JSON.parse(this.options[this.options.selectedIndex].value).UNIT; "+
        "document.getElementById(\"numT"+index+"\").innerHTML = JSON.parse(this.options[this.options.selectedIndex].value).NUM; "+
        "}else{"+
        "document.getElementById(\"kindT"+index+"\").innerHTML = \"\" ; "+
        "document.getElementById(\"barCodeT"+index+"\").innerHTML = \"\" ; "+
        "document.getElementById(\"priceT"+index+"\").innerHTML = \"\" ; "+
        "document.getElementById(\"numT"+index+"\").innerHTML = \"\" ; "+
        "};";
        if($scope.componentList.length > 0){
            str = "<select id='" + componentT + "' onChange='"+func+"' class='form-control'>";
            str += "<option value=''>请选择</option>";
            for(var i = 0; i < $scope.componentList.length; i ++){
                str += "<option value='" + JSON.stringify($scope.componentList[i]) + "'>" + $scope.componentList[i].NAME + "</option>";
            }
            str += "</select>";
        }
        return str;
    }


    //车添加
    $scope.detailListAdd = function () {
        var tableobj = document.getElementById("detailListTable");
        var rowobj = tableobj.insertRow(tableobj.rows.length);
        var cell1 = rowobj.insertCell(rowobj.cells.length);
        var cell2 = rowobj.insertCell(rowobj.cells.length);
        var cell3 = rowobj.insertCell(rowobj.cells.length);
        var cell4 = rowobj.insertCell(rowobj.cells.length);
        var cell5 = rowobj.insertCell(rowobj.cells.length);
        var cell6 = rowobj.insertCell(rowobj.cells.length);
        var cell7 = rowobj.insertCell(rowobj.cells.length);
        var cell8 = rowobj.insertCell(rowobj.cells.length);
        var cell9 = rowobj.insertCell(rowobj.cells.length);
        var index = tableobj.rows.length - 2;
        var componentT = "componentT" + index;
        var kindT = "kindT" + index;
        var barCodeT = "barCodeT" +index;
        var priceT = "priceT" +index ;
        var unitT = "unitT" + index;
        var numT = "numT" + index;
        var componentT = "componentT" + index;
        var componentNumT = "componentNumT" + index;
        var sonIdT = "sonId" + index;
        cell1.innerHTML = spellStr(componentT,index);
        cell2.innerHTML = "<div id='"+kindT+"'></div>";
        cell3.innerHTML = "<div id='"+barCodeT+"'></div>";
        cell4.innerHTML = "<div id='"+priceT+"'></div>";
        cell5.innerHTML = "<div id='"+unitT+"'></div>";
        cell6.innerHTML = "<div id='"+numT+"'></div>";
        cell7.innerHTML = "<input type='text' id=" + componentNumT + " class='form-control'>";
        cell8.innerHTML = "<a id='delComponentItem' href='javascript:void(0);'>删除</a>";
        cell9.innerHTML = "<input type='text' id=" + sonIdT + " class='form-control'>";
        cell9.style.display = "none";
    }
    //车添加、删除
    $('#detailListTable tbody').on('click', 'tr', function () {
        if(this.rowIndex != 0 && this.rowIndex != 1){
            $(this).parent().find("tr.tablebg").toggleClass("tablebg");//取消原先选中行
            $(this).toggleClass("tablebg");//设定当前行为选中行
            $scope.carRow = this.rowIndex;
        }
    });

    //车删除
    $('#detailListTable tbody').on('click', '#delComponentItem', function () {
        $timeout(function () {
            console.log(document.getElementById("detailListTable").rows[$scope.carRow].cells[6].childNodes[0].value)
            var sonId = document.getElementById("detailListTable").rows[$scope.carRow].cells[8].childNodes[0].value ;
            if(sonId == ""){
                var i = $scope.carRow;
                if (i == 0 || i == 1) {
                    return;
                }
                var tableobj = document.getElementById("detailListTable");
                tableobj.deleteRow(i);
                return false;
            }
            var parm = {
                id: sonId,
                repairId: repairId
            };
            var msg = "确定删除该记录？";
            url = 'views/modal/confirmModal.html';
            ctrlName = 'ConfirmModalCtrl';
            resolve = {
                content: function () {
                    return msg;
                },
                data: function () {
                    return parm;
                }
            };
            var modalInstance = Modal.modal(url, ctrlName, resolve, function (returnData) {
                Init.iwbhttp('/car/delComponentItem', returnData, function (data, header, config, status) {
                    if (data.resFlag == "0") {
                        url = 'views/modal/promptModal.html';
                        ctrlName = 'PromptModalCtrl';
                        resolve = {
                            content: function () {
                                return data.msg;
                            },
                            data: function () {
                                return data;
                            }
                        };
                        var modalInstance = Modal.modal(url, ctrlName, resolve, function () {
                            var i = $scope.carRow;
                            if (i == 0 || i == 1) {
                                return;
                            }
                            var tableobj = document.getElementById("detailListTable");
                            tableobj.deleteRow(i);
                        }, function () {

                        });
                    } else {
                        if(data.resFlag == '3'){
                            data.msg = "删除成功！"
                        }
                        $scope.open(data.msg, data);
                    }
                }, function (data, header, config, status) {
                });
            }, function () {

            });
            
        }, 500);
    });

    //保存
    $scope.save = function () {
        if($scope.repairData.plateNum == null || $scope.repairData.plateNum == ""){
            $scope.open('请选择车辆信息')
            return false;
        }
        if(!$scope.repairData.paymentTypeFlag && JSON.stringify($scope.repairData.companyData) == "{}"){
            $scope.open('请选择结算公司')
            return false;
        }
        var components = new Array();
        var table = document.getElementById("detailListTable");
        var row = table.rows.length;
        for (var i = 2; i < row; i++) {
            var index2 = components.length;
            var componentStr = table.rows[i].cells[0].childNodes[0].value;
            var num = table.rows[i].cells[6].childNodes[0].value;
            if(num == null || num == ""){
                $scope.open("请填写数量");
                return false;
            }
            var componentObj = null;
            if(componentStr != ""){
                if(componentStr.length > 0 && componentStr.length<=3){
                    componentObj = $scope.componentList[componentStr]
                }else{
                    componentObj = JSON.parse(componentStr);
                } 
            }
            if(componentStr != "" && componentObj!=null){
                components[index2] = new Object();
                for(var j = 0; j < index2; j++){
                    if(components[j].ID == componentObj.ID){
                        $scope.open("零件不能重复");
                        return false;
                    }
                }
                components[index2].ID = componentObj.ID;
                components[index2].NAME = componentObj.NAME;
                components[index2].SALE_PRICE = componentObj.SALE_PRICE;
                components[index2].BAR_CODE = componentObj.BAR_CODE;
                components[index2].KIND = componentObj.KIND;
                components[index2].UNIT = componentObj.UNIT;
                components[index2].NUM = num;
            }
        }
        var par = {
            components: components,
            repairData: $scope.repairData
        };
        //车辆管理
        Init.iwbhttp('/car/saveRepair', par, function (data, header, config, status) {
            if(data.resFlag == '0'){
                $scope.repairData.ID = data.ID;
                var componentList = new Array;
                componentList = data.componentList;
                for (var i = 2; i < row; i++) {
                    var componentStr = table.rows[i].cells[0].childNodes[0].value;
                    var componentObj = null;
                    if(componentStr != ""){
                        componentObj = JSON.parse(componentStr);
                    }
                    for (var j = 0; j < componentList.length; j++) {
                        
                        if (componentObj.ID == componentList[j].CO_ID) {
                            document.getElementById("detailListTable").rows[i].cells[8].childNodes[0].value = componentList[j].ID;
                        }
                    }
                }
            }
            $scope.open(data.msg)
        }, function (data, header, config, status) {
        });
    }

    $scope.selectChange = function(obj,index){
        if(obj != "")
        {
            document.getElementById("kindT"+index).innerHTML = obj.KIND; 
            document.getElementById("barCodeT"+index).innerHTML = obj.BAR_CODE; 
            document.getElementById("priceT"+index).innerHTML = obj.SALE_PRICE; 
            document.getElementById("unitT"+index).innerHTML = obj.UNIT; 
            document.getElementById("numT"+index).innerHTML = obj.NUM; 
        }else{
            document.getElementById("kindT"+index).innerHTML = ""
            document.getElementById("barCodeT"+index).innerHTML = ""
            document.getElementById("priceT"+index).innerHTML = ""
            document.getElementById("numT"+index).innerHTML = ""
        };
    }

    $scope.print = function(){
        var components = new Array();
        var table = document.getElementById("detailListTable");
        var row = table.rows.length;
        var str = ""
        for (var i = 2; i < row; i++) {
            var index2 = components.length;
            var componentStr = table.rows[i].cells[0].childNodes[0].value;
            var num = table.rows[i].cells[6].childNodes[0].value;
            var componentObj = null;
            if(componentStr != ""){
                if(componentStr.length > 0 && componentStr.length<=3){
                    componentObj = $scope.componentList[componentStr]
                }else{
                    componentObj = JSON.parse(componentStr);
                } 
            }
            var index = i
            if(componentStr != "" && componentObj!=null){
                str += "&cname"+index+"="+componentObj.NAME;
                str += "&SALE_PRICE"+index+"="+componentObj.SALE_PRICE;
                str += "&BAR_CODE"+index+"="+componentObj.BAR_CODE;
                str += "&KIND"+index+"="+componentObj.KIND;
                str += "&UNIT"+index+"="+componentObj.UNIT;
                str += "&NUM"+index+"="+num;
            }
        }
        var sub_url = $rootScope.printUrl+"?payname="+$scope.repairData.companyData.NAME+"&plateNum="+$scope.repairData.plateNum+"&engineNumber="+$scope.repairData.engineNumber+"&statusname="+$scope.repairData.statusname+"&saleUserName="+$scope.repairData.saleUserName+"&begindate="+$scope.repairData.begindate+"&repairId="+$scope.repairData.ID+"&desc="+$scope.repairData.RE_DESC+"&row="+row+str;
        window.open(sub_url, '_blank')
    }

    //返回
    $scope.back = function(){
        $state.go("dashboard.repairIndex.repairList");
    }

    //提示modal弹框
    $scope.open = function (content, data) {
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
            //删除车辆信息
            if(data != undefined && data != null && data != "") {
                //判断是否删除成功
                if (data.resFlag == "3") {
                    var i = $scope.carRow;
                    if (i == 0 || i == 1) {
                        return;
                    }
                    var tableobj = document.getElementById("carTable");
                    tableobj.deleteRow(i);
                }
            }
        }, function () {

        });
    };
}]);
