import request from '@/api/request'
import type * as Courses from './type'

export const getCoursesApi = (params: Courses.getCoursesRequestData) => {
  return request({
    url: '/admin/courses',
    method: 'get',
    params
  })
}
export const getCourseByIdApi = ({ id }: Courses.ApiByIdRequestData) => {
  return request({
    url: `/admin/courses/${id}`,
    method: 'get'
  })
}
export const delCourseApi = ({ id }: Courses.ApiByIdRequestData) => {
  return request({
    url: `/admin/courses/${id}`,
    method: 'delete'
  })
}
export const batchDelCourseApi = (data: Courses.batchDelApiRequestData) => {
  return request({
    url: `/admin/courses/batchDelete`,
    data,
    method: 'post'
  })
}
export const addCourseApi = (data: Record<string, any>) => {
  return request({
    url: `/admin/courses`,
    data,
    method: 'post'
  })
}
export const editCourseApi = (data: Record<string, any>) => {
  return request({
    url: `/admin/courses/${data.id}`,
    data,
    method: 'put'
  })
}
