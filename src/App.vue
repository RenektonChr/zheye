<template>
  <div class="container w-100">
    <global-header :user="currentUser" @handle-logout="handleLogout" />
    <loading
      v-if="isLoading"
      text="拼命加载中"
      background="rgba(0,0,0,.8)"
    ></loading>
    <router-view />
    <Footer class="text-center py-4 text-seconddary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">格物</li>
          <!-- <li class="list-inline-item">致知</li>
          <li class="list-inline-item">诚意</li> -->
        </ul>
      </small>
    </Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalHeader from "./components/GlobalHeader/index.vue";
import Footer from "./components/Footer/index.vue";
import Loading from "./components/Loading/index.vue";
import createMessage from "./components/CreateMessage/index";
import { GlobalDataProps } from "./store/index";

export default defineComponent({
  name: "App",
  components: {
    GlobalHeader,
    Footer,
    Loading,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const router = useRouter();
    const route = useRoute();
    const currentUser = computed(() => store.state.user);
    const isLoading = computed(() => store.state.loading);
    const error = computed(() => store.state.error);
    watch(
      () => error.value.status,
      () => {
        const { status, message } = error.value;
        if (status && message) {
          createMessage(message, "error");
        }
      }
    );
    const handleLogout = () => {
      store.commit("logout");
      if (route.fullPath !== "/") {
        router.push("/");
      }
    };
    return {
      currentUser,
      isLoading,
      error,
      handleLogout,
    };
  },
});
</script>

<style></style>
