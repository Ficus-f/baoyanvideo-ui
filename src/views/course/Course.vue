<template>
  <div class="play-list-container">
    <baoyan-nav :styleList="courseCategoryList" :activeName="activeName" @click="handleChangeView"></baoyan-nav>
    <play-list :playList="data" path="course-detail"></play-list>
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

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import BaoyanNav from "@/components/layouts/BaoyanNav.vue";
import PlayList from "@/components/PlayList.vue";
import { COURSECATEGORY } from "@/enums";
import { HttpManager } from "@/api";

export default defineComponent({
  components: {
    BaoyanNav,
    PlayList,
  },
  setup() {
    const activeName = ref("全部课程");
    const pageSize = ref(15); // 页数
    const currentPage = ref(1); // 当前页
    const courseCategoryList = ref(COURSECATEGORY); // 课程导航栏类别
    const currentCourseList = ref([]); // 当前请求到的符合要求的课程列表
    const data = computed(() => currentCourseList.value);
    const total = ref(0);

    // 获取全部课程
    async function getAllCourseList(currentPage) {
      let ret = ((await HttpManager.getCourseList(currentPage, pageSize.value)) as ResponseBody).data;
      currentCourseList.value = ret.items;
      total.value = ret.total;
    }
    // 通过类别获取课程
    async function getCourseListOfStyle(style, currentPage) {
      let ret = ((await HttpManager.getCourseListOfStyle(currentPage, pageSize.value, style)) as ResponseBody).data;
      currentCourseList.value = ret.items;
      total.value = ret.total;
    }

    try {
      getAllCourseList(currentPage.value);
    } catch (error) {
      console.error(error);
    }

    // 点击分类时触发
    async function handleChangeView(item) {
      activeName.value = item.name;
      currentCourseList.value = [];
      try {
        if (item.name === "全部课程") {
          currentPage.value = 1
          await getAllCourseList(currentPage.value);
        } else {
          currentPage.value = 1
          await getCourseListOfStyle(item.name, currentPage.value);
        }
      } catch (error) {
        console.error(error);
      }
    }
    // 点击分页时触发
    async function handleCurrentChange(val) {
      currentPage.value = val;
      currentCourseList.value = [];
      try {
        if (activeName.value === "全部课程") {
          await getAllCourseList(currentPage.value);
        } else {
          await getCourseListOfStyle(activeName.value, currentPage.value);
        }
      } catch (error) {
        console.error(error);
      }
    }
    return {
      activeName,
      courseCategoryList,
      pageSize,
      currentPage,
      total,
      data,
      handleChangeView,
      handleCurrentChange,
    };
  },
});
</script>
