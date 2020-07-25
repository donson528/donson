// 初始化变量
//分数
var score = 0
//初始化游戏状态

var gamePausedState = false;


var gameDeathState = false;



// 飞机型号与子弹 保存基本属性 （对象）
//imgSrc飞机代表的图片
//wh飞机大小
//飞机速度
//飞机血量

// 小飞机
var enemyPlaneS = {
    imgSrc: 'enemy-plane-s.png',
    w: 34,
    h: 24,
    speed: 5000,
    blood: 1
}
// 中飞机。
var enemyPlaneM = {
    imgSrc: 'enemy-plane-m.png',
    w: 46,
    h: 60,
    speed: 7000,
    blood: 3
}
// 打飞机
var enemyPlaneL = {
    imgSrc: 'enemy-plane-l.png',
    w: 110,
    h: 164,
    speed: 10000,
    blood: 5
}
// 子弹血量为0撞到就消失
var bullet = {
    imgSrc: 'our-bullet.png',
    w: 6,
    h: 14,
    speed: - 5
}

// 我方飞机
var ourPlane = {
    node: $(".plan"),
    w: 66,
    h: 80,
    x: 360 / 2,
    y: 640 - 80 / 2 - 60,
    // 保存所有子弹
    bullets: []
}


// 保存所有敌方飞机
var enemies = [];


// 飞机构造器
function plan(params) {
    this.imgSrc = params.imgSrc;
    this.w = params.w;
    this.h = params.h;
    this.x = params.x;
    this.y = params.y;
    this.blood = params.blood;
    this.speed = params.speed
}
// 生成飞机
plan.prototype.create = function () {
    //通过图片生成飞机
    this.node = document.createElement("img")
    $(this.node).prop("src", './images/' + this.imgSrc)
    $(this.node).css({
        left: this.x - this.w / 2 + "px",
        top: this.y - this.h / 2 + "px"
    })
    $("#enemys").append(this.node);

}
//飞机移动
plan.prototype.move = function () {
    this.y += this.speed;
    var topOutRange = this.y < -this.h / 2;
    var bottomOutRange = this.y > 640 + this.h / 2;
    // 判断是否超出游戏场景
    if (topOutRange || bottomOutRange) {
        //超出游戏场景 标记超出 相当于死亡
        this.death = true
    }
    this.node.style.top = this.y - this.h / 2 + "px"
}
var pLAN = new plan(enemyPlaneS)
pLAN.create()
pLAN.move()

//背景移动,看上去像飞机在向上前进
function bgmove() {
    $(".map").animate({
        backgroundPositionY: "568px"
    }, 4000, "linear", function () {
        $(".map").css({
            backgroundPositionY: "0"
        })
        bgmove()
    })

}
$(".start").click(function () {
    $(this).hide(100)
    $(".plan").show(100)
    $(".map").css({
        backgroundImage: "url(./images/background-game.png)"
    })
    bgmove()
})