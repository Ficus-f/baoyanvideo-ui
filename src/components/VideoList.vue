<template>
  <div class="content">
    <el-table highlight-current-row :data="dataList" @row-click="handleClick">
      <el-table-column prop="title" label="目录" />
      <el-table-column prop="guruName" label="主讲">
        <template #default="scope">
          <el-link
            type="primary"
            :underline="true"
            @click="handleGuruClick(scope.$index, scope.row)">{{ scope.row.guruName }}</el-link>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="courseName" label="课程" /> -->
      <el-table-column label="下载" width="80" align="center">
        <template #default="scope">
          <el-dropdown>
            <el-icon @click="handleEdit(scope.row)"><MoreFilled /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  :icon="Download"
                  @click="downloadVideo(scope.row)"
                >下载</el-dropdown-item>
                <el-dropdown-item :icon="Delete" v-if="show" @click="deleteCollection({ id: scope.row.id })">删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, toRefs, computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import mixin from "@/mixins/mixin";
import { MoreFilled, Delete, Download } from "@element-plus/icons-vue";
import { HttpManager } from "@/api";
import { Icon } from "@/enums";

export default defineComponent({
  components: {
    MoreFilled,
  },
  props: {
    videoList: Array,
    courseId: String,
    show: {
      default: false
    },
  },
  emits: ["changeData"],
  setup(props) {
    const { checkStatus } = mixin();
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const path = ref("guru-detail");
    const videoPath = ref("video");
    const { routerManager } = mixin();

    const { videoList, courseId } = toRefs(props);

    const iconList = reactive({
      dislike: Icon.Dislike,
      like: Icon.Like,
    });

    const songUrl = computed(() => store.getters.songUrl);
    const singerName = computed(() => store.getters.singerName);
    const songTitle = computed(() => store.getters.songTitle);
    const dataList = computed(() => {
      const list = [];
      if (videoList.value !== null && videoList.value.length > 0) {
        videoList.value.forEach((item: any, index) => {
          // item["videoName"] = item.title;
          // item["courseName"] = item.courseName;
          item["guruName"] = item.guruName;
          item["index"] = index;
          list.push(item);
        });
      }
      return list;
    });

    function handleClick(row) {
      routerManager(videoPath.value, { path: `/${videoPath.value}/${row.id}` });
    }

    async function downloadVideo(row) {
      const result = (await HttpManager.getVideoURLOfId(row.id)) as ResponseBody;
      window.location.href = result.data.url;
    }

    async function handleGuruClick(index, row) {
      try {
        const result = (await HttpManager.getGuruOfId(row.guruId)) as ResponseBody;
        const item = result.data;
        proxy.$store.commit("setGuruDetail", item);
        routerManager(path.value, { path: `/${path.value}/${item.id}` });
      } catch (error) {
        console.error(error);
      }
    }

    function handleEdit(row) {
      console.log("hello!");
      // console.log("row", row);
    }

    const userId = computed(() => store.getters.userId);

    async function deleteCollection({ id }) {
      if (!checkStatus()) return;

      const result = (await HttpManager.deleteCollection(userId.value, id)) as ResponseBody;
      (proxy as any).$message({
        message: result.message,
        type: result.type,
      });

      if (result.data === false) proxy.$emit("changeData", result.data);
    }

    return {
      path,
      dataList,
      iconList,
      Delete,
      Download,
      songUrl,
      singerName,
      songTitle,
      handleClick,
      handleGuruClick,
      handleEdit,
      downloadVideo,
      deleteCollection,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";
@import "@/assets/css/global.scss";

.content {
  background-color: $color-white;
  border-radius: $border-radius-songlist;
  padding: 10px;
}

.content:deep(.el-table__row.current-row) {
  color: $color-black;
  font-weight: bold;
}

.content:deep(.el-table__row) {
  cursor: pointer;
}

.icon {
  @include icon(1.2em, $color-black);
}
</style>
