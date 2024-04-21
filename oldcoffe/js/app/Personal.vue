<template>
  <div class="Personal">
    <van-nav-bar title="个人资料" left-text="返回" @click-left="back" fixed></van-nav-bar>
    <div>
      <van-cell title="头像" class="info-title">
        <div>
          <div class="img">
            <img :src="infodata.userImg" alt />
          </div>

          <van-uploader :after-read="afterRead" />
        </div>
      </van-cell>
      <van-cell title="昵称" class="info-name">
        <div class="aaa">
          <van-field @blur="changesname" v-model="infodata.nickName" />
        </div>
      </van-cell>
      <van-cell title="账号" class="info-phone">

        <div>
          <van-field  :readonly="readonly" v-model="infodata.phone" />
        </div>
       
      </van-cell>
       <div class="setpass"></div>
      <van-cell title="个性签名" class="info-phone">
        <div>
          <van-field
            @blur="changestext"
            v-model="infodata.desc"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
          />
        </div>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { utils } from "../assets/js/utils";
import { validForm } from "../assets/js/validForm";
export default {
  data() {
    return {
      maxSize: 1 * 1024 * 1024,
      readonly: true,
      isEdit: false,
      infodata: {
        phone: "",
        nickName: "",
        password: "",
        userImg: "",
      },
    };
  },
  created() {
    this.myinfo();
  },
  methods: {
    //   去修改密码
     
    //   返回上一层
    back() {
      this.$router.push({name:"My"})
    },
    // 获取个人资料
    myinfo() {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return this.$router.push({ name: "Login" });
      }
      this.axios({
        methos: "GET",
        appkey: this.appkey,
        url: "/findAccountInfo",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          ;
          if (result.data.code == "B001") {
            this.infodata = result.data.result[0];
          }
        })
        .catch((err) => {
          ;
        });
    },
    // 上传头像
    afterRead(file) {
      //获取token字符串
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return;
      }

      //获取文件类型
      let type = file.file.type.split("/")[1];
      let imgTypes = ["png", "gif", "jpg", "jpeg"];
      if (imgTypes.indexOf(type) === -1) {
        this.$notify({
          message: "图片类型只支持" + imgTypes.join(","),
          color: "#fff",
          background: "#0C34BA",
        });

        return;
      }

      //大小
      if (this.maxSize < file.file.size) {
        this.$notify({
          message: "上传文件大小不能超过" + this.maxSize / 1024 + "KB",
          color: "#fff",
          background: "#0C34BA",
        });
        return;
      }

      //获取base64
      let base64 = file.content.replace(/data:image\/[A-Za-z]+;base64,/, "");
      ;

      let data = utils.queryString({
        appkey: this.appkey,
        tokenString,
        imgType: type,
        serverBase64Img: base64,
      });

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });

      this.axios({
        method: "POST",
        url: "/updateAvatar",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          ;
        this.myinfo();
        })
        .catch((err) => {
          this.$toast.clear();
          ;
        });
    },
    // 修改昵称
    changesname() {

       let o = {
   
        nickName: {
          value: this.infodata.nickName,
          reg: /^[\w\u4e00-\u9fa5]{1,10}$/,
          errorMsg: "昵称格式不正确",
        },
     
      };
      // 判断验证方法返回的值
      if (!validForm.valid(o)) {
      
        //验证不通过
        return;
      }
            //  获取token字符串
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return;
      }

      let data = utils.queryString({
        appkey: this.appkey,
        tokenString,
        nickName: this.infodata.nickName,
        
      });

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });

      this.axios({
        method: "POST",
        url: "/updateNickName",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          ;
         
        })
        .catch((err) => {
          this.$toast.clear();
          ;
        });
    },
    changestel() {
        ;
    },
    // 修改简介
    changestext() {
        ;
                  //  获取token字符串
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return;
      }

      let data = utils.queryString({
        appkey: this.appkey,
        tokenString,
        desc: this.infodata.desc,
        
      });

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });

      this.axios({
        method: "POST",
        url: "/updateDesc",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          ;
         
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
.Personal {
  min-height: 100vh;
  padding: 55px 15px;
  box-sizing: border-box;
  background-color: #f5f5f5;
   .setpass{
      color: #5e5f5f;
      font-weight: 700;
      padding: 0 30px 5px;
     text-align: right;
    }
  /deep/ .van-cell {
    margin-bottom: 10px;
    border-radius: 10px;
    position: relative;
    overflow: unset;
    .van-cell__title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .van-cell {
      margin: 0;
      padding: 0;
      .van-field__control {
        text-align: right;
      }
    }
   
    &.info-title {
      height: 80px;
      div {
        position: relative;
        img {
          height: 60px;
        }
        .van-uploader {
          right: 0;
          top: 0;
          width: 60px;
          height: 60px;
          position: absolute;
          opacity: 0;
          .van-uploader__wrapper {
            width: 100%;
            height: 100%;
            .van-uploader__upload {
              width: 100%;
              height: 100%;
              margin: 0;
            }
          }
        }
      }
    }
  }
}
</style>