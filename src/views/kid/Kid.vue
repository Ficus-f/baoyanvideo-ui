<template>
    <div class="play-list-container">
      hello, world!

      <div class="demo-image__lazy">
        <el-image v-for="(url, index) in urls"
        :key="url"
        :src="url"
        lazy
        :preview-src-list="urls"
        :initial-index="index"
        />
      </div>
      <!-- <baoyan-nav :styleList="GURULIST" :activeName="activeName" @click="handleChangeView"></baoyan-nav>
      <guru-list :playList="data" path="guru-detail"></guru-list>
      <el-pagination
        class="pagination"
        background
        layout="total, prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination> -->
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed } from "vue";
  import BaoyanNav from "@/components/layouts/BaoyanNav.vue";
  import GuruList from "@/components/GuruList.vue";
  import { GURULIST } from "@/enums";
  import { HttpManager } from "@/api";
  
  const urls = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
]

  // data
  const activeName = ref("全部法师");
  const pageSize = ref(15); // 页数
  const currentPage = ref(1); // 当前页
  const total = ref(0); // 总数
  const currentGuruList = ref([]);
  // computed
  const data = computed(() => currentGuruList.value);
  
  // 获取全部法师
  async function getAllGuruList(currentPage) {
    let ret = ((await HttpManager.getGuruList(currentPage, pageSize.value)) as ResponseBody).data;
    currentGuruList.value = ret.items;
    total.value = ret.total;
  }
  // 通过类别获取课程
  async function getGuruListOfStyle(style, currentPage) {
    let ret = ((await HttpManager.getGuruListOfStyle(currentPage, pageSize.value, style)) as ResponseBody).data;
    currentGuruList.value = ret.items;
    total.value = ret.total;
  }
  
  try {
    getAllGuruList(currentPage.value);
  } catch (error) {
    console.error(error);
  }
  
  // 点击分类时触发
  async function handleChangeView(item) {
    activeName.value = item.name;
    currentGuruList.value = [];
    try {
      if (item.name === "全部法师") {
        currentPage.value = 1
        await getAllGuruList(currentPage.value);
      } else {
        currentPage.value = 1
        await getGuruListOfStyle(item.name, currentPage.value);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  // 点击分页时触发
  async function handleCurrentChange(val) {
    currentPage.value = val;
    currentGuruList.value = [];
    try {
      if (activeName.value === "全部法师") {
        await getAllGuruList(currentPage.value);
      } else {
        await getGuruListOfStyle(activeName.value, currentPage.value);
      }
    } catch (error) {
      console.error(error);
    }
  }
  </script>
  
  <style scoped>
  .demo-image__lazy {
    height: 400px;
    overflow-y: auto;
  }
  .demo-image__lazy .el-image {
    display: block;
    min-height: 200px;
    margin-bottom: 10px;
  }
  .demo-image__lazy .el-image:last-child {
    margin-bottom: 0;
  }
  </style>