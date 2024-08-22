import { setRouteChange } from '@/hooks/useRouteListener'
import { useAuthStore } from '@/store/auth'
import { type FlatNode, transformToFlatData, traverse } from '@/utils/tree'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import type { RouteRecordRaw } from 'vue-router'
import { dynamicRoutes } from './dynamicRoutes'
import router from './index'
import { staticRoutes } from './staticRoutes'

const whiteList: Array<RouteRecordRaw['name']> = ['Login', 'NotFound']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const authStore = useAuthStore()
  const routes = router.getRoutes()
  if (authStore.token) {
    if (to.name === 'Login') return next({ path: '/' })
    if (routes.length <= traverse(staticRoutes).length) {
      const authRouterList = transformToFlatData(authStore.menuList)
      await addRoutes(authRouterList)
      /**
       * 动态添加新的路由时，Vue Router 可能无法立即识别新的路由。
       * 因此，需要手动调用 `next(to.fullPath)` 来重新导航到目标路由。
       */
      return next(to.fullPath)
    }
    next()
  } else {
    if (whiteList.includes(to.name)) return next()
    return next({ path: '/login' })
  }
})

router.afterEach((to) => {
  setRouteChange(to)
  NProgress.done()
})

/**
 * @param {RouteRecordRaw[]} routes
 * @description 根据权限过滤路由，添加到路由器中
 */
function addRoutes(authRouterList: FlatNode[]) {
  const newRoutes: RouteRecordRaw[] = filterDynamicRoutes(dynamicRoutes, authRouterList)
  newRoutes.forEach((route) => {
    router.addRoute(route)
  })
}

/**
 * @param {RouteRecordRaw[]} dynamicRoutes
 * @param {FlatNode[]} authRouterList
 * @description 比对动态路由和静态路由，返回新的路由表
 * */
function filterDynamicRoutes(
  dynamicRoutes: RouteRecordRaw[],
  authRouterList: FlatNode[]
): RouteRecordRaw[] {
  return dynamicRoutes.filter((route) => {
    const authRoute = authRouterList.find((item) => item.fullPath === route.path)
    return authRoute ? filterDynamicRoutes(route.children || [], authRoute.children || []) : false
  })
}
