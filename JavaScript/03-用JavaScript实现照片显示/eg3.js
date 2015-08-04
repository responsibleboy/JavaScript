var eg = {};
eg.$ = function (id) {
    return document.getElementById(id);
};
//事件监听
eg.addListener = function (target, type, handler) {
    if (target.addEventListener) {
        target.addEventListener(type, handler, false);
    } else if (target.attachEvent) {
        target.attachEvent("on" + type, handler);
    } else {
        target["on" + type] = handler;
    }
};

eg.data = [
    ["../images/03/photo01.jpg", "../images/03/thumb01.jpg"]
    , ["../images/03/photo02.jpg", "../images/03/thumb02.jpg"]
    , ["../images/03/photo03.jpg", "../images/03/thumb03.jpg"]
    , ["../images/03/photo04.jpg", "../images/03/thumb04.jpg"]
    , ["../images/03/photo05.jpg", "../images/03/thumb05.jpg"]
    , ["../images/03/photo06.jpg", "../images/03/thumb06.jpg"]
    , ["../images/03/photo07.jpg", "../images/03/thumb07.jpg"]
    , ["../images/03/photo01.jpg", "../images/03/thumb01.jpg"]
    , ["../images/03/photo02.jpg", "../images/03/thumb02.jpg"]
    , ["../images/03/photo03.jpg", "../images/03/thumb03.jpg"]
    , ["../images/03/photo04.jpg", "../images/03/thumb04.jpg"]
    , ["../images/03/photo05.jpg", "../images/03/thumb05.jpg"]
    , ["../images/03/photo06.jpg", "../images/03/thumb06.jpg"]
    , ["../images/03/photo07.jpg", "../images/03/thumb07.jpg"]
];
eg.showNumber = 0; //默认显示
eg.groupNumber = 1;//当前显示的组
eg.groupSize = 6; //每组的数量
eg.showThumb = function (group) {
    var ul = eg.$("smallPhotosList");
    ul.innerHTML = "";
    var start = (group - 1) * eg.groupSize; //需要data数据的开始位置
    var end = group * eg.groupSize; //结束位置
    for (var i = start; (i < end && i < eg.data.length) ; i++) {
        var li = document.createElement("li");
        li.innerHTML = '<img src="' + eg.data[i][1] + '" id="imgThumb' + i + '" width="80" height="40" />';
        li.style.listStyle = "none";
        var liClick = function (i) { //添加click事件监听
            eg.addListener(li, "click", function () {
                eg.showNumber = i;
                eg.showBig();
            });
        };
        liClick(i);
        ul.appendChild(li);
    }
};

//显示大图
eg.showBig = function () {
    eg.$("imgBigPhoto").src = eg.data[eg.showNumber][0];
};

//显示下一组小图
eg.nextThumb = function () {
    if (eg.groupNumber * eg.groupSize + 1 <= eg.data.length) {
        eg.showThumb(eg.groupNumber + 1);
        eg.showNumber = eg.groupNumber * eg.groupSize;
        eg.showBig();
        eg.groupNumber++;
    }
}

//显示上一组小图
eg.prveThumb = function (flag) {
    if (eg.groupNumber - 1 >= 1) {
        eg.showThumb(eg.groupNumber - 1);
        eg.groupNumber--;
        eg.showNumber = (eg.groupNumber - 1) * eg.groupSize;
        if (flag == "keyup") {
            eg.showNumber = eg.showNumber + eg.groupSize - 1;
        }
        eg.showBig();
    }
}

//显示下一张大图
eg.nextPhoto = function () {
    if (eg.showNumber % eg.groupSize == (eg.groupSize - 1)) {
        eg.nextThumb();
    } else if (eg.showNumber < (eg.data.length - 1)) {
        eg.showNumber++;
        eg.showBig();
    }
}

//显示上一张大图
eg.prvePhoto = function () {
    if (eg.showNumber == ((eg.groupNumber - 1) * eg.groupSize)) {
        eg.prveThumb("keyup");
    } else if (eg.showNumber > 0) {
        eg.showNumber--;
        eg.showBig();
    }
}0

//初始化
eg.init = function () {
    eg.showThumb(1);
    eg.addListener(eg.$("next"), "click", function () {
        eg.nextThumb();
    });
    eg.addListener(eg.$("prve"), "click", function () {
        eg.prveThumb();
    });

    eg.addListener(document, "keyup", function (e) {
        e = e || event;
        if (e.keyCode == 37) { //左方向键
            eg.prvePhoto();
        }
        if (e.keyCode == 39) { //右方向键
            eg.nextPhoto();
        }
    })
};

eg.init();
