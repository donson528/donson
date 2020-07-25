// ajax的封装
class Http {
    get(url) {

        return new Promise((success, rejected) => {
            let xhr = new XMLHttpRequest()
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    //凝固结果
                    // responseText 传输过来的数据,将这些数据传下去进行重组
                    success(this.responseText);

                }
            }
            xhr.open("GET", url, true);
            xhr.send();
        })
    }
}
// 获取昨天的时间戳 由于data格式需要补0 所以这里补0
var data = new Date()
var sjc = data.getTime() - 86400000
data.setTime(sjc)
console.log(data);
let day = data.getDate() + "" //获取当前时间对象是几号
day = day.padStart(2, '0');
let Month = data.getMonth() + 1 + ""
Month = Month.padStart(2, '0');
let year = data.getFullYear()   //获取当前时间对象的年份
var str = (year + "-" + Month + "-" + day)

// 国内粗略数据
let CN = new Http()
CN.get(`http://api.tianapi.com/txapi/ncov/index?key=d7dc67bf74b0ac9ab78205b3c29581c8`).then(a1 => {
    a1 = JSON.parse(a1)
    $(".lj div").eq(1).html(a1.newslist[0].desc.confirmedCount)
    $(".lj div span").eq(0).html("+" + a1.newslist[0].desc.confirmedIncr)

    $(".zy div").eq(1).html(a1.newslist[0].desc.curedCount)
    $(".zy div span").eq(0).html("+" + a1.newslist[0].desc.curedIncr)

    $(".dea div").eq(1).html(a1.newslist[0].desc.deadCount)
    $(".dea div span").eq(0).html("+" + a1.newslist[0].desc.deadIncr)

    $(".xy div").eq(1).html(a1.newslist[0].desc.currentConfirmedCount)
    $(".xy div span").eq(0).html("+" + a1.newslist[0].desc.currentConfirmedIncr)

    $(".jw div").eq(1).html(a1.newslist[0].desc.suspectedCount)
    $(".jw div span").html("+" + a1.newslist[0].desc.suspectedIncr)

    $(".ys div").eq(1).html(a1.newslist[0].desc.seriousCount)
    $(".ys div span").html("+" + a1.newslist[0].desc.seriousIncr)
})

// 国内详细疫情
let CNprovince = new Http()
CNprovince.get(`http://api.tianapi.com/txapi/ncovcity/index?key=d7dc67bf74b0ac9ab78205b3c29581c8`).then(a1 => {
    a1 = JSON.parse(a1)

    // 防止多次dom操作
    let fragment = document.createDocumentFragment();
    a1.newslist.forEach((element, index) => {
        // 判断名字是否大于八个字.如果是则截取为八个
        if (element.provinceName.length > 8) {
            element.provinceName = element.provinceName.substr(0, 8)
        }

        var li = document.createElement("li")
        li.innerHTML = `
        <div>${element.provinceName}</div>
        <div>${element.currentConfirmedCount}</div>
        <div>${element.confirmedCount}</div>
        <div>${element.deadCount}</div>
        <div>${element.curedCount}</div>
            `
        $(li).on("click", function () {

            $(this).toggleClass("cueen").siblings()

            $(this).next().slideToggle()
        })
        var ul = document.createElement("ul")
        if (element.cities.length > 0) {
            element.cities.forEach((element, index) => {
                if (element.cityName.length > 8) {
                    element.cityName = element.cityName.substr(0, 8)
                }
                var lis = document.createElement("li")
                lis.innerHTML = `
                    <div>${element.cityName}</div>
                    <div>${element.currentConfirmedCount}</div>
                    <div>${element.confirmedCount}</div>
                    <div>${element.deadCount}</div>
                    <div>${element.curedCount}</div>
                        `
                ul.appendChild(lis)
            });
        } else {
            var lis = document.createElement("li")
            lis.innerHTML = `
                    <div>${element.provinceName}</div>
                    <div>${element.currentConfirmedCount}</div>
                    <div>${element.confirmedCount}</div>
                    <div>${element.deadCount}</div>
                    <div>${element.curedCount}</div>
                        `
            ul.appendChild(lis)
        }
        // console.log();
        fragment.append(li)
        fragment.append(ul)
    });

    $(".star").append(fragment)
    // 让第五个li后隐藏,点击后才显示
    $(".star>li").each(function (index, ele) {
        if (index > 4) {
            $(ele).hide()
        }
    })

})

// 海外总疫情
let foreign = new Http()
foreign.get(`http://api.tianapi.com/txapi/ncovabroad/index?key=d7dc67bf74b0ac9ab78205b3c29581c8`).then(a1 => {
    a1 = JSON.parse(a1)
    //总和
    var ljnum = 0
    var xcnum = 0
    var zynum = 0
    var deanum = 0

    a1.newslist.forEach(element => {
        ljnum += element.currentConfirmedCount
        xcnum += element.confirmedCount
        zynum += element.curedCount
        deanum += element.deadCount
    });

    // 按照总人数排序对象
    var compare = function (obj1, obj2) {
        var val1 = obj1.confirmedCount;
        var val2 = obj2.confirmedCount;
        if (val1 < val2) {
            return 1;
        } else if (val1 > val2) {
            return -1;
        } else {
            return 0;
        }
    }
    a1.newslistg = a1.newslist.sort(compare)

    // 昨天的数据
    let yesdat = new Http()
    yesdat.get(`http://api.tianapi.com/txapi/ncovabroad/index?key=d7dc67bf74b0ac9ab78205b3c29581c8&date=${str}`).then(a2 => {
        a2 = JSON.parse(a2)
        // 按照总人数排序对象
        var compare = function (obj1, obj2) {
            var val1 = obj1.confirmedCount;
            var val2 = obj2.confirmedCount;
            if (val1 < val2) {
                return 1;
            } else if (val1 > val2) {
                return -1;
            } else {
                return 0;
            }
        }
        a2.newslistg = a2.newslist.sort(compare)

        // 昨天的总数据
        var ljnum1 = 0
        var xcnum1 = 0
        var zynum1 = 0
        var deanum1 = 0
        a2.newslist.forEach(element => {

            ljnum1 += element.currentConfirmedCount
            xcnum1 += element.confirmedCount
            zynum1 += element.curedCount
            deanum1 += element.deadCount

        });
        $(".foreign div div span").eq(0).html("+" + (xcnum - xcnum1))
        $(".foreign div div span").eq(1).html("+" + (ljnum - ljnum1))
        $(".foreign div div span").eq(2).html("+" + (zynum - zynum1))
        $(".foreign div div span").eq(3).html("+" + (deanum - deanum1))

        $(".top").each(function (index, ele) {
            // console.log(a2.newslist);
            $(ele).find(".name").html(a1.newslist[index].provinceName + "确诊")
            $(ele).find(".number").html(a1.newslist[index].confirmedCount)

            $(ele).find(".yeday").html("+" + (a1.newslist[index].confirmedCount - a2.newslist[index].confirmedCount))
        })

    })



    $(".guowai span").eq(0).html(a1.newslist.length)
    $(".guowai span").eq(1).html(xcnum)
    $(".guowai span").eq(2).html(ljnum)
    $(".guowai span").eq(3).html(deanum)
    $(".guowai span").eq(4).html(zynum)

    $(".zong").eq(0).html(xcnum)
    $(".zong").eq(1).html(ljnum)
    $(".zong").eq(2).html(zynum)
    $(".zong").eq(3).html(deanum)




    //排序
    function tun(data) {
        let obj = {}
        for (let i = 0; i < data.length; i++) {
            for (let key in data[i]) {
                obj[data[i].continents] = []
            }
        }
        for (let key in obj) {
            obj[key] = data.filter(function (ele, index, arr) {
                return key == ele.continents
            })
        }
        return obj
    }
    var state = tun(a1.newslist)


    for (let key in state) {
        state[key].sort((a, b) => {
            return b.confirmedCount - a.confirmedCount;
        })
    }

    // 创建数据
    let fragment = document.createDocumentFragment();
    for (let key in state) {
        var li = document.createElement("li")
        var ul = document.createElement("ul")

        var num1 = 0
        var num2 = 0
        var num3 = 0
        var num4 = 0

        $(li).on("click", function () {

            $(this).toggleClass("cueen").siblings()

            $(this).next().slideToggle()
        })
        // console.log(state[key]);
        state[key].forEach(element => {
            num1 += element.currentConfirmedCount
            num2 += element.confirmedCount
            num3 += element.deadCount
            num4 += element.curedCount
            var liss = document.createElement("li")
            liss.innerHTML = `
                    <div>${element.provinceName}</div>
                    <div>${element.currentConfirmedCount}</div>
                    <div>${element.confirmedCount}</div>
                    <div>${element.deadCount}</div>
                    <div>${element.curedCount}</div>
                        `
            ul.appendChild(liss)
        });
        // console.log(num1, num2, num3, num4);
        li.innerHTML = `
               <div>${key}</div>
               <div>${num1}</div>
               <div>${num2}</div>
               <div>${num3}</div>
               <div>${num4}</div>
          `
        fragment.append(li)
        fragment.append(ul)
    }
    $(".end").append(fragment)


})

// 头部点击
$("header nav div").on("click", function () {
    if ($(this).index() == 0) {
        $(this).addClass("active").siblings().removeClass("active")
        $(".cn").show()
        $(".country").show()
        $(".foreign").hide()
        $(".countrys").hide()
    } else {
        $(this).addClass("active").siblings().removeClass("active")
        $(".cn").hide()
        $(".country").hide()
        $(".foreign").show()
        $(".countrys").show()
    }
})
$(".down span").on("click", function () {
    $(".star>li").each(function (index, ele) {

        $(ele).slideDown()

    })
    $(this).hide()
})