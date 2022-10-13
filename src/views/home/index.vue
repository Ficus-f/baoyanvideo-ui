<template>
  <div class="home-container">
    <!-- 显示每日课程 -->
    <el-carousel
      :interval="60*60*1000"
      :initial-index="4"
      type="card"
      height="300px"
      :autoplay="false"
      trigger="click"
      :loop="false"
    >
      <el-carousel-item v-for="item in 5" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
      <el-carousel-item>
        <h3 class="medium">明日课程预告  <a href="#">点击查看更多</a> </h3>
      </el-carousel-item>
    </el-carousel>
    <!-- /显示每日课程 -->
    <!-- 课程 -->
    <el-divider content-position="left">课程</el-divider>
    <el-row>
      <el-col :span="4" v-for="(o, index) in 4" :key="o" :offset="index > 0 ? 1 : 2">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- /课程 -->
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  components: {},
  props: {},
  data () {
    return {
      currentDate: new Date()
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  // card的样式
  .time {
    font-size: 10px;
    color: #999;
  }
  .bottom {
    margin-top: 6px;
    line-height: 12px;
  }
  .button {
    padding: 0;
    float: right;
  }
  .image {
    width: 100%;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
</style>
