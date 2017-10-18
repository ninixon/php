// 音乐功能
function audioAutoPlay(id){
    var audio = document.getElementById(id),
        play = function(){
            audio.play();
            document.removeEventListener("touchstart",play, false);
        };
    audio.play();
    document.addEventListener("WeixinJSBridgeReady", function () {
        play();
    }, false);
    document.addEventListener("touchstart",play, false);
}
function pauseBg() {
    var audio = document.getElementById('Jaudio');
    if (audio) {
        audio.pause();
    }
}
var flag = 1;
$('.music').click(function(){
    if(flag==0){
        audioAutoPlay('Jaudio');
        $('.music img').addClass("music_active");
        flag=1;
    }else if(flag==1){
        pauseBg();
        var cTransform = $(".music").css('transform');
        var iTransform = $(".music").find("img").css('transform');
        var _cTransform = cTransform === 'none'? iTransform: iTransform.concat(' ', cTransform);
        $(".music").css('transform',_cTransform);
        $('.music').find("img").removeClass("music_active");
        flag=0;
    }
})
// function music() {
// 	//音乐控制
// 	$('#music')[0].style.animationPlayState = 'running';
// 	$('#music')[0].style.WebkitAnimationPlayState = 'running';
// 	$('audio').trigger('play');
// 	$('#music').addClass('audioAni');
// 	$(this).attr('data', 'true');
// 	$('#music').bind('click', function() {console.log(111);
// 		if($(this).attr('data') == 'true') {
// 			$('audio').trigger('pause');
// 			$(this).attr('data', 'false');
// 			$('#music')[0].style.animationPlayState = 'paused';
// 			$('#music')[0].style.WebkitAnimationPlayState = 'running';
// 			$('#music').removeClass('audioAni');
// 		} else {
// 			$('audio').trigger('play');
// 			$(this).attr('data', 'true');
// 			$('#music')[0].style.animationPlayState = 'running';
// 			$('#music')[0].style.WebkitAnimationPlayState = 'running';
// 			$('#music').addClass('audioAni');
// 		}
// 	});
// }

// function audioAutoPlay(id) {
// 	var audio = document.getElementById(id),
// 		play = function() {
// 			audio.play();
// 			document.removeEventListener("touchstart", play, false);
// 		};
// 	audio.play();
// 	document.addEventListener("WeixinJSBridgeReady", function() {
// 		play();
// 	}, false);
// 	document.addEventListener('YixinJSBridgeReady', function() {
// 		play();
// 	}, false);
// 	document.addEventListener("touchstart", play, false);
// }
// audioAutoPlay('Jaudio');