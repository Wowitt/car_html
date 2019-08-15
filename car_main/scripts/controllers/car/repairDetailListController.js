/**
 * Created by John on 2016/12/21.
 */
'use strict';
angular.module('sbAdminApp').controller('RepairDetailListCtrl', ['$rootScope', '$scope', 'Init', 'Modal', 'localStorageService', '$timeout', '$interval', 'CheckBrowser','$state','$stateParams', function ($rootScope, $scope, Init, Modal, localStorageService, $timeout, $interval, CheckBrowser,$state,$stateParams) {
    CheckBrowser.check();
    $scope.func_class = {
        // "display":"flex",
        // "justify-content": "center",
        // "align-items": "center",
        "width":"100%",
        // "height":"80px",
        "border-radius": "5px",
        "border-width": "1px",
        "border-color":"#fafafa",
        "border-style": "solid",
        "-moz-box-shadow":"1px 3px 6px #33333360",
        "-webkit-box-shadow":"1px 3px 6px #33333360",
        "box-shadow":"1px 3px 6px #33333360",
        "background-color": "#fafafa",
        "color":"#343434",
        "margin-right": "38px",
        "margin-top": "16px",
        "padding":"10px",
    }
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
        MAINTENANCE_TYPE:"维修",
    };
    $scope.financeFlow = {
        ID:"",
        BIZ_ID:"",
        RECEIPT_NO:"",
        BIZ_NAME:"维修费用",
        actiondate:"",
		MONEY:"",
		RECEIVER_ID:"",
		RECEIVER_NAME:"",
		RECEIVER_PayTitle:"",
		direction:"收",
		SOURCE:"web",
		PAYER_ID:"",
		PAYER_NAME:"",
	}
    $scope.companyModeList = []
    $scope.companyModeSelected = {}
    $scope.companyModeList_Pay = []
	$scope.companyModeSelected_Pay = {}
    //弹框参数
    var resolve = {};
    var url = "";
    var ctrlName = "";
    $scope.init = function(){
		//initFinanceFlow
		Init.iwbhttp("/car/initFinanceFlow", {}, function (data, header, config, status) {
			if(data.resFlag == '0'){
				$scope.companyModeList = data.companyPayModeList
                $scope.companyModeList_Pay = data.companyPayModeList
                if(ifAdd == 1){
                    for(var i = 0 ; i < $scope.companyModeList.length ; i++){
                        if($scope.companyModeList[i].ID == $scope.financeFlow.RECEIVER_ID){
                            $scope.companyModeSelected = $scope.companyModeList[i]
                            break
                        }
                    }
                    for(var i = 0 ; i < $scope.companyModeList_Pay.length ; i++){
                        if($scope.companyModeList_Pay[i].ID == $scope.financeFlow.PAYER_ID){
                            $scope.companyModeSelected_Pay = $scope.companyModeList_Pay[i]
                            break
                        }
                    }
                }
			}
			// console.log($scope.companyModeList)
		}, function (data, header, config, status) {
		});
	}
	
    if(ifAdd == 1){
        //查询单位信息
        Init.iwbhttp('/car/queryRepair', par, function (data, header, config, status) {
            $scope.repairData = data.repairData
            $scope.repairData.ID = data.repairData.ID;
            $scope.repairData.carId = data.repairData.CAR_ID;
            $scope.repairData.plateNum = data.repairData.PLATE_NUM;
            $scope.repairData.engineNumber = data.repairData.ENGINE_NUMBER;
            $scope.repairData.FRAME_NUMBER = data.repairData.FRAME_NUMBER;
            $scope.repairData.statusname = data.repairData.CAR_STATUSNAME;
            $scope.repairData.saleUserId = data.repairData.SALE_USERID;
            $scope.repairData.saleUserName = data.repairData.SALE_USERNAME;
            $scope.repairData.paymentType = data.repairData.PAYMENTTYPE;
            $scope.repairData.RE_DESC = data.repairData.RE_DESC;
            $scope.repairData.MAINTENANCE_TYPE = data.repairData.MAINTENANCE_TYPE;
            $scope.repairData.begindate = data.repairData.begindate;
            if($scope.repairData.paymentType == "0"){
                $scope.repairData.paymentTypeFlag = true;
            }else{
                $scope.repairData.paymentTypeFlag = false;
            }
            $scope.detailListData = data.detailListData
            console.log(data)
            console.log($scope.financeFlow)
            if(data.financeFlow != ""){
                $scope.financeFlow.ID = data.financeFlow.ID
                $scope.financeFlow.BIZ_ID = data.financeFlow.BIZ_ID
                $scope.financeFlow.BIZ_NAME = data.financeFlow.BIZ_NAME
                $scope.financeFlow.RECEIPT_NO = data.financeFlow.RECEIPT_NO
                $scope.financeFlow.MONEY = data.financeFlow.MONEY
                $scope.financeFlow.PAYER_ID = data.financeFlow.PAYER_ID
                $scope.financeFlow.PAYER_NAME = data.financeFlow.PAYER_NAME
                $scope.financeFlow.PAYER_PayTitle = data.financeFlow.PAYER_PayTitle
                $scope.financeFlow.RECEIVER_ID = data.financeFlow.RECEIVER_ID
                $scope.financeFlow.RECEIVER_NAME = data.financeFlow.RECEIVER_NAME
                $scope.financeFlow.RECEIVER_PayTitle = data.financeFlow.RECEIVER_PayTitle
                $scope.financeFlow.actiondate = data.financeFlow.actiondate
            }
            $scope.init()
        }, function (data, header, config, status) {
        });
    }
    else{
        $scope.init()
    }
    $timeout(function(){
        // if(!$scope.repairData.paymentTypeFlag){
        //     $("#companySelect option").each(function(){
        //         if($(this)[0].innerHTML == $scope.repairData.companyData.NAME){
        //             // console.log($(this))
        //             $(this)[0].selected = true;
        //         }
        //     })
        // }
        $("#RECEIVER_select option").each(function(index){
            if($(this)[0].innerHTML == $scope.financeFlow.RECEIVER_PayTitle){
                // console.log($(this))
                $(this)[0].selected = true;
            }
        })
        $("#PAYER__select option").each(function(index){
            if($(this)[0].innerHTML == $scope.financeFlow.PAYER_PayTitle){
                // console.log($(this))
                $(this)[0].selected = true;
            }
        })
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
    },300)
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
                $scope.repairData.FRAME_NUMBER = data.car.FRAME_NUMBER;
                $scope.repairData.statusname = data.car.STATUSNAME;
                $scope.repairData.saleUserId = data.car.SALE_USER_ID ? data.car.SALE_USER_ID : '';
                $scope.repairData.saleUserName = data.car.SALE_USER_NAME ? data.car.SALE_USER_NAME : '';
                $scope.repairData.CU_TYPE = data.car.CU_TYPE ? data.car.CU_TYPE : '';
                $scope.repairData.CU_NAME = data.car.CU_NAME ? data.car.CU_NAME : '';
                $scope.repairData.CU_PHONE = data.car.CU_PHONE ? data.car.CU_PHONE : '';
                $scope.repairData.CU_EP_NAME = data.car.CU_EP_NAME ? data.car.CU_EP_NAME : '';
                $scope.repairData.CONTRACT_ID = data.car.CONTRACT_ID ? data.car.CONTRACT_ID : '';
                $scope.repairData.CONTRACT_TYPE = data.car.CONTRACT_TYPE ? data.car.CONTRACT_TYPE : '';
                $scope.repairData.CONTRACT_NAME = data.car.CONTRACT_NAME ? data.car.CONTRACT_NAME : '';
                if($scope.repairData.CU_NAME == ''){
                    $scope.repairData.paymentTypeFlag = false;
                }else{
                    $scope.financeFlow.PAYER_ID = data.car.CU_ID
                    $scope.financeFlow.PAYER_NAME = $scope.repairData.CU_EP_NAME
                }
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
        "document.getElementById(\"priceT"+index+"\").value = JSON.parse(this.options[this.options.selectedIndex].value).SALE_PRICE; "+
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
        cell4.innerHTML = "<input type='text' id=" + priceT + " class='form-control'>";
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
        // $scope.financeFlow.actiondate= $('#financeFlow_actiondate').val();
        if($scope.repairData.plateNum == null || $scope.repairData.plateNum == ""){
            $scope.open('请选择车辆信息')
            return false;
        }
        var components = new Array();
        var table = document.getElementById("detailListTable");
        var row = table.rows.length;
        for (var i = 2; i < row; i++) {
            var index2 = components.length;
            var componentStr = table.rows[i].cells[0].childNodes[0].value;
            var num = table.rows[i].cells[6].childNodes[0].value;
            var SALE_PRICE = table.rows[i].cells[3].childNodes[0].value;
            if(num == null || num == ""){
                $scope.open("请填写数量");
                return false;
            }
            if(SALE_PRICE == null || SALE_PRICE == ""){
                $scope.open("请填写价钱");
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
                components[index2].SALE_PRICE = SALE_PRICE;
                components[index2].BAR_CODE = componentObj.BAR_CODE;
                components[index2].KIND = componentObj.KIND;
                components[index2].UNIT = componentObj.UNIT;
                components[index2].NUM = num;
            }
        }
        var par = {
            components: components,
            repairData: $scope.repairData,
            // financeFlow: $scope.financeFlow
        };
        //车辆管理
        Init.iwbhttp('/car/saveRepair', par, function (data, header, config, status) {
            if(data.resFlag == '0'){
                $scope.repairData.ID = data.repairId;
                $scope.repairData.begindate = data.begindate;
                // $scope.financeFlow.ID = data.financeFlow.ID
                // $scope.financeFlow.BIZ_ID = data.financeFlow.BIZ_ID
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

    $scope.savepay = function () { 
        $scope.financeFlow.actiondate= $('#financeFlow_actiondate').val();
        if($scope.repairData.plateNum == null || $scope.repairData.plateNum == ""){
            $scope.open('请选择车辆信息')
            return false;
        }
        if($scope.financeFlow.actiondate == null || $scope.financeFlow.actiondate == ""){
            $scope.open('请选择日期')
            return false;
        }
        if($scope.financeFlow.MONEY== null || $scope.financeFlow.MONEY == ""){
            $scope.open('请输入金额')
            return false;
        }
        if(!$scope.repairData.paymentTypeFlag ){
            if(!$scope.financeFlow.PAYER_PayTitle ||$scope.financeFlow.PAYER_PayTitle == 'null' || $scope.financeFlow.PAYER_PayTitle == null || $scope.financeFlow.PAYER_PayTitle == ''){
                $scope.open('请选择付款方式')
                return false;
            }
            $scope.financeFlow.PAYER_ID = $scope.companyModeSelected_Pay.ID
            $scope.financeFlow.PAYER_NAME = $scope.companyModeSelected_Pay.NAME
        }
        if(!$scope.financeFlow.RECEIVER_PayTitle ||$scope.financeFlow.RECEIVER_PayTitle == 'null' || $scope.financeFlow.RECEIVER_PayTitle == null || $scope.financeFlow.RECEIVER_PayTitle == ''){
            $scope.open('请选择收款方式')
            return false;
        }
        $scope.financeFlow.RECEIVER_ID = $scope.companyModeSelected.ID
        $scope.financeFlow.RECEIVER_NAME = $scope.companyModeSelected.NAME
        var components = new Array();
        var table = document.getElementById("detailListTable");
        var row = table.rows.length;
        for (var i = 2; i < row; i++) {
            var index2 = components.length;
            var componentStr = table.rows[i].cells[0].childNodes[0].value;
            var num = table.rows[i].cells[6].childNodes[0].value;
            var SALE_PRICE = table.rows[i].cells[3].childNodes[0].value;
            if(num == null || num == ""){
                $scope.open("请填写数量");
                return false;
            }
            if(SALE_PRICE == null || SALE_PRICE == ""){
                $scope.open("请填写价钱");
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
                components[index2].SALE_PRICE = SALE_PRICE;
                components[index2].BAR_CODE = componentObj.BAR_CODE;
                components[index2].KIND = componentObj.KIND;
                components[index2].UNIT = componentObj.UNIT;
                components[index2].NUM = num;
            }
        }
        var par = {
            components: components,
            repairData: $scope.repairData,
            financeFlow: $scope.financeFlow
        };
        //车辆管理
        Init.iwbhttp('/car/saveRepairPay', par, function (data, header, config, status) {
            if(data.resFlag == '0'){
                $scope.repairData.ID = data.repairId;
                $scope.repairData.begindate = data.begindate;
                $scope.financeFlow.ID = data.financeFlow.ID
                $scope.financeFlow.BIZ_ID = data.financeFlow.BIZ_ID
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
            document.getElementById("priceT"+index).value = obj.SALE_PRICE; 
            document.getElementById("unitT"+index).innerHTML = obj.UNIT; 
            document.getElementById("numT"+index).innerHTML = obj.NUM; 
        }else{
            document.getElementById("kindT"+index).innerHTML = ""
            document.getElementById("barCodeT"+index).innerHTML = ""
            document.getElementById("priceT"+index).value = ""
            document.getElementById("numT"+index).innerHTML = ""
        };
    }

    $scope.print = function(){
        var components = new Array();
        var table = document.getElementById("detailListTable");
        var row = table.rows.length;
        var str = ""
        var money = 0;
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
                money += parseFloat(componentObj.SALE_PRICE)*parseFloat(num)
            }
        }
        var payname = ''
        console.log($scope.repairData)
        if( !$scope.repairData.CU_NAME || $scope.repairData.CU_NAME == ''){
            if(!$scope.repairData.companyData || JSON.stringify($scope.repairData.companyData) == '{}'){
                payname = ""
            }else{
                payname = $scope.repairData.companyData.NAME;
            }
        }else{
            payname = $scope.repairData.CU_NAME;
        }  
        var sub_url = $rootScope.printUrl+"?payname="+payname+"&money="+money+"&plateNum="+$scope.repairData.plateNum+"&FRAME_NUMBER="+$scope.repairData.FRAME_NUMBER+"&statusname="+$scope.repairData.statusname+"&saleUserName="+$scope.repairData.saleUserName+"&begindate="+$scope.repairData.begindate+"&repairId="+$scope.repairData.ID+"&desc="+$scope.repairData.RE_DESC+"&username="+$rootScope.userName+"&row="+row+str;
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
