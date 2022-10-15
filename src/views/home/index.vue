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
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
        <!-- <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table> -->
      </el-carousel-item>
      <el-carousel-item>
        <h3 class="medium">明日课程预告  <a href="#">点击查看更多</a> </h3>
      </el-carousel-item>
    </el-carousel>
    <!-- /显示每日课程 -->
    <!-- 课程 -->
    <el-divider content-position="left">课程</el-divider>
    <el-row>
      <el-col :span="4" v-for="(item, index) in courseList" :key="index" :offset="index % 4 === 0 ? 2 : 1">
        <el-card :body-style="{ padding: '0px', cursor: 'pointer' }" shadow="hover">
          <el-image
            class="card-img"
            :src="require('@/assets/cover.jpg')"
            :fit="fill"></el-image>
          <div class= 'card-content' style="padding: 14px;">
            <span class="card-title">{{ item.title }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item.time }} 已更新</time>
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
      currentDate: new Date(),
      courseList: [
        {
          title: '秒懂楞嚴1000日',
          time: '10月11日'
        },
        {
          title: '瑜伽師地論',
          time: '10月12日'
        },
        {
          title: '菩薩戒略說',
          time: '10月13日'
        },
        {
          title: '禪宗永嘉集',
          time: '10月14日'
        },
        {
          title: '禪門高僧行儀',
          time: '10月15日'
        }
      ],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
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
  .el-carousel__item {
    .el-table__header-wrapper {
      .el-table__header {
        font-size: 6px;
      }
      .el-table__cell {
        font-size: 6px;
      }
    }
  }
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
  :deep(.el-table__cell) {
    padding: 4px 0;
  }
  // card的样式
  .bottom {
    margin-top: 2px;
    line-height: 12px;
  }
  .button {
    padding: 0;
    float: right;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
  .el-card {
    margin-bottom: 20px;
  }
  .card-img {
    display: block;
  }
  .card-content {
    .card-title {
      font-size: 12px;
    }
    .time {
      font-size: 8px;
      color: #999;
    }
  }
</style>
