<template>
  <div class="post-detail-page">
    <modal title="删除文章"
      :visible="modalIsVisible"
      @modal-on-close="modalIsVisible = false"
      @modal-on-confirm="hideAndDelete"
    >
      <p>确定要删除这篇文章吗？</p>
    </modal>
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img :src="currentImageUrl" alt="currentPost.title" class="rounded-lg img-fluid my-4" v-if="currentImageUrl">
      <h2 class="mb-4">{{currentPost.title}}</h2>
      <div class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0">
        <div class="col">
          <user-profile :user="currentPost.author" v-if="typeof currentPost.author === 'object'"></user-profile>
        </div>
        <span class="text-muted col text-right font-italic">发表于：{{currentPost.createdAt}}</span>
      </div>
      <div v-html="currentHTML"></div>
      <div v-if="showEditArea" class="btn-group mt-5">
        <router-link
          type="button"
          class="btn btn-success"
          :to="{name: 'create', query: { id: currentPost._id}}"
        >
          编辑
        </router-link>
        <button type="button" class="btn btn-danger" @click.prevent="modalIsVisible = true">删除</button>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { GlobalDataProps, PostProps, ImageProps, UserProps, ResponseType } from '../../store/index'
import MarkdownIt from 'markdown-it'
import UserProfile from '../../components/UserProfile/index.vue'
import Modal from '../../components/Modal/index.vue'
import CreateMessage from '../../components/CreateMessage'
export default defineComponent({
  components: {
    UserProfile,
    Modal
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const route = useRoute()
    const currentId = route.params.id
    const md = new MarkdownIt()
    const modalIsVisible = ref(false)
    onMounted(() => {
      store.dispatch('fetchPost', currentId)
    })
    const currentPost = computed<PostProps>(() => store.getters.getCurrentPost(currentId))
    const currentHTML = computed(() => {
      const { content, isHTML } = currentPost.value
      if (currentPost.value && content) {
        return isHTML ? content : md.render(content)
      }
    })
    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user
      if (currentPost.value && currentPost.value.author && isLogin) {
        const postAuthor = currentPost.value.author as UserProps
        return postAuthor._id === _id
      } else {
        return false
      }
    })
    const currentImageUrl = computed(() => {
      if (currentPost.value && currentPost.value.image) {
        const { image } = currentPost.value
        return (image as ImageProps).url + '?x-oss-process=image/resize,w_850'
      } else {
        return null
      }
    })
    const hideAndDelete = () => {
      modalIsVisible.value = false
      store.dispatch('deletePost', currentId).then((rawData: ResponseType<PostProps>) => {
        CreateMessage('删除成功', 'success', 2000)
        router.push({ name: 'column', params: { id: rawData.data.column } })
      })
    }
    return {
      currentPost,
      currentHTML,
      currentImageUrl,
      showEditArea,
      modalIsVisible,
      hideAndDelete
    }
  }
})
</script>

<style>

</style>
