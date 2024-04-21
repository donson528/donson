<template>
  <div class="main">
    <div class="two">
      <!-- 二级路由 -->
      <keep-alive include="Caidan,Shouye">
        <router-view></router-view>
      </keep-alive>
    </div>

    <van-tabbar :route="true" inactive-color="black" active-color="#0833bc">
      <van-tabbar-item v-for="(value,index) in dataobj" :key="index"  :to="{name:value.name}">
        <div>
          <div class="iconfont" v-html="value.icon" :class="{active:value.isActive}"></div>
          <div class="text">{{value.title}}</div>
        </div>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import "../assets/less/Main.less";
export default {
  name: "Main",
  data() {
    return {
      dataobj: [
        {
          title: "首页",
          name: "Shouye",
          urls: ["Shouye"],
          icon: "&#xe50c;",
        },
        {
          title: "菜单",
      
          name: "Caidan",
          urls: ["Caidan"],

          icon: "&#xe506;",
        },
        {
          title: "订单",
      
          name: "Dingdan",
          urls: ["Dingdan"],

          icon: "&#xe65f;",
        },
        {
          title: "购物袋",
      
          name: "Shop",
          urls: ["Shop"],

          icon: "&#xe604;",
        },
        {
          title: "我的",
      
          name: "My",
          urls: ["My"],

          icon: "&#xe503;",
        },
      ],
    };
  },
  methods: {
  },
};
</script>

<style lang="less" scoped>
@font-face {
  font-family: "../assets/font/iconfont";
  src: url("../assets/font/iconfont.eot");
  src: url("../assets/font/iconfont.eot?#iefix") format("embedded-opentype"),
    url("../assets/font/iconfont.woff2") format("woff2"),
    url("../assets/font/iconfont.woff") format("woff"),
    url("../assets/font/iconfont.ttf") format("truetype"),
    url("../assets/font/iconfont.svg#iconfont") format("svg");
}
.text {
  font-size: 8px;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 32px;
  font-style: normal;
  -moz-osx-font-smoothing: grayscale;
}
</style>