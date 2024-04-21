<template>
  <div class="forgetpassword">
    <van-nav-bar title="找回密码" left-text="返回" @click-left="back" fixed></van-nav-bar>

    <van-field v-model="email" type="text" label="邮箱" />
    <van-button type="danger" @click="get">获取邮箱验证码</van-button>

    <van-field v-model="phone" type="text" label="手机号" />
    <van-field v-model="password" type="password" label="新密码" />
    <van-field v-model="emailma" type="text" label="验证码" />

    <van-button type="danger" @click="set">确定</van-button>
  </div>
</template>

<script>
import { utils } from "../assets/js/utils";
import { Dialog } from "vant";
import { validForm } from "../assets/js/validForm";
export default {
  data() {
    return {
      email: "",
      phone: "",
      password: "",
      emailma: "",
    };
  },
  methods: {
    back() {
      this.$router.push({ name: "Login" });
    },
    set() {
      let o = {
        phone: {
          value: this.phone,
          reg: /^1[3-9]\d{9}$/,
          errorMsg: "手机号格式不正确",
        },

        password: {
          value: this.password,
          reg: /^[A-Za-z]\w{5,15}$/,
          errorMsg: "密码格式不正确",
        },
        password: {
          value: this.emailma,
          reg: /^[0-9]*$/,
          errorMsg: "验证码格式不正确",
        },
      };
      // 判断验证方法返回的值
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
          this.each();
        })
        .catch(() => {
          // on cancel
          ;
        });
    },
    // 修改密码方法
    setpassworld() {
      let data = utils.queryString({
        appkey: this.appkey,
        password: this.password,
        phone: this.phone,
      });

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });

      this.axios({
        method: "POST",
        url: "/retrievePassword",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          ;
          this.$toast(result.data.msg);
          this.$router.push({ name: "Login" });
        })
        .catch((err) => {
          this.$toast.clear();
          ;
        });
    },
    // 获取验证码
    get() {
      let o = {
        password: {
          value: this.email,
          reg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
          errorMsg: "邮箱格式不正确",
        },
      };
      if (!validForm.valid(o)) {
        //验证不通过
        return;
      }

      let data = utils.queryString({
        appkey: this.appkey,
        email: this.email,
      });

      this.axios({
        method: "POST",
        url: "/emailValidCode",
        data,
      })
        .then((result) => {
          ;
        })
        .catch((err) => {
          ;
        });
    },
    // 验证验证码
    each() {
      let data = utils.queryString({
        appkey: this.appkey,
        validCode: this.emailma,
      });
      this.axios({
        method: "POST",
        url: "/checkValidCode",
        data
      }).then(result=>{

        ;
        if (result.data.code=="K002") {
           this.$toast(result.data.msg);
        }
        if (result.data.code=="K001") {
          this.setpassworld()
        }
      }).catch(err=>{
        ;
      })
    },
  },
};
</script>

<style lang="less" scoped>
.forgetpassword {
  padding: 50px 10px 0;
  background-color: #f5f5f5;
  min-height: 100vh;
  box-sizing: border-box;
  /deep/ .van-field {
    border-bottom: 1px solid #d7d7d7;
    margin-bottom: 5px;
  }
  /deep/ .van-button {
    background-color: #0833bc;
    border-color: #0833bc;
    margin: 10px;
  }
}
</style>