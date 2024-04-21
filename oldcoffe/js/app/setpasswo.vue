<template>
  <div class="setpasswo">
    <van-nav-bar title="修改密码" left-text="返回" @click-left="back" fixed></van-nav-bar>
    <!-- 输入密码 -->
  

    <van-field v-model="oldPassword" type="password" label="旧密码" />
    <van-field v-model="password" type="password" label="新密码" />
  

    <van-button type="danger" @click="set">修改</van-button>
  </div>
</template>

<script>
import { utils } from "../assets/js/utils";
import { Dialog } from "vant";
import { validForm } from "../assets/js/validForm";
export default {
  data() {
    return {
      oldPassword: "",
      password: "",
      email:""
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    set() {
      let o = {
        password: {
          value: this.password,
          reg: /^[A-Za-z]\w{5,15}$/,
          errorMsg: "新密码格式不正确",
        },
      };
      if (!validForm.valid(o)) {
        //验证不通过
        return;
      }
      Dialog.confirm({
        title: "确定修改",
        message: "确定修改密码",
      })
        .then(() => {
          ;
          this.setpassworld();
        })
        .catch(() => {
          // on cancel
          ;
        });
    },
    // 修改密码方法
    setpassworld() {
    

      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return;
      }

      let data = utils.queryString({
        appkey: this.appkey,
        tokenString,
        password: this.password,
        oldPassword: this.oldPassword,
      });

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });

      this.axios({
        method: "POST",
        url: "/updatePassword",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          ;
          this.$toast(result.data.msg);
        })
        .catch((err) => {
          this.$toast.clear();
          ;
        });
    },

  },
};
</script>

<style lang="less" scoped>
.setpasswo {
  padding: 50px 10px 0;
  background-color: #f5f5f5;
  min-height: 100vh;
  box-sizing: border-box;
  /deep/ .van-field {
    border-bottom: 1px solid #d7d7d7;
    margin-bottom: 5px;
  }
}
</style>