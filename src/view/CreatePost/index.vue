<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <upload
      action="/upload"
      :beforeUpload="uploadCheck"
      @file-uploaded="handleFileUploaded"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4 file-upload-container"
    >
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary">
            <span class="sr-only"></span>
          </div>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" alt="">
      </template>
    </upload>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          :rules="titleRules"
          placeholder="请输入文章标题"
          type="text"
          v-model="titleVal"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          rows="10"
          :rules="contentRules"
          placeholder="请输入文章详情"
          tag="textarea"
          v-model="contentVal"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { GlobalDataProps, PostProps, ResponseType, ImageProps } from '../../store/index'
import ValidateForm from '@/components/ValidateForm/index.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput/index.vue'
import Upload from '../../components/Upload/index.vue'
import { beforeUploadCheck } from '../../utils/helper'
import CreateMessage from '../../components/CreateMessage/index'
export default defineComponent({
  components: {
    ValidateForm,
    ValidateInput,
    Upload
  },
  setup () {
    const router = useRouter()
    const store = useStore<GlobalDataProps>()
    const titleVal = ref('')
    const contentVal = ref('')
    let imageId = ''
    const titleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]
    const handleFileUploaded = (rawData: ResponseType<ImageProps>) => {
      if (rawData.data._id) {
        imageId = rawData.data._id
      }
    }
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column, _id } = store.state.user
        if (column) {
          const newPost: PostProps = {
            title: titleVal.value,
            content: contentVal.value,
            column,
            author: _id
          }
          if (imageId) {
            newPost.image = imageId
          }
          store.dispatch('createPost', newPost).then((res) => {
            console.log(res)
            CreateMessage('发表成功', 'success')
            router.push({ name: 'column', params: { id: column } })
          })
        }
      }
    }
    const uploadCheck = (file: File) => {
      const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 1 })
      const { passed, error } = result
      if (error === 'format') {
        CreateMessage('上传图片只能上传JPG/PNG格式！', 'error')
      }
      if (error === 'size') {
        CreateMessage('上传图片大小不能超过1Mb！', 'error')
      }
      return passed
    }
    return {
      titleVal,
      contentVal,
      titleRules,
      contentRules,
      onFormSubmit,
      uploadCheck,
      handleFileUploaded
    }
  }
})
</script>

<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
}
.create-post-page .file-upload-container img{
  height: 100%;
  width: 100%;
  object-fit: cover;
  cursor: pointer;
}
</style>
