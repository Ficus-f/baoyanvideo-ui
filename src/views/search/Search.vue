<template>
  <div class="search">
    <el-card class="search-guru">
      <h3>法师</h3>
      <guru-list v-if="haveGuru" :playList="playList" path="guru-detail"></guru-list>
      <el-empty v-if="!haveGuru" class="search-empty" description="暂无相关法师信息"  :image-size="100"/>
    </el-card>

    <el-card class="search-course">
      <h3>课程</h3>
      <course-list v-if="haveCourse" :courseList="currentCourseList"></course-list>
      <el-empty v-if="!haveCourse" class="search-empty" description="暂无相关课程信息"  :image-size="100"/>
    </el-card>
    
    <!-- <baoyan-nav :styleList="searchNavList" :activeName="activeName" @click="handleChangeView"></baoyan-nav> -->
    <!-- <component class="search-list" :is="currentView"></component> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, getCurrentInstance } from "vue";
import BaoyanNav from "@/components/layouts/BaoyanNav.vue";
import SearchCourse from "./SearchCourse.vue";
import SearchGuru from "./SearchGuru.vue"
import { useStore } from "vuex";
import GuruList from "@/components/GuruList.vue";
import CourseList from "@/components/CourseList.vue";
import { HttpManager } from "@/api";

export default defineComponent({
  components: {
    GuruList,
    CourseList,
    // BaoyanNav,
    // SearchCourse,
    // SearchGuru,
  },
  data() {
    return {
      searchNavList: [
        {
          name: "课程",
          value: "SearchCourse",
        },
        {
          name: "法师",
          value: "SearchGuru",
        },
      ],
      activeName: "课程",
      currentView: "SearchCourse",
    };
  },
  methods: {
    handleChangeView(item) {
      this.activeName = item.name;
      this.currentView = item.value;
    },
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();

    const playList = ref([]);
    const currentCourseList = ref([]); // 存放的课程
    const haveCourse = ref(false);
    const haveGuru = ref(false);
    const searchWord = computed(() => store.getters.searchWord);

    watch(searchWord, (value) => {
      haveCourse.value = false;
      haveGuru.value = false;
      playList.value = [];
      currentCourseList.value = [];
      getSearchList(value);
      searchCourse(value);
    });

    async function searchCourse(value) {
      if (!value) {
        currentCourseList.value = [];
        return;
      }
      const result = (await HttpManager.getCourseOfSearchWord(value)) as ResponseBody;
      if (!result.data) {
        currentCourseList.value = [];
        return;
      }
      if (!result.data.items.length) {
        currentCourseList.value = [];
        (proxy as any).$message({
          message: "暂时没有相关课程",
          type: "warning",
        });
      } else {
        currentCourseList.value = result.data.items;
        haveCourse.value = true;
      }
    }

    async function getSearchList(value) {
      if (!value) {
        playList.value = [];
        return;
      }
      const result = (await HttpManager.getGuruOfSearchWord(value)) as ResponseBody;
      if (!result.data) {
        playList.value = [];
        return;
      }
      
      if (!result.data.items.length) {
        (proxy as any).$message({
          message: "暂无该搜索内容",
          type: "warning",
        });
      } else {
        playList.value = result.data.items;
        haveGuru.value = true;
      }
    }

    onMounted(() => {
      searchCourse(proxy.$route.query.keywords);
      getSearchList(proxy.$route.query.keywords);
    });

    return {
      playList,
      currentCourseList,
      haveCourse,
      haveGuru,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";
@import "@/assets/css/global.scss";
.search-guru {
  margin-top: 1rem;
  margin-bottom: 1rem;

  h3 {
    margin-bottom: 1rem;
  }
}
.search-course {
  margin-top: 2rem;
  margin-bottom: 1rem;

  h3 {
    margin-bottom: 1rem;
  }
}
.el-empty {
  --el-empty-padding: 1rem 0;
}

.search {
  margin: auto;
  width: 900px;
  
  .search-list {
    min-height: 480px;
  }
}
</style>
