<template>
  <div class="show-video">
    <div class="video-header">
      <h2>{{video.title}}</h2>
      <!-- <div class="video-data">
        {{video.created_at | moment("YYYY-MM-DD h:mm:ss") }}创建 ·
        {{video.view}}观赏
      </div> -->
    </div>
    <el-row :gutter="20">
      <el-col :span="17">
        <video-player
          class="video-player-box"
          :options="playerOptions">
        </video-player>
      </el-col>
    </el-row>
    <div class="video-info">
      <pre>视频简介：{{video.info}}</pre>
    </div>
    <!-- <el-button type="primary" plain size="mini" @click="videoDownload">下载</el-button> -->
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import { getVideo } from '@/api/video'

export default {
  name: 'ShowVideo',
  data () {
    return {
      video: {},
      playerOptions: {
        fluid: true,
        autoplay: false,
        sources: [{
          type: 'video/mp4',
          src: ''
        }]
      }
    }
  },
  methods: {
    async load () {
      try {
        const res = await getVideo(this.$route.params.videoID)
        console.log(res.data.data)
        this.video = res.data.data
        this.playerOptions.sources[0].src = this.video.url
      } catch (error) {
        this.$notify.error(error)
      }
    },
    videoDownload () {
      window.location.href = this.video.url
    }
  },
  components: {
    videoPlayer
  },
  beforeMount () {
    this.load()
  }
}
</script>

<style>
  .video-header {
    margin-bottom: 8px;
  }
  .video-header h2{
    margin-bottom: 0px;
    font-size: 18px;
    font-weight: 500;
    color: #212121;
    line-height: 26px;
    height: 26px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .video-data {
    margin-top: 3px;
    font-size: 12px;
    color: #999;
  }
  .video-info {
    color: #18191c;
    font-size: 12px;
  }
  pre {
    margin: 5px;
  }
</style>
