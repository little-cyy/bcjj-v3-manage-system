import request from '@/api/request'
import type * as Categories from './type'

export const getCategoriesApi = (params: Categories.getCategoriesRequestData) => {
  return request({
    url: '/admin/categories',
    method: 'get',
    params
  })
}
export const getCategoryByIdApi = ({ id }: Categories.ApiByIdRequestData) => {
  return request({
    url: `/admin/categories/${id}`,
    method: 'get'
  })
}
export const delCategoryApi = ({ id }: Categories.ApiByIdRequestData) => {
  return request({
    url: `/admin/categories/${id}`,
    method: 'delete'
  })
}
export const batchDelCategoryApi = (data: Categories.batchDelApiRequestData) => {
  return request({
    url: `/admin/categories/batchDelete`,
    data,
    method: 'post'
  })
}
export const addCategoryApi = (data: Record<string, any>) => {
  return request({
    url: `/admin/categories`,
    data,
    method: 'post'
  })
}
export const editCategoryApi = (data: Record<string, any>) => {
  return request({
    url: `/admin/categories/${data.id}`,
    data,
    method: 'put'
  })
}
