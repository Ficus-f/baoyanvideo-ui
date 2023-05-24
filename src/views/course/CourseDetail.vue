<template>
  <el-container>
    <el-aside class="course-slide">
      <el-image class="course-img" fit="contain" :src="getImageUrl(courseDetail.pic)" />
      <h3 class="course-info">{{ courseDetail.title }}</h3>
      <!-- <el-button type="primary">
        <el-icon class="el-icon--right"><Download /></el-icon>
      </el-button> -->
      <!-- <el-icon><Star /></el-icon> -->
      <!-- <el-icon><StarFilled /></el-icon> -->
      <!-- <el-button link type="warning" :icon="Star" /> -->
    </el-aside>
    <el-main class="course-main">
      <h1>简介</h1>
      <p>{{ courseDetail.introduction }}</p>
      <!-- 展示视频列表 -->
      <video-list class="course-body" :videoList="currentVideoList" :courseId="courseId + ''"></video-list>
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
      <comment :playId="courseId + ''" :type="1"></comment>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, getCurrentInstance, onMounted } from "vue";
import { useStore } from "vuex";
import mixin from "@/mixins/mixin";
import VideoList from "@/components/VideoList.vue";
import Comment from "@/components/Comment.vue";
import { HttpManager } from "@/api";
import { Download, Star } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    VideoList,
    Comment,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const { checkStatus, getImageUrl } = mixin();

    const currentVideoList = ref([]); // 存放当前课程的视频列表
    const currentPage = ref(1);
    const pageSize = ref(12);
    const total = ref(0); 
    const courseId = ref(""); // 当前课程的ID
    const score = ref(0);
    const rank = ref(0);
    const disabledRank = ref(false);
    const assistText = ref("评价");
    const courseDetail = computed(() => store.getters.courseDetail); // 单个视频的信息
    const userId = computed(() => store.getters.userId);

    courseId.value = courseDetail.value.id; // 给课程ID赋值

    onMounted(() => {
      getVideoListOfCourseId();
    });

    // 收集课程里的视频
    async function getVideoListOfCourseId() {
      const result = (await HttpManager.getVideoListOfCourseId(courseId.value, currentPage.value, pageSize.value)) as ResponseBody;
      currentVideoList.value = result.data.items;
      total.value = result.data.total;
    }

    function handleCurrentChange(val) {
      currentPage.value = val;
      getVideoListOfCourseId();
    }

    // 获取评分
    async function getRank(id) {
      const result = (await HttpManager.getRankOfCourseId(id)) as ResponseBody;
      rank.value = result.data / 2;
    }
    async function getUserRank(userId, courseId) {
      const result = (await HttpManager.getUserRank(userId, courseId)) as ResponseBody;
      score.value = result.data / 2;
      disabledRank.value = true;
      assistText.value = "已评价";
    }
    // 提交评分
    async function pushValue() {
      if (disabledRank.value || !checkStatus()) return;

      const params = new URLSearchParams();
      params.append("courseId", courseId.value);
      params.append("consumerId", userId.value);
      params.append("score", (score.value * 2).toString());

      try {
        const result = (await HttpManager.setRank(params)) as ResponseBody;
        (proxy as any).$message({
          message: result.message,
          type: result.type,
        });

        if (result.success) {
          getRank(courseId.value);
          disabledRank.value = true;
          assistText.value = "已评价";
        }
      } catch (error) {
        console.error(error);
      }
    }

    // getUserRank(userId.value, courseId.value);
    // getRank(courseId.value); // 获取评分
    

    return {
      courseDetail,
      rank,
      score,
      disabledRank,
      assistText,
      currentVideoList,
      currentPage,
      pageSize,
      total,
      courseId,
      getImageUrl,
      pushValue,
      handleCurrentChange,
      Download,
      Star,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";

.course-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;

  .course-img {
    height: 250px;
    width: 250px;
    border-radius: 10%;
  }

  .course-info {
    width: 70%;
    padding-top: 2rem;
  }
}

.course-main {
  h1 {
    font-size: 22px;
  }

  p {
    color: rgba(0, 0, 0, 0.5);
    margin: 10px 0 20px 0px;
  }
  /*歌单打分*/
  .course-score {
    display: flex;
    align-items: center;
    margin: 1vw;

    h3 {
      margin: 10px 0;
    }
    span {
      font-size: 60px;
    }
    & > div:last-child {
      margin-left: 10%;
    }
  }

  .course-body {
    margin: 20px 0 20px 0px;
  }
}

@media screen and (min-width: $sm) {
  .course-slide {
    position: fixed;
    width: 400px;
  }
  .course-main {
    min-width: 600px;
    padding-right: 10vw;
    margin-left: 400px;
  }
}

@media screen and (max-width: $sm) {
  .course-slide {
    display: none;
  }
}
</style>
