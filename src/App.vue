<template>
  <div class="container">
    <global-header :user="currentUser" />
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
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader/index.vue'
import Footer from './components/Footer/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Footer
  },
  setup () {
    const store = useStore()
    const currentUser = computed(() => store.state.user)
    return {
      currentUser
    }
  }
})
</script>

<style>
</style>
