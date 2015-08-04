/*
使用方法：
1、在页面引用input.emptyText.js
<script type="text/javascript" src="/js/input.emptyText.js"></script> 

2、需要为控件增加一个自定义属性emptyText，emptyText的值就是提示内容。
<input id="title" name="title" emptyText="请输入" /> 

3、然后在文件中增加js调用代码：
$('[emptyText]').emptyText();

这种方法实际上是通过input控件的onfocus和onblur事件来控制控件的样式，onfocus事件触发时，
判断控件的值是否是提示值，是则清空。onblur事件中，判断输入内容是否为空，为空则置控件的值为提示内容。

*/

function focus() {
	var $this = $(this);
	if ($this.val() == $this.attr("emptyText")) {
		$this.val('');
		$this.css("color", "#000");
	}
}
function blur() {
	var $this = $(this);
	if ($this.val() == '') {
		$this.val($this.attr("emptyText"));
		$this.css("color", "#999");
	}
}

jQuery.fn.emptyText = function() {
	this.each(function() {
		var $this = $(this);
		tip = $this.attr("emptyText");
		if (tip != '') {
			if ($this.val() == '') {
				$this.val(tip);
				$this.css("color", "#999");
			}
			$this.focus(focus);
			$this.blur(blur);
		}
	});
}


