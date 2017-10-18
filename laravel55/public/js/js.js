var preload = new Preload({
    sources: {
        imgs: {
            source: [
                "img/page1.jpg",
                "img/page2.jpg",
                "img/page3.jpg",
                "img/page4.jpg",
                "img/page5.jpg",
                "img/page6.jpg",
                "img/page1_text.png",
                "img/page2_text.png",
                "img/page3_text.png",
                "img/page4_text.png",
                "img/page5_text.png",
                "img/page6_text.png",
                "img/page6_tab.png",
                "img/page6_button.png",
                "img/music.png",
                "img/iphone.png"
            ],
            callback: function () {
                console.log("图片加载完成！");
            }
        },
        audio: {
            source: [
                "music/music.mp3"
            ],
            callback: function () {
                console.log("音频加载完成！");
            }
        }
    },
    loadingOverTime: 3,
    loadingOverTimeCB: function () {
        console.log("资源加载超时");
    },
    progress: function (completedCount, total) {
        console.log(Math.floor((completedCount / total) * 100));
    },
    completeLoad: function () {
        console.log("所有加载项已经完成!");
        $("#loader").hide();
        audioAutoPlay('Jaudio');
    }
});
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

var alertStr, alertStr2, alertStr3;

function alertTest(txt) {
    alertStr = '<div class="alert">';
    alertStr += '<div class="alertInner">';
    alertStr += '<h2>';
    alertStr2 = '</h2>';
    alertStr2 += '<a href="javascript:;"></a>';
    alertStr2 += '</div></div><div class="background"></div>';
    alertStr3 = alertStr + txt + alertStr2;
    $("body").append(alertStr3);
    var wh = $(window).height()
    var thisH = $(".alertInner").height()
    $(".alertInner").css("top", (wh - thisH) / 2)

    $(".background").on("click", function () {
        $('.alert').remove();
        $(".background").remove();
    })
}

