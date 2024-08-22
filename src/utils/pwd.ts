import { EncryptByRSA } from './jsencrypt'
export const dealPwd = (data: Record<string, any>) => {
  const { password, ...rest } = data
  if (password) {
    //对密码进行加密
    rest.password = EncryptByRSA(password)
  }
  return rest
}
