<template>
  <div class="app-layout">
    <el-container>
      <el-aside>
        <Menu />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <Suspense>
            <RouterView />
          </Suspense>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from "./components/Header/index.vue";
import Menu from "./components/Menus/index.vue";

</script>
<style lang="scss" scoped>
.app-layout {
  height: 100%;
  width: 100%;

  .el-container {
    height: 100%;

    .el-aside {
      width: auto;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .el-header {
      height: var(--v3-header-height);
      overflow: hidden;
    }

    .el-main {
      --el-main-padding: 16px;
      padding-bottom: 0px;
      border-bottom: 16px solid var(--el-main-bg-color);

    }
  }
}
</style>