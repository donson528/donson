<template>
  <div class="menu">
 
    <div class="menu-body">
      <van-tabs animated  sticky line-width="0">
        <van-tab v-for="(value,index) in datatype" :key="index">
          <template #title>
            <div @click="cli(value)">
              <img class="auto-img" :src="value.isActive ? value.activeIcon : value.icon" alt />
              <div class="typeDesc" :class="{active:value.isActive}">{{value.typeDesc}}</div>
            </div>
          </template>
          <div class="product">
            <div class="products" v-for="(value,index) in products" :key="index">
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
                  <div class="plus fr"  @click="toggles(value)" >
                    <div>+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import "../../assets/less/Caidan.less";
export default {
  name: "Caidan",
  data() {
    return {
      value: "",
      datatype: [],
      products: [],
    };
  },
  created() {
    this.getbannerData();
    ;
  },
  methods: {
 
    // 获取咖啡类型
    getbannerData() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });

      this.axios({
        method: "GET",
        url: "/type",
        //如果get请求，参数需要放在params, 如果是post请求,参数需要放在data
        params: {
          appkey: this.appkey,
        },
      })
        .then((result) => {
          this.$toast.clear();
          ;
          if (result.data.code == 400) {
            let iconData = [
              {
                type: "latte",
                icon: require("../../assets/images/icons_05.gif"),
                activeIcon: require("../../assets/images/icons_19.gif"),
              },
              {
                type: "coffee",
                icon: require("../../assets/images/icons_03.gif"),
                activeIcon: require("../../assets/images/icons_18.gif"),
              },
              {
                type: "rena_ice",
                icon: require("../../assets/images/icons_07.gif"),
                activeIcon: require("../../assets/images/icons_20.gif"),
              },
            ];

            result.data.result.map((v) => {
              for (let i = 0; i < iconData.length; i++) {
                if (v.type == iconData[i].type) {
                  v.icon = iconData[i].icon;
                  v.activeIcon = iconData[i].activeIcon;
                  v.isActive = false;
                  break;
                }
              }
            });

            result.data.result.unshift({
              type: "isHot",
              typeDesc: "推荐",
              icon: require("../../assets/images/icons_09.gif"),
              activeIcon: require("../../assets/images/icons_21.gif"),
              isActive: true,
            });

            this.datatype = result.data.result;

            this.gettypeProducts(this.datatype[0]);
          }
        })
        .catch((err) => {
          this.$toast.clear();
          ;
        });
    },
    // 切换类型
    cli(value) {
      if (value.isActive) {
        return;
      }
      for (let i = 0; i < this.datatype.length; i++) {
        if (this.datatype[i].isActive) {
          this.datatype[i].isActive = false;
        }
      }
      value.isActive = true;
      this.gettypeProducts(value);
    },
    // 根据类型获取相关数据
    gettypeProducts(value) {
      // 先清空数据
      this.products = [];

      let data = sessionStorage.getItem(value.type);
      if (data) {
        this.isLoading = false;
        ;
        this.products = JSON.parse(data);

        return;
      }

      let params = {
        key: "type",
        value: value.type,
        appkey: this.appkey,
      };

      if (value.type == "isHot") {
        params.key = "isHot";
        params.value = 1;
      }

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
        params,
      })
        .then((result) => {
          this.$toast.clear();
          ;
          if (result.data.code == 500) {
            this.products = result.data.result;
            //   将数据储存到本地 下次将不重新加载数据
            sessionStorage.setItem(value.type, JSON.stringify(this.products));
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
  },
};
</script>

<style lang="scss" scoped>
</style>