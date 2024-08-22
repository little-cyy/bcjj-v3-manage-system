import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios'
import { useAuthStore } from '@/store/auth'
import { ElMessage } from 'element-plus'

const service: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
})

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const authStore = useAuthStore()
    const token = authStore.token
    if (token) {
      if (!config.headers) {
        config.headers = {}
      }
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config as InternalAxiosRequestConfig<any> // 强制类型转换
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status } = response
    return { ...response.data, status }
  },
  (Error: AxiosError) => {
    if (Error.response) {
      const errorReq: AxiosResponse = Error.response
      const { data, status } = errorReq
      if (data) {
        if (status === 401) {
          // token失效
          invalidTokenFn(data)
          return Promise.reject(Error)
        }
        // 后端返回错误信息结构
        // data: { message: string, error: string[] }
        ElMessage.error({
          message: `${data.message}: ${data.error.join('；')} `,
          grouping: true,
          plain: true
        })
        return Promise.reject(Error)
      }
    }
    ElMessage.error({
      message: Error.message,
      grouping: true,
      plain: true
    })
    return Promise.reject(Error)
  }
)

interface ErrorData {
  message: string
  error: string[]
}
const invalidTokenFn = (data: ErrorData) => {
  const authStore = useAuthStore()
  setTimeout(() => {
    authStore.logout()
  }, 5000)
  ElMessage.error({
    message: `${data.error.join(';')}，5秒后自动跳转到登录页面。`,
    grouping: true,
    plain: true,
    duration: 5000
  })
}

export default service
