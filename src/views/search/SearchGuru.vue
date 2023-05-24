<template>
  <div class="search-guru">
    <guru-list :playList="playList" path="guru-detail"></guru-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import GuruList from "@/components/GuruList.vue";
import { HttpManager } from "@/api";

export default defineComponent({
  components: {
    GuruList,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();

    const playList = ref([]);
    const searchWord = computed(() => store.getters.searchWord);
    watch(searchWord, (value) => {
      getSearchList(value);
    });

    async function getSearchList(value) {
      if (!value) return;
      const result = (await HttpManager.getGuruOfSearchWord(value)) as ResponseBody;
      if (!result.data.items.length) {
        (proxy as any).$message({
          message: "暂无该搜索内容",
          type: "warning",
        });
      } else {
        playList.value = result.data.items;
      }
    }

    onMounted(() => {
      getSearchList(proxy.$route.query.keywords);
    });

    return {
      playList,
    };
  },
});
</script>
