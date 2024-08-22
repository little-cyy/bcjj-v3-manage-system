<template>
  <el-breadcrumb>
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
      <span v-if="index === breadcrumbs.length - 1" class="no-redirect">
        {{ item.meta.title }}
      </span>
      <a v-else>
        {{ item.meta.title }}
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { useRouteListener } from "@/hooks/useRouteListener";
import { ref } from "vue";
import { type RouteLocationMatched, useRoute } from "vue-router";

const route = useRoute()
const { listenerRouteChange } = useRouteListener()

/** 定义响应式数据 breadcrumbs，用于存储面包屑导航信息 */
const breadcrumbs = ref<RouteLocationMatched[]>([])

/** 获取面包屑导航信息 */
const getBreadcrumb = () => {
  breadcrumbs.value = route.matched.filter((item) => item.meta?.title)
}

/** 监听路由变化，更新面包屑导航信息 */
listenerRouteChange((route) => {
  getBreadcrumb()
}, true)
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  line-height: var(--v3-navigationbar-height);


  .no-redirect {
    color: var(--el-text-color-placeholder);
  }

  a {
    font-weight: normal;
  }
}
</style>
