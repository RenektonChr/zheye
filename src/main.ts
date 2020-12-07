import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './view/Home/index.vue'
import Login from './view/Login/index.vue'
import ColumnDetail from './view/ColumnDetail/index.vue'
import App from './App.vue'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
