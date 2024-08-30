import { type VxeFormPropTypes } from 'vxe-table'

export interface MordalFormProps {
  // 表单配置
  formItems: VxeFormPropTypes.Items
  // 表单验证规则
  formRules?: VxeFormPropTypes.Rules
  //表单提交接口
  submitApi?: (params?: any, data?: any) => Promise<any>
  // 模态框标题
  modalTitle?: string
  // 模态框宽度
  modalWidth?: number | string
  //表单数据异步获取
  asyncFormData?: boolean
}
