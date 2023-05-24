<template>
  <div class="upload">
    <el-upload
      drag
      action=""
      :show-file-list="false"
      :http-request="fnUploadRequest"
      :before-upload="beforeAvatarUpload"
      crossOrigin="anonymous"
    >
    <!-- :on-success="handleAvatarSuccess" -->
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">将文件拖到此处或点击上传</div>
      <template #tip>
        <p class="el-upload__tip">只能上传 {{ uploadTypes.join("、") }} 文件, 且不超过10M</p>
      </template>
    </el-upload>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { UploadFilled } from "@element-plus/icons-vue";
import { HttpManager } from "@/api";

export default defineComponent({
  components: {
    UploadFilled,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();

    const uploadTypes = ref(["jpg", "jpeg", "png", "gif"]);
    const userId = computed(() => store.getters.userId);
    const filename = ref("");
    const imageType = ref("");
    const avatarURL = ref("");
    const putURL = ref("");

    function beforeAvatarUpload(file) {
      const ltCode = 2;
      const isLt10M = file.size / 1024 / 1024;
      const isExistFileType = uploadTypes.value.includes(file.type.replace(/image\//, ""));
      console.log(uploadTypes)

      if (isLt10M > ltCode || isLt10M <= 0) {
        (proxy as any).$message.error(`图片大小范围是 0~${ltCode}MB!`);
      }
      if (!isExistFileType) {
        (proxy as any).$message.error(`图片只支持 ${uploadTypes.value.join("、")} 格式!`);
      }

      if (isLt10M && isExistFileType) {
        filename.value = file.name;
        imageType.value = file.type;
      }

      return isLt10M && isExistFileType;
    }

    async function fnUploadRequest(option) {
      // 获取token
      const params = new URLSearchParams();
      params.append("id", userId.value);
      params.append("filename", filename.value);
      const result = (await HttpManager.uploadAvatarURL(params)) as ResponseBody;
      avatarURL.value = result.data.avatarURL;
      putURL.value = result.data.putURL;
      // 上传文件到阿里云
      const oReq = new XMLHttpRequest()
      oReq.open('PUT', putURL.value, true)
      oReq.send(option.file)
      oReq.onload = () => {
        proxy.$store.commit("setUserPic", avatarURL.value);
        (proxy as any).$message({
          message: '上传成功！',
          type: 'success',
        });
      }
    }
    async function uploadURL() {
      const params = new URLSearchParams();
      params.append("id", userId.value);
      params.append("filename", filename.value);

      const result = (await HttpManager.uploadAvatarURL(params)) as ResponseBody;
      avatarURL.value = result.data.avatarURL;
      putURL.value = result.data.putURL;
    }

    function handleAvatarSuccess(file) {
      uploadURL();
      // 上传文件到阿里云
      const oReq = new XMLHttpRequest()
      oReq.open('PUT', putURL.value, true)
      oReq.send(file)
      oReq.onload = () => {
        proxy.$store.commit("setUserPic", avatarURL.value);
        (proxy as any).$message({
          message: '上传云端成功！',
          type: 'success',
        });
      }
    }

    return {
      uploadTypes,
      uploadURL,
      beforeAvatarUpload,
      handleAvatarSuccess,
      fnUploadRequest,
    };
  },
});
</script>

<style scoped>
.upload {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
