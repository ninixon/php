var prizeID = -1; //设置我想要中奖的位置
var txtStr = ""; //中奖位置所对应的文字;
var method = "share1";//是否通过分享
var joinnum = "988";//参与人数

/*

 * 全局变量为接口请求过来的数据;
 *
 * */
// var isGuanzhu = false; //是否关注
var isCount = 1; //可抽次数
// var isShare = true; //是否分享
var isOK = false //是否中奖

var lottery = {
    index: -1, //当前转动到哪个位置，起点位置
    count: 0, //总共有多少个位置
    timer: 0, //setTimeout的ID，用clearTimeout清除
    speed: 200, //初始转动速度
    times: 0, //转动次数
    cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize: -1, //中奖位置
    init: function (id) {
        if ($("#" + id).find(".lottery-unit").length > 0) {
            $lottery = $("#" + id);
            $units = $lottery.find(".lottery-unit");
            this.obj = $lottery;
            this.count = $units.length;
            $lottery.find(".lottery-unit-" + this.index).addClass("active");
        }
        ;
    },
    roll: function () {
        var index = this.index;
        var count = this.count;
        var lottery = this.obj;
        $(lottery).find(".lottery-unit-" + index).removeClass("active");
        index += 1;
        if (index > count - 1) {
            index = 0;
        }
        $(lottery).find(".lottery-unit-" + index).addClass("active");
        this.index = index;
        return false;
    },
    stop: function (index) {
        this.prize = index;
        return false;
    }
};

function roll() {
    lottery.times += 1;
    lottery.roll(); //转动过程调用的是lottery的roll方法，这里是第一次调用初始化
    if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
        clearTimeout(lottery.timer);
        lottery.prize = -1;
        lottery.times = 0;
        click = false;
    } else {
        if (lottery.times < lottery.cycle) {
            lottery.speed -= 10;
        } else if (lottery.times == lottery.cycle) {
            //var index = Math.random() * (lottery.count) | 0; //中奖物品通过一个随机数生成
            lottery.prize = prizeID;
        } else {
            if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
                lottery.speed += 110;
            } else {
                lottery.speed += 20;
            }
        }
        if (lottery.speed < 40) {
            lottery.speed = 40;
        }
        ;
        //console.log(lottery.times + '^^^^^^' + lottery.speed + '^^^^^^^' + lottery.prize);
        lottery.timer = setTimeout(roll, lottery.speed); //循环调用
    }
    return false;
}

var click = false;

window.onload = function () {
    lottery.init('lottery');
    $("#lottery a").click(function () {
    //     if ($(".jihui span").text() == "0") {
    //         //没有机会抽奖且弹出无机会.float.s1
    //         alertTest("今天抽奖机会已用完");
    //         // $(".float.s1").show();
    //         return false;
    //     }
        /*
         ajax获取接口数据，isCount,isShare,isOk
         *
         * */

        $.ajax({
            type: "get",
            url: "mock2.json",
            async: false,
            success: function (data) {
                var obj = data;
                prizeID = obj.prizeID;//设置我要中奖的位置
                //isShare = obj.isShare; //是否分享;
                isOK = obj.isOK; //是否中奖;
                isCount = obj.count;
                console.log("中奖位置：", prizeID, "剩余次数:", isCount, "是否中奖",isOK)

                if (isCount == -1) {
                    alertTest("活动已结束");
                    return false;
                } else if (isCount == 0) {
                    alertTest("不要太贪心哦，您已经抽过奖啦");
                    return false;
                } else {
                    if (click) { //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
                        return false;
                    } else {
                        $(".lottery-unit").each(function () {
                            var str = $(this).attr("class");
                            str = str.charAt(str.length - 1);
                            if (str == prizeID) {
                                var money = $(this).data("money");
                                switch (money) {
                                    case 0:
                                        txtStr = "谢谢参与"
                                        break;
                                    case 1:
                                        txtStr = "SOS全球医疗救援"
                                        break;
                                    case 2:
                                        txtStr = "行车记录"
                                        break;
                                    case 3:
                                        txtStr = "流量奖"
                                        break;
                                    case 4:
                                        txtStr = "胎压监测器"
                                        break;
                                    case 5:
                                        txtStr = "3M车载空气净化"
                                        break;
                                }
                            }
                        })

                        lottery.speed = 100;
                        roll(); //转圈过程不响应click事件，会将click置为false
                        click = true; //一次抽奖完成后，设置click为true，可继续抽奖
                        //开启弹层
                        setTimeout(function () {
                            isCount--
                            $(".jihui span").text(isCount);
                            console.log(isCount);
                            if (isCount == 0) {
                                // if(isShare) {
                                if (isOK) {
                                    switch (prizeID) {
                                        case 0://车载记录仪
                                            //留资
                                            $(".screen4 .camera").show();
                                            $(".screen4 .camera .out .title").html("[" + txtStr + "]");
                                            $(".bg").show()
                                            break;
                                        case 1://sos
                                            $(".screen4 .sos").show();
                                            $(".bg").show()
                                            break;
                                        case 2://谢谢
                                            $(".screen4 .sorry").show();
                                            $(".bg").show()
                                            break;
                                        case 3://流量卡
                                            $(".screen4 .flow_card").show();
                                            $(".bg").show()
                                            break;
                                        case 4://3M空气进化器
                                            //留资
                                            $(".screen4 .camera").show();
                                            $(".screen4 .camera .out .title").html("[" + txtStr + "]");
                                            $(".bg").show()
                                            break;
                                        case 5://谢谢
                                            $(".screen4 .sorry").show();
                                            $(".bg").show();
                                            break;
                                        case 6://流量卡
                                            $(".screen4 .flow_card").show();
                                            $(".bg").show()
                                            break;
                                        case 7://胎压监测器
                                            //留资
                                            $(".screen4 .camera").show();
                                            $(".screen4 .camera .out .title").html("[" + txtStr + "]");
                                            $(".bg").show()
                                            break;
                                    }

                                } else {
                                    //没中奖
                                    $(".screen4 .sorry").show();
                                    $(".bg").show();
                                }
                                //     } else {
                                //         if(isOK) {
                                //             //分享+留资float s5
                                //             $(".float.s5").show();
                                //             $(".float.s5 .txt b").html(txtStr)
                                //         } else {
                                //             //未中奖+分享float s2
                                //             $(".screen4 .sorry").show();
                                //             $(".screen4 .bg").show();
                                //         }
                                //     }
                                // }
                                // if(isCount == 1) {
                                //     if(isShare) {
                                //         if(isOK) {
                                //             //留资float s3
                                //             $(".float.s3").show();
                                //             $(".float.s3 .txt b").html(txtStr)
                                //         } else {
                                //             //没中奖float s1
                                //             $(".float.s1").show();
                                //         }
                                //     }
                            }

                        }, 6000)

                        return false;
                    }
                }
            }
        });

    });
};
$(".screen4 .sorry .button").click(function () {
    $(".screen4 .sorry").hide();
    $(".screen4 .bg").hide();
});

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

$(".screen4 .camera .button").click(function () {
    var name, mobile, address;
    name = $(".link_name").val();
    mobile = $(".link_mobile").val();
    address = $(".link_address").val();
    //表单提交
    if (name == '') {
        alertTest("姓名不能为空，请重填");
        return false;
    } else if (address == '') {
        alertTest("地址不能为空，请重填");
        return false;
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(mobile))) {
        alertTest("手机号码有误，请重填");
        return false;
    } else {
        $.ajax({
            type: "get",
            url: "mock.json",
            async: false,
            data: {'link_name': name, 'link_mobile': mobile, 'link_address': address},
            success: function (data) {
                if(data.msg == "提交成功"){
                    alertTest(data.msg);
                    $(".screen4 .camera").hide();
                    $(".screen4 .bg").hide();
                }else{
                    alertTest("提交失败,请从新提交");
                }

            },
            error: function () {

            }
        });
    }
});

$(".screen4 .sos .button").click(function () {
    var name, mobile, address;
    name = $(".link_name1").val();
    mobile = $(".link_mobile1").val();
    address = $(".link_address1").val();
    if (name == '') {
        alertTest("姓名不能为空，请重填");
        return false;
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(mobile))) {
        alertTest("手机号码有误，请重填");
        return false;
    } else {
        $.ajax({
            type: "get",
            url: "mock.json",
            async: false,
            data: {'link_name': name, 'link_mobile': mobile, 'link_address': address},
            success: function (data) {
                if(data.msg == "提交成功"){
                    alertTest(data.msg);
                    $(".screen4 .sos").hide();
                    $(".screen4 .bg").hide();
                }else{
                    alertTest("提交失败,请从新提交");
                }

            },
            error: function () {

            }
        });
    }
});

$(".screen4 .flow_card .button").click(function () {
    var name, mobile;
    name = $(".link_name2").val();
    mobile = $(".link_mobile2").val();
    if (name == '') {
        alertTest("姓名不能为空，请重填");
        return false;
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(mobile))) {
        alertTest("手机号码有误，请重填");
        return false;
    } else {
        $.ajax({
            type: "get",
            url: "mock.json",
            async: false,
            data: {'link_name': name, 'link_mobile': mobile},
            success: function (data) {
                if(data.msg == "提交成功"){
                    alertTest(data.msg);
                    $(".screen4 .flow_card").hide();
                    $(".screen4 .bg").hide();
                }else{
                    alertTest("提交失败,请从新提交");
                }

            },
            error: function () {

            }
        });
    }
});
// $(".screen4 .button2").click(function () {
//     $(".share").show();
// });
$(".share").click(function () {
    $(".share").hide();
});
var share;
$(".screen4 .button1").click(function () {
    $(".screen4").hide();
    $(".screen5").show();
    $(".screen5 .button1").hide();
    $(".screen5 .button").show();
    share = "share";
});
$(".screen5 .content .num").text(joinnum);
if(method == "share"){
    $(".start").hide();
    $(".screen5").show();
    $(".screen5 .button1").html('<a href="javascript:redirect()">我也参与</a>');
}
$(".screen5 .text1").click(function () {
    if(share == "share"){
        $(".share").show();
    }else{
        $(".screen5").hide();
        $(".start").show();
    }

});

function redirect() {
    $(".screen5").hide();
    $(".start").show();
}