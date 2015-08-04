/*
ʹ�÷�����
1����ҳ������input.emptyText.js
<script type="text/javascript" src="/js/input.emptyText.js"></script> 

2����ҪΪ�ؼ�����һ���Զ�������emptyText��emptyText��ֵ������ʾ���ݡ�
<input id="title" name="title" emptyText="������" /> 

3��Ȼ�����ļ�������js���ô��룺
$('[emptyText]').emptyText();

���ַ���ʵ������ͨ��input�ؼ���onfocus��onblur�¼������ƿؼ�����ʽ��onfocus�¼�����ʱ��
�жϿؼ���ֵ�Ƿ�����ʾֵ��������ա�onblur�¼��У��ж����������Ƿ�Ϊ�գ�Ϊ�����ÿؼ���ֵΪ��ʾ���ݡ�

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


