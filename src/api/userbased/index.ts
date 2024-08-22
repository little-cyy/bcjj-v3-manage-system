import request from '@/api/request'

/** 获取用户详情 */
export function getUserInfoApi() {
  return request({
    url: '/admin/userbased/userInfo',
    method: 'get'
  })
}

/** 获取用户菜单 */
export const getMenuApi = () => {
  return request({
    url: '/admin/userbased/menus',
    method: 'get'
  })
}
