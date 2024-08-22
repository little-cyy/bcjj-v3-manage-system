import request from '@/api/request'
import type * as Chapters from './type'

export const getChaptersApi = (params: Chapters.getChaptersRequestData) => {
  return request({
    url: '/admin/chapters',
    method: 'get',
    params
  })
}
export const getChapterByIdApi = ({ id }: Chapters.ApiByIdRequestData) => {
  return request({
    url: `/admin/chapters/${id}`,
    method: 'get'
  })
}
export const delChapterApi = ({ id }: Chapters.ApiByIdRequestData) => {
  return request({
    url: `/admin/chapters/${id}`,
    method: 'delete'
  })
}
export const batchDelChapterApi = (data: Chapters.batchDelApiRequestData) => {
  return request({
    url: `/admin/chapters/batchDelete`,
    data,
    method: 'post'
  })
}
export const addChapterApi = (data: Record<string, any>) => {
  return request({
    url: `/admin/chapters`,
    data,
    method: 'post'
  })
}
export const editChapterApi = (data: Record<string, any>) => {
  return request({
    url: `/admin/chapters/${data.id}`,
    data,
    method: 'put'
  })
}
