<template>
  <el-row :gutter="16" class="h100">
    <el-col :span="10" class="left-flex flex-col h100">
      <UserInfo />
      <SexInfo />
    </el-col>
    <el-col :span="14" class="right-flex flex-col h100">
      <UserCount />
      <CourseCount />
    </el-col>
  </el-row>

</template>
<script setup lang="ts">
import CourseCount from "./components/CourseCount.vue";
import SexInfo from "./components/SexInfo.vue";
import UserCount from "./components/UserCount.vue";
import UserInfo from "./components/UserInfo.vue";
</script>
<style lang="scss" scoped>
.flex {
  gap: 16px;
  height: 100%;
  width: 100%;
  overflow: hidden;
}


.left-flex {
  gap: 16px;
}

.right-flex {
  gap: 16px;
}
</style>