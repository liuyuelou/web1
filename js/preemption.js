$(function(){
    // 搜索框自动清除,each遍历文本框
    $(".sf").each(function() {
        //保存当前文本框的值
        var vdefault = this.value;
        //获得焦点时，如果值为默认值，则设置为空
        $(this).focus(function() {
            if (this.value == vdefault) {
                this.value = "";
            }
        })
        //失去焦点时，如果值为空，则设置为默认值
        $(this).blur(function() {
            if (this.value == "") {
                this.value = vdefault;
            }
        })
    })
    //购物车
    $('.head-cart').hover(function(){
        $(this).css('border-bottom','2px solid #fff')
        $('.nogoods').css('display','block')
    },function(){
        $(this).css('border-bottom','1px solid #ccc')
        $('.nogoods').css('display','none')
    })
    $('.nogoods').hover(function(){
        $('.head-cart').css('border-bottom','2px solid #fff')
        $('.nogoods').css('display','block')
    },function(){
        $('.head-cart').css('border-bottom','1px solid #ccc')
        $('.nogoods').css('display','none')
    })


    var long = 190 / 24; //首先求出进度条的比例产生关系
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
        // console.log(long * index); //打印一下看看是否对
    })

    var nb = false; //创建一个变量，控制拖拉一会
    var lang = 13.25; //创建一个变量
    $("#right_btnhh").mousedown(function(e) {

        lang = 13.25; //13.25是用户ul的高度除以右边竖线的高度求出的
        e.preventDefault(); //阻止图片的默认拖拉效果
        nb = true;
    });
    $("body").mouseup(function() {
        nb = false;
    });
    $(".eng_box_right").mousemove(function(e) { //移动
        if (nb) {
            if (e.pageY < 287 && e.pageY > 116) {
                $("#right_btnhh").css("top", Math.floor(e.pageY - 118));
                $(".eng_box_left>ul").css("top", Math.floor(-Math.floor(e.pageY - 118) * lang) + "px");
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
                $(".eng_box_left>ul").css("top", Math.floor(-$("#right_btnhh")[0].offsetTop * lang) + "px");
                return false;
            }
        } else { //向下
            if ($("#right_btnhh")[0].offsetTop <= ($(".eng_box_right").height() - 26)) {
                var text = $("#right_btnhh")[0].offsetTop += 8;
                $("#right_btnhh").css("top", text);
                $(".eng_box_left>ul").css("top", Math.floor(-$("#right_btnhh")[0].offsetTop * lang) + "px");
                return false;
            }
        }
    }
    $('.top_love>p').hover(function(){
        $(this).css({
            'background':'#fff',
            'border-bottom':'2px solid #fff'
        })
        $('.weizhi').css('display','block')
    },function(){
        $('.weizhi').css('display','none')
        $(this).css({
            'background':'#EEEEEE',
            'border-bottom':'0px'
        })
    })
    $('.weizhi').hover(function(){
        $(this).css('display','block')
        $('.top_love>p').css({
            'background':'#fff',
            'border-bottom':'2px solid #fff'
        })
    },function(){
        $(this).css('display','none')
        $('.top_love>p').css({
            'background':'#EEEEEE',
            'border-bottom':'0px'
        })
    })

})
function getTimer(setTime) {
    var now = +new Date();
    var setime = +new Date(setTime);
    var disTime = (setime - now) / 1000;
    var dayTime = parseInt(disTime / 60 / 60 / 24);
    dayTime = dayTime < 10 ? '0' + dayTime : dayTime;
    var dayHours = parseInt(disTime / 60 / 60 % 24);
    dayHours = dayHours < 10 ? '0' + dayHours : dayHours;
    var dayMinutes = parseInt(disTime / 60 % 60);
    dayMinutes = dayMinutes < 10 ? '0' + dayMinutes : dayMinutes;
    var daysec = parseInt(disTime % 60);
    daysec = daysec < 10 ? '0' + daysec : daysec;
    var relTime = {};
    relTime['dayTime'] = dayTime;
    relTime['dayHours'] = dayHours;
    relTime['dayMinutes'] = dayMinutes;
    relTime['daysec'] = daysec;
    return relTime;
}
console.log(getTimer('2020-07-20 18:00:00'));
setInterval(function() {
    var objTime = getTimer('2021-9-20 18:00:00');
    document.getElementById('day').innerHTML = objTime.dayTime + ':';
    document.getElementById('hour').innerHTML = objTime.dayHours ;
    document.getElementById('minutes').innerHTML = objTime.dayMinutes + ':';
    document.getElementById('seconds').innerHTML = objTime.daysec + ':';

}, 1000);