<template>
  <div class="layout-container">
    <!-- 标签导航栏 -->
    <el-menu
      :default-active="activeIndex"
      class="layout-navmenu"
      mode="horizontal"
      router
    >
      <el-menu-item index="1" route="/">秒懂楞严1000日</el-menu-item>
      <el-menu-item index="2" route="/guanxin">观心一支香</el-menu-item>
      <el-menu-item index="3" route="/yuqie">瑜伽师地论</el-menu-item>
      <el-menu-item index="4" route="/chanzong">禅宗永嘉集</el-menu-item>
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
      activeIndex: '1'
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
