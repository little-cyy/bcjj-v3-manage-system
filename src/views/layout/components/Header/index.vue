<template>
  <div class="navigation-bar flex-align-center">
    <Hamburger :is-active="appStore.sidebar.opened" @toggle-click="toggleSidebar" />
    <Breadcrumb />
    <RightMenu />
  </div>
  <VisitedTags />
</template>
<script setup lang="ts">
import { useAppStore } from "@/store/app";
import Breadcrumb from '../Breadcrumb/index.vue';
import Hamburger from '../Hamburger/index.vue';
import RightMenu from '../RightMenu/index.vue';
import VisitedTags from '../TagsView/index.vue';

/** 使用useAppStore()函数获取appStore实例 */
const appStore = useAppStore()

/** 切换侧边栏 */
const toggleSidebar = () => {
  appStore.toggleSidebar(false)
}

</script>
<style lang="scss" scoped>
.navigation-bar {
  width: 100%;
  height: var(--v3-navigationbar-height);
  gap: 10px;
  overflow: hidden;
}
</style>