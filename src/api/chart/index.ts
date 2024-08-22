import request from '@/api/request'

export const sexApi = () => {
  return request({
    url: '/admin/charts/sex',
    method: 'get'
  })
}

export const addUserCountApi = () => {
  return request({
    url: '/admin/charts/userCount',
    method: 'get'
  })
}

export const courseCountApi = () => {
  return request({
    url: '/admin/charts/courseCount',
    method: 'get'
  })
}
