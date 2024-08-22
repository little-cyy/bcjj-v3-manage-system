import { type TagView } from '@/types/tags-view'
import {
  getCachedViews,
  getVisitedViews,
  setCachedViews,
  setVisitedViews
} from '@/utils/cache/local-storage'
import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'

export const useTagsViewStore = defineStore('tags-view', () => {
  const visitedViews = ref<TagView[]>(getVisitedViews() || [])
  const cachedViews = ref<string[]>(getCachedViews() || [])

  /** 缓存标签栏数据 */
  watchEffect(() => {
    setVisitedViews(visitedViews.value)
    setCachedViews(cachedViews.value)
  })

  // 添加访问过的标签
  function addVisitedView(view: TagView) {
    // 检查是否已经存在相同的 visitedView
    const index = visitedViews.value.findIndex((v) => v.path === view.path)
    if (index !== -1) {
      // 防止 query 参数丢失
      visitedViews.value[index].fullPath !== view.fullPath &&
        (visitedViews.value[index] = { ...view })
    } else {
      // 添加新的 visitedView
      visitedViews.value.push({ ...view })
    }
  }

  // 添加缓存的标签
  function addCachedView(view: TagView) {
    if (typeof view.name !== 'string') return
    if (cachedViews.value.includes(view.name)) return
    cachedViews.value.push(view.name)
  }

  // 删除标签
  function delVisitedView(view: TagView) {
    const index = visitedViews.value.findIndex((v) => v.path === view.path)
    if (index !== -1) {
      visitedViews.value.splice(index, 1)
    }
  }

  function delCachedView(view: TagView) {
    const index = cachedViews.value.findIndex((v) => v === view.name)
    if (index !== -1) {
      cachedViews.value.splice(index, 1)
    }
  }

  // 删除其他标签
  function delOthersVisitedViews(view: TagView) {
    visitedViews.value = visitedViews.value.filter((v) => v.meta?.affix || v.path === view.path)
  }
  function delOthersCachedViews(view: TagView) {
    cachedViews.value = cachedViews.value.filter((v) => v === view.name)
  }
  // 删除所有标签
  function delAllVisitedViews() {
    // 保留固定的 tags
    visitedViews.value = visitedViews.value.filter((tag) => tag.meta?.affix)
  }
  function delAllCachedViews() {
    cachedViews.value = []
  }

  // 返回 store 的数据和方法
  return {
    visitedViews,
    cachedViews,
    addVisitedView,
    addCachedView,
    delVisitedView,
    delCachedView,
    delOthersVisitedViews,
    delOthersCachedViews,
    delAllVisitedViews,
    delAllCachedViews
  }
})
