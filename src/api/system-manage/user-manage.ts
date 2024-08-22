import request from '@/api/request'
import type * as Users from './type'
import { dealPwd } from '@/utils/pwd'

export const getUsersApi = (params: Users.geUsersRequestData) => {
  return request({
    url: '/admin/users',
    method: 'get',
    params
  })
}
export const getUserByIdApi = ({ id }: Users.ApiByIdRequestData) => {
  return request({
    url: `/admin/users/${id}`,
    method: 'get'
  })
}
export const delUserApi = ({ id }: Users.ApiByIdRequestData) => {
  return request({
    url: `/admin/users/${id}`,
    method: 'delete'
  })
}
export const batchDelUserApi = (data: Users.batchDelApiRequestData) => {
  return request({
    url: `/admin/users/batchDelete`,
    data,
    method: 'post'
  })
}
export const addUserApi = (data: Record<string, any>) => {
  return request({
    url: `/admin/users`,
    method: 'post',
    data: dealPwd(data)
  })
}

export const editUserApi = (data: Record<string, any>) => {
  return request({
    url: `/admin/users/${data.id}`,
    method: 'put',
    data: dealPwd(data)
  })
}
