<template>
  <el-menu :collapse="!(appStore.sidebar.opened)" :collapse-transition="appStore.sidebar.withoutAnimation"
    class="el-menu-vertical-demo" router :default-active="activeMenu">
    <template v-for="(item) in menuList">
      <el-sub-menu v-if="item.children?.length" :key="item.name" :index="item.fullPath">
        <template #title>
          <SvgIcon :icon="item.name"></SvgIcon>
          <span class="pTitle">{{ item.title }}</span>
        </template>
        <el-menu-item v-for="(child) in item.children" :key="child.name" :index="child.fullPath">{{ child.title
          }}</el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :key="item?.name" :index="item.fullPath">
        <SvgIcon :icon="item.name"></SvgIcon>
        <span class="pTitle">{{ item.title }}</span>
      </el-menu-item>
    </template>

  </el-menu>
</template>
<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute } from "vue-router";
const appStore = useAppStore()
const authStore = useAuthStore()
const { menuList } = storeToRefs(authStore)
const route = useRoute()

/** 根据当前路由激活菜单 */
const activeMenu = computed(() => {
  const { path } = route
  return path
})

</script>
<style lang="scss" scoped>
.el-menu {
  height: 100%;
  width: var(--v3-sidebar-width);
}

.el-menu.el-menu--collapse {
  width: var(--v3-sidebar-hide-width);
}

.pTitle {
  margin-left: 6px;
}
</style>