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
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader, { UserProps } from './components/GlobalHeader/index.vue'
import Footer from './components/Footer/index.vue'
const currentUser: UserProps = {
  isLogin: true,
  name: '崔浩然',
  id: 1
}

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Footer
  },
  setup () {
    return {
      currentUser
    }
  }
})
</script>

<style>
</style>
