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
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :total="total"
          :page-size="limit"
          :small="true">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getVideos } from '@/api/video.js'

export default {
  name: 'ChanzongVideoIndex',
  components: {},
  props: {},
  data () {
    return {
      videos: [],
      start: 0,
      limit: 12,
      total: 0
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    handleCurrentChange (page) {
      this.start = this.limit * (page - 1)
      this.load()
    },
    async load () {
      try {
        const param = {
          alias: 'chanzong',
          start: this.start,
          limit: this.limit
        }
        const res = await getVideos(param)
        this.videos = res.data.data.items
        this.total = res.data.data.total
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
.pagination {
  text-align: center;
  position: fixed;
  bottom: 0;
  line-height: var(--footer-height);
  width: 100%;
}
</style>
