<template>
  <div class="play-list-container">
    <baoyan-nav :styleList="GURULIST" :activeName="activeName" @click="handleChangeView"></baoyan-nav>
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
    </el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import BaoyanNav from "@/components/layouts/BaoyanNav.vue";
import GuruList from "@/components/GuruList.vue";
import { GURULIST } from "@/enums";
import { HttpManager } from "@/api";

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
