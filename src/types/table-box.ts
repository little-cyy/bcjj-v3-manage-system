import { type VxeFormPropTypes, type VxeGridPropTypes } from 'vxe-table'
import { type ApiResponseData } from './api'

export type TableResponseData = ApiResponseData<{
  list: Array<Record<string, any>>
  total: number
}>

export interface TableBoxProps {
  // 表格列配置=
  columns: VxeGridPropTypes.Columns
  // 表单配置
  formItems: VxeFormPropTypes.Items
  // 表单验证规则
  formRules?: VxeFormPropTypes.Rules
  // 获取表格数据接口
  getTableDataApi: (params?: any, data?: any) => Promise<any>
  // 根据id获取表格详情数据接口
  getTableDataByIdApi?: (params?: any, data?: any) => Promise<any>
  // 删除表格数据接口
  deleteTableDataApi?: (params?: any, data?: any) => Promise<any>
  // 批量删除表格数据接口
  batchDeleteTableDataApi?: Function
  // 自定义配置
  customConfig?: Record<string, any>
  // 复选框配置
  checkboxConfig?: Record<string, any>
  // 单选框配置
  radioConfig?: Record<string, any>
  //树形结构配置项
  treeConfig?: Record<string, any>
  // 搜索参数
  serachParams?: Record<string, any>
  // 是否显示添加按钮
  showAddBtn?: boolean
  // 是否显示批量删除按钮
  showBatchDelBtn?: boolean
  // 是否显示编辑按钮
  showEditBtn?: boolean
  // 是否显示删除按钮
  showDelBtn?: boolean
  // 禁用表单项
  disabledItems?: string[]
  // 表单新增提交接口
  addTableDataApi?: (params?: any, data?: any) => Promise<any>
  // 表单修改提交接口
  editTableDataApi?: (params?: any, data?: any) => Promise<any>
  //点击删除按钮模态框的提示
  getDeleteTip?: Function
  // 点击批量删除按钮模态框的提示
  getBatchDeleteTip?: Function
  // 模态框的宽度
  modalWidth?: number | string
  // 是否自动加载表格数据
  autoLoad?: boolean
  // 是否需要分页
  needPager?: boolean
}
