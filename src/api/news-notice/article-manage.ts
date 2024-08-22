import request from '@/api/request'
import type * as Articles from './type'

export const getArticlesApi = (params: Articles.getArticlesRequestData) => {
  return request({
    url: '/admin/articles',
    method: 'get',
    params
  })
}
export const getArticleByIdApi = ({ id }: Articles.ApiByIdRequestData) => {
  return request({
    url: `/admin/articles/${id}`,
    method: 'get'
  })
}
export const delArticleApi = ({ id }: Articles.ApiByIdRequestData) => {
  return request({
    url: `/admin/articles/${id}`,
    method: 'delete'
  })
}
export const batchDelArticleApi = (data: Articles.batchDelApiRequestData) => {
  return request({
    url: `/admin/articles/batchDelete`,
    data,
    method: 'post'
  })
}
export const addArticleApi = (data: Record<string, any>) => {
  return request({
    url: `/admin/articles`,
    data,
    method: 'post'
  })
}
export const editArticleApi = (data: Record<string, any>) => {
  return request({
    url: `/admin/articles/${data.id}`,
    data,
    method: 'put'
  })
}
