var eg = {};
//获取指定id的元素对象
eg.$ = function (id) {
    return document.getElementById(id);
};
//添加事件监听
eg.addListener = function (target, type, handler) {
    if (target.addEventListener) {
        target.addEventListener(type, handler, false);
    } else if (target.attachEvent) {
        target.attachEvent("on" + type, handler);
    } else {
        target["on" + type] = handler;
    }
};
//获取指定class名称的元素集合
eg.getElementsByClassName = function (className, element) {
    if (document.getElementsByClassName) {
        return (element || document).getElementsByClassName(className);
    }

    var children = (element || document).getElementsByTagName('*');
    var elements = new Array();
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var classNames = child.className.split(' ');
        for (var j = 0; j < classNames.length; j++) {
            if (classNames[j] == className) {
                elements.push(child);
                break;
            }
        }
    }
    return elements;
};
//简版AJAX
//config={url:"",type:"get"|"post",async:true|false,data:""}
eg.ajax = function (config, callback) {
    var xmlhttp;
    if (window.XMLHttpRequest) { //通常非IE浏览器支持XMLHttpRequest对象
        xmlhttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) { //通常IE浏览器支持ActiveXObject对象
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); //创建一个低版本对象，msxml组件2.6版本以下支持
        if (!xmlhttp) {
            xmlhttp = new ActiveXObject("msxml2.XMLHTTP"); //创建一个高版本对象，msxml组件3.0版本以上支持
        }
    }

    if (xmlhttp) {
        if (config.async) {
            xmlhttp.onreadystatechange = function () { //HTTP状态发生改变时执行
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { //HTTP请求成功
                    callback(xmlhttp.responseText, xmlhttp.responseXML);
                }
            };
            //传递参数
            xmlhttp.open(config.type, config.url, true);
            xmlhttp.send(config.data);
        } else {
            xmlhttp.open(config.type, config.url, false);
            xmlhttp.send(config.data);
            callback(xmlhttp.responseText, xmlhttp.responseXML);
        }
    }
};
//获取元素的页面绝对距顶值
eg.getTop = function (E1) {
    var top = 0;
    do {
        top += E1.offsetTop;

    } while ((E1 = E1.offsetParent).nodeName != 'BODY'); //获取到body节点为止
    return top;
};