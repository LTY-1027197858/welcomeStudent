import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Login', // 重定向，即取代默认路径了
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login', // 登录
    name: 'Login',
    component: () => import('@/components/Login.vue')
  },
  {
    path: '/upPasswork', // 忘记密码
    name: 'UpPasswork',
    component: () => import('@/components/UpPasswork.vue')
  },
  {
    path: '/homePage', //  主页面
    name: 'HomePage',
    component: () => import('@/components/HomePage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
