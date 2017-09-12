(function () {
    Pace.on('done', function () {
        //加载完成
        $.ajax({
            url: 'http://case.html5case.cn/welcome/redirect',
            type: 'post',
            async: false,
            success: function (data) {
                if (data.code === -1) {
                    $('iframe').parent().hide();
                    $('body').css('display', 'block');

                }
                else {
                    $('body').css('display', 'block');
                }
            },

        });
        // wx.ready(function(){
        //      wx.getNetworkType({
        //          success: function (res) {
        //              if(res.networkType=='4g'||res.networkType=='4G')
        //              {
        //                  $('iframe').parent().hide();
        //              }
        //          }
        //      });
        //  });
        page(1);
    });
})();

/*loading页面效果*/
function page(p) {
    //console.log(p)
    if (p == 1) {
        //模拟Loading事件
        var num = 1927;
        var num2 = 0;
        var loadTime = setInterval(function () {
            if (num == 2017) {
                //loading下一页
                clearInterval(loadTime);
                $(".loadDom").fadeOut("fast");
                // 初始化
                _init();

            } else {
                num++;
                num2++;
            }
            $('.loadCur').css("width", num2 + "%");
            $(".curNum").text(num);
        }, 5);
    }
}

var twidth = $(window).width();
var theight = $(window).height();
//选择的年代
var ndNum = 0;
var swiper;
var mynickname = window.h6app_userInfo.nickname;
var uploadimgUrl = "";
var sharePicUrl = "";
var shareIcon = "";
var sex = "男";
var sharenickname = "";
// 请求次数

var requestTimes = 1;
//点击次数
var clickTimes = 1;
//音乐
var isAppInside = /micromessenger/i.test(navigator.userAgent.toLowerCase()) || /yixin/i.test(navigator.userAgent.toLowerCase());
$(document).ready(function () {
    //音乐
    if (IsPC()) {
        //pc端
        music();
    } else {
        //移动端
        if (!isAppInside) {//给非微信易信浏览器
            music();
        }
    }
    if (isWeiXin()) {
        $(".wxTips").hide();
        $(".word").show()
    } else {
        $(".wxTips").show();
        $(".word").hide();
    }
    var picUrl = GetQueryString("picUrl");
    sharenickname = decodeURI(GetQueryString("nickname"));
    var sharendNum = decodeURI(GetQueryString("ndNum"));
    $('.myselfName').html("");
    $('.myselfName').html(mynickname);
    if (picUrl == null) {
        $(".pic4").remove();
    } else {
        $(".sharePic>img").attr("src", picUrl);
        $(".shareNickName").html(sharenickname + ",");
        $(".shareniandai").html("军服所属年代:" + sharendNum);
    }


    $(".btn_down1").click(function () {
        window.location.href = "http://m.people.cn/0/54/413/415/index_3.html";
    });
    $(".btn_down2").click(function () {
        window.location.href = "http://tu.qq.com/downloading.php?by=29";
    });
    $(".userPicDom").click(function () {
        $(".p2").fadeOut("fast");
        $(".p3").fadeIn("fast", function () {
            var t = setTimeout(function () {
                $(".tipHand").fadeOut("fast");
                clearTimeout(t);
            }, 2000);
            swiper = new Swiper('.swiper-container', {
                slidesPerView: 3,
                direction: 'vertical',
                paginationClickable: true,
            });
        });
    });


    $(".p1,.p2,.p3,.p4,.p5").on('touchmove', function () {
        event.stopPropagation();
        event.preventDefault();
    });
    //点击确定
    $(".btn_sure").click(function () {
        ndNum = $(".swiper-slide-active").html();
        $(".contentDom1").fadeOut("fast", function () {
            $(".contentDom2").fadeIn("fast");
        });

    });
    //点击穿上军装
    $(".btn_chuan").click(function () {
        if (clickTimes == 1) {
            clickTimes++;
            //requestPic();
            //var x = 2;     
            //var y = 1;     
            //var rand = parseInt(Math.random() * (x - y + 1) + y); 
            //if(rand==1){
            requestTimes++;
            requestPic();

            //}else{
            // $(".waitingDom").fadeIn("fast");
            // if(requestTimes<2){
            //     $(".waitingDom").fadeIn("fast");
            // }else{
            //     requestPic();
            //     requestTimes=1;
            //     clickTimes=1;
            // }
            //}            
        }
    });

    $(".errowDom,.waitingDom").click(function () {
        $(this).fadeOut("fast");
    })
    //点击重新选择
    $(".btn_reChoose").click(function () {
        $(".page").fadeOut("fast");
        $(".p3").fadeIn("fast");
        $(".imgDom").css("top", "-100%");
        $(".sex").removeClass("curSex");
        $(".sex").eq(0).addClass("curSex");
        $(".sex").eq(0).find("img").attr("src", "img/c1-2.png");
        $(".sex").eq(1).find("img").attr("src", "img/c2-1.png");
        $(".donePhoto").remove();
        sex = "男";
    });

    $(".sex").click(function () {
        var sexNum = $(this).index();
        $(".sex").removeClass("curSex");
        $(this).addClass("curSex");
        var sexIndex = $(this).index();
        if (sexIndex == 0) {
            sex = "男";
        } else if (sexIndex == 1) {
            sex = "女";
        }
        $(".sex").eq(0).find("img").attr("src", "img/c1-1.png");
        $(".sex").eq(1).find("img").attr("src", "img/c2-1.png");
        $(this).find("img").attr("src", "img/c" + (sexNum + 1) + "-2.png");
    })
    $(".btn_share").on("touchstart", function () {
        window.location.href = "http://www.h5case.com.cn/case/people-cn/81/share.html?picUrl=" + sharePicUrl + "&ndNum=" + encodeURIComponent(ndNum) + "&nickname=" + encodeURIComponent(mynickname) + "&shareIcon=" + shareIcon;
    });
});

function requestPic() {

    uploadimgUrl = ImageFile[0];
    var start = uploadimgUrl.indexOf(',') + 1;
    var uploadUrl = uploadimgUrl.slice(start);
    var sid = "1927m";
    var maskid = "10";
    var alphablend = "0.2";
    var alphaposition = "0.52";
    if (ndNum == "南昌起义") {
        if (sex == "男") {
            sid = "1927m";
            maskid = "10";
            alphablend = "0.2";
            alphaposition = "0.52";
        } else if (sex == "女") {
            sid = "1927w2";
            maskid = "2";
            alphablend = "0.2";
            alphaposition = "0.58";
        }

    } else if (ndNum == "红军时期") {
        if (sex == "男") {
            sid = "1929m";
            maskid = "8";
            alphablend = "0.2";
            alphaposition = "0.5";
        } else if (sex == "女") {
            sid = "1929w";
            maskid = "2";
            alphablend = "0.2";
            alphaposition = "0.65";
        }
    } else if (ndNum == "抗日战争") {
        if (sex == "男") {
            sid = "1937m";
            maskid = "2";
            alphablend = "0.2";
            alphaposition = "0.52";
        } else if (sex == "女") {
            sid = "1937w";
            maskid = "2";
            alphablend = "0.2";
            alphaposition = "0.5";
        }
    } else if (ndNum == "解放战争") {
        if (sex == "男") {
            sid = "1948m";
            maskid = "2";
            alphablend = "0.2";
            alphaposition = "0.55";
        } else if (sex == "女") {
            sid = "1948w";
            maskid = "2";
            alphablend = "0.2";
            alphaposition = "0.5";
        }
    } else if (ndNum == "1950-1955") {
        if (sex == "男") {
            sid = "1950m";
            maskid = "2";
            alphablend = "0.2";
            alphaposition = "0.65";
        } else if (sex == "女") {
            sid = "1950w";
            maskid = "2";
            alphablend = "0.2";
            alphaposition = "0.5";
        }
    } else if (ndNum == "1955-1965") {
        if (sex == "男") {
            sid = "1955m";
            maskid = "2";
            alphablend = "0.2";
            alphaposition = "0.55";
        } else if (sex == "女") {
            sid = "1955w";
            maskid = "8";
            alphablend = "0.2";
            alphaposition = "0.6";
        }
    } else if (ndNum == "1965-1985") {
        if (sex == "男") {
            sid = "1965m";
            maskid = "2";
            alphablend = "0.2";
            alphaposition = "0.5";
        } else if (sex == "女") {
            sid = "1965w";
            maskid = "8";
            alphablend = "0.2";
            alphaposition = "0.5";
        }
    } else if (ndNum == "1985-1987") {
        if (sex == "男") {
            sid = "1985m";
            maskid = "2";
            alphablend = "0.2";
            alphaposition = "0.5";
        } else if (sex == "女") {
            sid = "1985w";
            maskid = "8";
            alphablend = "0.2";
            alphaposition = "0.6";
        }
    } else if (ndNum == "1987-1999") {
        if (sex == "男") {
            sid = "1987m";
            maskid = "2";
            alphablend = "0.2";
            alphaposition = "0.5";
        } else if (sex == "女") {
            sid = "1987w";
            maskid = "8";
            alphablend = "0.2";
            alphaposition = "0.6";
        }
    } else if (ndNum == "1999-2007") {
        if (sex == "男") {
            sid = "1999m";
            maskid = "9";
            alphablend = "0.2";
            alphaposition = "0.55";
        } else if (sex == "女") {
            sid = "1999w";
            maskid = "9";
            alphablend = "0.2";
            alphaposition = "0.5";
        }
    } else if (ndNum == "2007-2017") {
        if (sex == "男") {
            sid = "2007m";
            maskid = "9";
            alphablend = "0.2";
            alphaposition = "0.5";
        } else if (sex == "女") {
            sid = "2007w";
            maskid = "10";
            alphablend = "0.18";
            alphaposition = "0.5";
        }
    }
    if (uploadimgUrl == "") {
        alert("请上传个人照片");
    } else {

        $.ajax({
            url: '1.php',
            // url: 'https://tu.qq.com/cgi-bin/do_face_merge.fcg',
            type: 'post',
            data: JSON.stringify({
                // raw_base64:uploadUrl,
                // sid:"shennong",
                // project:"bayi"
                "maskid": maskid,
                "alphablend": alphablend,
                "alphaposition": alphaposition,
                "raw_base64": uploadUrl,
                "sid": sid,
                "type": 0,
                "project": "bayi"

            }),
            datatype:'json',
            contentType: 'application/x-www-form-urlencoded',
            processData: false,
            success: function (data) {
                var data = eval("("+data+")");
                if (data.retcode == 0) {console.log(000);
                    sharePicUrl = data.raw_url;
                    shareIcon = data.raw_url_thumb;
                    $(".selfPic>img").attr("src", data.raw_url);
                    $(".selfNd").html("军服所属年代：" + ndNum);
                    setTimeout(function () {
                        picToCanvas($(".imgDom"));
                    }, 500);
                    $(".p3").fadeOut("fast", function () {
                        $(".p4").fadeIn("fast", function () {
                            aud3.play();

                            $(".imgDom").animate({"top": "50px"}, 3000, function () {
                                aud3.pause();

                                $(".btnDom").css("-webkit-animation", "fadeInUpBack .5s linear .5s both");
                                $(".logo1").css("-webkit-animation", "fadeInUpBack .5s linear .5s both");
                                $(".word").css("-webkit-animation", "fadeIn .5s linear .5s both");

                            });
                        });
                    });
                    $(".contentDom1").fadeIn("fast");
                    $(".contentDom2").fadeOut("fast");
                    $(".btn_upload>img").attr("src", "img/btn_upload.png");
                } else if (data.retcode == "1000" || data.retcode == "-1000" || data.retcode == "-1001") {
                    $(".errowDom").fadeIn("fast");
                } else {
                    $(".waitingDom").fadeIn("fast");
                }
                setTimeout(function () {
                    clickTimes = 1;
                }, 500);

            },
            error: function (xhr, errorType, error) {
                console.log(error);
                clickTimes = 1;
            }
        });
    }
}

function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

function _init() {

    $(".p1>*").fadeIn("fast");
    $('.shareNickName,.tips').html("");
    $(".man1").css("display", "none");
    $(".book img").css("-webkit-animation", "fadeOut .8s linear 2s both");
    $(".book1").on("webkitAnimationEnd AnimationEnd", function (e) {
        if (e.target === e.currentTarget) {
            $(".book1 img").css("-webkit-animation", "myzoomOutBig 2s ease .5s forwards");
            setTimeout(function () {
                $(".p2").fadeIn(1000, function () {
                    $(".p1").fadeOut("fast");
                    console.log("1")
                    $(".pic1").on("webkitAnimationStart AnimationStart", function (e) {
                        if (e.target === e.currentTarget) {
                            aud2.play();
                        }
                    });
                    $(".pic2").on("webkitAnimationStart AnimationStart", function (e) {
                        if (e.target === e.currentTarget) {
                            aud2.play();
                        }
                    });
                    $(".pic3").on("webkitAnimationStart AnimationStart", function (e) {
                        if (e.target === e.currentTarget) {
                            aud2.play();
                        }
                    });
                    $(".pic4").on("webkitAnimationStart AnimationStart", function (e) {
                        if (e.target === e.currentTarget) {
                            aud2.play();
                        }
                    });
                    $(".pic3").on("webkitAnimationEnd AnimationEnd", function (e) {
                        if (e.target === e.currentTarget) {
                            $('.shareNickName').typetype(sharenickname + ",",
                                {
                                    e: 0,
                                    t: 100,
                                    callback: function () {
                                        $('.tips').typetype('参军纪念',
                                            {
                                                e: 0,
                                                t: 100,
                                                callback: function () {
                                                    $(".pic4").css("-webkit-animation", "name 2s linear 1 alternate 1s both");
                                                }
                                            }
                                        );
                                    }
                                }
                            );

                        }
                    });
                });
            }, 1500);
        }
    });

}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]);
    return null;
}

function picToCanvas($dom) {
    var img1 = new Image();
    var img2 = new Image();
    var bg = new Image();
    var loaded = 0;
    var onLoad = function () {
        // alert(this.src);
        loaded += 1;
        if (loaded == 3) {
            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

            var $img1 = $dom.find('.selfPic img');
            ctx.drawImage($img1.get(0), 24, 24, 400, 480);

            var $img2 = $dom.find('.code img');
            ctx.drawImage(img2, 24, 510, 397, 166);

            ctx.font = '20px 微软雅黑';
            ctx.textAlign = "right";
            ctx.fillText($dom.find('.selfNd').text(), 422, 694 - 20);

            finish();
        }
    };
    // img1.crossOrigin = "anonymous";
    // img2.crossOrigin = "anonymous";
    // bg.crossOrigin = "anonymous";

    img1.onload = onLoad;
    img2.onload = onLoad;
    bg.onload = onLoad;
    img1.src = $dom.find('.selfPic img').attr('src');
    img2.src = 'http://www.h5case.com.cn/case/people-cn/81/img/code.png';
    bg.src = 'http://www.h5case.com.cn/case/people-cn/81/img/imgBox.jpg';

    // img1.crossOrigin = "anonymous";
    // img2.crossOrigin = "anonymous";
    // bg.crossOrigin = "anonymous";

    var $canvas = $("<canvas/>")
        .attr('width', 446)
        .attr('height', 694);
    var canvas = $canvas.get(0);
    var ctx = canvas.getContext('2d');

    var finish = function () {
        var dataUrl = $canvas.get(0).toDataURL("image/png");
        var newImg = document.createElement("img");
        newImg.className = "donePhoto";
        newImg.crossOrigin = 'anonymous';
        newImg.src = dataUrl;
        $(newImg).css('width', '100%');
        $dom.append(newImg);
        //alert("您的军装照生成成功，赶紧分享吧！");
        window.h6app_shareConfig = {
            shareData: {
                //title: "快看呐！"+mynickname+"参军了，这是他的军装照。",
                title: "穿越时光，这是" + mynickname + "保家卫国的样子！",
                desc: '最好的我，已经上交给国家了！',
                imgUrl: shareIcon,
                link: "http://www.h5case.com.cn/case/people-cn/81?picUrl=" + sharePicUrl + "&ndNum=" + encodeURIComponent(ndNum) + "&nickname=" + encodeURIComponent(mynickname)
            },
            'timeLineTitle': "穿越时光，这是" + mynickname + "保家卫国的样子！", //选填，朋友圈标题，未填写将会取值
            'timeLineImgUrl': shareIcon//选填，朋友圈图⽚信息，未填写将会取值shareData.imgUrl

        };
        window.setShareData();
    }
}

var aud1, aud2, aud3;

//音乐
function music() {
    var audio = document.getElementById("audio-bg");
    aud1 = document.getElementById("aud1");
    aud2 = document.getElementById("aud2");
    aud3 = document.getElementById("aud3");
    aud1.load();
    aud2.load();
    aud3.load();
    audio.load();
    //audio.play();
    $(".book").on("webkitAnimationEnd AnimationEnd", function (e) {
        if (e.target === e.currentTarget) {
            aud1.play();
        }
    });
    $(".btn_music").on('touchstart', function () {
        if (!audio.paused) {
            audio.pause();
            $(".btn_music img").attr('src', 'img/stop.png');
        } else {
            audio.play();
            $(".btn_music img").attr('src', 'img/play.png');
        }
    })
}

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}



