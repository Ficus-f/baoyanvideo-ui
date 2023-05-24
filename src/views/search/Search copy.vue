<template>
  <div class="search">
    <baoyan-nav :styleList="searchNavList" :activeName="activeName" @click="handleChangeView"></baoyan-nav>
    <component class="search-list" :is="currentView"></component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaoyanNav from "@/components/layouts/BaoyanNav.vue";
import SearchCourse from "./SearchCourse.vue";
import SearchGuru from "./SearchGuru.vue"

export default defineComponent({
  components: {
    BaoyanNav,
    SearchCourse,
    SearchGuru,
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
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";
@import "@/assets/css/global.scss";

.search {
  margin: auto;
  width: 900px;
  
  .search-list {
    min-height: 480px;
  }
}
</style>
