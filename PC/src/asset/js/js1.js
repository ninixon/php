$(function() {
	//公共导航
	$(".nav li").hover(function() {
		$(this).addClass('active')
	}, function() {
		$(this).removeClass('active')
	});
	//返回顶部
	$(".footer .go-top img").click(function() {
		$("html,body").animate({
			scrollTop: 0
		}, 500);
		return false;
	});
	//弹层视频播放
	$(".js-video-play").on('click', function() {
		var $url = $(this).attr('video-url');
		var $obj = $(this).attr('video-wrap');
		var html = '<div class="float-video"><a href="javascript:;" class="close" onclick="closeFloat(this)">&times;</a><div id="' + $obj + '"></div></div>';
		$("body").append(html);
		playVideo($obj, $url);
	});
	//头部滚动
	var $hdNavH = $(".header").height();
	var $windowH = $(window).height();
	$(window).on("scroll", function() {
		var st = $(window).scrollTop();
		console.log(st)
		console.log($windowH)
		if(st > $hdNavH) {
			$(".header").css("opacity", 0);
			$(".header-scroll").slideDown();
		} else {
			$(".header").css("opacity", 1);
			$(".header-scroll").slideUp();
		}
		//返回顶部
			if(st>0){
				$(".footer .go-top").show();
			}else{
				$(".footer .go-top").hide()
			}
	});

	//低版本浏览器样式 
	$(".talent li:last-child").addClass("clbd");
	$(".list-book dl:last-child").addClass("clbd");
	$(".list-book dl:odd").addClass('theme1');
	$(".list-1 li").eq(2).addClass('clbd');

	/*//4.html社会责任焦点
	$(".focus-shzr li").hover(function() {
		$(this).find("b,p").fadeIn();
	}, function() {
		$(this).find("b,p").fadeOut();
	});*/

	//滚动定位
	$(".side-nav a").click(function() {
		$(this).addClass('active').siblings().removeClass('active')
	});

});

//视频播放
function playVideo(obj, url) {
	jwplayer(obj).setup({
		'flashplayer': 'asset/plug/jwplayer/player.swf',
		'file': url,
		'image': '',
		'provider': 'http',
		'http.startparam': 'start',
		'skin': 'asset/plug/jwplayer/skin/simplicity.zip',
		'wmode': 'opaque',
		'autostart': 'true',
		'frontcolor': '000000',
		'lightcolor': 'cc9900',
		'screencolor': '000000',
		'controlbar': 'bottom',
		'width': '720',
		'height': '460'
	});
};
//关闭弹层
function closeFloat(obj) {
	obj.closest('div').remove()
};