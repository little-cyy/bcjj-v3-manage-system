const layout = () => import('../views/layout/MainLayout.vue')

export const staticRoutes = [
  {
    path: '/redirect',
    component: layout,
    children: [
      {
        path: ':path(.*)',
        component: () => import('../views/redirect/index.vue')
      }
    ],
    meta: {
      hidden: true
    }
  },
  {
    path: '/',
    component: layout,
    redirect: '/home',

    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/home/index.vue')
      }
    ],
    meta: {
      title: '首页',
      affix: true //是否固定
    }
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/login/index.vue')
  },

  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../views/error/404.vue')
  }
]

export const getHomeRoute = () => {
  const homeRoute = staticRoutes.find((item) => item.path === '/')
  return {
    id: 0,
    pId: 0,
    path: homeRoute?.redirect,
    name: 'Home',
    fullPath: homeRoute?.redirect,
    title: homeRoute?.meta?.title
  }
}
