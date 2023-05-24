<template>
  <el-container>
    <el-aside class="album-slide">
      <el-image class="guru-img" fit="contain" :src="getImageUrl(guruDetail.pic)" />
      <div class="album-info">
        <!-- <h2>基本资料</h2>
        <ul>
          <li v-if="guruDetail.gender !== 2">性别：{{ getUserGender(guruDetail.gender) }}</li>
          <li>生日：{{ getBirth(guruDetail.birth) }}</li>
          <li>故乡：{{ guruDetail.location }}</li>
        </ul> -->
      </div>
    </el-aside>
    <el-main class="album-main">
      <h1>{{ guruDetail.name }}</h1>
      <p>{{ guruDetail.introduction }}</p>
      <course-list :courseList="currentCourseList" path="course-detail"></course-list>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import mixin from "@/mixins/mixin";
import CourseList from "@/components/CourseList.vue";
import { HttpManager } from "@/api";
import { getBirth } from "@/utils";

export default defineComponent({
  components: {
    CourseList,
  },
  setup() {
    const store = useStore();
    const { getUserGender, getImageUrl } = mixin();

    const currentCourseList = ref([]); // 当前法师的课程列表
    const guruDetail = computed(() => store.getters.guruDetail) as any; // 单个视频的信息
    
    onMounted(async () => {
      try {
        const result = (await HttpManager.getCourseOfGuruId(guruDetail.value.id)) as ResponseBody;
        currentCourseList.value = result.data.items;
      } catch (error) {
        console.error(error);
      }
    });

    return {
      guruDetail,
      currentCourseList,
      attachImageUrl: HttpManager.attachImageUrl,
      getImageUrl,
      getBirth,
      getUserGender,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";

.album-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;

  .guru-img {
    height: 250px;
    width: 250px;
    border-radius: 10%;
  }

  .album-info {
    width: 60%;
    padding-top: 2rem;
    li {
      width: 100%;
      height: 30px;
      line-height: 30px;
    }
  }
}

.album-main {
  p {
    color: rgba(0, 0, 0, 0.5);
    margin: 10px 0 20px 0px;
  }
}

@media screen and (min-width: $sm) {
  .album-slide {
    position: fixed;
    width: 400px;
  }
  .album-main {
    min-width: 600px;
    padding-right: 10vw;
    margin-left: 400px;
  }
}

@media screen and (max-width: $sm) {
  .album-slide {
    display: none;
  }
}
</style>
