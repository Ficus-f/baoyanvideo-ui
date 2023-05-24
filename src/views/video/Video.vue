<template>
  <el-container>
    <el-aside class="video-slide" width="970px">
      <video-player
        ref="videoPlayer"
        class="video-player-box"
        :options="options.playerOptions"
        >
      </video-player>
      <el-card
        class="video-info"
        shadow="never"
        body-style="padding:0"
      >
        <div class="video-info-header">
          <span class="video-info-course-title">{{ courseDetail.title }}</span>
          <span class="video-info-status">{{ getCourseStatus(courseDetail.status) }}</span>
        </div>
        <div class="video-info-video-title"> 标题：{{ currentVideo.title }}</div>
        <div class="video-info-content">简介：{{ getIntroduction(currentVideo.introduction) }} </div>
      </el-card>
    </el-aside>
    <el-main class="video-main">
      <!-- 展示视频列表 -->
      <el-card class="video-main-card">
        <h1>课程列表</h1>
        <el-scrollbar class="scrollbar" ref="scrollbarRef" max-height="20rem">
          <!-- <div ref="innerRef"> -->
            <el-menu
              ref="box"
              class="course-menu"
              @select="handleSelect"
            >
              <el-menu-item v-for="(item, index) in currentVideoList"
                ref="subbox"
                :key="index"
                :class="{ 'is-active': item.id == videoId }"
                :index="index + ''"
              >
                <!-- <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="item.title"
                  placement="bottom-end"
                > -->
                  <div
                    class="menu-box"
                    @mouseenter="vMouseenter()"
                    @mouseleave="vMouseleave()" 
                    ref="filledRef"
                    @click="visibleClick()"
                  >
                    {{ item.title }}
                  </div>
                  <!-- {{ item.title }} -->
                <!-- </el-tooltip> -->
              </el-menu-item>
            </el-menu>
          <!-- </div> -->
        </el-scrollbar>
      </el-card>
      <!-- 评论 -->
      <comment :playId="videoId + ''" :type="0"></comment>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, computed, getCurrentInstance, watch, onMounted, nextTick } from "vue";
import { reactive } from '@vue/reactivity'
import { useStore } from "vuex";
import mixin from "@/mixins/mixin";
import Comment from "@/components/Comment.vue";
import { HttpManager } from "@/api";
import { useRouter } from "vue-router";
import tipsUtils from "@/utils";

export default defineComponent({
  components: {
    Comment,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const { checkStatus, getCourseStatus, getIntroduction } = mixin();
    // 路由
    const router = useRouter();

    const videoId = ref("");
    const paramId:any = ref(router.currentRoute.value.params.id);
    const currentVideoList:any = ref([]); // 存放当前课程的视频列表
    const courseDetail:any = ref({})
    const score = ref(0);
    const rank = ref(0);
    const disabledRank = ref(false);
    const assistText = ref("评价");
    // const courseDetail = computed(() => store.getters.courseDetail); // 单个视频的信息
    const userId = computed(() => store.getters.userId);
    const videoPath = ref("video");
    const { routerManager } = mixin();
    const menuIndex = ref(""); // 当前列表中被选中的index
    const currentVideo:any = ref({});
    const filledRef = ref(null)
    const visible = ref(false) //默认设置不显示

    const { vMouseenter, vMouseleave, visibleClick } = tipsUtils(visible)
    //调用封装的事件

    // 给当前的视频ID赋值
    videoId.value = paramId.value;
    

    let options = reactive({
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        // aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4", // 类型
          src: 'https://vd3.bdstatic.com/mda-maunc8q8gpwgjts8/sc/cae_h264_nowatermark/1611907885/mda-maunc8q8gpwgjts8.mp4?v_from_s=hkapp-haokan-hbf&auth_key=1660703434-0-0-645160ca4ccdbc9c0c2088e7d56dd8b9&bcevod_channel=searchbox_feed&pd=1&cd=0&pt=3&logid=0034644783&vid=11220038343555649881&abtest=103890_1-103579_2&klogid=0034644783' // url地址
          // src: props.video // url地址
        }],
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        }
      }
    })

    // =========> 函数定义
    onMounted(() => {
      getCourseAndVideos(videoId.value);
      getShowVideo(videoId.value);
    });

    function scrollMenu(index) {
      if (index < 5) {
        return;
      } else {
        if (index === 5) {
          (proxy.$refs["scrollbarRef"] as any).setScrollTop(32);
        } else {
          (proxy.$refs["scrollbarRef"] as any).setScrollTop((index - 5) * 56 + 32);
        }
      }    
    }
    
    watch(
      [videoId, menuIndex], 
      ([newId, newIndex], [oldId, oldIndex]) => {
        if (newId !== oldId) {
          // getCourseAndVideos(videoId.value);
          getShowVideo(videoId.value);
        }
        if (oldIndex === "" && newIndex !== oldIndex) {
          nextTick(() => {
            scrollMenu(newIndex);
          })
        }
    })

    async function getCourseAndVideos(videoId) {
      const result = (await HttpManager.getCourseAndVideosOfVideoId(videoId)) as ResponseBody;
      courseDetail.value = result.data.course;
      currentVideoList.value = result.data.videos;
      //data为集合 
      currentVideoList.value.forEach(function(item, index) {
        item.title = item.title.trim();
        if (item.id == videoId) {
          menuIndex.value = index;
          currentVideo.value = item;
        }
      })
    }

    async function getShowVideo(videoId) {
      const result = (await HttpManager.getVideoURLOfId(videoId)) as ResponseBody;
      options.playerOptions.sources[0].src = result.data.url;
      const videoResult = (await HttpManager.getVideoOfId(videoId)) as ResponseBody;
      currentVideo.value = videoResult.data
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
      // params.append("courseId", courseId.value);
      params.append("consumerId", userId.value);
      params.append("score", (score.value * 2).toString());

      try {
        const result = (await HttpManager.setRank(params)) as ResponseBody;
        (proxy as any).$message({
          message: result.message,
          type: result.type,
        });

        if (result.success) {
          // getRank(courseId.value);
          disabledRank.value = true;
          assistText.value = "已评价";
        }
      } catch (error) {
        console.error(error);
      }
    }

    function handleSelect(index) {
      const nextVideoId = currentVideoList.value[index].id;
      videoId.value = nextVideoId;
      routerManager(videoPath.value, { path: `/${videoPath.value}/${nextVideoId}` });
    }
    
    // getUserRank(userId.value, courseId.value);
    // getRank(courseId.value); // 获取评分
    // getCourseId(courseId.value); // 获取歌单里面的歌曲ID

    return {
      currentVideo,
      videoId,
      options,
      courseDetail,
      rank,
      score,
      disabledRank,
      assistText,
      currentVideoList,
      pushValue,
      handleSelect,
      getCourseStatus,
      getIntroduction,
      // 下面是鼠标延时展示全部标题
      filledRef,
      visible,
      vMouseenter,
      vMouseleave,
      visibleClick
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";

.video-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  width: 67vw;

  .video-player-box {
    width: 58vw;
    // height: 32.55vw;
  }
  .video-img {
    height: 250px;
    width: 250px;
    border-radius: 10%;
  }
  .video-info {
    width: 90%;
    padding-top: 0.1rem;
    margin-top: 2.5rem;
    border-left: none;
    border-right: none;
    .video-info-header {
      width: 85%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .video-info-course-title {
        margin-left: 2rem;
        padding-top: 0.7rem;
        font-size: 1.2rem;
        font-weight: 900;
        color: #212121;
      }
      .video-info-status {
        padding-top: 0.75rem;
        font-size: 0.9rem;
        font-weight: 400;
        color: #9c9c9c;
      }
    }
    .video-info-video-title {
      width: 85%;
      margin-left: 2rem;
      padding-top: 0.6rem;
      font-size: 1rem;
      font-weight: 600;
      color: #212121;
    }
    .video-info-content {
      width: 85%;
      margin-left: 2rem;
      padding-top: 0.7rem;
      padding-bottom: 0.75rem;
      font-size: 0.85rem;
    }
  }
}

.video-main {
  .video-main-card {
    width: 26rem;
    max-height: 26rem;
    // overflow-y: auto;
    // overflow-x: hidden;
    margin-bottom: 3rem;
    position: relative;

    .scrollbar {
      border-width: 1px;
      border-style: solid;
      border-color: #f4f4f4;
    }

    h1 {
      padding-bottom: 1rem;
    }

    .course-menu {
      width: 100%;
      // 
      
      
      --el-menu-border-color: #fff;
    }
  }
  h1 {
    font-size: 22px;
    color: #222;
  }

  .menu-box {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    text-overflow: ellipsis;  /*文字隐藏后添加省略号*/
    white-space: nowrap;   /*强制不换行*/
  }

  // p {
  //   color: rgba(0, 0, 0, 0.5);
  //   margin: 10px 0 20px 0px;
  // }
  // /*歌单打分*/
  // .video-score {
  //   display: flex;
  //   align-items: center;
  //   margin: 1vw;
  //
  //   & > div:last-child {
  //     margin-left: 10%;
  //   }
  // }
}
.el-menu-item.is-active{
  background: #f4f4f4;
  font-size: 1rem;
  // color: #5a9cf8;
  font-weight: 800;
}

@media screen and (min-width: $sm) {
  .video-slide {
    position: fixed;
    width: 65vw;
  }
  .video-main {
    min-width: 550px;
    padding-right: 7vw;
    margin-left: 65vw;
  }
}

// @media screen and (max-width: $sm) {
//   .video-slide {
//     display: none;
//   }
// }
</style>
