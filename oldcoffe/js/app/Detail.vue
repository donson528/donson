<template>
  <div class="detail">
    <div class="detail-head">
      <van-nav-bar title="商品详情" left-text="返回" @click-left="back" left-arrow :fixed="true" />
      <div class="detail-img">
        <img class="auto-img" :src="dataildata.large_img" alt />
        <div class="detail-name">
          <div>{{dataildata.name}}</div>
          <div class="eng">{{ dataildata.enname}}</div>
        </div>
      </div>
    </div>
    <div class="detail-body">
      <div class="specification">
        <div class="specifications" v-for="(value,index) in dataildata.rules" :key="index">
          <div class="rules-title">{{value.title}}</div>
          <div
            class="rules-rulestitle"
            v-for="(v , i) in value.rules"
            :key="i"
            :class="{active:v.isActive}"
            @click="toggbg(v,index)"
          >
            <span>{{v.title}}</span>
          </div>
        </div>
      </div>

      <div class="introduce">
        <div class="describe">商品描述</div>
        <div
          class="introduces"
          v-for="(value,index) in dataildata.desc"
          :key="index"
        >{{index}}.{{value}}</div>
      </div>

      <div class="price">
        <div class="prices">￥{{dataildata.price}}</div>
        <div class="count">
          <van-stepper v-model="count" theme="round" button-size="24" disable-input />
        </div>
      </div>
    </div>
    <div class="detail-bottom">
      <van-goods-action>
        <van-goods-action-icon icon="cart" text="购物车" :badge="number" @click="goshop" />
        <van-goods-action-icon
          icon="star"
          :color="isLike ? '#0C34BA' : '#999'"
          text="收藏"
          @click="shoucang"
        />
        <van-goods-action-button type="warning" text="加入购物车" @click="addshop" />
        <van-goods-action-button type="danger" text="立即购买" @click="nowshop" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import "../assets/less/detail.less";
import { utils } from "../assets/js/utils";
export default {
  data() {
    return {
      pid: "",
      dataildata: {},
      count: "",
      isLike: false,
      number: 0,
    };
  },
  created() {
    this.pid = this.$route.query.pid;
    this.loading();
    this.islike();
    this.eachshop();
  },
  methods: {
    // 去购物车
    goshop() {
      this.$router.push({ name: "Shop" });
    },
    // 选择规格
    toggbg(v, index) {
      if (v.isActive) {
        return;
      }
      let rules = this.dataildata.rules[index].rules;
      for (let i = 0; i < rules.length; i++) {
        if (rules[i].isActive) {
          rules[i].isActive = false;
          break;
        }
      }
      v.isActive = true;
    },
    // 返回上一级
    back() {
      this.$router.go(-1);
    },
    // 加载数据
    loading() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "GET",
        url: "/productDetail",
        //如果get请求，参数需要放在params, 如果是post请求,参数需要放在data
        params: {
          appkey: this.appkey,
          pid: this.pid,
        },
      })
        .then((result) => {
          this.$toast.clear();
          if (result.data.code == 600) {
            // 将描述进行分割
            result.data.result[0].desc = result.data.result[0].desc.split(/\n/);

            let specification = ["tem", "sugar", "milk", "cream"];
            let specificationData = [];

            specification.map((v) => {
              if (result.data.result[0][v] == "") {
                return;
              }
              let rule = {
                title: result.data.result[0][v + "_desc"],
                rules: [],
              };
              let r = result.data.result[0][v].split("/");
              r.map((value, index) => {
                let o = {
                  title: value,
                  isActive: index == 0,
                };
                rule.rules.push(o);
              });
              specificationData.push(rule);
            });
            result.data.result[0].rules = specificationData;
            this.dataildata = result.data.result[0];
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    // 收藏
    shoucang() {
      this.isLike = !this.isLike;
      let url = this.isLike ? "/like" : "/notlike";
      let tokenString = localStorage.getItem("CSTK");

      if (!tokenString) {
        this.$router.push({ name: "Login" });
        return;
      }
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });

      let data = utils.queryString({
        appkey: this.appkey,
        pid: this.pid,
        tokenString,
      });
      this.axios({
        method: "POST",
        url,
        //如果get请求，参数需要放在params, 如果是post请求,参数需要放在data
        data,
      })
        .then((result) => {
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          ;
        });
    },
    // 监测是否收藏
    islike() {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return;
      }

      this.axios({
        method: "GET",
        url: "/findlike",
        //如果get请求，参数需要放在params, 如果是post请求,参数需要放在data
        params: {
          appkey: this.appkey,
          tokenString,
          pid: this.pid,
        },
      })
        .then((result) => {
          this.$toast.clear();
          if (result.data.code == 1000) {
            if (result.data.result.length == 1) {
              this.isLike = true;
            }
          }
        })
        .catch((err) => {
          this.$toast.clear();
          ;
        });
    },
    // 加入购物车
    addshop() {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        this.$router.push({ name: "Login" });
        return;
      }
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      //获取选择的规格
      let rules = this.dataildata.rules;
      let rule = [];

      rules.map((v) => {
        for (let i = 0; i < v.rules.length; i++) {
          if (v.rules[i].isActive) {
            rule.push(v.rules[i].title);
            break;
          }
        }
      });
      let data = utils.queryString({
        appkey: this.appkey,
        pid: this.pid,
        tokenString,
        count: this.count,
        rule: rule.join("/"),
      });
      this.axios({
        method: "POST",
        url: "/addShopcart",
        //如果get请求，参数需要放在params, 如果是post请求,参数需要放在data
        data,
      })
        .then((result) => {
          this.$toast.clear();
          if (result.data.code == 3000) {
            if (result.data.status == 1) {
              //累加徽章数量, 购物车数据，而不是购物车商品总数量
              this.number++;
            }
          }
          ;
        })
        .catch((err) => {
          this.$toast.clear();
          ;
        });
    },
    // 立即购买
    nowshop() {
      let tokenString = localStorage.getItem("CSTK");
      ;
      if (!tokenString) {
        this.$router.push({ name: "Login" });
        return;
      }
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      //获取选择的规格
      let rules = this.dataildata.rules;
      let rule = [];

      rules.map((v) => {
        for (let i = 0; i < v.rules.length; i++) {
          if (v.rules[i].isActive) {
            rule.push(v.rules[i].title);
            break;
          }
        }
      });
      let data = utils.queryString({
        appkey: this.appkey,
        pid: this.pid,
        tokenString,
        count: this.count,
        rule: rule.join("/"),
      });
      this.axios({
        method: "POST",
        url: "/addShopcart",
        //如果get请求，参数需要放在params, 如果是post请求,参数需要放在data
        data,
      })
        .then((result) => {
          this.$toast.clear();

          ;
          if (result.data.code == 3000) {
             let sid = [];
            sid.push(result.data.sid)
            let obj = JSON.stringify(sid);
            this.$router.push({ name: "Tijiao", query: { obj } });
          }
        })
        .catch((err) => {
          this.$toast.clear();
          ;
        });
    },
    // 查询购物车
    eachshop() {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return;
      }
      this.axios({
        method: "GET",
        url: "/findAllShopcart",
        //如果get请求，参数需要放在params, 如果是post请求,参数需要放在data
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          this.$toast.clear();
          ;
          if (result.data.code == 5000) {
            this.number = result.data.result.length;
          }
        })
        .catch((err) => {
          this.$toast.clear();
          ;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>