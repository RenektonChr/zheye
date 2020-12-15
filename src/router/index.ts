import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'
import axios from 'axios'

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
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/view/Signup/index.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (!user.isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(e => {
        console.error(e)
        store.commit('logout')
        next('/login')
      })
    } else {
      if (requiredLogin) {
        next('/login')
      } else {
        next()
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})
export default router
