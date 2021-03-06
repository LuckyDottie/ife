function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

function isFunction(fn) {
    return typeof fn == "Function";
}

function cloneObject(src) {
    // your implement
    var srcType = typeof  src;
    var result;
    if (srcType === "number" || srcType === "string" || srcType === "boolean" || srcType === "date" || srcType === "object") {
        if (srcType != "object") {
            return src;
        } else {
            var srcClass = Object.prototype.toString.call(src).slice(8, -1);
            if (srcClass === "Object") {
                result = {};
            } else if (srcClass === "Array") {
                result = [];
            }

        }
        for (key in src) {
            var temp = src[key];
            if (srcType === "object") {
                result[key] = arguments.callee(temp);
            } else {
                result[key] = temp;
            }
        }
        return result;
    } else {
        alert("123");
        return;
    }
}

function uniqArray(arr) {
    // your implement
    var result = [];
    for (k in arr) {
        if (result.indexOf(arr[k]) == -1) {
            result.push(arr[k]);
        }
    }
    return result;
}


function simpleTrim(str) {
    // your implement
    var result = "";
    var start, end;
    for (start = 0; start < str.length; start++) {
        if (str.charAt(start) == " " || str.charAt(start) == "\t") {
            continue;
        } else {
            break;
        }

    }
    for (end = str.length - 1; end >= 0; end--) {
        if (str[end] == " " || str[end] == "\t") {
            continue;
        } else {
            break
        }
    }

    result = str.slice(start, end + 1);
    return result;
}

function trim(str) {
    // your implement
    var result;
    var regex1 = /^\s+/;
    var regex2 = /\s+$/
    result = str.replace(regex1,"");
    result = result.replace(regex2,"");
    return result;
}

function each(arr, fn) {
    // your implement
    for(k in arr){
        fn(arr[k],k);
    }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var attrCount = 0;
    for(attr in obj){
        attrCount ++;
    }
    return attrCount;
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
    var regex = /^([\w\d]+([-_\.][\w\d]+)*)@([\w\d]+)\.([\w\d]+)$/;
    var result = emailStr.match(regex);
    if(result === null){
        return false;
    }else{
        return true;
    }
}

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
    var regex = /^1[3-8]{1}\d{9}$/;
    var str = regex.exec(phone);
    if(str === null){
        return false;
    }else{
        return true;
    }
}

// 为element增加一个样式名为newClassName的新样式
function hasClass(element, className){
    //return element.className.match(new RegExp("\\s|^"+className + "\\s|$"));
    return element.className.match(new RegExp("\\b"+className + "\\b"));
}
function addClass(element, newClassName) {
    // your implement
    if(hasClass(element, newClassName) == null){
        element.className += " " + newClassName;
    }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
    if(hasClass(element, oldClassName) != null){
        //element.className = element.className.replace(new RegExp("\\s|^"+ oldClassName + "\\s|$"), "");
        element.className = element.className.replace(new RegExp("\\s*\\b"+ oldClassName + "\\b"), "");
    }
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
    if(element.parentNode === siblingNode.parentNode){
        return true;
    }else{
        return false;
    }
}


// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
    var result = {};
    var temp = element.getBoundingClientRect();
    result.x = temp.top;
    result.y = temp.left;
    return result;
}


// 实现一个简单的Query
function $(selector, obj) {
    var obj = obj || document;
    selector = trim(selector);
    var conditions = selector.split(new RegExp("\\s"));
    if(1 == conditions.length){
        return simSelect(selector);
    }else{
        var obj = simSelect(conditions[0]);
        for(var k = 1; k < conditions.length; k++){
            obj = simSelect(conditions[k],obj);
        }
        return obj;
    }

}

function simSelect(selector, obj){
    var obj = obj || document;
    var regex = /^[a-zA-Z]/;
    if("#" === selector[0]){
//            selector = selector.replace("#","");
        selector = selector.slice(1);
        return document.getElementById(selector);
    }else if("." === selector[0]){
        selector = selector.slice(1);
        return obj.getElementsByClassName(selector)[0];
    }else if(regex.test(selector)){
        return obj.getElementsByTagName(selector)[0];
    }else if("[" === selector[0]){
        var nodes = obj.getElementsByTagName("*");
        var result;
        selector = selector.slice(1,-1);
        if(selector.match(new RegExp("=")) === null){
            for(k in nodes){
                if(nodes[k].hasAttribute(selector)){
                    result = nodes[k];
                    break;
                }
            }
            return result;
        }else{
            selector = trim(selector);
            var tArr = selector.split("=");
            var attr = trim(tArr[0]);
            var attrVal = trim(tArr[1]);
            for(k in nodes){
                if(nodes[k].getAttribute(attr) === attrVal){
//                    result.push(nodes[k]);
                    result = nodes[k];
                    break;
                }
            }
            return result;
        }
    }
}

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // your implement
    if(element.addEventListener){
        element.addEventListener(event, listener, false);
    }else if(element.attachEvent){
        element.attachEvent("on"+element, event);
    }else{
        element["on" + element] = listener;
    }
//    removeEvent(element, event, listener);
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    // your implement
    if(element.removeEventListener){
        element.removeEventListener(event, listener, false);
    }else if(element.detachEvent){
        element.detachEvent("on"+event, listener);
    }else{
        element["on" + event] = null;
    }
}


function clicklistener(event) {
    alert("I have been clicked!");
//    var obj1 = obj.getElementsByTagName("p");
//    console.log(obj1);
    console.log("removed");
    console.log(event.type);
    removeEvent(this, event.type, clicklistener);//注意此处必须用event.type而不能用event,因为此处我们需要传的应该是一个字符串而不是事件对象
}



// 实现对click事件的绑定
function addClickEvent(element, listener) {
    // your implement
    if(element.attachEvent){
        element.attachEvent("onclick", listener);
    }else if(element.addEventListener){
        element.addEventListener("click", listener, false);
    }else{
        element.onclick = listener;
    }
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    // your implement
    if(element.attachEvent){
        element.attachEvent("onkeydown", function(){
            if(event.keyCode == 13){
                listener();
            }
        });
    }else if(element.addEventListener){
        element.addEventListener("keydown", function(){
            if(event.keyCode == 13){
                listener();
            }
        }, false);
    }
}

// 先简单一些
function delegateEvent(element, tag, eventName, listener) {
    // your implement
    addEvent(element,eventName,function(event){
        var e = event || window.event;
        var etarget = e.target || e.srcElement;
        if(etarget.nodeName.toLowerCase() == tag){
            listener(e);
        }
    });
}

//$.delegate = delegateEvent;


$.on = function(selector, event, listener){
    // your implement
    var element = $(selector);
    addEvent(element, event, listener);
}

$.click = function (selector, listener) {
    // your implement
    var element = $(selector);
    addClickEvent(element, listener);
}

$.un = function (selector, event, listener) {
    // your implement
    var element = $(selector);
    removeEvent(element, event, listener);
}

$.delegate = function (selector, tag, event, listener) {
    // your implement
    var element = $(selector);
    delegateEvent(element, tag, event, listener);
}

function clickListener(event) {
    console.log(event);

}
function renderList() {
    $("#list").innerHTML = '<li>new item</li>';
}



// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    // your implement
    var isIe = !!navigator.appName.indexOf("Microsoft Internet Explorer")!=-1 && document.all;
    console.log(isIe);
    if(isIe){
        return navigator.appVersion;
    }else{
        return -1;
    }
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    // your implement
    var exdate = new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie = cookieName  + "=" + escape(cookieValue) + ";expires=" + exdate.toGMTString();
}

// 获取cookie值
function getCookie(cookieName) {
    // your implement
    if(document.cookie.length > 0){
        var c_start = document.cookie.indexOf(cookieName+"=");
        var v_end;
        var v_start;
        if(c_start != -1){
            v_start = c_start + cookieName.length + 1;
            v_end = document.cookie.indexOf(";", v_start);
            if(v_end == -1){
                v_end = document.cookie.length;
            }
            return unescape(document.cookie.subStrin(v_start,v_end));
        }
    }else{
        return "";
    }
}
//console.log(isIE());
//alert(isIE());


/*封装ajax
 options是一个对象，里面可以包括的参数为：
 type: post或者get，可以有一个默认值
 data: 发送的数据，为一个键值对象或者为一个用&连接的赋值字符串
 onsuccess: 成功时的调用函数
 onfail: 失败时的调用函数
 * */
function ajax(url, options){
    var pstr = "";//用来存要传递的参数
    var xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }else if(window.ActiveXObject){
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }else {
        alert("您的浏览器不支持AJAX！");
    }

    if(options.data != null){
        if(typeof options.data == "string"){
            pstr = options.data;
        }else{
            var pdata = options.data;
            for(var k in pdata ){
                if(pstr == ""){
                    pstr = k + "=" + pdata[k];
                }else{
                    pstr += "&" + k + "=" + pdata[k];
                }
            }
        }
    }


    xmlhttp.onreadystatechange = function (){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            if(options.onsuccess != null){
                options.onsuccess(xmlhttp.responseText);
            }
        }else{
            //alert("failed");
            if(options.onfail != null){
                options.onfail();
            }
        }
    }

    if(options.type == null){
        options.type = "get";
    }
    if(options.type.toLowerCase() == "get"){
        url += "?" + pstr;
        alert(url);
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }else if(options.type.toLowerCase() == "post"){
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send(pstr);
    }

}

//获取元素的样式属性值
function getStyle(element,attr){
    if(element.currentStyle){
//        console.log("1"+ element.currentStyle[attr]);
        return element.currentStyle[attr];
    }else if(window.getComputedStyle){
        return window.getComputedStyle(element, null)[attr];
    }
}

//获取单选组的值
function getRadioValue(target){
    var nodes = document.getElementsByName(target);
    for(var k in nodes){
        if(nodes[k].checked){
            return nodes[k].value;
        }
    }
}

//根据演示获取元素数组
function $$(className, parent){
    var parent = parent || document;
    var result = [];
    if(document.getElementsByClassName){
        return parent.getElementsByClassName(className);
    }else{
        var temp = parent.getElementsByTagName("*");
        for(var i in temp){
            if(hasClass(temp[i], className)){
                result.push(temp[i]);
            }
        }
        return result;
    }
}

//阻止事件冒泡
function stopEventBubble(e){
    if (e && e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
}

//阻止事件的默认行为
function preventDefaultAction(e){
    if(e && e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
}