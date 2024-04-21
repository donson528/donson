<template>
  <div class="site">
    <div class="dingdantitle">
      <van-nav-bar title="地址" :left-text="'返回'" @click-left="back" fixed></van-nav-bar>
    </div>
    <van-address-list
      :switchable="cheak"
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onadd"
      @edit="onedit"
     
    />
    <van-popup v-model="show">
      <van-address-edit
        show-postal
        show-delete
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        :area-list="areaList"
        :address-info="addressInfo"
        @save="newAddress"
        @delete="deleteAddress"
      />
    </van-popup>

    <van-popup v-model="setshow">
      <van-address-edit
        show-postal
        show-delete
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        :area-list="areaList"
        :address-info="addressInfo"
        @save="setAddress"
        @delete="deleteAddress"
      />
    </van-popup>
  </div>
</template>

<script>
import areaList from "../assets/js/arealist";
import { utils } from "../assets/js/utils";
export default {
  data() {
    return {
      // 是否显示无订单框
      chosenAddressId: "1",
      isshow: false,
      show: false,
      cheak: false,
      setshow: false,
      // 商品号
      sids: "",
      // 商品列表
      resultdata: {},
      // 订单总价格
      sum: 0,
      areaList,
      //地址数据初始值
      addressInfo: {
        id: "",
        name: "",
        tel: "",
        province: "",
        city: "",
        county: "",
        addressDetail: "",
        areaCode: "",
        postalCode: "",
        isDefault: false,
      },
      chosenAddressId: "1",
      list: [],
      // 选择的地址
      selectaddress: {},
      // 地址
      address: "",
    };
  },
  created() {
    this.each();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 增加新的地址
    newAddress(address) {
      let content = Object.assign({}, address);
      //获取token字符串
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return this.$router.push({ name: "Login" });
      }

      delete content.id;
      delete content.country;

      content.isDefault = Number(content.isDefault);
      content.appkey = this.appkey;
      content.tokenString = tokenString;

      //参数序列化
      let data = utils.queryString(content);

      ;

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });

      this.axios({
        method: "POST",
        url: "/addAddress",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          ;
          this.each();
        })
        .catch((err) => {
          this.$toast.clear();
          ;
        });
    },
    // 删除地址
    deleteAddress(address) {
      if (!address.aid) {
        return;
      }

      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return this.$router.push({ name: "Login" });
      }
      //参数序列化
      let data = utils.queryString({
        appkey: this.appkey,
        tokenString,
        aid: address.aid,
      });

      ;

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });

      this.axios({
        method: "POST",
        url: "/deleteAddress",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          this.addressInfo = {
            id: "",
            name: "",
            tel: "",
            province: "",
            city: "",
            county: "",
            addressDetail: "",
            areaCode: "",
            postalCode: "",
            isDefault: false,
          };
          ;
          this.each();
        })
        .catch((err) => {
          this.$toast.clear();
          ;
        });
    },
    // 新增地址
    onadd() {
      this.show = !this.show;
      //  初始化
      this.addressInfo = {
        id: "",
        name: "",
        tel: "",
        province: "",
        city: "",
        county: "",
        addressDetail: "",
        areaCode: "",
        postalCode: "",
        isDefault: false,
      };
    },
    // 编辑地址
    onedit(item) {
      ;
      this.setshow = !this.setshow;
      this.addressInfo = item;
    },
    setAddress(address) {
      let content = Object.assign({}, address);
      //获取token字符串
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return this.$router.push({ name: "Login" });
      }

      delete content.id;
      delete content.country;

      content.isDefault = Number(content.isDefault);
      content.appkey = this.appkey;
      content.tokenString = tokenString;
      content.aid = this.addressInfo.aid;

      //参数序列化
      let data = utils.queryString(content);

      ;

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });

      this.axios({
        method: "POST",
        url: "/editAddress",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          ;
          this.each();
        })
        .catch((err) => {
          this.$toast.clear();
          ;
        });
    },
    // 查询地址
    each() {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return this.$router.push({ name: "Login" });
      }

      this.axios({
        method: "GET",
        url: "/findAddress",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          this.$toast.clear();
          ;

          result.data.result.map((v) => {
            this.address = v.city + v.county + v.addressDetail;
            v.address = v.city + v.county + v.addressDetail;
          });

          this.list = result.data.result;
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
.site {
  min-height: 100vh;
  background-color: #f1f3f4;
  box-sizing: border-box;
  padding: 10px;
  padding-top: 46px;
  /deep/ .van-popup {
    min-width: 100%;
  }
  /deep/ .van-address-list__bottom{
      background-color:#f1f3f4 ;
  }
}
</style>