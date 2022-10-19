<template>
  <div class="layout-container">
    <!-- 标签导航栏 -->
    <el-menu
      :default-active="activeIndex"
      class="layout-navmenu"
      mode="horizontal"
      router
      @select="handleSelect"
    >
      <el-menu-item index="1" route="/">秒懂楞严1000日</el-menu-item>
      <el-menu-item index="2" route="/guanxin">观心一支香</el-menu-item>
      <el-menu-item index="3" route="/yuqie">瑜伽师地论</el-menu-item>
      <el-menu-item index="4" route="/chanzong">禅宗永嘉集</el-menu-item>
      <el-menu-item index="5" route="/pusajie">菩萨戒略说</el-menu-item>
    </el-menu>
    <!-- /标签导航栏 -->
    <!-- 子路由出口 -->
    <router-view />
    <!-- /子路由出口 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data () {
    return {
      activeIndex: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    const path = this.$route.path
    if (path === '/guanxin') {
      this.activeIndex = '2'
    } else if (path === '/yuqie') {
      this.activeIndex = '3'
    } else if (path === '/chanzong') {
      this.activeIndex = '4'
    } else if (path === '/pusajie') {
      this.activeIndex = '5'
    } else {
      this.activeIndex = '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {}
  }
}
</script>

<style scoped lang="less">
  .layout-container {
    .layout-navmenu {
      margin-bottom: 8px;
      .el-menu-item {
        font-size: 10px;
        line-height: 30px;
        height: 30px;
      }
    }
  }
</style>
