import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { staticRoutes } from './staticRoutes'
const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === 'hash'
      ? createWebHashHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
  routes: staticRoutes
})

export default router
