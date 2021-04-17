import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // 添加 mode: 'history' 之后将使用 HTML5 history 模式，该模式下没有 # 前缀
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect : '/login',
      
    },
    {
      path: '/login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/Homepage',
      name: 'homepage',
      component: () => import('@/views/Homepage.vue')
    }
  ]
})
