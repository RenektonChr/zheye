<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link class="navbar-brand" to="/">然哥专栏</router-link >
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><a href="/login" class="btn btn-outline-light my-2">登录</a></li>
      <li class="list-inline-item"><a href="/signup" class="btn btn-outline-light my-2">注册</a></li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <Dropdown :title="`你好，${user.nickName}`">
          <dropdown-item>
            <router-link to="/create" class="dropdown-item">新建文章</router-link>
          </dropdown-item>
          <dropdown-item disabled>
            <a href="#" class="dropdown-item">编辑资料</a>
          </dropdown-item>
          <dropdown-item>
            <router-link :to="`/column/${user.column}`" class="dropdown-item">我的专栏</router-link>
          </dropdown-item>
          <dropdown-item>
            <a @click="handleLogout" class="dropdown-item">退出登录</a>
          </dropdown-item>
        </Dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Dropdown from '../Dropdown/index.vue'
import DropdownItem from '../DropdownItem/index.vue'
import { UserProps } from '../../store/index'
export default defineComponent({
  name: 'GlobalHeader',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  emits: ['handle-logout'],
  components: {
    Dropdown,
    DropdownItem
  },
  setup (props, context) {
    const handleLogout = () => {
      context.emit('handle-logout')
    }
    return {
      handleLogout
    }
  }
})
</script>

<style scoped>

</style>
