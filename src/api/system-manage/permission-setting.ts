import request from '@/api/request'
import type * as Roles from './type'

export const getRolesApi = () => {
  return request({
    url: '/admin/roles',
    method: 'get'
  })
}
export const getRoleByIdApi = ({ id }: Roles.ApiByIdRequestData) => {
  return request({
    url: `/admin/roles/${id}`,
    method: 'get'
  })
}
export const delRoleApi = ({ id }: Roles.ApiByIdRequestData) => {
  return request({
    url: `/admin/roles/${id}`,
    method: 'delete'
  })
}
export const batchDelRoleApi = (data: Roles.batchDelApiRequestData) => {
  return request({
    url: `/admin/roles/batchDelete`,
    data,
    method: 'post'
  })
}
export const addRoleApi = (data: Record<string, any>) => {
  return request({
    url: `/admin/roles`,
    data,
    method: 'post'
  })
}
export const editRoleApi = (data: Record<string, any>) => {
  return request({
    url: `/admin/roles/${data.id}`,
    data,
    method: 'put'
  })
}
