<template>
  <div class="layout-container">
    <!-- 标签导航栏 -->
    <el-menu
      :default-active="activeIndex"
      class="layout-navmenu"
      mode="horizontal"
      @select="handleSelect"
      router
    >
      <el-menu-item index="1" route="/">视频</el-menu-item>
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
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
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
