<template>
  <div class="content">
    <el-table highlight-current-row :data="dataList" @row-click="handleClick">
      <el-table-column prop="title" label="课程" />
      <el-table-column prop="year" label="年份" />
      <el-table-column prop="count" label="集数" />
      <el-table-column prop="status" label="状态" />
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
    // MoreFilled,
  },
  props: {
    courseList: Array,
    path: String,
    show: {
      default: false
    }
  },
  emits: ["changeData"],
  setup(props) {
    const { getCourseStatus, checkStatus, downloadMusic, routerManager } = mixin();
    const { proxy } = getCurrentInstance();
    const store = useStore();

    const { courseList } = toRefs(props);
    const { path } = toRefs(props);
    const coursePath = ref("course-detail");

    const iconList = reactive({
      dislike: Icon.Dislike,
      like: Icon.Like,
    });

    const songUrl = computed(() => store.getters.songUrl);
    const singerName = computed(() => store.getters.singerName);
    const songTitle = computed(() => store.getters.songTitle);
    const dataList = computed(() => {
      const list = [];
      if (courseList.value !== null) {
        courseList.value.forEach((item: any, index) => {
          item["status"] = getCourseStatus(item.status);
          item["guruName"] = item.guruName;
          item["index"] = index;
          list.push(item);
        });
      }
      return list;
    });

    function handleClick(rowItem) {
      proxy.$store.commit("setCourseDetail", rowItem);
      routerManager(coursePath.value, { path: `/${coursePath.value}/${rowItem.id}` });
    }

    function handleEdit(row) {
      console.log("row", row);
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
      dataList,
      iconList,
      Delete,
      Download,
      songUrl,
      singerName,
      songTitle,
      handleClick,
      handleEdit,
      downloadMusic,
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
