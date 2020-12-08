import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/view/Home/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/view/Login/index.vue'),
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: () => import('@/view/ColumnDetail/index.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('@/view/CreatePost/index.vue'),
      meta: { requiredLogin: true }
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log(to.meta)
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next({ name: 'login' })
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    next('/')
  } else {
    next()
  }
})
export default router
