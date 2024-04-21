<template>
  <div class="forgetpassword">
    <van-nav-bar title="订单详情" left-text="返回" @click-left="back" fixed></van-nav-bar>
   
    <div class="product" v-show="show">
      <div class="product-title"></div>
      <div class="products">
        <van-swipe-cell v-for="(value,index) in product" :key="index">
          <van-cell-group>
            <div class="cell-box">
              <div class="cell-img">
                <img class="auto-img" :src="value.smallImg" alt />
              </div>
              <div class="cell-info">
                <div class="info-top">
                  {{value.name}}
                  <span>{{value.rule}}</span>
                </div>
                <div class="info-center">{{value.enname}}</div>
                <div class="info-bottom">
                  <div class="price">￥{{value.price}}</div>
                  <div class="number">
                    <span>×{{value.count}}</span>
                  </div>
                </div>
              </div>
            </div>
          </van-cell-group>
        </van-swipe-cell>
        <div class="piece">
          <div>共有商品{{product.length}}件</div>
          <div>总价为{{sums}}</div>
        </div>

        <div class="again-purchase">
          <van-button type="default" @click="sure" v-if="status==1? true:false">确定收货</van-button>
          <van-button type="default" @click="dele" v-if="status==1? false:true">删除订单</van-button>
          <van-button type="default" @click="againshop">再来一单</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { utils } from "../assets/js/utils";
export default {
  data() {
    return {
      product: "",
      status: "",
      oid: "",
      sums: 0,
    show:true
    };
  },
  created() {
    console.log(1111);
    this.product = "";
    this.product = this.$route.query.obj;
    this.oid = this.product[0].oid;
    this.status = this.product[0].status;
    this.sum();
  },
  methods: {
    back() {
      this.$router.push({ name: "Dingdan" });
    },
    sure() {
      let url = "/receive";
      ;
      Dialog.confirm({
        title: "确定收货",
        message: "确定将已收到商品",
      })
        .then(() => {
          
          this.surefn(this.oid, url);
          this.status=2
          //  this.$router.push({ name: "Dingdan" });
        })
        .catch(() => {
          
        });
    },
    // 删除订单提示
    dele() {
      let url = "/removeOrder";
      Dialog.confirm({
        title: "确定删除订单",
        message: "此操作不可返回",
      })
        .then(() => {
         
          this.surefn(this.oid, url);
          this.$router.push({ name: "Dingdan" });
        })
        .catch(() => {
          ;
        });
    },
    // 确定收货/删除订单方法
    surefn(value, url) {
      ;
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return;
      }
      ;
      //参数序列化
      let data = utils.queryString({
        appkey: this.appkey,
        tokenString,
        oid: value,
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
        url,
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
    sum() {
      this.product.map((v) => {
        this.status = v.status;
        this.sums += v.count * v.price;
      });
    },

   
    // 再来一单

    // againshop(item) {
    //   let tokenString = localStorage.getItem("CSTK");
    //   if (!tokenString) {
    //     this.$router.push({ name: "Login" });
    //     return;
    //   }
    //   this.$toast.loading({
    //     message: "加载中...",
    //     forbidClick: true,
    //     duration: 0,
    //     loadingType: "spinner",
    //   });
    //   let arr =this.product
   
    //   // ;

    //   arr.forEach((v) => {

    //     //获取选择的规格
    //     let rules = v.rule;
    //     let rule = [];

     
    //     rule.forEach((v) => {
    //       for (let i = 0; i < v.rules.length; i++) {
    //         if (v.rules[i].isActive) {
    //           rule.push(v.rules[i].title);
    //           break;
    //         }
    //       }
    //     });

    //     let data = utils.queryString({
    //       appkey: this.appkey,
    //       pid: v.pid,
    //       tokenString,
    //       count: v.count,
    //       rule: rule.join("/"),
    //     });
    //     this.axios({
    //       method: "POST",
    //       url: "/addShopcart",
    //       //如果get请求，参数需要放在params, 如果是post请求,参数需要放在data
    //       data,
    //     })
    //       .then((result) => {
    //         this.$toast.clear();
    //         this.$toast(result.data.msg)
    //          this.$router.push({name:"Shop"})

               
    //       // let obj = JSON.stringify(this.sidarrs);
    //       // let ischeaks=true
    //       // // 跳转
    //       //  console.log(obj);
    //       // this.$router.push({ name: "Tijiao", query: { obj,ischeaks } });


    //       })
    //       .catch((err) => {
    //         this.$toast.clear();
    //         ;
    //       });
    //   });
    // },

    againshop(item) {
      // 在订单的商品没有sid,只有pid.也就是相当于他们都是详细里面的商品.需要进入购物车获得sid
      // 遍历再来一单里面的所有订单.获取sid

      // 声明装请求的盒子
      let all = [];
      // 先清空sid数组
      this.sidarrs = [];

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
     let arr =this.product
   
      // ;

      // 添加到购物车请求
      arr.forEach((v) => {
        let data = utils.queryString({
          appkey: this.appkey,
          pid: v.pid,
          tokenString,
          count: v.count,
          rule: v.rule
        });
        let axios = this.axios({
          method: "POST",
          url: "/addShopcart",
          //如果get请求，参数需要放在params, 如果是post请求,参数需要放在data
          data,
        })
          .then((result) => {
            this.$toast.clear();
            if (result.data.code == 3000) {
              let sid = result.data.sid;
              this.sidarrs.push(sid);
            }
            ;
            this.$toast(result.data.msg);
          })
          .catch((err) => {
            this.$toast.clear();
            return
            ;
          });
        all.push(axios);
      });
      // 直接查看sid数组会变出一个类似空数组但是有东西的数组  让这个数据变出字符串后就是两个中括号,
      // 所以只能把他们放进all里面等所有axios执行完再去处理sid数据吧
      Promise.all(all)
        .then(() => {
          let obj = JSON.stringify(this.sidarrs);
          let ischeaks=true
          // 跳转
           console.log(obj);
          this.$router.push({ name: "Tijiao", query: { obj,ischeaks } });
          // 有个bug 一直点再来一单又不购买就会一直增加 然后直接返回他们就会停留再购物车里面
          //  再次再来一单，会将购物车里同sid的的东西都添加到确认提交里面
          // 所以再来一单跳转过后需要将刚刚经过到购物车的东西删掉，防止后面再来一单数量不对

          //这个问题在立即购物也可能需要删掉 看老板需求 ，这里就不删了，
        })
        .catch((shibai) => {
         
        });
    },
  },
};
</script>

<style lang="less" scoped>
.forgetpassword {
  padding: 50px 10px 0;
  min-height: 100vh;
  box-sizing: border-box;
  background: #f4f4f4;
  /deep/ .van-nav-bar {
    border-bottom: 1px solid #1e1e1e;
    margin-bottom: 10px;
  }
  .product {
    background-color: #fdfdfd;

    /deep/ .van-swipe-cell {
      padding: 10px;
      height: 80px;

      border-bottom: 1px solid gray;
      .van-swipe-cell__wrapper {
        height: 100%;
        .van-cell-group {
          height: 100%;
          .cell-box {
            height: 100%;

            border-radius: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px 0;
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
              }
            }
          }
        }
      }
    }
    .piece {
      display: flex;
      padding: 10px;
      justify-content: space-between;
      div {
        &:first-child {
          font-size: 16px;
          font-weight: 700;
        }
        &:last-child {
          font-size: 16px;
          font-weight: 700;
          color: #0b37be;
        }
      }
    }
    .again-purchase {
      padding: 10px 0;
      .van-button {
        height: 30px;
        border-color: #dcdcdc;
        border-radius: 10px;
        background-color: white;
        &:first-child {
          color: white;
          background-color: #0b37be;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>