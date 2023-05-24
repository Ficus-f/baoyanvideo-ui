<template>
  <el-form ref="updateForm" label-width="70px" :model="registerForm" :rules="SignUpRules">
    <el-form-item prop="username" label="用户名">
      <el-input disabled v-model="registerForm.username" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="registerForm.gender">
        <el-radio :label="2">女</el-radio>
        <el-radio :label="1">男</el-radio>
        <el-radio :label="0">Not listed</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item prop="introduction" label="签名">
      <el-input type="textarea" placeholder="签名" v-model="registerForm.introduction"></el-input>
    </el-form-item>
    <el-form-item prop="location" label="地区">
      <el-select v-model="registerForm.location" placeholder="地区" style="width: 100%">
        <el-option v-for="item in AREA" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="phoneNum" label="手机">
      <el-input placeholder="手机" v-model="registerForm.phoneNum"></el-input>
    </el-form-item>
    <el-form-item prop="email" label="邮箱">
      <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="goBack(-1)">取消</el-button>
      <el-button type="primary" @click="saveMsg()">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, getCurrentInstance, reactive } from "vue";
import { useStore } from "vuex";
import mixin from "@/mixins/mixin";
import { AREA, SignUpRules } from "@/enums";
import { HttpManager } from "@/api";
// import { getBirth } from "@/utils";

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const { goBack } = mixin();

    // 注册
    const registerForm = reactive({
      username: "",
      gender: "",
      phoneNum: "",
      email: "",
      introduction: "",
      location: "",
      userPic: "",
    });
    const userId = computed(() => store.getters.userId);

    async function getUserInfo(id) {
      const result = (await HttpManager.getUserOfId(id)) as ResponseBody;
      registerForm.username = result.data.username;
      registerForm.gender = result.data.gender;
      registerForm.phoneNum = result.data.phoneNum;
      registerForm.email = result.data.email;
      registerForm.introduction = result.data.introduction;
      registerForm.location = result.data.location;
      registerForm.userPic = result.data.avatar;
    }

    async function saveMsg() {
      let canRun = true;
      (proxy.$refs["updateForm"] as any).validate((valid) => {
        if (!valid) return (canRun = false);
      });
      if (!canRun) return;

      const params = new URLSearchParams();
      params.append("id", userId.value);
      params.append("username", registerForm.username);
      params.append("gender", registerForm.gender);
      params.append("phone_num", registerForm.phoneNum);
      params.append("email", registerForm.email);
      // params.append("birth", getBirth(registerForm.birth));
      params.append("introduction", registerForm.introduction);
      params.append("location", registerForm.location);

      const result = (await HttpManager.updateUserDetail(params)) as ResponseBody;
      (proxy as any).$message({
        message: result.message,
        type: result.type,
      });
      if (result.success) {
        proxy.$store.commit("setUsername", registerForm.username);
        goBack(-1);
      }
    }

    onMounted(() => {
      getUserInfo(userId.value);
    });

    return {
      AREA,
      registerForm,
      SignUpRules,
      saveMsg,
      goBack,
    };
  },
});
</script>

<style lang="scss" scoped>
.btn ::v-deep .el-form-item__content {
  display: flex;
  justify-content: center;
}
</style>
