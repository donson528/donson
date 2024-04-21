<template>
  <div class="Safety">
    <van-nav-bar title="安全中心" left-text="返回" @click-left="back" fixed></van-nav-bar>
    <div class="infoset">
      <van-cell
        :title="value.title"
        is-link
        @click="myinfo(value.title)"
        :to="{name:value.name}"
        v-for="(value,index) in infomains"
        :key="index"
      />
    </div>
    <van-button type="primary" @click="backinfo">退出登录</van-button>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { utils } from "../assets/js/utils";
export default {
  data() {
    return {
      infomains: [
        { title: "注销账号", name: "" },
        { title: "切换账号", name: "" },
        { title: "修改密码", name: "" },
      ],
    };
  },
  created() {
    let tokenString = localStorage.getItem("CSTK");
    if (!tokenString) {
      return this.$router.push({ name: "Login" });
    }
  },
  methods: {
    back() {
      this.$router.push({ name: "My" });
    },
    myinfo(value) {
      if (value == "绑定邮箱") {
        ;
      }
      if (value == "注销账号") {
        let url = "/destroyAccount";
        Dialog.confirm({
          title: "注销账号",
          message: "确定注销账号吗?信息将会丢失!",
        })
          .then(() => {
            ;
            this.set(url);
          })
          .catch(() => {
            // on cancel
            ;
          });
      }
   
      if (value == "修改密码") {
        this.$router.push({ name: "setpasswo" });
      }
      if (value == "切换账号") {
        Dialog.confirm({
          title: "切换账号",
          message: "确定退出切换账号吗?",
        })
          .then(() => {
            this.$router.push({ name: "Login" });
          })
          .catch(() => {
            // on cancel
            ;
          });
      }
    },
    // 请求方法
    set(url) {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return;
      }
      let data = utils.queryString({
        appkey: this.appkey,
        tokenString,
      });
      this.axios({
        method: "POST",
        url,
        data,
      })
        .then((result) => {
          ;
          if (result.data.code == "G001" || result.data.code == "F001") {
            localStorage.removeItem("CSTK");
            this.$router.push({ name: "Login" });
          }
          this.$toast(result.data.msg);
        })
        .catch((err) => {
          ;
        });
    },
    backinfo(){
  let url = "/logout";
        Dialog.confirm({
          title: "退出登录",
          message: "确定退出登录吗?",
        })
          .then(() => {
            ;

            this.set(url);
          })
          .catch(() => {
            // on cancel
            ;
          });
    }
  },
};
</script>

<style lang="less" scoped>
.Safety {
  padding: 50px 10px 0;
  /deep/ .van-cell {
    margin-bottom: 10px;
    background-color: #182094;
    color: white;
  }
  /deep/ .van-button{
    width: 80%;
    background-color: #ee0a24;
    border-color: #ee0a24;
    border-radius: 20px;
    margin-top: 100px;
  }
}
</style>