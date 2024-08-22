import request from '@/api/request'
import type * as Login from './type'
import { dealPwd } from '@/utils/pwd'

export const loginApi = (data: Login.LoginRequestData) => {
  return request({
    url: '/admin/auth/sign_in',
    method: 'post',
    data: dealPwd(data)
  })
}
