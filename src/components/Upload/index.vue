<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="triggerUoload" v-bind="$attrs">
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary">正在上传...</button>
      </slot>
      <slot name="uploaded" v-else-if="fileStatus === 'success'" :uploadedData="uploadedData">
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="handleFileChange"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from 'vue'
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
    },
    uploaded: {
      type: Object
    }
  },
  emits: ['file-uploaded', 'file-uploaded-error'],
  inheritAttrs: false,
  setup (props, context) {
    console.log(props.uploaded)
    const fileInput = ref<null | HTMLElement>(null)
    const fileStatus = ref<UploadStatus>(props.uploaded ? 'success' : 'ready')
    const uploadedData = ref(props.uploaded)
    watch(() => {
      return props.uploaded
    }, (newValue) => {
      if (newValue) {
        fileStatus.value = 'success'
        uploadedData.value = newValue
      }
    })
    const triggerUoload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement
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
          uploadedData.value = result.data
          context.emit('file-uploaded', result.data)
        }).catch(error => {
          console.error(e)
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
      handleFileChange,
      uploadedData
    }
  }
})
</script>

<style>

</style>
