<template>
  <div class="collect">
    <van-nav-bar title="收藏夹" fixed left-text="返回" @click-left="back"></van-nav-bar>
    <div class="shopcar-body">
      <van-empty description="购物袋没有东西啦，快到菜单看看吧" v-if="isshow">
        <van-button round type="danger" class="bottom-button" @click="gocaidan">去菜单</van-button>
      </van-empty>
      <van-swipe-cell :before-close="beforeClose" v-for="(value,index) in mycollects" :key="index">
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
              </div>
            </div>
          </div>
        </van-cell-group>
          <template #right>
          <van-button square color="#0b37be" @click="letthis(value)" text="取消" />
        </template>
      </van-swipe-cell>
    </div>
   
  </div>
</template>

<script>
import { Dialog } from "vant";
import { utils } from "../assets/js/utils";
export default {
  data() {
    return {
      isshow: true,
      ishide: true,
      isEdit: false,
      isAll: false,
      pid: "",
      mycollects: [],
    };
  },
  created() {
    this.eachcollect();
  },
  methods: {
    //   返回上一级
    back() {
      this.$router.go(-1);
    },
    // 查询收藏夹
    eachcollect() {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return this.$router.push({ name: "Login" });
      }
      this.axios({
        methos: "GET",
        appkey: this.appkey,
        url: "/findAllLike",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          ;

          if (result.data.code == 2000) {
            for (let i = 0; i < result.data.result.length; i++) {
              result.data.result[i].ischeak = false;
            }
            this.mycollects = result.data.result;

            if (this.mycollects.length) {
              this.isshow = false;
              this.ishide = true;
            } else {
              this.isshow = true;
              this.ishide = false;
            }
          }
        })
        .catch((err) => {
          ;
        });
    },
    // 获取点击的删除的id
    letthis(value) {
      this.pid = value.pid;
    },
    //确定取消收藏
    beforeClose({ position, instance }) {
      switch (position) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          Dialog.confirm({
            message: "确定取消收藏吗？",
          })
            .then(() => {
              instance.close();
              ;
              this.remove();
              //  确定删除
            })
            .catch((ree) => {
              // 取消删除
              ;
            });
          break;
      }
    },
    // 取消收藏方法
    remove() {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return;
      }
      //获取选择的规格
      let data = utils.queryString({
        appkey: this.appkey,
        pid: this.pid,
        tokenString,
      });

      this.axios({
        method: "POST",
        url: "/notlike",
        //如果get请求，参数需要放在params, 如果是post请求,参数需要放在data
        data,
      })
        .then((result) => {
          ;
          this.eachcollect()
        })
        .catch((err) => {
          ;
        });
    },

    // 点击商品进入详情
    toggles(value) {
      let pid = value.pid;
      this.$router.push({ name: "Detail", query: { pid } });
    },
    // 编辑
    compile() {
      this.isEdit = !this.isEdit;
    },
    // 去菜单
    gocaidan() {
      this.$router.push({ name: "Caidan" });
    },
  },
};
</script>

<style lang="less" scoped>
.collect {
  min-height: 100vh;
  background-color: #f2f2f2;
  box-sizing: border-box;
  padding: 10px;
  padding-top: 46px;
  padding-bottom: 100px;
}
/deep/ .van-nav-bar {
  background: #0d39bf;
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
    .van-submit-bar__bar {
      justify-content: space-between;
    }

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