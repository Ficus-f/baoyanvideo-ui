<template>
  <div class="search-course">
    <course-list :courseList="currentCourseList"></course-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import CourseList from "@/components/CourseList.vue";
import { HttpManager } from "@/api";

export default defineComponent({
  components: {
    CourseList,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();

    const currentCourseList = ref([]); // 存放的课程
    const searchWord = computed(() => store.getters.searchWord);

    watch(searchWord, (value) => {
      searchCourse(value);
    });

    // 搜索音乐
    async function searchCourse(value) {
      if (!value) {
        currentCourseList.value = [];
        return;
      }
      const result = (await HttpManager.getCourseOfSearchWord(value)) as ResponseBody;
      if (!result.data.items.length) {
        currentCourseList.value = [];
        (proxy as any).$message({
          message: "暂时没有相关课程",
          type: "warning",
        });
      } else {
        currentCourseList.value = result.data.items;
      }
    }

    onMounted(() => {
      searchCourse(proxy.$route.query.keywords);
    });

    return {
      currentCourseList,
    };
  },
});
</script>
