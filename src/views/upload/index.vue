<template>
  <div class="upload-container">
    <el-form class="upload-form"
      ref="form"
      :model="form"
      label-width="150px"
      label-position="right"
      size="mini"
    >
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="别名">
        <el-input type="alias" v-model="form.alias"></el-input>
      </el-form-item>
      <el-form-item label="集数">
        <el-input type="episode" v-model="form.episode"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.info"></el-input>
      </el-form-item>
      <el-form-item label="视频">
        <el-upload
          class="video-uploader"
          drag
          action=""
          :before-upload="fnBeforeUpload"
          :http-request="fnUploadRequest"
          :show-file-list="false"
          crossOrigin="anonymous"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postVideo } from '@/api/video.js'
import { getUploadToken } from '@/api/file.js'

export default {
  name: 'UploadIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        title: '',
        url: '',
        info: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    fnBeforeUpload (file) {
      const isMP4 = file.type === 'video/mp4'
      // const isLt2M = file.size / 1024 / 1024 < 2 //小于2M
      if (!isMP4) {
        this.$message.error('上传视频只能是 MP4 格式')
      }
      return isMP4
    },
    async fnUploadRequest (option) {
      try {
        console.log(option.file.name)
        const res = await getUploadToken(option.file.name)
        this.form.url = res.data.data.key
        // 上传文件到阿里云
        const oReq = new XMLHttpRequest()
        oReq.open('PUT', res.data.data.put, true)
        oReq.send(option.file)
        oReq.onload = () => {
          this.$notify({
            title: '上传云端成功！',
            message: `URL - ${res.data.data.key}`
          })
        }
      } catch (error) {
        this.$notify.error({
          title: '网络错误，或者服务器宕机',
          message: error
        })
      }
    },
    async onSubmit () {
      const videoInfo = this.form
      videoInfo.episode = parseInt(videoInfo.episode)
      try {
        const res = await postVideo(videoInfo)
        this.$notify({
          title: '视频上传成功',
          message: `您上传的视频ID为${res.data.data.id}`,
          type: 'success'
        })
      } catch (err) {
        this.$notify.error({
          title: '视频上传失败',
          message: err
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
  .upload-form {
    width: 60%;
  }
  :deep(.el-form-item__label) {
    width: 150px;
  }
  .video-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .video-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .video-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .video {
    max-width: 178px;
    max-height: 178px;
    display: block;
  }
</style>
