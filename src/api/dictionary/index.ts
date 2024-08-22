import request from '@/api/request'
import type * as Dic from './type'

export const getDic = (params: Dic.dicRequestData) => {
  return request({
    url: '/admin/dictionaries',
    method: 'get',
    params
  })
}
