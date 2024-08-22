const layout = () => import('../views/layout/MainLayout.vue')
export const dynamicRoutes = [
  {
    path: '/function-manage',
    name: 'FunctionManage',
    component: layout,
    meta: {
      title: '功能管理'
    },
    children: [
      {
        path: 'category-manage',
        name: 'CategoryManage',
        component: () => import('../views/function-manage/category-manage/index.vue'),
        meta: {
          title: '分类管理'
        }
      },
      {
        path: 'course-manage',
        name: 'CourseManage',
        component: () => import('../views/function-manage/course-manage/index.vue'),
        meta: {
          title: '课程管理'
        }
      },
      {
        path: 'chapter-manage',
        name: 'ChapterManage',
        component: () => import('../views/function-manage/chapter-manage/index.vue'),
        meta: {
          title: '章节管理'
        }
      }
    ]
  },
  {
    path: '/news-notice',
    name: 'NewsNotice',
    component: layout,
    meta: {
      title: '新闻通知'
    },
    children: [
      {
        path: 'article-manage',
        name: 'ArticleManage',
        meta: {
          title: '文章管理'
        },
        component: () => import('../views/news-notice/article-manage/index.vue')
      }
    ]
  },
  {
    path: '/system-manage',
    name: 'SystemManage',
    component: layout,
    meta: {
      title: '系统管理'
    },
    children: [
      {
        path: 'user-manage',
        name: 'UserManage',
        meta: {
          title: '用户管理'
        },
        component: () => import('../views/system-manage/user-manage/index.vue')
      },
      {
        path: 'permission-setting',
        name: 'PermissionSetting',
        meta: {
          title: '权限设置'
        },
        component: () => import('../views/system-manage/permission-setting/index.vue')
      },
      {
        path: 'menu-setting',
        name: 'MenuSetting',
        meta: {
          title: '菜单设置'
        },
        component: () => import('../views/system-manage/menu-setting/index.vue')
      }
    ]
  }
]
