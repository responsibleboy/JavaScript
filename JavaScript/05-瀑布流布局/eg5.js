eg.getDataList = function (min, max) {
    //模拟数据函数
    var data = [], n = 8;
    for (var i = 0; i < 8; i++) {
        var k = min + parseInt(Math.random() * (max - min));
        data.push("../images/05/" + k + ".jpg");
    }
    return data;
};

eg.cols = eg.getElementsByClassName("col");
eg.colh = [0, 0, 0, 0]; //每列的高度

//获取最小高度的对象
eg.getColMin = function () {
    var min = 0;
    var m = []; //{}
    for (var i = 0; i < 4; i++) {
        min = parseInt(eg.cols[i].offsetHeight);
        eg.colh[i] = min;
        m[min] = i;
    }
    return eg.cols[m[Math.min.apply(Array, eg.colh)] || 0];
};

//追加数据
eg.add = function (dl) {
    for (var i in dl) {
        var newDiv = document.createElement("div");
        var newImg = document.createElement("img");
        newImg.src = dl[i];
        newDiv.appendChild(newImg);
        newDiv.innerHTML += '<p>[' + i + '.jpg]</p>';
        eg.getColMin().appendChild(newDiv); //追加到最小高度列里
    }
};

//滚动条事件处理
eg.scroll = function () {
    window.onscroll = function () {
        var top = document.documentElement.scrollTop || document.body.scrollTop; //滚动条到顶部的高度
        var winH = document.documentElement.clientHeight || document.body.clientHeight; //可视窗口的高度
        if (Math.min.apply(Array, eg.colh) < (top + winH)) { //如果最小高度小于可视区域就补充
            eg.add(eg.getDataList(1, 35));
        }
    };
};

//是否应该显示图片
eg.lazy = function () {
    var top = document.documentElement.scrollTop || document.body.scrollTop; //滚动条到顶部的高度
    var winH = document.documentElement.clientHeight || document.body.clientHeight; //可视窗口的高度
    var imgs = document.getElementsByTagName("img");
    //对所有图片进行批量判断，是否在浏览器的显示区域内
    for (var i = 0; i < imgs.length; i++) {
        var _src = imgs[i].getAttribute('lazy-src');
        if (_src != imgs[i].src) { //图片还没有显示
            var _top = eg.getTop(imgs[i]);
            if (_top >= top && _top <= top + winH) {
                imgs[i].src = _src;
            }
        }
    }

}