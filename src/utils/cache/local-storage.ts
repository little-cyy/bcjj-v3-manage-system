/** 统一处理 localStorage */
import { type TagView } from '@/types/tags-view'
import { type ThemeName } from '@/types/theme'
import { type TreeNode } from '@/utils/tree'
const SYSTEM_NAME = 'v3-manage-system'

/** 缓存数据时用到的 Key */
class CacheKey {
  static readonly TOKEN = `${SYSTEM_NAME}-token-key`
  static readonly MENU_LISTS = `${SYSTEM_NAME}-menu-lists-key`
  static readonly ACTIVE_THEME_NAME = `${SYSTEM_NAME}-active-theme-name-key`
  static readonly VISITED_VIEWS = `${SYSTEM_NAME}-visited-views-key`
  static readonly CACHED_VIEWS = `${SYSTEM_NAME}-cached-views-key`
}

//#region token
export const getToken = () => {
  return localStorage.getItem(CacheKey.TOKEN)
}
export const setToken = (token: string) => {
  localStorage.setItem(CacheKey.TOKEN, token)
}
export const removeToken = () => {
  localStorage.removeItem(CacheKey.TOKEN)
}
//#endregion

//#region 菜单列表
export const getMenu = () => {
  const json = localStorage.getItem(CacheKey.MENU_LISTS)
  return JSON.parse(json ?? '[]') as TreeNode[]
}
export const setMenu = (menuList: TreeNode[]) => {
  localStorage.setItem(CacheKey.MENU_LISTS, JSON.stringify(menuList))
}
export const removeMenu = () => {
  localStorage.removeItem(CacheKey.MENU_LISTS)
}

//#region 正在应用的主题名称
export const getActiveThemeName = () => {
  return localStorage.getItem(CacheKey.ACTIVE_THEME_NAME) as ThemeName | null
}
export const setActiveThemeName = (themeName: ThemeName) => {
  localStorage.setItem(CacheKey.ACTIVE_THEME_NAME, themeName)
}
//#endregion

//#region 标签栏

export const getVisitedViews = () => {
  const json = localStorage.getItem(CacheKey.VISITED_VIEWS)
  return JSON.parse(json ?? '[]') as TagView[]
}
export const setVisitedViews = (views: TagView[]) => {
  views.forEach((view) => {
    // 删除不必要的属性，防止 JSON.stringify 处理到循环引用
    delete view.matched
    delete view.redirectedFrom
  })
  localStorage.setItem(CacheKey.VISITED_VIEWS, JSON.stringify(views))
}
export const getCachedViews = () => {
  const json = localStorage.getItem(CacheKey.CACHED_VIEWS)
  return JSON.parse(json ?? '[]') as string[]
}
export const setCachedViews = (views: string[]) => {
  localStorage.setItem(CacheKey.CACHED_VIEWS, JSON.stringify(views))
}
export const removedViews = () => {
  localStorage.removeItem(CacheKey.VISITED_VIEWS)
  localStorage.removeItem(CacheKey.CACHED_VIEWS)
}
//#endregion
