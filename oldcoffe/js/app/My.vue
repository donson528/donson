<template>
  <div class="My">
    <div class="mask"></div>
    <div class="My-top"></div>
    <div class="My-head">
      <div class="info-title">
        <div class="info-img">
          <div v-if="myinfos.userImg==null " @click="gologin">未登录</div>
          <img :src="myinfos.userImg" v-else alt />
        </div>
        <div class="info-name">
          <div class="name">{{myinfos.nickName}}</div>
       
          <div class="desc">{{myinfos.desc==""? '这个家伙是个懒鬼':myinfos.desc}}</div>
        </div>
      </div>
    
      <div class="inform">
        <van-notice-bar
          mode="closeable"
          color="#1989fa"
          background="#ecf9ff"
          left-icon="volume-o"
          v-if="myinfos.userImg!=null "
        >你有花呗5000需要在本月还清.</van-notice-bar>
      </div>
    </div>
    <div class="infoset">
      <van-cell
        :title="value.title"
        is-link
     
        :to="{name:value.name}"
        v-for="(value,index) in infomains"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import "../../assets/less/My.less";

export default {
  name: "my",
  data() {
    return {
      myinfos: {},
      infomains: [
        { title: "个人资料", name: "Personal" },
        { title: "我的订单", name: "Dingdan" },
        { title: "我的收藏", name: "Collect" },
        { title: "地址管理", name: "Site" },
        { title: "安全中心", name: "Safety" },
      ],
    };
  },
  created() {
    this.myinfo();
  },
  methods: {
    gologin() {
      this.$router.push({ name: "Login" });
    },
    // 获取个人资料
    myinfo() {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return ;
      }
      this.axios({
        methos: "GET",
        appkey: this.appkey,
        url: "/findMy",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          ;
          if (result.data.code == "A001") {
            this.myinfos = result.data.result[0];
          }
        })
        .catch((err) => {
          ;
        });
    },
    gofrom() {
      this.$router.push({ name: "Dingdan" });
    },
    gocollect() {
      this.$router.push({ name: "Collect" });
    },
    goSite() {
      this.$router.push({ name: "Site" });
    },
  },
};
</script>

<style lang="less" scoped>

</style>