<template>
  <el-container>
    <el-header>
      <baoyan-header></baoyan-header>
    </el-header>
    <el-main>
      <router-view />
      <baoyan-scroll-top></baoyan-scroll-top>
    </el-main>
    <el-footer>
      <baoyan-footer></baoyan-footer>
    </el-footer>
  </el-container>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from "vue";
import BaoyanHeader from "@/components/layouts/BaoyanHeader.vue";
import BaoyanScrollTop from "@/components/layouts/BaoyanScrollTop.vue";
import BaoyanFooter from "@/components/layouts/BaoyanFooter.vue";

const { proxy } = getCurrentInstance();

if (sessionStorage.getItem("dataStore")) {
  proxy.$store.replaceState(Object.assign({}, proxy.$store.state, JSON.parse(sessionStorage.getItem("dataStore"))));
}

window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("dataStore", JSON.stringify(proxy.$store.state));
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";
@import "@/assets/css/global.scss";

.el-container {
  min-height: calc(100% - 60px);
}
.el-header {
  padding: 0;
}
.el-main {
  padding-left: 0;
  padding-right: 0;
}
</style>
