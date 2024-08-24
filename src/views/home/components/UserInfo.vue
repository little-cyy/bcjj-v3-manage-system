<template>
  <el-card class="user-card">
    <el-row :gutter="20">
      <el-col :span="12" class="avatar">
        <el-avatar :size="100" :src="getUserInfoTer.avatar || defaultCircleUrl"></el-avatar>
      </el-col>
      <el-col :span="12" class="user-info">
        <h3>{{ getUserInfoTer.username }}</h3>
        <p>{{ getRoleLabel(getUserInfoTer.role) }}</p>
      </el-col>
      <el-col class="login-info">
        <p class="flex-space-around time">
          <span class="label">上次登录时间:</span>
          <span class="content">{{ timeFormatter(getUserInfoTer.lastLoginTime) || '首次登录' }}</span>
        </p>
        <p class="flex-space-around">
          <span class="label"> 上次登录地点:</span>
          <span class="content">{{ getUserInfoTer.address || '首次登录' }}</span>
        </p>
      </el-col>
    </el-row>
  </el-card>
</template>
<script setup lang="ts">
import { defaultCircleUrl } from '@/config/url';
import { useAuthStore } from '@/store/auth';
import { timeFormatter } from "@/utils/formatter";
import { getRoleLabel } from '@/utils/options-label';
import { storeToRefs } from 'pinia';
const authStore = useAuthStore()
const { getUserInfoTer } = storeToRefs(authStore)
</script>
<style lang="scss" scoped>
.user-card {
  height: 200px;
  flex-shrink: 0;
  flex-grow: 0;
}

.avatar {
  text-align: right
}

.user-info {
  text-align: left;

}

.login-info {
  font-size: 14px;
  color: #999;
  margin-top: 5px;
  border-top: 1px solid var(--el-border-color);

  p {

    line-height: 14px;
    margin-top: 8px;
    margin-bottom: 0px;

    &.time {
      height: 28px;
    }

    .label {
      width: 90px;
      flex-shrink: 0;
      display: inline-block;
    }

    .content {
      width: 140px;
      display: inline-block;
      text-align: right;
    }

  }
}
</style>