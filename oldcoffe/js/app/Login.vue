<template>
  <div class="Login">
    
    <van-nav-bar left-arrow @click-right="back" class="login-top">
      <template #left>
        <div class="logo iconfont">&#xe50c;</div>
        <div class="logotext">Luckin Coffee</div>
      </template>
      <template #right>
        <div class="back">立即体验</div>
      </template>
    </van-nav-bar>
    <div class="login-text">
      <div class="welcome">欢迎回来!</div>
      <div class="english">Please login to your accounts</div>
    </div>
    <div class="login-input">
      <van-form>
        <van-field name="用户名" label="用户名" placeholder="用户名" v-model="userLogin.phone" />
        <van-field
          v-model="userLogin.password"
          :type="isPassword? 'password':'text'"
          name="密码"
          label="密码"
          placeholder="密码"
          :right-icon="isPassword? 'closed-eye':'browsing-history'"
          @click-right-icon="down"
        />
        <div class="pass clearfix">
          <div class="fr" @click="forget">忘记密码?</div>
        </div>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" @click="denglu">提交</van-button>
          <van-button type="default" class="register" @click="showPopup">注册</van-button>
          <van-popup
            class="toregister"
            v-model="show"
            position="bottom"
            round
            overlay-class="mask"
            :style="{ height: '30%' }"
          >
            <van-form>
              <div class="logintrue">
                <div class="comeback">
                  <van-icon name="cross" @click="showPo" />
                </div>
                <div class="nametop">注册</div>
              </div>
              <van-field
                name="手机号"
                label="手机号"
                placeholder="手机号 中国(+86)"
                v-model="userRegister.phone"
              />
              <van-field v-model="userRegister.nickName" name="用户名" label="昵称" placeholder="昵称" />
              <van-field
                name="密码"
                label="密码"
                v-model="userRegister.password"
                @click-right-icon="down2"
                :type="isRegister? 'password':'text'"
                placeholder="密码"
                :right-icon="isRegister? 'closed-eye':'browsing-history'"
              />
              <div style="margin: 16px;">
                <van-button type="default" class="register" @click="zhuce">注册</van-button>
              </div>
            </van-form>
          </van-popup>
        </div>
       
      </van-form>
    </div>
  </div>
</template>

<script>
import "../assets/less/login.less";

// 导入序列化方法
import { utils } from "../assets/js/utils";

// 导入信息验证方法
import { validForm } from "../assets/js/validForm";
export default {
  name: "Login",
  data() {
    //
    return {
      // 登录信息
      userLogin: {
        phone: "",
        password: "",
      },
      // 注册信息
      userRegister: {
        phone: "",
        nickName: "",
        password: "",
      },
      isPassword: true,
      isRegister: true,
      show: false,
    };
  },
  methods: {
    showPopup() {
      // 点击注册出现注册界面
      this.show = true;
    },
    showPo() {
      // 退出注册界面
      this.show = false;
    },
    back() {
      // 返回首页
      ;
     this.$router.push({ name: "Shouye" });
    },
    down() {
      // 显示密码
      this.isPassword = !this.isPassword;
    },
    down2() {
      // 显示密码;
      this.isRegister = !this.isRegister;
    },
    // 登录
    denglu() {
      // 获取登录信息
      let userInfo = this.userLogin;

      //  创建信息对象,使用验证方法判断信息是否符合正则表达式
      let o = {
        phone: {
          value: userInfo.phone,
          reg: /^1[3-9]\d{9}$/,
          errorMsg: "手机号格式不正确",
        },
        nickName: {
          value: userInfo.nickName,
          reg: /^[\w\u4e00-\u9fa5]{1,10}$/,
          errorMsg: "昵称格式不正确",
        },
        password: {
          value: userInfo.password,
          reg: /^[A-Za-z]\w{5,15}$/,
          errorMsg: "密码格式不正确",
        },
      };
      // 判断验证方法返回的值
      if (!validForm.valid(o)) {
        //验证不通过
        return;
      }
      // 等待信息反馈
      this.$toast.loading({
        message: "加载中...",
        //防止穿透
        forbidClick: true,

        //显示时间, 如果时间为0，则不会自动关闭
        duration: 0,

        loadingType: "spinner",
      });

      let info = Object.assign({}, userInfo);

      info.appkey = this.appkey;
      // 调用序列化方法
      let data = utils.queryString(info);

      this.axios({
        method: "POST",
        url: "/login",
        data,
      })
        .then((result) => {
          // 返回信息后停止加载
          this.$toast.clear();
          if (result.data.code == 200) {
            // 将返回的数据保存在本地 以后跳转都要使用
            localStorage.setItem("CSTK", result.data.token);
            // 登录成功去到首页
            this.$router.push({ name: "My" });
          } else {
            this.$notify({
              type: "warning",
              message: result.data.msg,
            });
          }
        })
        .catch((err) => {
          this.$toast.clear();
          ;
        });
    },
    // 注册
    zhuce() {
      // 获取注册的信息
      let userInfo = this.userRegister;

      //  创建信息对象,使用验证方法判断信息是否符合正则表达式
      let o = {
        phone: {
          value: userInfo.phone,
          reg: /^1[3-9]\d{9}$/,
          errorMsg: "手机号格式不正确",
        },
        nickName: {
          value: userInfo.nickName,
          reg: /^[\w\u4e00-\u9fa5]{1,10}$/,
          errorMsg: "昵称格式不正确",
        },
        password: {
          value: userInfo.password,
          reg: /^[A-Za-z]\w{5,15}$/,
          errorMsg: "密码格式不正确",
        },
      };

      // 判断验证方法返回的值
      if (!validForm.valid(o)) {
        //验证不通过
        return;
      }
      // 当验证通过时
      this.$toast.loading({
        message: "加载中...",
        //防止穿透
        forbidClick: true,

        //显示时间, 如果时间为0，则不会自动关闭
        duration: 0,

        loadingType: "spinner",
      });

      //序列化参数
      //复制对象 合并对象生成新的对象.这样更改旧对象,新对象不会跟着改变
      let info = Object.assign({}, userInfo);

      info.appkey = this.appkey;
      // 调用序列化方法
      let data = utils.queryString(info);

      ;
      //  发送请求
      this.axios({
        method: "POST",
        url: "/register",
        //对象简写方式
        data,
      })
        .then((result) => {
          // 请求成功
          // 关闭加载
          this.$toast.clear();

          // 判断返回的信息
          ;
          if (result.data.code == 100) {
            ;
            this.show = false;
            //清空注册表单的数据

            this.$notify({
              type: "warning",
              message: result.data.msg,
            });
            for (let key in userInfo) {
              userInfo[key] = "";
            }
          } else {
            this.$notify({
              type: "warning",
              message: result.data.msg,
            });
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    // 忘记密码
    forget(){
      this.$router.push({name:"Forgetpassword"})
    }
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
.iconfont {
  font-family: "iconfont" !important;
  font-size: 40px;
  font-style: normal;
  color: #0833bc;
  // margin-top: -30px;
  -moz-osx-font-smoothing: grayscale;
}
</style>