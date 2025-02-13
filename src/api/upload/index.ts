import request from '@/api/request'
import type * as Upload from './type'

export const uploadApi = (data: Upload.uploadRequestData) => {
  return request({
    url: '/uploads',
    method: 'post',
    data
  })
}

export const uploadMdEditorApi = (data: FormData) => {
  return request({
    url: '/uploads/mdEditor',
    method: 'post',
    data
  })
}
