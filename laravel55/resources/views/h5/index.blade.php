<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>新家不等待</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <!-- Link Swiper's CSS -->
    <link rel="stylesheet" href="css/swiper.min.css">
    <link rel="stylesheet" href="css/index.css">
    <link href="css/landscape/landscape.css" rel="stylesheet">
    <link href="css/fakeLoader.css" rel="stylesheet">
    <script src="js/flexible.js"></script>
    <script src="js/preload.js"></script>
    <script src="js/jquery.min.js"></script>

</head>
<body>
<div class="fakeloader" id="loader"
     style="position: fixed; width: 100%; height: 100%; top: 0px; left: 0px; background-color: #040726; z-index: 999;">
    <div class="spinner2">
        <div class="spinner-container container1">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
        </div>
        <div class="spinner-container container2">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
        </div>
        <div class="spinner-container container3">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
        </div>
    </div>
</div>
<!--横竖屏-->
<div class="landscape">
    <table>
        <tbody>
        <tr>
            <td><img src="img/iphone.png" />
                <p>为了更好的体验，请使用竖屏预览！</p>
            </td>
        </tr>
        </tbody>
    </table>
</div>
<!--music-->
<audio id="Jaudio" class="media-audio" src="music/music.mp3" preload loop="loop"></audio >

<!--背景音乐-->
<!--<div class="music"><img src="img/music.png" class="music_active"/></div>-->
<!-- Swiper -->
<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide page1">
            <div class="text1"></div>
        </div>
        <div class="swiper-slide page2">
            <div class="text1"></div>
        </div>
        <div class="swiper-slide page3">
            <div class="text1"></div>
        </div>
        <div class="swiper-slide page4">
            <div class="text1"></div>
        </div>
        <div class="swiper-slide page5">
            <div class="text1"></div>
        </div>
        <div class="swiper-slide page6">
            <div class="text1"></div>
            <div class="tab">
                <div class="out">
                    <div class="name"><input type="text" name="name" id = "name" class="com name" style="border:none;background: none"></div>
                    <div class="phone"><input type="text" name="phone" id="phone" class="com phone" style="border:none;background: none"></div>
                    <div class="area"><input type="text" name="area" id="area" class="com area" style="border:none;background: none"></div>
                    <div class="village"><input type="text" name="village"  id="village" class="com village" style="border:none;background: none"></div>
                </div>
            </div>
            <div class="button"></div>
        </div>
    </div>
</div>
<script>
</script>
<!-- Swiper JS -->
<script src="js/swiper.min.js"></script>
<script src="js/js.js"></script>
<!-- Initialize Swiper -->
<script>

    var swiper = new Swiper('.swiper-container', {
        onSlideChangeEnd: function (swiper) {
            switch(swiper.activeIndex){//切换结束时，告诉我现在是第几个slide
                case 0:
                    $(".page1 .text1").fadeIn("slow");
                    break;
                case 1:
                    $(".page2 .text1").fadeIn("slow");
                    break;
                case 2:
                    $(".page3 .text1").fadeIn("slow");
                    break;
                case 3:
                    $(".page4 .text1").fadeIn("slow");
                    break;
                case 4:
                    $(".page5 .text1").fadeIn("slow");
                    break;
                case 5:
                    $(".page6 .text1").fadeIn("slow");
                    break;
            }
        }
    });
    $(".page1 .text1").fadeIn("slow");

    $(".page6 .button").click(function () {
        var name, phone, village,area;
        name = $("#name").val();
        phone = $("#phone").val();
        village = $("#village").val();
        area = $("#area").val();
        //表单提交
        if (name === '') {
            alertTest("姓名不能为空，请重填");
            return false;
        } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
            alertTest("手机号码有误，请重填");
            return false;
        } else {
            var xsr = "{{ csrf_token() }}";
            $.ajax({
                type: "post",
                url: "/submit",
                async: false,
                data: {'name': name, 'phone': phone, 'village': village,'area':area,_token:xsr},
                dataType:'json',
                success: function (data) {
                    if(data.msg == '提交成功'){
                        alertTest(data.msg);
                    }else{
                        alertTest("提交失败,请从新提交");
                    }

                },
                error: function () {

                }
            });
        }
    });

</script>
<script>
    (function(){
        var supportOrientation = (typeof window.orientation === 'number' &&
            typeof window.onorientationchange === 'object');
        var init = function(){
            var htmlNode = document.body.parentNode,
                orientation;
            var updateOrientation = function(){
                if(supportOrientation){
                    orientation = window.orientation;
                    switch(orientation){
                        case 90:
                        case -90:
                            orientation = 'landscape';
                            break;
                        default:
                            orientation = 'portrait';
                            break;
                    }
                }else{
                    orientation = (window.innerWidth > window.innerHeight) ? 'landscape' : 'portrait';
                }
//                htmlNode.setAttribute('class',orientation);\
                if(orientation == 'landscape'){
                    $(".landscape").show();
                }else{
                    $(".landscape").hide();
                }
            };
            if(supportOrientation){
                window.addEventListener('orientationchange',updateOrientation,false);
            }else{
//监听resize事件
                window.addEventListener('resize',updateOrientation,false);
            }
            updateOrientation();
        };
        window.addEventListener('DOMContentLoaded',init,false);
    })();
</script>
</body>
</html>