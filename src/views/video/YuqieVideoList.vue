<template>
  <div class="video-container">
    <div class="top">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="8" :md="8" :lg="6" v-for="video in videos" :key="video.id">
          <el-card class="video-card" @click.native="goVideo(video)">
            <div>
              <div class="video-title">{{video.title}}</div>
              <div class="video-bottom clearfix">
                <span class="video-info">{{video.info.substring(0, 36)}}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getVideos } from '@/api/video.js'

export default {
  name: 'YuqieVideoIndex',
  components: {},
  props: {},
  data () {
    return {
      videos: [],
      start: 0,
      limit: 6,
      total: 0
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    handleCurrentChange (val) {
      this.start = this.limit * (val - 1) // val 页面
      this.load()
    },
    async load () {
      try {
        const param = {
          alias: 'yuqie'
        }
        const res = await getVideos(param)
        this.videos = res.data.data
      } catch (err) {
        this.$notify.error({
          title: '视频获取失败',
          message: err
        })
      }
    },
    goVideo (video) {
      this.$router.push({ name: 'showVideo', params: { videoID: video.id } })
    }
  },
  beforeMount () {
    this.load()
  }
}
</script>

<style scoped lang="less">
.video-title {
  margin: 4px 0px 4px 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 11px;
}
.video-bottom {
  margin-top: 4px;
}
.video-info {
  color: #909399;
  font-size: 9px;
}
.video-card {
  margin-bottom: 14px;
  cursor: pointer;
  min-height: 80px;
}
:deep(.el-card__body) {
  padding: 5px;
}
</style>
