
$(function () {
    $(".content").mCustomScrollbar();
    $(".homepage").mCustomScrollbar();
    $(".dianpu").mCustomScrollbar();
    $(".pin").mCustomScrollbar();
    $(".user").mCustomScrollbar();

    $(".merchant li").click(function () {
        $(".homepage").hide()
        $(".food").show()
        $(".nav").hide()
        $(".shopping").show()
        $(".pinglun").hide()
        $(".body").show()
      $(".homename li:eq(0)").click()

    })

    $(".homename li").click(function () {
        $(this).addClass("cueenr").siblings("li").removeClass("cueenr");
        var index = $(this).index();
       
        // 显示对应的.item
        if (index == 0) {

            $(".body").show()
            $(".dianpu").hide()
            $(".pinglun").hide()
        }
        if (index == 1) {
            $(".body").hide()
            $(".dianpu").show()
            $(".pinglun").hide()
        }
        if (index == 2) {
            $(".body").hide()
            $(".dianpu").hide()
            $(".pinglun").show()
        }
    })
    //    $(".rexiao").click(function(){

    //     console.log($(".rexiao").
    //    })
    //     $(".content").scrollTop()
    $(".catalogue li").click(function () {
        $(this).addClass("cueen").siblings("li").removeClass("cueen");
        var index = $(this).index()
        var tops = 0
        for (var i = 0; i < index; i++) {
            tops += $(".bigname>li").eq(i).outerHeight()
            

        }
        
      
       
        // console.log( $(".bigname>li").eq(index).outerHeight())
   
        $(".mCSB_container").css({
            "top": -tops
        })
        // $(".mCSB_container").scrollTop(tops)

    })
    var num=0
    $(".jia").click(function () {
        
        num+=$(this).parent().siblings(".redleft").find(".number").html()-0
        if (num>=12) {
            $(".zongright").html("去结算")
            $(".zongright").css({
                "color":"red"
            })
            $(".zongright").click(function(){
                $(".food").hide()
                $(".indent").show()
            })
        }else if (num<12 && num>0) {
            var news=12-num
            $(".zongright").html("还差"+news+"起送")
        }
        $(".zongnumber").html(num)

    })
    
    $(".nav li").click(function(){
        var index = $(this).index()
        
        if (index==0) {
            $(".homepage").show()
            $(".indent").hide()
            $(".user").hide()
        }
        if (index==1) {
            $(".homepage").hide()
            $(".indent").show()
            $(".user").hide()
        }
        if (index==2) {
            $(".homepage").hide()
            $(".indent").hide()
            $(".user").show()
        }
    })
    $(".go").click(function(){
        $(".homepage").show()
        $(".indent").hide()
        $(".nav").show(1000)
        
    })
    $(".bac").click(function(){
        $(".food").hide()
        $(".homepage").show()
        $(".nav").show()
    })
    $(".allright").click(function(){
        $(".user").hide()
        $(".transaction").show()
    })
    $(".backleft").click(function(){
        $(".user").show()
        $(".transaction").hide()
    })
    $(".notall li").click(function(){
        $(".user").hide()
        $(".transaction").show()
    })
    $(".ZHUce").click(function(){
        $(".denglu").hide()
        $(".zhuce").show()
        suiji()
    })
    var newname="root"
    var newpass="root"
    var ids="666666"
    $(".qued").click(function(){
       
        if ($(".newname").val().length!="" &&$(".newpass").val().length!="") {
            newname=$(".newname").val()
            newpass=$(".newpass").val()
            $(".denglu").show()
            $(".zhuce").hide()
        }else{
            alert("请输入正确的账号密码")
        }
       
        console.log(newname,newpass)
    })
    $(".deng").click(function(){
        var oldname=$(".oldname").val()
        var oldpass=$(".oldpass").val()
        if (oldname==newname && newpass==oldpass) {
            alert("登录成功")
            $(".denglu").hide()
            $(".user").show()
            $(".logo").html("切换账号")
            $(".nihao").html("你好,"+newname)
            $(".id").html("ID"+ids)
        }else{
            alert("用户不存在或者密码错误")
        }
    })
    $(".logo").click(function(){
        $(".user").hide()
        $(".denglu").show()
    })
    
    function suiji(){
        ids=""
        for (var i = 0; i < 6; i++) {
           
          ids+=Math.floor(Math.random()*10)
        }
    }
    
});

