import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Homepage from '@/views/Homepage.vue'
import LivingHabit from '@/views/LivingHabit.vue'
import Roommate from '@/views/Roommate.vue'
import Profile from '@/views/Profile.vue'
import Report from '@/views/Report.vue'
import Contract from '@/views/Contract .vue'
Vue.use(Router)

export default new Router({
  // 添加 mode: 'history' 之后将使用 HTML5 history 模式，该模式下没有 # 前缀
  mode: 'history',
  routes: [
    {
      path: '/',
      name: Login,
      component: Login
    },
    {
      path: '/Homepage',
      component: Homepage
    },
    {
      path: '/LivingHabit',
      component: LivingHabit
    },
    {
      path: '/Roommate',
      component: Roommate
    },
    {
      path: '/Profile',
      component: Profile
    },
    {
      path: '/Report',
      component: Report
    },
    {
      path: '/Contract',
      component: Contract
    }
  ]
})
