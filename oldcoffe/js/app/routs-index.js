import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
    {
      path:"/login",
      name:"Login",
      component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    },
    {
      path:"/main",
      name:"Main",
      component: () => import(/* webpackChunkName: "about" */ '../views/Main.vue'),
      children:[
        {
          path:"shouye",
        name:"Shouye",
        component: () => import(/* webpackChunkName: "about" */ '../views/classfly/Shouye.vue'),
        },
        {
          path:"shop",
        name:"Shop",
        component: () => import(/* webpackChunkName: "about" */ '../views/classfly/Shop.vue'),
        },
        {
          path:"my",
        name:"My",
        component: () => import(/* webpackChunkName: "about" */ '../views/classfly/My.vue'),
        },
        {
          path:"caidan",
        name:"Caidan",
        component: () => import(/* webpackChunkName: "about" */ '../views/classfly/Caidan.vue'),
        },
        {
          path:"dingdan",
        name:"Dingdan",
        component: () => import(/* webpackChunkName: "about" */ '../views/classfly/Dingdan.vue'),
        },
      ]
    },
    {
      path:"/detail",
      name:"Detail",
      component: () => import(/* webpackChunkName: "about" */ '../views/Detail.vue'),
    },
    {
      path:"/tijiao",
      name:"Tijiao",
      component: () => import(/* webpackChunkName: "about" */ '../views/Tijiao.vue'),
    },
    {
      path:"/collect",
      name:"Collect",
      component: () => import(/* webpackChunkName: "about" */ '../views/Collect.vue'),
    },
    {
      path:"/site",
      name:"Site",
      component: () => import(/* webpackChunkName: "about" */ '../views/Site.vue'),
    },
    {
      path:"/personal",
      name:"Personal",
      component: () => import(/* webpackChunkName: "about" */ '../views/Personal.vue'),
    },
    {
      path:"/safety",
      name:"Safety",
      component: () => import(/* webpackChunkName: "about" */ '../views/Safety.vue'),
    },
    {
      path:"/setpasswo",
      name:"setpasswo",
      component: () => import(/* webpackChunkName: "about" */ '../views/setpasswo.vue'),
    },
    {
      path:"/forgetpassword",
      name:"Forgetpassword",
      component: () => import(/* webpackChunkName: "about" */ '../views/Forgetpassword.vue'),
    },
    {
      path:"/fromparticulars",
      name:"fromparticulars",
      component: () => import(/* webpackChunkName: "about" */ '../views/fromparticulars.vue'),
    },
    {
      path: '*',
      redirect: {
        name: 'Shouye'
      }
    }
]

const router = new VueRouter({
  routes
})

export default router
