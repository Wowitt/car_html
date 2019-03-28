/**
 * Created by woody on 2015/11/8.
 */
angular.module('sbAdminApp').directive('uploadExcel',['$rootScope','$http','$document','Init',function($rootScope,$http,$document,Init){
    var uploadFile = function(obj){
        // var postData={imgBase64:obj};
        // Init.iwbhttp('/demo/uploadExcel',postData,function(data,header,config,status){
        // },function(data,header,config,status){
        // });
        var fd = new FormData();
        fd.append('file', obj);
        $.ajax({
            url: $rootScope.baseUrl+$rootScope.baseUrlPath+"/car/uploadExcel",
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            type: 'POST', // For jQuery < 1.9
            success: function(data){
                alert(data);
            }
        });
        
    }
    return {
        restrict: 'E',
        template:'<input accept=".xlsx,.xls" id="file" type="file"/>',
        link:function($scope, $element, $attr){
            document.querySelector('#file').addEventListener('change', function () {
                var that = this;
                uploadFile(that.files[0])
                console.log('fhafdjakls');
            });
        }
    };
}]);