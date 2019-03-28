;(function(window,undefined){
    var explorer = window.navigator.userAgent ;
    var app=document.getElementById('app');
    var errorBrowser=document.getElementById('errorBrowser');
    errorBrowser.style.display = 'none';
    var flag = true;
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        flag = false
    }else{
        //ie
        if (explorer.indexOf("MSIE") >= 0) {
            flag = false
        }
        //firefox
        else if (explorer.indexOf("Firefox") >= 0) {
        }
        //Chrome
        else if(explorer.indexOf("Chrome") >= 0){
        }
        //Opera
        else if(explorer.indexOf("Opera") >= 0){
            flag = false
        }
        //Safari
        else if(explorer.indexOf("Safari") >= 0){
        }
        //UCBrowser
        else if(explorer.indexOf("UCBrowser") >= 0){
        }
        else{
            
        }
    }
    if(!flag){
        var app=document.getElementById('app');
        var errorBrowser=document.getElementById('errorBrowser');
        app.style.display='none';
        errorBrowser.style.display = 'block';
    }
})(window);

function gologin(){
    var currentUrl = window.location.href;
    var url = "";
    if(currentUrl.indexOf("/index.html")>0 && currentUrl.indexOf("/car/index.html")<0){
        url = currentUrl.split("/index.html")[0] + "/main.html#/login";
    }
    else if(currentUrl.substr(currentUrl.length-5) == '/car/'){
        url = currentUrl + "car_main/main.html#/login";
    }
    else if(currentUrl.indexOf("/car/index.html") > 0){
        url = currentUrl.split("/index.html")[0] + "/car_main/main.html#/login";
    }
    else{
        url = currentUrl + "main.html#/login";
    }
    window.location.href = url;
}