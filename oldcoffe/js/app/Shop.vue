<template>
  <div class="shopcar">
    <van-nav-bar
      title="购物袋"
      :right-text="isshow?  '':  isEdit ? '完成' : '编辑'"
      fixed
      @click-right="compile"
    ></van-nav-bar>
    <div class="shopcar-body">
      <van-empty description="购物袋没有东西啦，快到菜单看看吧" v-if="isshow">
        <van-button round type="danger" class="bottom-button" @click="gocaidan">去菜单</van-button>
      </van-empty>
      <van-swipe-cell :before-close="beforeClose" v-for="(value,index) in resultdata" :key="index">
        <van-cell-group>
          <div class="cell-box">
            <div class="cheak">
              <van-checkbox v-model="value.ischeak" @change="checka(value)"></van-checkbox>
            </div>
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
                <div>
                  <van-stepper
                    v-model="value.count"
                    theme="round"
                    @change="changes(value)"
                    button-size="22"
                    disable-input
                  />
                </div>
              </div>
            </div>
          </div>
        </van-cell-group>

        <template #right>
          <van-button square color="#0b37be" @click="letthis(value)" text="删除" />
        </template>
      </van-swipe-cell>
    </div>
    <div class="shopca-bottom" v-if="ishide">
      <van-submit-bar :price="price" :button-text="isEdit ? '删除' : '提交订单'" @submit="onSubmit">
        <van-checkbox v-model="isAll" @click="allCheck">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { utils } from "../../assets/js/utils";

export default {
  data() {
    return {
      isshow: true,
      ishide: true,
      isEdit: false,
      isAll: false,
      resultdata: [],
      price: 0,
      sid: [],
    };
  },
  created() {

   
    this.eachshop();
    if (this.resultdata.length) {
      this.isshow = false;
      this.ishide = true;
    } else {
      this.isshow = true;
      this.ishide = false;
    }
  },
  updated() {
    if (this.resultdata.length) {
      this.isshow = false;
      this.ishide = true;
    } else {
      this.isshow = true;
      this.ishide = false;
    }
  },
  methods: {
    //   查询商品
    eachshop() {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return ;
      }
      this.axios({
        method: "GET",
        url: "/findAllShopcart",
        //如果get请求，参数需要放在params, 如果是post请求,参数需要放在data
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          this.$toast.clear();

          if (result.data.code == 5000) {
            for (let i = 0; i < result.data.result.length; i++) {
              result.data.result[i].ischeak = false;
            }

            this.resultdata = result.data.result;
          }
        })
        .catch((err) => {
          this.$toast.clear();
          ;
        });
    },
    //编辑
    compile() {
      this.isEdit = !this.isEdit;
    },
    // 获取点击的删除的id
    letthis(value) {
      this.sid = [];
      this.sid.push(value.sid);
      this.sid = JSON.stringify(this.sid);
    },
    //确定删除
    beforeClose({ position, instance }) {
      switch (position) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          Dialog.confirm({
            message: "确定删除吗？",
          })
            .then(() => {
              instance.close();
              this.remove();
              //  确定删除
            })
            .catch((ree) => {
              // 取消删除
            });
          break;
      }
    },
    // 提交订单或者删除商品
    onSubmit() {
      // 删除
      this.sid = [];

      this.resultdata.map((v) => {
        if (v.ischeak) {
          this.sid.push(v.sid);
        }
      });
      
      if (this.sid.length == 0) {
        Dialog.alert({
          message: "你没有选择商品哦",
        }).then(() => {
          // on close
        });
        return;
      }
      this.sid = JSON.stringify(this.sid);

      let obj = this.sid;
      let ischeaks=false
      if (this.isEdit) {
        this.remove();
        //  确定删除
      } else {
        this.$router.push({ name: "Tijiao", query: { obj,ischeaks } });
      }
    },
    // 单选
    checka(value) {
      let cheak = this.resultdata.every((v) => {
        return v.ischeak == true;
      });
      this.isAll = cheak;
      this.sum();
    },
    // 全选
    allCheck() {
      let isAll = this.isAll;

      this.resultdata.map((v) => {
        v.ischeak = isAll;
      });
      this.sum();
    },
    // 总价格
    sum() {
      this.price = 0;

      this.resultdata.map((v) => {
        if (v.ischeak) {
          this.price += v.count * v.price * 100;
        }
      });
    },
    // 改变数值
    changes(value) {
      this.resetshop(value);
      this.sum();
    },
    // 更新购物车
    resetshop(value) {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return;
      }
      //获取选择的规格
      let data = utils.queryString({
        appkey: this.appkey,
        tokenString,
        count: value.count,
        sid: value.sid,
      });
      this.axios({
        method: "POST",
        url: "/modifyShopcartCount",
        //如果get请求，参数需要放在params, 如果是post请求,参数需要放在data
        data,
      })
        .then((result) => {
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          ;
        });
    },

    // 删除
    remove() {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return;
      }
      //获取选择的规格
      let data = utils.queryString({
        appkey: this.appkey,
        tokenString,
        sids: this.sid,
      });

      this.axios({
        method: "POST",
        url: "/removeShopcart",
        //如果get请求，参数需要放在params, 如果是post请求,参数需要放在data
        data,
      })
        .then((result) => {
          this.eachshop();
          this.sum();
        })
        .catch((err) => {
          ;
        });
    },
    // 去菜单
    gocaidan() {
      this.$router.push({ name: "Caidan" });
    },
  },
};
</script>

<style lang="less" scoped>
.shopcar {
  min-height: 100vh;
  background-color: #f2f2f2;
  box-sizing: border-box;
  padding: 10px;
  padding-top: 46px;
  padding-bottom: 100px;
}
/deep/ .van-nav-bar {
  background: linear-gradient(to right, #ccffff, #0b37be);
  .van-nav-bar__title {
    color: white;
  }
  .van-nav-bar__text {
    color: white;
  }
}
.shopcar-body {
  padding: 20px 0;
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
          background-color: #fdfdfd;
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
.shopca-bottom {

  
  /deep/ .van-submit-bar {
    bottom: 71px;
    .van-submit-bar__price {
      color: #0b37be;
    }
    .van-button {
      // background-color: #0b37be;
      background: linear-gradient(to right, #ccffff, #0b37be);
    }
  }
}
</style>