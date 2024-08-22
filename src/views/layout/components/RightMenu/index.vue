<template>
  <div class="right-menu flex-end-center">
    <ThemeSwitch />
    <Screenfull />
    <!-- 头像区 -->
    <el-dropdown>
      <div class="user-info flex-align-center ">
        <el-avatar :size="30" :src="getUserInfoTer.avatar || defaultCircleUrl" />
        <span class="username">{{ getUserInfoTer.username }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click='logout'>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

  </div>

</template>
<script setup lang="ts">
import Screenfull from '@/components/Screenfull/index.vue'
import ThemeSwitch from '@/components/ThemeSwitch/index.vue'
import { defaultCircleUrl } from '@/config/url'
import { useAuthStore } from '@/store/auth'
import { ElMessage, ElMessageBox } from 'element-plus'
import { storeToRefs } from 'pinia'
const authStore = useAuthStore()
const { getUserInfoTer } = storeToRefs(authStore)
/**登出 */
const logout = () => {
  ElMessageBox.confirm(
    '您确定要退出登录吗？这将清除您的所有会话信息。',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    ElMessage({
      type: 'success',
      message: '退出登录成功',
    })
    authStore.logout()
  })

}
</script>
<style lang="scss" scoped>
.right-menu {
  color: var(--el-text-color-regular);
  flex-grow: 1;
  gap: 10px;
}

.user-info {
  gap: 10px;
}

.user-name {
  font-size: 14px;
  color: var(--el-text-color);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>