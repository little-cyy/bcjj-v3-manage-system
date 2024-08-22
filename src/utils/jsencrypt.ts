import JSEncrypt from 'jsencrypt'
const PUBLIC_KEY = import.meta.env.VITE_RSA_PUBLIC_KEY
/**
 * 对数据进行 RSA 加密，加密失败时会返回 false。
 * JSEncrypt 只能加密字符串数据，因此使用 JSON.stringify 对要加密的数据进行序列化
 * 但此时需要注意一些 JSON.stringify 的问题
 *      比如：JSON.stringify(undefined) => undefined // 这不是一个字符串
 *      比如：JSON.stringify({ prop: undefined }) => '{}'
 *      比如：JSON.stringify(NaN) => 'null'
 *
 * @param {string | number | Object | Array} data 需要加密的数据
 * @param {string} publicKey 公钥，可选
 * @returns {string | false} 密文
 */

export const EncryptByRSA = (data: string, publicKey = PUBLIC_KEY) => {
  const encrypt = new JSEncrypt()

  encrypt.setPublicKey(publicKey)

  return encrypt.encrypt(JSON.stringify(data))
}

/**
 * 对密文进行 RSA 解密，秘钥不对会返回 false，数据不是加密后的密文会返回 null。
 *
 * 会使用 JSON.parse 对解密后数据进行反序列化
 *
 * @param {string} secretText 待解密的字符串
 * @param {string} privateKey 私钥
 * @returns {any} 解密后的数据
 */
export const DecryptByAES = (secretText: string, privateKey: string) => {
  const decrypt = new JSEncrypt()

  decrypt.setPrivateKey(privateKey)

  return JSON.parse(decrypt.decrypt(secretText) as string)
}
