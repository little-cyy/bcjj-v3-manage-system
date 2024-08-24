<template>

  <div class="login-container">
    <ThemeSwitch class="theme-switch" />
    <el-form :model="loginForm" :rules="loginRules" ref="loginRef">
      <div class="title">用户登录</div>
      <el-form-item prop="name">
        <el-input v-model="loginForm.name" placeholder="请输入账号">
          <template #prefix>
            <SvgIcon icon="user"></SvgIcon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" placeholder="请输入密码" show-password>
          <template #prefix>
            <SvgIcon icon="lock"></SvgIcon>
          </template>
        </el-input>
      </el-form-item>
      <el-button type="primary" @click="toLogin(loginRef)">登录</el-button>
    </el-form>

  </div>
</template>
<script setup lang="ts">
import ThemeSwitch from '@/components/ThemeSwitch/index.vue';
import { useAuthStore } from '@/store/auth';
import type { FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from "vue";

const authStore = useAuthStore()
const loginRef = ref<FormInstance>()
const loginForm = reactive({
  name: "",
  password: ""
})
const loginRules: FormRules = reactive({
  name: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
})

const toLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      const data = {
        login: loginForm.name,
        password: loginForm.password
      }
      authStore.login(data)
    }
  })
}
</script>
<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;

  background-color: var(--el-bg-color);

  .el-form {
    width: 300px;

    .title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
      text-align: center;
    }

    .el-form-item {
      margin-bottom: 20px;
    }

    .el-button {
      width: 100%;
    }
  }
}

.theme-switch {
  position: absolute;
  right: 16px;
  top: 16px;
}
</style>