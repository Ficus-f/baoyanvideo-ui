<template>
  <div class="comment">
    <h2 class="comment-title">
      <span>评论</span>
      <span class="comment-desc">共 {{ commentList.length }} 条评论</span>
    </h2>
    <el-input class="comment-input" type="textarea" placeholder="期待您的精彩评论..." :rows="2" v-model="textarea" />
    <el-button class="sub-btn" type="primary" @click="submitComment()">发表评论</el-button>
  </div>
  <ul class="popular">
    <li v-for="(item, index) in commentList" :key="index">
      <el-image class="popular-img" fit="contain" :src="getImageUrl(item.avatar)" />
      <div class="popular-msg">
        <ul>
          <li class="name">{{ item.username }}</li>
          <li class="time">{{ formatDate(item.CreatedAt) }}</li>
          <li class="content">{{ item.content }}</li>
        </ul>
      </div>
      <!-- <div ref="up" class="comment-ctr" @click="setSupport(item.id, item.up, index)">
        <div><baoyan-icon :icon="iconList.Support"></baoyan-icon> {{ item.up }}</div>
        <el-icon v-if="item.userId === userId" @click="deleteComment(item.id, index)"><delete /></el-icon>
      </div> -->
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, toRefs, computed, watch, reactive, onMounted } from "vue";
import { useStore } from "vuex";
// import { Delete } from "@element-plus/icons-vue";
// import BaoyanIcon from "@/components/layouts/BaoyanIcon.vue";
import mixin from "@/mixins/mixin";
import { HttpManager } from "@/api";
import { Icon } from "@/enums";
import { formatDate } from "@/utils";

export default defineComponent({
  components: {
    // BaoyanIcon,
    // Delete,
  },
  props: {
    playId: String || Number, // 课程ID/视频ID --- [歌曲ID或歌单ID]
    type: Number, // 课程（1）/单个视频（0） --- [歌单（1）/歌曲（0）]
  },
  setup(props) {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const { checkStatus, getImageUrl } = mixin();

    const { playId, type } = toRefs(props);
    const commentList = ref([]); // 存放评论内容
    const textarea = ref(""); // 存放输入内容
    const iconList = reactive({
      Support: Icon.Support,
    });
    const userId = computed(() => store.getters.userId);
    // const videoId = computed(() => store.getters.songId);
    watch(playId, () => {
      getComment();
    });

    // 获取所有评论
    async function getComment() {
      try {
        const result = (await HttpManager.getAllComment(type.value, playId.value)) as ResponseBody;
        commentList.value = result.data;
        if (result.data === null || result.data.length === 0) {
          commentList.value = []
        }
        for (let index = 0; index < commentList.value.length; index++) {
          // 获取评论用户的昵称和头像
          const resultUser = (await HttpManager.getUserOfId(commentList.value[index].userId)) as ResponseBody;
          commentList.value[index].avatar = resultUser.data.avatar;
          commentList.value[index].username = resultUser.data.username;
        }
      } catch (error) {
        console.error(error);
      }
    }

    // 提交评论
    async function submitComment() {
      if (!checkStatus()) return;

      // 0 代表歌曲， 1 代表歌单
      const params = new URLSearchParams();
      if (type.value === 1) {
        params.append("courseId", `${playId.value}`);
      } else if (type.value === 0) {
        params.append("videoId", `${playId.value}`);
      }
      params.append("userId", userId.value);
      params.append("type", `${type.value}`);
      params.append("content", textarea.value);

      const result = (await HttpManager.setComment(params)) as ResponseBody;
      (proxy as any).$message({
        message: result.message,
        type: result.type,
      });

      if (result.success) {
        textarea.value = "";
        await getComment();
      }
    }

    // 删除评论
    async function deleteComment(id, index) {
      const result = (await HttpManager.deleteComment(id)) as ResponseBody;
      (proxy as any).$message({
        message: result.message,
        type: result.type,
      });

      if (result.success) commentList.value.splice(index, 1);
    }

    // 点赞
    async function setSupport(id, up, index) {
      if (!checkStatus()) return;

      const params = new URLSearchParams();
      params.append("id", id);
      params.append("up", up + 1);

      const result = (await HttpManager.setSupport(params)) as ResponseBody;
      if (result.success) {
        // proxy.$refs.up[index].children[0].style.color = "#2796dd";
        await getComment();
      }
    }

    onMounted(() => {
      getComment();
    });

    return {
      userId,
      commentList,
      textarea,
      iconList,
      attachImageUrl: HttpManager.attachImageUrl,
      submitComment,
      setSupport,
      formatDate,
      deleteComment,
      getImageUrl,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";
@import "@/assets/css/global.scss";

/*评论*/
.comment {
  position: relative;
  margin-bottom: 60px;

  .comment-title {
    height: 50px;
    line-height: 50px;

    .comment-desc {
      font-size: 14px;
      font-weight: 400;
      color: $color-grey;
      margin-left: 10px;
    }
  }

  .comment-input {
    display: flex;
    margin-bottom: 20px;
  }

  .sub-btn {
    position: absolute;
    right: 0;
  }
}

/*热门评论*/
.popular {
  width: 100%;
  > li {
    border-bottom: solid 1px rgba(0, 0, 0, 0.1);
    padding: 15px 0;
    display: flex;
    .popular-img {
      width: 50px;
    }

    .popular-msg {
      padding: 0 20px;
      flex: 1;
      li {
        width: 100%;
      }
      .time {
        font-size: 0.6rem;
        color: rgba(0, 0, 0, 0.5);
      }
      .name {
        color: rgba(0, 0, 0, 0.5);
      }
      .content {
        font-size: 1rem;
      }
    }

    .comment-ctr {
      display: flex;
      align-items: center;
      width: 80px;
      font-size: 1rem;
      cursor: pointer;

      .el-icon {
        margin: 0 10px;
      }

      &:hover,
      :deep(.icon):hover {
        color: $color-grey;
      }
    }
  }
}

.icon {
  @include icon(1em);
}
</style>
