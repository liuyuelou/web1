$(function() {
        function getTimer(setTime) {
            // 当前时间
            var now = +new Date();
            var setime = +new Date(setTime);
            // 得到剩余秒数
            var disTime = (setime - now) / 1000;
            // 得到剩余天数
            var dayTime = parseInt(disTime / 60 / 60 / 24);
            // 格式化
            dayTime = dayTime < 10 ? '0' + dayTime : dayTime;
            // 得到剩余小时
            var dayHours = parseInt(disTime / 60 / 60 % 24);
            dayHours = dayHours < 10 ? '0' + dayHours : dayHours;
            // 剩余分
            var dayMinutes = parseInt(disTime / 60 % 60);
            dayMinutes = dayMinutes < 10 ? '0' + dayMinutes : dayMinutes;
            // 剩余秒
            var daysec = parseInt(disTime % 60);
            daysec = daysec < 10 ? '0' + daysec : daysec;
            // 创建对象存进去
            var relTime = {};
            // 设置对象的键和值
            relTime['dayTime'] = dayTime;
            relTime['dayHours'] = dayHours;
            relTime['dayMinutes'] = dayMinutes;
            relTime['daysec'] = daysec;
            return relTime;
        }
        setInterval(function() {
            var objTime = getTimer('2021-04-30 13:46:56');
            $(".days").html(objTime.dayTime);
            $(".hours").html(objTime.dayHours);
            $(".minutes").html(objTime.dayMinutes);
            $(".seconds").html(objTime.daysec);

        }, 1000);
        var num = 1
        var oLeft = -num * 600 + "px"
        var length = $(".aa-jiaodian").find("li").length
        $("#aa-next").click(function() {
                $(".cc-xlb").animate({
                    left: oLeft
                }, 500, function() {

                    $(".cc-xlb").find("li").slice(0, num).appendTo($(".cc-xlb"))
                    $(".cc-xlb").css("left", 0)
                    $(".aa-jiaodian").find("div").slice(0, num).appendTo($(".aa-jiaodian"))
                })
            })
            //点击左边
        $("#aa-prev").click(function() {
                var oLastLi = $(".cc-xlb").find("li").slice(length - num)
                oLastLi.prependTo($(".cc-xlb"))
                $(".aa-jiaodian").find("div").slice(2, num + 2).prependTo($(".aa-jiaodian"))
                $(".cc-xlb").css("left", oLeft)
                $(".cc-xlb").animate({
                    left: 0
                })
            })
            // 自动轮播
        var timer = setInterval(function() {
            $("#aa-next").click()
        }, 4000)
        $(".aa-jiaodian div").hover(function() {
            $(this).addClass("aa-on")
            $(this).siblings().removeClass("aa-on")
            var i = $(this).index();
            $(".cc-xlb").animate({
                left: -i * 600 + "px"
            }, 400)
            clearInterval(timer)
        })
        $(".aa-center").hover(function() {
            clearInterval(timer)
            $("#aa-next,#aa-prev").css("display", "block")
        })
        $(".aa-center").mouseleave(function() {
            timer = setInterval(function() {
                $("#aa-next").click()
            }, 4000)
            $("#aa-next,#aa-prev").css("display", "none")
        })
    })
    // 大轮播
$(function() {
    var num = 1
    var oLeft = -num * 100 + "%"
    var timer = setInterval(function() {
        $(".tempWrap1").animate({
            left: oLeft
        }, 500, function() {
            $(".tempWrap1").find("li").slice(0, num).appendTo($(".tempWrap1"))
            $(".tempWrap1").css("left", 0)
            $("#cc").find("li").slice(0, num).appendTo($("#cc"))
        })
    }, 2000)
    $(".tempWrap1").hover(function() {
        clearInterval(timer)
    })
    $(".hd").find("li").hover(function() {
        clearInterval(timer)
        $(this).addClass("on")
        $(this).siblings().removeClass("on")
        var i = $(this).index();
        $(".tempWrap1").animate({
            left: -i * 100 + "%"
        }, 400)
    })
    $(".tempWrap1").mouseleave(function() {
        timer = setInterval(function() {
            $(".tempWrap1").animate({
                left: oLeft
            }, 500, function() {
                $(".tempWrap1").find("li").slice(0, num).appendTo($(".tempWrap1"))
                $("#cc").find("li").slice(0, num).appendTo($("#cc"))
                $(".tempWrap1").css("left", 0)
            })
        }, 4000)
    })
})
$(function() {
    var long = 180 / 24; //首先求出进度条的比例产生关系
    // console.log(long);
    $(".eng>a").mouseenter(function() { //首先给所以。eng下面的a标签绑定鼠标进入事件
        var index = $(this).index(); //获取他们对应的索引
        var num = -$(".eng_box ul li").eq(index)[0].offsetTop; //我首先把juqery对像转了Dom对象使用top偏移量
        // console.log(num);
        if (index == 21) { //如果到达了最后一个
            num = -$(".eng_box ul li").eq(index)[0].offsetTop + 80; //主要是考虑的让最后一个不会跑上去
        }
        $(".eng_box_left>ul").css("top", num + "px"); //设置ul的top值是负数让他动起来
        $("#right_btnhh").css("top", long * index + "px"); //开始动了
        console.log(long * index); //打印一下看看是否对
    })

    var nb = false; //创建一个变量，控制拖拉一会
    var lang = 19.25; //创建一个变量
    $("#right_btnhh").mousedown(function(e) {

        lang = 13.25; //13.25是用户ul的高度除以右边竖线的高度求出的
        e.preventDefault(); //阻止图片的默认拖拉效果
        console.log(-$(this)[0].offsetTop * lang);
        nb = true;
    });
    $("body").mouseup(function() {
        nb = false;
    });
    $(".eng_box_right").mousemove(function(e) { //移动
        if (nb) {
            if (e.pageY < 287 && e.pageY > 116) {
                $("#right_btnhh").css("top", Math.floor(e.pageY - 118));
                console.log(Math.floor(e.pageY - 118));
                $(".eng_box_left>ul").css("top", Math.floor(-Math.floor(e.pageY - 118) * lang) + "px");
                console.log(e.pageY);
            }
        }
    });
    $(".weizhi")[0].onmousewheel = function(e) {
        if (e.wheelDelta > 0) { //向上回去
            if ($("#right_btnhh")[0].offsetTop >= -1) {
                var text = $("#right_btnhh")[0].offsetTop -= 8;
                if (text < 0) {
                    text = 0;
                }
                $("#right_btnhh").css("top", text);
                console.log(Math.floor(e.pageY - 118));
                $(".eng_box_left>ul").css("top", Math.floor(-$("#right_btnhh")[0].offsetTop * lang) + "px");
                console.log(e.pageY);
                return false;
            }
        } else { //向下
            e.stopPropagation();

            if ($("#right_btnhh")[0].offsetTop <= ($(".eng_box_right").height() - 26)) {
                var text = $("#right_btnhh")[0].offsetTop += 8;
                $("#right_btnhh").css("top", text);
                console.log(Math.floor(e.pageY - 118));
                $(".eng_box_left>ul").css("top", Math.floor(-$("#right_btnhh")[0].offsetTop * lang) + "px");
                console.log(e.pageY);
            }
            return false
        }
    }
})