import { ElMessageBox } from 'element-plus'

interface MessageBoxOptions {
  title?: string
  closeOnClickModal?: boolean
  [propName: string]: any
}

export function useMessageBox() {
  const confirmBox = (message: string, options?: MessageBoxOptions) => {
    const {
      title = '提示',
      closeOnClickModal = false,
      dangerouslyUseHTMLString = true,
      type = 'warning',
      ...rest
    } = options || {}
    ElMessageBox.confirm(message, title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      closeOnClickModal,
      dangerouslyUseHTMLString,
      type
    })
      .then(() => {
        rest?.onConfirm?.()
      })
      .catch(() => {
        rest?.onCancel?.()
      })
  }
  return {
    confirmBox
  }
}
