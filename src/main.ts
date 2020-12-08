import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

axios.defaults.baseURL = 'http://localhost:8080/api/'
axios.interceptors.request.use(config => {
  config.params = { ...config.params }
  return config
})
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
