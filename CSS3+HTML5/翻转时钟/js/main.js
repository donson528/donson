// 获取DOM元素
const $secondsRight = $(".minute-right>li");
const $secondsLeft = $('.minute-left>li');
const $minutesRight = $('.secon-right>li');
const $minutesLeft   = $('.secon-left>li');
const $hoursRight = $('.hour-right>li');
const $hoursLeft = $('.hour-left>li');

// 设置自定义属性, 通过indexNum的值来控制显示哪个卡片
$secondsLeft.data('indexNum', 0);
$secondsRight.data('indexNum', 0);
$minutesLeft.data('indexNum', 0);
$minutesRight.data('indexNum', 0);
$hoursLeft.data('indexNum', 0);
$hoursRight.data('indexNum', 0);
$hoursRight.data('spacialIndex', 0);

// 设置下一个卡片, 一级一级带动 (例如: 秒钟的右边到9了, 在转一下会带动秒钟的左边进一)
// 结构类似链表, 可以仅通过 秒钟 来带动整个时钟
$secondsRight.data('next', $secondsLeft);
$secondsLeft.data('next', $minutesRight);
$minutesRight.data('next', $minutesLeft);
$minutesLeft.data('next', $hoursRight);
$hoursRight.data('next', $hoursLeft);

// 立即执行函数 获取时间将时间补0后设置到自定义属性
(() => {
    // 获取时间
    let curDate = new Date(),
        hours = curDate.getHours(),
        minutes = curDate.getMinutes(),
        seconds = curDate.getSeconds();


        // 时间补0后返回后设置为自定义属性
    let secondsTime = splitTime(seconds),
        minutesTime = splitTime(minutes),
        hoursTime = splitTime(hours);

    $secondsLeft.data('indexNum', secondsTime.left);
    $secondsRight.data('indexNum', secondsTime.right);
    $minutesLeft.data('indexNum', minutesTime.left);
    $minutesRight.data('indexNum', minutesTime.right);
    $hoursLeft.data('indexNum', hoursTime.left);
    $hoursRight.data('indexNum', hoursTime.right);

    // 为小时自定义一个属性来判断他是否满24小时
    $hoursRight.data('spacialIndex', hoursTime.left * 10 + hoursTime.right);
    initializeTime($secondsRight);
})()

function splitTime(time) {
    time = time.toString();
    // 补零， 如果是诸如 09，02这类时间，js获取到的只有 9，2. 会去掉零，要手动加上
    if (time.length === 1) {
        // 头部（左侧）补全原字符串 
        time = time.padStart(2, '0');
    }
    // 补0后为两位数 左边为十位，右边为个位，截取后转为数字返回他
    let left = Number(time[0]),
        right = Number(time[1]);
    return {
        left,
        right
    };
}

function initializeTime($obj) {
    // 获取参数的自定义属性--时间  获取他下个数字的自定义属性--时间
    let index = $obj.data('indexNum'),
        next = $obj.data('next');

        // 0.5s后给自身执行显示动画,但是 显示后面的数字
    $obj.eq(index).addClass('active');
    

    // 判断自定义属性是否为0 如果是则将下标设置为9
    if(index ===0) index = $obj.length;

    // 如果5要显示,我们需要将4给隐藏掉
    // /所以上一个下标执行隐藏动画 从上往下到一半一共0.5s,然后上面那个延迟动画开始执行下一半动画,也是0.5s,一共1s翻一次牌
    $obj.eq(index - 1).addClass('before');
     
    // 如果下一个时钟存在则再次执行自己
    if (next) initializeTime(next);
}

function play($obj) {
     // 获取参数的自定义属性--时间  获取他下个数字的自定义属性--时间
    let index = $obj.data('indexNum');
    let next = $obj.data('next');

    // 移除动画属性  给当前时钟加动画

    $obj.removeClass('before active');
    $obj.eq(index).addClass('before');

    // 秒数增加
    ++index;

    // 判断参数是不是小时的个位数
    if ($obj === $hoursRight) {
        // 获取小时的自定义属性 以为小时的index还没有设置.所以判断是以index而不是index++
        
        let spacialIndex = $obj.data('spacialIndex');

        // 先判断小时的增加会不会大于等于23,.如果是则归0
        spacialIndex++;
        if (spacialIndex >= 23) {
            index = 0;
            spacialIndex = 0;

            // 再调用函数
            play(next);
            $obj.data('spacialIndex', spacialIndex);
        }
    }

    if (index >= $obj.length) {
        // 如果时间大于总下标则归零
        index = 0;
        // 如果下一个时间存在则继续执行函数
        if(next) play(next);
    }
    // 让自身执行动画。让自身自定义属性设置为当前时间
    $obj.eq(index).addClass('active');
    $obj.data('indexNum', index);
    
}

let timer = setInterval(() => {
    play($secondsRight);
}, 1000);


