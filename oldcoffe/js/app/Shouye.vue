<template>
  <div class="Shouye">
    <van-popup v-model="show" position="bottom">
          <div class="product">
      <div class="products" v-for="(value,index) in eachdata" :key="index">
        <div class="pro-box">
          <div class="pro-img" @click="toggles(value)">
            <img class="auto-img" :src="value.smallImg" alt />
          </div>
          <div class="pro-info">
            <div class="pro-text fl">
              <div class="ch-name">{{value.name}}</div>
              <div class="en-name">{{value.enname}}</div>
              <div class="pro-price">￥{{value.price}}</div>
            </div>
            <div class="plus fr" @click="toggles(value)">
              <div>+</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </van-popup>

    <div class="shouye-title">
      <van-nav-bar>
        <template #left>{{timeText}},啊sir</template>

        <template #right>
          <van-search
            v-model="value"
            shape="round"
            background="#ffffff"
            @blur="each"
            placeholder="请输入搜索关键词"
          />
        </template>
      </van-nav-bar>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(value, index) in daydata" :key="index" @click="toggles(value)">
          <img :src="value.bannerImg" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="shouye-header">
      <div class="shouye-banner">
        <div class="transparents"></div>
        <van-nav-bar>
          <template #right>
            <div>
              <p>Hi,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Jack</p>
              <p>咖啡会让你脑洞大开</p>
            </div>
          </template>
        </van-nav-bar>
        <div class="mode" @click="tishi">
          <div class="take-out">
            <div>外卖</div>
            <div class="iconfont">&#xe608;</div>
          </div>

          <div class="pick-up">
            <div>自提</div>
            <div class="iconfont">&#xe51c;</div>
          </div>
        </div>
        <div class="fours">
          <div v-for="(value,index) in fours" :key="index" class="list" @click="tishi">
            <div>
              <div class="iconfont" v-html="value.icon"></div>
              <div class="text">{{value.title}}</div>
            </div>
          </div>
        </div>
        <div class="recommend">
          <h3>每日推荐</h3>
          <div class="auto">
            <div class="recommend-ban">
              <div v-for="(value, index) in tuijiandata" :key="index" @click="toggles(value)">
                <img :src="value.smallImg" />
                <h4>{{value.enname}}</h4>
                <h4>{{value.name}}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { Toast } from "vant";
import "../../assets/less/Shouye.less";
export default {
  name: "Shouye",
  data() {
    return {
      show: false,
      eachdata: "",
      value: "",
      fours: [
        {
          title: "咖啡钱包",
          icon: "&#xe621;",
        },
        {
          title: "送ta咖啡",
          icon: "&#xe6b8;",
        },
        {
          title: "企业账户",
          icon: "&#xe62e;",
        },
        {
          title: "联系客服",
          icon: "&#xe607;",
        },
      ],
      daydata: [],
      tuijiandata: [],
      timeText: "",
    };
  },
  created() {
    this.getTime();
    this.getbannerData();
    this.getHotProducts();
  },
  methods: {
    getTime() {
      let hours = new Date().getHours();
      if (hours >= 6 && hours < 12) {
        this.timeText = "早上好";
      } else if (hours >= 12 && hours < 18) {
        this.timeText = "下午好";
      } else if (hours >= 18 && hours < 24) {
        this.timeText = "晚上好";
      } else {
        this.timeText = "深夜好";
      }
    },
    // 获取每日推荐
    getbannerData() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "GET",
        url: "/banner",
        //如果get请求，参数需要放在params, 如果是post请求,参数需要放在data
        params: {
          appkey: this.appkey,
        },
      })
        .then((result) => {
          this.$toast.clear();
          ;
          if (result.data.code == 300) {
            this.daydata = result.data.result;
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    //获取推荐商品数据
    getHotProducts() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "GET",
        url: "/typeProducts",
        //如果get请求，参数需要放在params, 如果是post请求,参数需要放在data
        params: {
          appkey: this.appkey,
          key: "isHot",
          value: 1,
        },
      })
        .then((result) => {
          this.$toast.clear();

          if (result.data.code == 500) {
            this.tuijiandata = result.data.result;
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    toggles(value) {
      let pid = value.pid;
      this.$router.push({ name: "Detail", query: { pid } });
    },
    tishi() {
      Toast.fail("该功能还在开发,请敬请期待吧");
    },
    // 查找商品

    each() {
      if (this.value == "") {
        return;
      }
      this.axios({
        method: "GET",
        url: "/search",
        params: {
          appkey: this.appkey,
          name: this.value,
        },
      })
        .then((result) => {
          ;
          if (result.data.code == "Q001") {
            if (result.data.result.length == 0) {
              this.$toast("没有搜到商品");
              return;
            }
          }
          this.show = true;
          this.eachdata = result.data.result;
        })
        .catch((err) => {
          ;
        });
    },
  
  },
};
</script>

<style lang="less" scoped>
@font-face {
  font-family: "../../assets/font/iconfont";
  src: url("../../assets/font/iconfont.eot");
  src: url("../../assets/font/iconfont.eot?#iefix") format("embedded-opentype"),
    url("../../assets/font/iconfont.woff2") format("woff2"),
    url("../../assets/font/iconfont.woff") format("woff"),
    url("../../assets/font/iconfont.ttf") format("truetype"),
    url("../../assets/font/iconfont.svg#iconfont") format("svg");
}
</style>