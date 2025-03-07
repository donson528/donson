import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible/flexible'
import "./assets/font/iconfont.css"
import VueRouter from 'vue-router'

import axios from 'axios'
import VueAxios from 'vue-axios'
//导入vant框架的组件

import {
  Button,
  NavBar,
  tabbar,
  Form,
  Field,
  Icon,
  Toast,
  Notify,
  Lazyload,
  Swipe,
  SwipeItem,
  Search,
  Tab,
  Tabs,
  GoodsAction,
  GoodsActionButton,
  GoodsActionIcon,
  Stepper,
  SwipeCell,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  SubmitBar,
  Dialog,
  Empty,
  TabbarItem,
  AddressList,
  AddressEdit,
  ContactCard,
  Popup,
  NoticeBar ,
  Uploader
} from 'vant';




//全局注册
Vue
  .use(NavBar)
  .use(Button)
  .use(Form)
  .use(Field)
  .use(Icon)
  .use(Toast)
  .use(Notify)
  .use(Lazyload)
  .use(Swipe)
  .use(SwipeItem)
  .use(Search)
  .use(Tab)
  .use(Tabs)
  .use(GoodsAction)
  .use(GoodsActionButton)
  .use(GoodsActionIcon)
  .use(Stepper)
  .use(SwipeCell)
  .use(Cell)
  .use(CellGroup)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(SubmitBar)
  .use(Dialog)
  .use(Empty)
  .use(tabbar)
  .use(TabbarItem)
  .use(AddressList)
  .use(AddressEdit)
  .use(ContactCard)
  .use(Popup)
  .use(NoticeBar)
  .use(Uploader)



// 防止点击同一路径报错
let originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (url) {
  return originalPush.call(this, url).catch(err => err);
}
Vue.use(VueAxios, axios)


//设置请求基础路径
axios.defaults.baseURL = 'http://www.kangliuyong.com:10002'

//设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

Vue.prototype.appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='

Vue.config.productionTip = false

//全局注册过滤器, 一般用于格式化数
Vue.filter('formatDate', (value, format) => {
  //value: 需要格式化的数据
  //format: 指定格式 yyyy-MM-dd hh:mm:ss

  // ;

  let date = new Date(value);

  //获取年份
  let year = date.getFullYear();
  // ;
  if (/(y+)/.test(format)) {
    //获取匹配组的内容
    let content = RegExp.$1;
    // ;
    format = format.replace(content, year.toString().slice(4 - content.length));

    // ;
  }

  let o = {
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  };

  for (let key in o) {
    //构造动态正则
    let reg = new RegExp(`(${key}+)`);
    // ;
    if (reg.test(format)) {
      //获取匹配组的内容
      let content = RegExp.$1;
      // ;
      let k =  o[key] >= 10 ? o[key] : content.length == 2 ? '0' + o[key] : o[key];
      // ;
      format = format.replace(content, k);
      // ;
    }
  }

  return format;
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
