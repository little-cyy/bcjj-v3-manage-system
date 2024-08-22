import { type VxeFormPropTypes } from 'vxe-table'
interface SearchBoxConfigs {
  /** 使用表单项组件名称 */
  type: 'input' | 'select' | 'date' | 'date-range'
  /** 提示内容 */
  placeholder?: string
  /** 绑定的值 */
  field: string
  /** placeholder类型文案 */
  label: string
  /** element原生的props配置，透传给element组件 */
  elementConfig?: Object
  /** select组件的options */
  options?: optinType[]
  /** 表单项的默认值 */
  defaultValue?: number | string | boolean
}

interface optinType {
  value: number | string | boolean
  label: string
}
export type { SearchBoxConfigs }
