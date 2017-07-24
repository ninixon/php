
if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
	/*window.location.href = "https://www.baidu.com/";*/
	alert('wap')

} else {

	var phoneWidth = parseInt(window.screen.width);
	var phoneScale = phoneWidth / 1060;
	document.write('<meta name="viewport" content="width=1060, minimum-scale = ' + phoneScale + ', maximum-scale = 1">');
	var ua = navigator.userAgent;
	if(/Android (\d+\.\d+)/.test(ua)) {
		alert('PC1')
		var version = parseFloat(RegExp.$1);
		if(version > 2.3) {
			document.write('<meta name="viewport" content="width=1060, minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
		} else {
			document.write('<meta name="viewport" content="width=1060, target-densitydpi=device-dpi">');
		}
	} else {
		alert('PC2')
		document.write('<meta name="viewport" content="width=1060, user-scalable=no, target-densitydpi=device-dpi">');
	}

	alert('PC')
	/*window.location.href = "http://news.baidu.com/";*/
}

$(function() {
	//全局替换#
	replaceAlink();
});

//==========================================================
//延时执行常配合resize使用
//==========================================================

function delay_exec(id, wait_time, callback_f) {
	if(typeof window['delay_exec'] === "undefined")
		window['delay_exec'] = [];
	if(typeof window['delay_exec'][id] !== "undefined")
		clearTimeout(window['delay_exec'][id]);
	window['delay_exec'][id] = setTimeout(callback_f, wait_time);
};

//==========================================================
//全局替换空链接
//==========================================================

function replaceAlink() {
	$.each($("a"), function(index, value) {
		var aHref = $(this).attr("href");
		if(aHref == "javascript:void(0)" || aHref == "" || aHref == "#") {
			$(this).removeAttr("target");
			$(this).attr("href", "javascript:void(0)");
		}
	})
};

//==========================================================
//左右翻页，html文件名称p1.html...p100.html
//==========================================================

document.onkeydown = chang_page

function chang_page(ev) {
	var evt = ev || window.event;
	var arr = /(\d+)-?(\d*).html/g.exec(window.location.pathname);
	var numarr = arr[0].split(".");
	var countdesc = parseInt(numarr[0]) - 1 > 0 ? parseInt(numarr[0]) - 1 : 1;
	var countasc = parseInt(numarr[0]) + 1;
	if(evt.keyCode == 37 || evt.keyCode == 33) location.href = window.location.pathname.replace(arr[0], countdesc + '.html');
	if(evt.keyCode == 39 || evt.keyCode == 34) location.href = window.location.pathname.replace(arr[0], countasc + '.html');
}