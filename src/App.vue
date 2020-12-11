<template>
  <div class="container w-100">
    <global-header :user="currentUser" />
    <message :message="error.message" type="error" v-if="error.status" />
    <loading v-if="isLoading" text="拼命加载中" background="rgba(0,0,0,.8)"></loading>
    <router-view />
    <Footer class="text-center py-4 text-seconddary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
          <li class="list-inline-item">@ 2020 zheye专栏</li>
        </ul>
      </small>
    </Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader/index.vue'
import Footer from './components/Footer/index.vue'
import Loading from './components/Loading/index.vue'
import Message from './components/Message/index.vue'
import { GlobalDataProps } from './store/index'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Footer,
    Loading,
    Message
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const token = computed(() => store.state.token)
    const error = computed(() => store.state.error)
    onMounted(() => {
      if (currentUser.value.isLogin === false && token.value) {
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
        store.dispatch('fetchCurrentUser')
      }
    })
    return {
      currentUser,
      isLoading,
      error
    }
  }
})
</script>

<style>
</style>
