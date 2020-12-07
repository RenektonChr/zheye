<template>
  <div class="container">
    <global-header :user="currentUser" />
    <column-list :list="list" />
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          v-model="emailValue"
          :rules="emailRules"
          placeholder="请输入邮箱地址"
          type="text"
          ref="inputRef"
        >
        </validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          v-model="pwdValue"
          :rules="pwdRules"
          placeholder="请输入邮箱地址"
          type="password"
        >
        </validate-input>
      </div>
      <template #submit>
        <span>
          <button class="btn btn-danger">Submit</button>
        </span>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList/index.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader/index.vue'
import ValidateInput, { RulesProp } from './components/ValidateInput/index.vue'
import ValidateForm from './components/ValidateForm/index.vue'
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
    ColumnList,
    ValidateInput,
    ValidateForm
  },
  setup () {
    const inputRef = ref<any>()
    const emailValue = ref('123@test.com')
    const pwdValue = ref('123')
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
