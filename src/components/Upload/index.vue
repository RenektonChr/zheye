<template>
  <div class="file-upload">
    <button class="btn btn-primary" @click.prevent="triggerUoload">
      <span v-if="fileStatus === 'loading'">正在上传...</span>
      <span v-else-if="fileStatus === 'success'">上传成功</span>
      <span v-else>点击上传</span>
    </button>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="handleFileChange"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import axios from 'axios'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type checkFunction = (file: File) => boolean
export default defineComponent({
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<checkFunction>
    }
  },
  emits: ['file-uploaded', 'file-uploaded-error'],
  setup (props, context) {
    const fileInput = ref<null | HTMLElement>(null)
    const fileStatus = ref<UploadStatus>('ready')
    const triggerUoload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement
      console.log('currentTarget--->', currentTarget)
      if (currentTarget.files) {
        const files = Array.from(currentTarget.files)
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0])
          if (!result) {
            if (fileInput.value) {
              const fileInputEle = fileInput.value as HTMLInputElement
              fileInputEle.value = ''
            }
            return
          }
        }
        fileStatus.value = 'loading'
        const formData = new FormData()
        formData.append('file', files[0])
        axios.post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(result => {
          fileStatus.value = 'success'
          context.emit('file-uploaded', result.data)
        }).catch(error => {
          console.log('error--->', e)
          fileStatus.value = 'error'
          context.emit('file-uploaded-error', { error })
        }).finally(() => {
          if (fileInput.value) {
            const fileInputEle = fileInput.value as HTMLInputElement
            fileInputEle.value = ''
          }
        })
      }
    }
    return {
      fileInput,
      triggerUoload,
      fileStatus,
      handleFileChange
    }
  }
})
</script>

<style>

</style>
