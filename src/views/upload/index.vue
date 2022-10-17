<template>
  <div class="upload-container">
    <h2>管理员，你好！</h2>
    <el-row :gutter="20">
      <el-col :span="14" :offset="4">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="url">
            <el-input type="url" v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" v-model="form.info"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { postVideo } from '@/api/video.js'

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
    async onSubmit () {
      const videoInfo = this.form
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    max-width: 178px;
    max-height: 178px;
    display: block;
  }
</style>
