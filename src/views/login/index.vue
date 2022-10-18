<template>
  <div class="login-container">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">登录</el-menu-item>
    </el-menu>
    <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="120px"
        class="login-form"
        size="mini"
      >
      <el-form-item label="名称" prop="user_name">
        <el-input v-model="loginForm.user_name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      isUserExist: false,
      activeIndex: '1',
      loginForm: {
        user_name: '',
        password: ''
      },
      rules: {
        user_name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    async submitForm () {
      const user = this.loginForm

      try {
        const res = await login(user)
        if (res.data.code === 0) {
          this.$notify.success({
            title: '登录成功',
            message: 'Hello, ficus!'
          })
        } else {
          this.$notify.error({
            title: '登录失败',
            message: res.data.error
          })
        }
      } catch (error) {
        this.$notify.error({
          title: '登录请求错误',
          message: error
        })
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    async onsubmit () {
      const user = this.user

      try {
        const res = await login(user)
        console.log('登录成功', res)
      } catch (err) {
        if (err.response.status === 400) {
          console.log('手机号或验证码错误')
        } else {
          console.log('登录失败', err)
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-form{
  margin-top: 20px;
  width: 300px;
}
</style>
