<template>
  <div class="baoyan-header">
    <!--图标-->
    <div class="header-logo" @click="goPage()">
      <baoyan-icon :icon="iconList.CHAN"></baoyan-icon>
      <span>{{ baoyanName }}</span>
    </div>
    <baoyan-header-nav class="baoyan-header-nav" :styleList="headerNavList" :activeName="activeNavName" @click="goPage"></baoyan-header-nav>
    <!--搜索框-->
    <div class="header-search">
      <el-input placeholder="搜索" :prefix-icon="Search" v-model="keywords" @keyup.enter="goSearch()" >
        <!-- <template #append>
          <el-button :icon="Search" />
        </template> -->
      </el-input>
    </div>
    <!--设置-->
    <baoyan-header-nav v-if="!token" :styleList="signList" :activeName="activeNavName" @click="goPage"></baoyan-header-nav>
    <el-dropdown class="user-wrap" v-if="token" trigger="click">
      <el-image class="user" fit="contain" :src="getImageUrl(userPic)" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(item, index) in menuList" :key="index" @click.stop="goMenuList(item.path)">{{ item.name }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance, computed, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import BaoyanIcon from "./BaoyanIcon.vue";
import BaoyanHeaderNav from "./BaoyanHeaderNav.vue";
import mixin from "@/mixins/mixin";
import { HEADERNAVLIST, SIGNLIST, MENULIST, Icon, BAOYANNAME, RouterName, NavName } from "@/enums";
import { HttpManager } from "@/api";

export default defineComponent({
  components: {
    BaoyanIcon,
    BaoyanHeaderNav,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const { changeIndex, routerManager, getImageUrl } = mixin();

    const baoyanName = ref(BAOYANNAME);
    const headerNavList = ref(HEADERNAVLIST); // 左侧导航栏
    const signList = ref(SIGNLIST); // 右侧导航栏
    const menuList = ref(MENULIST); // 用户下拉菜单项
    const iconList = reactive({
      CHAN: Icon.CHAN,
    });
    const keywords = ref("");
    const activeNavName = computed(() => store.getters.activeNavName);
    const userPic = computed(() => store.getters.userPic);
    const token = computed(() => store.getters.token);

    function goPage(path, name) {
      if (!path && !name) {
        changeIndex(NavName.Home);
        routerManager(RouterName.Home, { path: RouterName.Home });
      } else {
        changeIndex(name);
        routerManager(path, { path });
      }
    }

    async function goMenuList(path) {
      if (path == RouterName.SignOut) {
        const userId = computed(() => store.getters.userId);
        const result = (await HttpManager.logoutUser(userId)) as ResponseBody;
        (proxy as any).$message({
          message: result.message,
          type: result.type,
        });
        
        proxy.$store.commit("setToken", false);
        changeIndex(NavName.Home);
        routerManager(RouterName.Home, { path: RouterName.Home });
      } else {
        routerManager(path, { path });
      }
    }
    function goSearch() {
      if (keywords.value !== "") {
        proxy.$store.commit("setSearchWord", keywords.value);
        routerManager(RouterName.Search, { path: RouterName.Search, query: { keywords: keywords.value } });
      } else {
        (proxy as any).$message({
          message: "搜索内容不能为空",
          type: "error",
        });
      }
    }

    return {
      baoyanName,
      headerNavList,
      signList,
      menuList,
      iconList,
      keywords,
      activeNavName,
      userPic,
      token,
      Search,
      goPage,
      goMenuList,
      goSearch,
      attachImageUrl: HttpManager.attachImageUrl,
      getImageUrl,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";
@import "@/assets/css/global.scss";

@media screen and (min-width: $sm) {
  .header-logo {
    margin: 0 1rem;
  }
}

@media screen and (max-width: $sm) {
  .header-logo {
    margin: 0 1rem;
    span {
      display: none;
    }
  }
  .header-search {
    display: none;
  }
}

.baoyan-header {
  position: fixed;
  width: 100%;
  height: $header-height;
  line-height: $header-height;
  padding: $header-padding;
  margin: $header-margin;
  background-color: $theme-header-color;
  box-shadow: $box-shadow;
  box-sizing: border-box;
  z-index: 100;
  display: flex;
  white-space: nowrap;
  flex-wrap: nowrap;
}

/* LOGO */
.header-logo {
  font-size: $font-size-logo;
  font-weight: bold;
  cursor: pointer;
  .icon {
    @include icon(1.9rem, $color-black);
    vertical-align: middle;
  }
  span {
    margin-left: 1rem;
  }
}

.baoyan-header-nav {
  flex: 1;
}

/*搜索输入框*/
.header-search {
  margin: 0 20px;
  width: 100%;
  &::v-deep input {
    text-indent: 5px;
    max-width: $header-search-max-width;
    min-width: $header-search-min-width;
    border-radius: $header-search-radius;
    box-shadow: none;
    background-color: $color-light-grey;
    color: $color-black;
  }
}

/*用户*/
.user-wrap {
  position: relative;
  display: flex;
  align-items: center;

  .user {
    width: $header-user-width;
    height: $header-user-width;
    border-radius: $header-user-radius;
    margin-right: $header-user-margin;
    cursor: pointer;
  }
}
</style>
