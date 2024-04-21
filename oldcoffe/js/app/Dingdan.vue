<template>
  <div class="from">
    <div class="fromtitle">
      <van-nav-bar title="订单列表" fixed></van-nav-bar>
    </div>
    <div class="from-body">
      <van-tabs animated sticky offset-top="50">
        <van-tab v-for="(value,index) in typedata" :key="index">
          <template #title>
            <div class="typeDesc" @click="cli(value)">
              <div>{{value.title}}</div>
            </div>
          </template>
          <div class="product">
            <div
              class="products"
              v-for="(v,i) in dataobj.products"
              :key="i"
              @click="goparticulars(v.oid)"
            >
              <div class="pro-box">
                <div class="box-title">
                  <div class="from-num">订单号:{{v.oid}}</div>
                  <div class="underway">{{v.underway}}</div>
                </div>
                <div class="box-body">
                  <div class="boxbody-left">
                    <div class="trade-name">店名</div>
                    <div class="product-name">{{v.name}}</div>
                    <div class="product-price">{{v.prices}}</div>
                  </div>
                  <div class="boxbody-right">
                    <div class="purchase-time">{{v.createdAt | formatDate('yyyy-MM-dd hh:mm:ss')}}</div>
                    <div class="again-purchase">
                      <van-button
                        type="default"
                        @click.stop="sure(v)"
                        v-if="v.status==1? true:false"
                      >确定收货</van-button>
                      <van-button
                        type="default"
                        @click.stop="dele(v)"
                        v-if="v.status==1? false:true"
                      >删除订单</van-button>
                      <van-button type="default" @click.stop="againshop(v.oid)">再来一单</van-button>
                    </div>
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
import { Dialog } from "vant";
import { utils } from "../../assets/js/utils";
export default {
  data() {
    return {
      status: false,
      sidarrs: [],
      statusnum: 0,
      typedata: [
        { title: "全部", status: 0 },
        { title: "未完成", status: 1 },
        { title: "已完成", status: 2 },
      ],
      // 商品简略
      dataobj: {
        products: [],
        product: [],
      },

      // 商品详情
    };
  },
  created() {
    this.acquirefrom(this.statusnum);
  },
  methods: {
    // 切换
    cli(value) {
      ;
      this.statusnum = value.status;

      this.acquirefrom(this.statusnum);
    },
    // 获取订单数据
    acquirefrom(status) {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return 
      }
      this.axios({
        method: "GET",
        url: "findOrder",
        params: {
          appkey: this.appkey,
          tokenString,
          status,
        },
      })
        .then((result) => {
          ;

          if (result.data.code == 70000) {
            // 由于订单是一个产品一个分类.需要拿oid进行分类
            // 翻转数组,让先下单的产品在下面
            result.data.result.reverse();
            // 将数组里的进行中 ==1放上面
            result.data.result = result.data.result.sort((a, b) => {
              return a.status - b.status;
            });
            let types = [];

            result.data.result.map((v) => {
              if (types.indexOf(v.oid) === -1) {
                types.push(v.oid);
              }
            });

            let products = {};
            types.map((v) => {
              products[v] = [];
              result.data.result.map((item) => {
                if (v == item.oid) {
                  products[v].push(item);
                }
              });
            });

            this.dataobj.product = products;

            let dataresult = [];

            for (let key in products) {
              // 新建一个对象
              let obj = {};
              obj.name = [];
              obj.count = [];
              obj.price = [];
              obj.pid = [];
              obj.id = [];
              obj.img = [];
              obj.prices = 0;

              products[key].map((v) => {
                obj.createdAt = v.createdAt;
                obj.createdAt = v.createdAt;
                obj.oid = v.oid;
                obj.status = v.status;

                obj.prices += v.count * v.price;
                obj.underway = v.status == 1 ? "进行中" : "已完成";
                obj.name.push(v.name);
                obj.count.push(v.count);
                obj.price.push(v.price);
                obj.pid.push(v.pid);
                obj.id.push(v.id);
                obj.img.push(v.smallImg);
              });
              if (obj.name.length >= 2) {
                obj.name = obj.name[0] + "等";
              } else {
                obj.name = obj.name[0];
              }
              dataresult.push(obj);
            }
            ;
            this.dataobj.products = dataresult;
          }
        })
        .catch((err) => {
          ;
        });
    },
    // 确定收货提示
    sure(value) {
      let url = "/receive";
      ;
      Dialog.confirm({
        title: "确定收货",
        message: "确定将已收到商品",
      })
        .then(() => {
          ;
          this.surefn(value, url);
          this.acquirefrom(this.statusnum);
        })
        .catch(() => {
          ;
        });
    },
    // 删除订单提示
    dele(value) {
      let url = "/removeOrder";
      Dialog.confirm({
        title: "确定删除订单",
        message: "此操作不可返回",
      })
        .then(() => {
          ;
          this.surefn(value, url);
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

      //参数序列化
      let data = utils.queryString({
        appkey: this.appkey,
        tokenString,
        oid: value.oid,
      });

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
          this.acquirefrom(this.statusnum);
        })
        .catch((err) => {
          this.$toast.clear();
          ;
        });
    },
    // 查看详情
    goparticulars(item) {
      let obj = this.dataobj.product[item];
      this.$router.push({ name: "fromparticulars", query: { obj } });
    },
    // 再来一但
    // 加到购物车
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
      let arr = this.dataobj.product[item];
   
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
.from {
  min-height: 100vh;
  padding-bottom: 70px;
  background-color: #f4f4f4;
  .fromtitle {
    height: 50px;
    /deep/ .van-nav-bar {
      height: 50px;
      border-bottom: 1px solid #f4f4f4;
    }
  }
  .from-body {
    /deep/ .van-tabs {
      .van-tab {
        .van-tab__text {
          width: 100%;
          height: 100%;

          .typeDesc {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
          }
        }
      }
      .van-sticky {
        margin-bottom: 15px;
      }
      .van-tabs__content {
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        .product {
          .products {
            width: 100%;

            border-radius: 5px;
            margin-bottom: 10px;
            .pro-box {
              background-color: white;
              box-sizing: border-box;
              padding: 10px;
              border-bottom: 15px solid #f4f4f4;
              .box-title {
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #e5e5e5;
                padding: 5px 0;
                .from-num {
                  color: #a0a0a0;
                  font-weight: 600;
                }
                .underway {
                  color: #2447be;
                  font-weight: 600;
                }
              }
              .box-body {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                .boxbody-left {
                  div {
                    text-align: left;
                    font-size: 14px;
                    font-weight: 700;
                    margin-bottom: 10px;
                    color: #212121;
                  }
                }
                .boxbody-right {
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  .purchase-time {
                    font-size: 8px;
                    color: #afafaf;
                  }
                  .again-purchase {
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
            }
          }
        }
      }
    }
  }
}
</style>