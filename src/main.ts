import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

axios.defaults.baseURL = 'http://localhost:8080/api/'
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  return config
})
axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
}, e => {
  const { error } = e.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(error)
})
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
