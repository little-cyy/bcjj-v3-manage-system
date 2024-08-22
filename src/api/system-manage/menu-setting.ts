import request from '@/api/request'
import type * as Menus from './type'

export const getMenusApi = (params?: Menus.getMenusRequestData) => {
  return request({
    url: '/admin/menus',
    method: 'get',
    params
  })
}
export const getMenuByIdApi = ({ id }: Menus.ApiByIdRequestData) => {
  return request({
    url: `/admin/menus/${id}`,
    method: 'get'
  })
}
export const delMenuApi = ({ id }: Menus.ApiByIdRequestData) => {
  return request({
    url: `/admin/menus/${id}`,
    method: 'delete'
  })
}
export const batchDelMenuApi = (data: Menus.batchDelApiRequestData) => {
  return request({
    url: `/admin/menus/batchDelete`,
    data,
    method: 'post'
  })
}
export const addMenuApi = (data: Record<string, any>) => {
  return request({
    url: `/admin/menus`,
    data,
    method: 'post'
  })
}
export const editMenuApi = (data: Record<string, any>) => {
  return request({
    url: `/admin/menus/${data.id}`,
    data,
    method: 'put'
  })
}
