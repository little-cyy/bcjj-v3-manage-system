import { type ApiResponseData } from './api'
export type TableResponseData = ApiResponseData<{
  list: Array<Record<string, any>>
  total: number
}>
