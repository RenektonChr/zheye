<template>
  <div class="container">
    <ColumnList :list="list" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import ColumnList, { ColumnProps } from "./components/ColumnList/index.vue";
const testData: ColumnProps[] = [
  {
    id: 1,
    title: "test1的专栏",
    description: "这是test1的专栏，有一段非常有意思的简介，可以更新一下哦",
    avatar:
      "https://image.baidu.com/search/detail?ct=503316480&z=0&tn=baiduimagedetail&ipn=d&word=%E5%A4%B4%E5%83%8F&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&hd=undefined&latest=undefined&copyright=undefined&cs=3515088285,869864046&os=3235646919,3450947003&simid=3404717260,436834222&pn=0&rn=1&di=196790&ln=30&fr=&fmq=1461834053046_R&fm=&ic=0&s=0&se=&sme=&tab=0&width=&height=&face=undefined&is=0,0&istype=2&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&objurl=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201411%2F29%2F20141129194517_5Z2Lu.png&rpstart=0&rpnum=0&adpicid=0&force=undefined",
  },
  {
    id: 2,
    title: "test2的专栏",
    description: "这是test2的专栏，有一段非常有意思的简介，可以更新一下哦",
    avatar:
      "https://image.baidu.com/search/detail?ct=503316480&z=0&tn=baiduimagedetail&ipn=d&word=%E5%A4%B4%E5%83%8F&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&hd=undefined&latest=undefined&copyright=undefined&cs=3065335715,4197701299&os=2881999140,2042603032&simid=4139949256,547552291&pn=1&rn=1&di=115170&ln=30&fr=&fmq=1461834053046_R&fm=&ic=0&s=0&se=&sme=&tab=0&width=&height=&face=undefined&is=0,0&istype=2&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&objurl=http%3A%2F%2Fdiy.qqjay.com%2Fu%2Ffiles%2F2012%2F0217%2Fb693a3b6d232ffe861da22287c888729.jpg&rpstart=0&rpnum=0&adpicid=0&force=undefined",
  },
];

export default defineComponent({
  name: "App",
  components: {
    ColumnList,
  },
  setup() {
    return {
      list: testData,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
