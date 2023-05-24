<template>
  <!--轮播图-->
  <el-carousel class="swiper-container" type="card" height="24vw" :interval="4000">
    <el-carousel-item v-for="(item, index) in carouselList" :key="index">
      <!-- {{item.title}} -->
      <el-image
        style="width: 100%; height: 100%"
        :src="getImageUrl(item.pic)"
        @click="linkTo(item)"
        fit="cover"
      />
      <!-- <img :src="item.picImg" @click="clickCarousel" /> -->
    </el-carousel-item>
  </el-carousel>
  <!-- 热门课程（正在进行的课程） -->
  <new-video-list class="play-list-container" title="最新内容" path="video" :playList="recentVideoList"></new-video-list>
  <!-- /热门课程（正在进行的课程） -->
  <!-- 专区 -->
  <play-list class="play-list-container" title="课程" path="course-detail" :playList="courseList"></play-list>
  <!-- /专区 -->
  <!-- 热门法师分类 -->
  <guru-list class="play-list-container" title="法师" path="guru-detail" :playList="guruList"></guru-list>
  <!-- /热门法师分类 -->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, getCurrentInstance, computed } from "vue";
import PlayList from "@/components/PlayList.vue";
import GuruList from "@/components/GuruList.vue";
import NewVideoList from "@/components/NewVideoList.vue";
import { swiperList, NavName } from "@/enums";
import { HttpManager } from "@/api";
import mixin from "@/mixins/mixin";

export default defineComponent({
  components: {
    PlayList,
    GuruList,
    NewVideoList,
  },
  setup() {
    const recentVideoList = ref([]); // 最新课程
    const courseList = ref([]); // 课程列表
    const guruList = ref([]); // 法师列表

    const { changeIndex, routerManager, getImageUrl } = mixin();
    const { proxy } = getCurrentInstance();

    // swiperList
    const carouselList = ref([]);
    const videoPath = ref("video");

    onMounted(() => {
      changeIndex(NavName.Home);
      getCarouselList();
      getNewVideoList();
      getCourseList();
      getGuruList();
    });


    function linkTo (item) {
      proxy.$store.commit("setCourseDetail", item);
      routerManager(item.coursePath, { path: `/${item.coursePath}/${item.id}` });
    }

    function getNewVideoList() {
      HttpManager.getNewVideoList().then((res) => {
        recentVideoList.value = (res as ResponseBody).data.slice(0, 10);
      });
    }
    
    let currentPage = 1;
    let pageSize = 10;
    function getCourseList() {
      HttpManager.getCourseList(currentPage, pageSize).then((res) => {
        courseList.value = (res as ResponseBody).data.items.sort().slice(0, 10);
      });
    }
    
    function getGuruList() {
      HttpManager.getGuruList(currentPage, pageSize).then((res) => {
        guruList.value = (res as ResponseBody).data.items.sort().slice(0, 10);
      });
    }


    async function getCarouselList() {
      HttpManager.getCarouselList().then((res) => {
        carouselList.value = (res as ResponseBody).data.items.slice(0, 6);
        carouselList.value.forEach((item: any, index) => {
          item["coursePath"] = "course-detail";
        })
      });
    }

    return {
      linkTo,
      recentVideoList,
      courseList,
      guruList,
      carouselList,
      getImageUrl,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";

/*轮播图*/
.swiper-container {
  width: 90%;
  margin: auto;
  padding-top: 20px;
  img {
    width: 100%;
  }
}

.swiper-container:deep(.el-carousel__indicators.el-carousel__indicators--outside) {
  display: inline-block;
  transform: translateX(30vw);
}

.el-slider__runway {
  background-color: $color-blue;
}
</style>
