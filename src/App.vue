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
import { defineComponent, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList/index.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader/index.vue'
import ValidateInput, { RulesProp } from './components/ValidateInput/index.vue'
import ValidateForm from './components/ValidateForm/index.vue'
import Footer from './components/Footer/index.vue'
const currentUser: UserProps = {
  isLogin: true,
  name: '崔浩然',
  id: 1
}
const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是test1的专栏，有一段非常有意思的简介，可以更新一下哦这是test1的专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar: require('../src/assets/pic.jpg')
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是test2的专栏，有一段非常有意思的简介，可以更新一下哦'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这是test3的专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar: require('../src/assets/pic.jpg')
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是test4的专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar: ''
  },
  {
    id: 5,
    title: 'test5的专栏',
    description: '这是test5的专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar: require('../src/assets/pic.jpg')
  },
  {
    id: 6,
    title: 'test6的专栏',
    description: '这是test6的专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar: require('../src/assets/pic.jpg')
  }
]

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    // ColumnList,
    // ValidateInput,
    // ValidateForm,
    Footer
  },
  setup () {
    const inputRef = ref<any>()
    const emailValue = ref('')
    const pwdValue = ref('')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱' }
    ]
    const pwdRules: RulesProp = [
      { type: 'required', message: '电子邮箱不能为空' }
    ]
    const onFormSubmit = (result: boolean) => {
      console.log('result--->', inputRef.value.validateInput())
      console.log(result)
    }
    return {
      list: testData,
      currentUser,
      emailRules,
      emailValue,
      pwdRules,
      pwdValue,
      onFormSubmit,
      inputRef
    }
  }
})
</script>

<style>
</style>
