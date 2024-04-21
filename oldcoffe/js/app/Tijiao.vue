<template>
  <div class="dingdan">
    <div class="dingdantitle">
      <van-nav-bar title="提交订单" :left-text="'返回'" @click-left="back" fixed></van-nav-bar>
    </div>

    <div class="dizhi">
      <div class="van-addressadd">
        <div class="select-address" @click="ischeak">
          <div>选择收货地址</div>
          <van-icon name="arrow" />
        </div>
        <div class="info">
          <div class="infoname">{{selectaddress.name}}</div>
          <div class="infophone">{{selectaddress.tel}}</div>
        </div>
        <div
          class="address"
        >{{selectaddress.city}}{{selectaddress.county}}{{selectaddress.addressDetail}}</div>
      </div>

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

      <van-popup v-model="cheak" position="bottom">
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="onadd"
          @edit="onedit"
          @select="onselect"
        />
      </van-popup>
    </div>
    <div class="lists-item">
      <h3>订单信息</h3>
      <van-empty description="你没有选择商品哦，到处逛逛吧" v-if="isshow">
        <van-button round type="danger" class="bottom-button" @click="goshop">去订单看看</van-button>
      </van-empty>
      <van-swipe-cell v-for="(value,index) in resultdata" :key="index">
        <van-cell-group>
          <div class="cell-box">
            <div class="cell-img">
              <img class="auto-img" :src="value.small_img" alt />
            </div>
            <div class="cell-info">
              <div class="info-top">
                {{value.name}}
                <span>{{value.rule}}</span>
              </div>
              <div class="info-center">{{value.enname}}</div>
              <div class="info-bottom">
                <div class="price">￥{{value.price}}</div>
                <div>x {{ value.count}}</div>
              </div>
            </div>
          </div>
        </van-cell-group>
      </van-swipe-cell>
    </div>
    <div class="sum">
      <div class="num">共计 {{ resultdata.length }} 件商品</div>
      <div class="sums">合计￥{{sum}}</div>
    </div>
    <div class="btn">
      <van-button type="primary" @click="uporder">提交订单</van-button>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import areaList from "../assets/js/arealist";
import { utils } from "../assets/js/utils";
export default {
  data() {
    return {
      // 是否显示无订单框
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
      // 判断是从哪里进来的数据
      ischeaks:false
    };
  },
  created() {
     ;
    this.sids = this.$route.query.obj;

    this.ischeaks=this.$route.query.ischeaks

    this.each();
    this.loading();
  },
   beforeRouteLeave(to, from, next){
       next(true);
   if (this.ischeaks) {
       this.remove( this.sids);
   }
   },
  methods: {
    // 加载选中的商品
    loading() {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return;
      }
      if (this.sids) {
          console.log("this.sids",this.sids);
        this.axios({
          method: "GET",
          url: "/commitShopcart",
          //如果get请求，参数需要放在params, 如果是post请求,参数需要放在data
          params: {
            appkey: this.appkey,
            tokenString,
            sids: this.sids,
          },
        })
          .then((result) => {
              console.log(result);
            if (result.data.code == 50000) {
            
              this.resultdata = result.data.result;
              this.resultdata.map((v) => {
                this.sum += v.count * v.price;
              });
            }
            if (result.data.code == 50001) {
                this.resultdata = {};
              this.isshow = true;
            } else {
              this.isshow = false;
            }
          })
          .catch((err) => {
            ;
          });
      }
    },
    // 返回上一级
    back() {
      this.$router.go(-1);
    },
    // 去购物袋
    goshop() {
      this.$router.push({ name: "Dingdan" });
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
         
          this.each();
           this.show=false
        })
        .catch((err) => {
          this.$toast.clear();
          ;
        });
    },

    // 删除地址
    deleteAddress(address) {
    
      if (address.aid==this.selectaddress.aid) {
        
        this.selectaddress={}
      }
   
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
          this.show=false
          this.setshow=false
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
            if (v.isDefault) {
              this.selectaddress = v;
              ;
              this.address = v.city + v.county + v.addressDetail;
            }
          });
          this.list = result.data.result;
        })
        .catch((err) => {
          this.$toast.clear();
          ;
        });
    },
    // 编辑地址
    onedit(item) {
      
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
          
          this.each();
        })
        .catch((err) => {
          this.$toast.clear();
         
        });
    },
    // 选择地址
    onselect(item) {
      this.selectaddress = item;
      this.cheak=false

    },
    ischeak() {
      // findAddress
      this.cheak = !this.cheak;
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
    // 提交订单
    uporder() {
      if (!this.selectaddress.aid) {
        ;
             Dialog.alert({
          message: "你没有选择地址哦",
        }).then(() => {
          // on close
        });
          return
      }
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
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
        tokenString,
        sids: this.sids,
        phone: this.selectaddress.tel,
        address: this.address,
        receiver: this.selectaddress.name,
      });
      this.axios({
        method: "POST",
        url: "/pay",
        data,
      })
        .then((result) => {
            this.sids = []
            this.sids = JSON.stringify(this.sids);

            // this.remove(this.sids)
          this.$toast.clear();
          if (result.data.code == 60001) {
            return;
          }
          ;
          if (result.data.code == 60000) {
            
            this.loading();
            this.sum=0
            this.$toast(result.data.msg);
          }
        })
        .catch((err) => {
          this.$toast.clear();
          ;
        });
    },
      remove(sid) {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return;
      }
      //获取选择的规格
      let data = utils.queryString({
        appkey: this.appkey,
        tokenString,
        sids: sid,
      });

      this.axios({
        method: "POST",
        url: "/removeShopcart",
        //如果get请求，参数需要放在params, 如果是post请求,参数需要放在data
        data,
      })
        .then((result) => {
          // console.log(result);
        })
        .catch((err) => {
          ;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.dingdan {
  min-height: 100vh;
  background-color: #f2f2f2;
  box-sizing: border-box;
  padding: 10px;
  padding-top: 46px;
  padding-bottom: 100px;

  .dingdantitle {
    /deep/ .van-nav-bar {
      background: linear-gradient(to right, #ccffff, #0b37be);
      .van-nav-bar__title {
        color: white;
      }
    }
  }

  .dizhi {
    padding: 16px 0;
    .van-addressadd {
      box-sizing: border-box;
      width: 100%;
      background-color: white;
      border-radius: 5px;
      padding: 10px;
      text-align: left;
      font-size: 12px;

      .select-address {
        display: flex;
        align-items: center;

        margin-bottom: 20px;
        div {
          margin-right: 5px;
        }
      }
      .info {
        display: flex;
        margin-bottom: 15px;
        align-items: center;
        font-weight: 500;

        .infoname {
          color: #0b37be;
          margin-right: 15px;
          font-weight: 600;
        }
        .infophone {
          color: #c2c0c4;
        }
      }
      .address {
        color: #c2c0c4;
      }
    }
    /deep/ .van-popup {
      min-width: 100%;
    }
  }
  .lists-item {
    border-radius: 10px;
    padding: 5px;
    background-color: white;
    h3 {
      padding: 0;
      margin: 0;
      text-align: left;
      margin-bottom: 10px;
    }
    /deep/ .van-empty {
      .van-button {
        width: 160px;
        height: 40px;
        border-color: #0b37be;
        background-color: #0b37be;
      }
    }
    /deep/ .van-swipe-cell {
      height: 80px;
      margin-bottom: 10px;
      .van-swipe-cell__wrapper {
        height: 100%;
        .van-cell-group {
          height: 100%;
          .cell-box {
            height: 100%;
            background-color: #dadada;
            overflow: hidden;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px 10px;
            width: 100%;
            box-sizing: border-box;
            .cheak {
              padding: 0 10px;
            }
            .cell-img {
              width: 70px;
              height: 70px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .cell-info {
              height: 100%;
              padding: 0 10px;
              box-sizing: border-box;
              flex-grow: 1;
              .info-top {
                text-align: left;
                font-size: 14px;
                span {
                  margin-left: 10px;
                  font-size: 12px;
                  color: #0b37be;
                }
              }
              .info-center {
                margin-top: 5px;
                text-align: left;
              }
              .info-bottom {
                display: flex;
                margin-top: 5px;
                justify-content: space-between;
                .price {
                  color: #0b37be;
                  font-size: 16px;
                  font-weight: 400;
                }
                .van-stepper__minus {
                  color: #0b37be;
                  border-color: #0b37be;
                }
                .van-stepper__plus {
                  background-color: #0b37be;
                }
              }
            }
          }
        }
      }

      .van-button {
        height: 100%;
      }
    }
  }
  .sum {
    background-color: white;
    border-top: 1px dashed #dadada;
    border-radius: 10px;
    padding: 20px 5px 8px;
    display: flex;
    justify-content: space-between;
    .num {
      font-weight: 700;
      font-size: 14px;
    }
    .sums {
      font-weight: 700;
      font-size: 14px;
      color: #0533b2;
    }
  }
  .btn {
    width: 100%;
    position: fixed;
  background-color: white;
    bottom: 0px;
    padding: 10px;
    box-sizing: border-box;
    left: 0;
    /deep/ .van-button {
      color: white;
      border-color: transparent;
      background-color: #0b37be;
      width: 100%;
      border-radius: 20px;
    }
  }
}
</style>