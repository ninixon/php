var preload = new Preload({
    sources: {
        imgs: {
            source: [
                "img/start_bg.jpg",
                "img/start_title.png",
                "img/start_1.png",
                "img/start_2.png",
                "img/start_mid.png",
                "img/screen1_bg.jpg",
                "img/screen1_pic1.png",
                "img/screen1_pic2.png",
                "img/screen1_people.png",
                "img/screen1_car.png",
                "img/screen1_button1.png",
                "img/screen1_button2.png",
                "img/screen2_bg.jpg",
                "img/screen2_pic1.png",
                "img/pic2.png",
                "img/screen2_car.png",
                "img/screen2_button1.png",
                "img/screen2_button2.png",
                "img/screen3_bg.jpg",
                "img/pic1.png",
                "img/pic2.png",
                "img/pic3.png",
                "img/pic4.png",
                "img/screen4_bg.jpg",
                "img/screen4_1.png",
                "img/red.png",
                "img/yellow2.png",
                "img/yellow.png",
                "img/sorry.png",
                "img/alert_flow_card.png",
                "img/alert_sos.png",
                "img/alert_camera.png",
                "img/screen4_button1.png",
                // "img/screen4_button2.png",
                "img/screen5_bg.jpg",
                // "img/certificate.png",
                "img/text.png",
                "img/hand.png",
                "img/iphone.png",
                "img/why.png",
                "img/screen3_people.png",
                "img/remind1.png",
                "img/remind2.png",
                "img/jieli.png"
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

var status = "true";
$(".start .title").fadeIn(2000);
$(".start .button").click(function () {
    $(".start").hide();
    $(".screen1").show();
    $(".screen1 .car1").animate({left:"4.4rem",bottom:"2.5rem"},3000);
});
$(".screen1 .button1").click(function () {
    if( status == "true"){console.log(11);
        $(".screen1 .text1").show();
        $(".screen1 .text2").hide();
        status = "false";
        setTimeout(function () {
            $(".screen1").hide();
            $(".screen2").show();
            $(".car2").animate({left:"-1.1333333333rem"},2000);
            status = "true";
        },2400);
    }
});
$(".screen1 .button2").click(function () {
    if( status === "true") {
        $(".screen1 .text2").show();
        $(".screen1 .text1").hide();
        status = "false";
        setTimeout(function () {
            $(".screen1").hide();
            $(".screen2").show();
            $(".car2").animate({left: "-1.1333333333rem"}, 2000);
            status = "true";
        }, 2400);
    }
});
$(".screen2 .button1").click(function () {
    if( status === "true") {
        $(".screen2 .text1").show();
        $(".screen2 .text2").hide();
        status = "false";
        setTimeout(function () {
            $(".screen2").hide();
            $(".screen3").show();
            $(".screen3 .people").animate({left:"4.66666667rem",top:"9.26666667rem"},1000);
            status = "true";
        }, 2400);
    }
});
$(".screen2 .button2").click(function () {
    if( status === "true") {
        $(".screen2 .text2").show();
        $(".screen2 .text1").hide();
        status = "false";
        setTimeout(function () {
            $(".screen2").hide();
            $(".screen3").show();
            $(".screen3 .people").animate({left:"4.66666667rem",top:"9.26666667rem"},1000);
            status = "true";
        }, 2400);
    }
});

$(".screen3 .button1").click(function () {
    if( status === "true") {
        $(".screen3 .text1").show();
        $(".screen3 .text2").hide();
        status = "false";
        $(".screen3 .people").animate({left:"2.4rem",top:"9.3rem"},1000);
        setTimeout(function () {
            $(".why").show();
        },1200);
        setTimeout(function () {
            $.ajax({
                type: "get",
                url: "mock1.json",
                async: false,
                data: '',
                success: function (data) {
                    switch (data.prizeID) {
                        case 0://车载记录仪
                            //留资
                            $(".screen4 .camera").show();
                            $(".screen4 .camera .out .title").html("[行车记录仪]");
                            $(".bg").show()
                            break;
                        case 1://sos
                            $(".screen4 .sos").show();
                            $(".bg").show()
                            break;
                        case 2://谢谢
                            // $(".screen4 .sorry").show();
                            // $(".bg").show()
                            break;
                        case 3://流量卡
                            $(".screen4 .flow_card").show();
                            $(".bg").show()
                            break;
                        case 4://3M空气进化器
                            //留资
                            $(".screen4 .camera").show();
                            $(".screen4 .camera .out .title").html("[3M车载空气净化]");
                            $(".bg").show()
                            break;
                        case 5://谢谢
                            // $(".screen4 .sorry").show();
                            // $(".bg").show();
                            break;
                        case 6://流量卡
                            $(".screen4 .flow_card").show();
                            $(".bg").show()
                            break;
                        case 7://胎压监测器
                            //留资
                            $(".screen4 .camera").show();
                            $(".screen4 .camera .out .title").html("[胎压监测器]");
                            $(".bg").show()
                            break;
                    }
                    $(".screen3").hide();
                    $(".screen4").show();
                    status = "true";
                },
                error: function () {

                }
            });
        }, 2400);
    }
});
$(".screen3 .button2").click(function () {
    if( status === "true") {
        $(".screen3 .text2").show();
        $(".screen3 .text1").hide();
        status = "false";
        $(".screen3 .people").animate({left:"5rem",top:"10.8rem"},1000);
        setTimeout(function () {
            $.ajax({
                type: "get",
                url: "mock1.json",
                async: false,
                data: '',
                success: function (data) {
                    switch (data.prizeID) {
                        case 0://车载记录仪
                            //留资
                            $(".screen4 .camera").show();
                            $(".screen4 .camera .out .title").html("[行车记录仪]");
                            $(".bg").show()
                            break;
                        case 1://sos
                            $(".screen4 .sos").show();
                            $(".bg").show()
                            break;
                        case 2://谢谢
                            // $(".screen4 .sorry").show();
                            // $(".bg").show()
                            break;
                        case 3://流量卡
                            $(".screen4 .flow_card").show();
                            $(".bg").show()
                            break;
                        case 4://3M空气进化器
                            //留资
                            $(".screen4 .camera").show();
                            $(".screen4 .camera .out .title").html("[3M车载空气净化]");
                            $(".bg").show()
                            break;
                        case 5://谢谢
                            // $(".screen4 .sorry").show();
                            // $(".bg").show();
                            break;
                        case 6://流量卡
                            $(".screen4 .flow_card").show();
                            $(".bg").show()
                            break;
                        case 7://胎压监测器
                            //留资
                            $(".screen4 .camera").show();
                            $(".screen4 .camera .out .title").html("[胎压监测器]");
                            $(".bg").show()
                            break;
                    }
                    $(".screen3").hide();
                    $(".screen4").show();
                    status = "true";
                },
                error: function () {

                }
            });
        }, 2400);
    }
});


$(".start .rule").click(function () {
    $(".rule_content").show();
});
$(".start .rule_content").click(function () {
    $(".rule_content").hide();
});