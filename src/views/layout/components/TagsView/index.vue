<template>
  <div class="visited-tags-container flex-align-center ">
    <ScrollPane>
      <div class="visited-tags-actions flex-start-center ">
        <router-link v-for="tag in visitedViews" :key="tag.path" :to="{ path: tag.path, query: tag.query }" tag="span"
          class="visited-tag " :class="isActive(tag) ? 'active' : ''"
          @click.middle="!isAffix(tag) && closeSelectedTag(tag)" @contextmenu.prevent="openMenu(tag, $event)">
          <span class="visited-tag-text">{{ tag.meta?.title }}</span>
          <SvgIcon icon="close" v-if="!isAffix(tag)" @click.prevent.stop="closeSelectedTag(tag)" class="close-icon" />
        </router-link>
      </div>
    </ScrollPane>
    <ul v-show="visible" class="contextmenu" :style="{ left: left + 'px', top: top + 'px' }">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其它</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
    <Screenfull :content="true" />
  </div>
</template>
<script setup lang="ts">
import Screenfull from '@/components/Screenfull/index.vue'
import { useRouteListener } from "@/hooks/useRouteListener"
import { useTagsViewStore } from '@/store/tags-view'
import { type TagView } from '@/types/tags-view'
import { storeToRefs } from 'pinia'
import { getCurrentInstance, onMounted, ref, watch } from "vue"
import { type RouteLocationNormalizedLoaded, type RouterLink, useRoute, useRouter } from 'vue-router'
import ScrollPane from './ScrollPane.vue'
const { listenerRouteChange } = useRouteListener()
const route = useRoute()
const router = useRouter()
const instance = getCurrentInstance()
const tagsViewStore = useTagsViewStore()
const { visitedViews } = storeToRefs(tagsViewStore)

/** 右键菜单的状态 */
const visible = ref(false)
/** 右键菜单的 top 位置 */
const top = ref(0)
/** 右键菜单的 left 位置 */
const left = ref(0)
/** 当前正在右键操作的标签页 */
const selectedTag = ref<TagView>({})

/** 判断标签页是否激活 */
const isActive = (tag: TagView) => {
  return tag.path === route.path
}

/** 判断标签页是否固定 */
const isAffix = (tag: TagView) => {
  return tag.meta?.affix
}


/** 添加标签页 */
const addTags = (route: RouteLocationNormalizedLoaded) => {
  if (route.name) {
    tagsViewStore.addVisitedView(route)
    tagsViewStore.addCachedView(route)
  }
}

/** 刷新当前正在右键操作的标签页 */
const refreshSelectedTag = (view: TagView) => {
  tagsViewStore.delCachedView(view)
  router.replace({ path: "/redirect" + view.path, query: view.query })
}

/** 关闭当前正在右键操作的标签页 */
const closeSelectedTag = (view: TagView) => {
  tagsViewStore.delVisitedView(view)
  tagsViewStore.delCachedView(view)
  isActive(view) && toLastView(tagsViewStore.visitedViews, view)
}

/** 关闭其他标签页 */
const closeOthersTags = () => {
  const fullPath = selectedTag.value.fullPath
  if (fullPath !== route.path && fullPath !== undefined) {
    router.push(fullPath)
  }
  tagsViewStore.delOthersVisitedViews(selectedTag.value)
  tagsViewStore.delOthersCachedViews(selectedTag.value)
}

/** 关闭所有标签页 */
const closeAllTags = (view: TagView) => {
  tagsViewStore.delAllVisitedViews()
  tagsViewStore.delAllCachedViews()
  toLastView(tagsViewStore.visitedViews, view)
}

/** 跳转到最后一个标签页 */
const toLastView = (visitedViews: TagView[], view: TagView) => {
  const latestView = visitedViews.slice(-1)[0]
  const fullPath = latestView?.fullPath
  if (fullPath !== undefined) {
    router.push(fullPath)
  } else {
    // 如果 TagsView 全部被关闭了，则默认重定向到主页
    if (view.name === "Home") {
      // 重新加载主页
      router.push({ path: "/redirect" + view.path, query: view.query })
    } else {
      router.push("/")
    }
  }
}

/** 打开右键菜单面板 */
const openMenu = (tag: TagView, e: MouseEvent) => {
  const menuMinWidth = 105
  // 当前组件距离浏览器左端的距离
  const offsetLeft = instance!.proxy!.$el.getBoundingClientRect().left
  // 当前组件宽度
  const offsetWidth = instance!.proxy!.$el.offsetWidth
  // 面板的最大左边距
  const maxLeft = offsetWidth + menuMinWidth
  // 面板距离鼠标指针的距离
  const left15 = e.clientX + 15
  left.value = left15 > maxLeft ? maxLeft : left15
  top.value = e.clientY
  // 显示面板
  visible.value = true
  // 更新当前正在右键操作的标签页
  selectedTag.value = tag
}

/** 关闭右键菜单面板 */
const closeMenu = () => {
  visible.value = false
}

watch(visible, (value) => {
  value ? document.body.addEventListener("click", closeMenu) : document.body.removeEventListener("click", closeMenu)
})

onMounted(() => {
  /** 监听路由变化 */
  listenerRouteChange(async (route) => {
    addTags(route)
  }, true)
})
</script>
<style lang="scss" src="./index.scss" scoped></style>