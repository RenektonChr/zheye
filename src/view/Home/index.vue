<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../../assets/callout.svg" alt="callout" class="w-50">
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="/create" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../../store/index'
import ColumnList from '../../components/ColumnList/index.vue'

export default defineComponent({
  components: {
    ColumnList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    onMounted(() => {
      store.dispatch('fetchColumns')
    })
    const list = computed(() => store.state.columns)
    const biggerColumnsLen = computed(() => store.getters.biggerColumnsLen)
    return {
      list,
      biggerColumnsLen
    }
  }
})
</script>

<style>

</style>
