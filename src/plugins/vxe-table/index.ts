import { type App } from 'vue'
// https://vxetable.cn/#/table/start/install

import {
  // 全局实例对象
  VXETable,
  // 可选表格模块
  VxeTableFilterModule,
  // VxeTableEditModule,
  // VxeTableMenuModule,
  // VxeTableExportModule,
  // VxeTableKeyboardModule,
  // VxeTableValidatorModule,
  VxeTableCustomModule,

  // 可选组件
  VxeIcon,
  VxeTable,
  VxeColumn,
  // VxeColgroup,
  VxeGrid,
  VxeTooltip,
  VxeToolbar,
  VxePager,
  VxeForm,
  VxeFormItem,
  // VxeFormGather,
  VxeCheckbox,
  // VxeCheckboxGroup,
  // VxeRadio,
  // VxeRadioGroup,
  // VxeRadioButton,
  // VxeSwitch,
  // VxeInput,
  // VxeSelect,
  // VxeOptgroup,
  // VxeOption,
  // VxeTextarea,
  VxeButton,
  // VxeButtonGroup,
  VxeModal
  // VxeDrawer,
  // VxeList,
  // VxePulldown
} from 'vxe-table'
import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table/lib/style.css'
import 'vxe-table-plugin-element/dist/style.css'
import renderMap from './tsx/renderMap'

// https://github.com/x-extends/vxe-table-plugin-element
/**
 * xe-table-plugin-element 是一个用于 vxe-table 的插件，
 * 它集成了 Element Plus 的样式和组件，
 * 使得 vxe-table 的样式和组件与 Element Plus 的样式和组件保持一致。
 */
VXETable.use(VXETablePluginElement)
/** 全局默认参数 */
VXETable.setConfig({
  /** 全局尺寸 */
  size: 'medium',
  /** 全局 zIndex 起始值，如果项目的的 z-index 样式值过大时就需要跟随设置更大，避免被遮挡 */
  zIndex: 1000,
  /** 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据 */
  version: 0,
  /** 全局 loading 提示内容，如果为 null 则不显示文本 */
  loadingText: null,
  table: {
    showHeader: true,
    showOverflow: 'tooltip',
    showHeaderOverflow: 'tooltip',
    autoResize: true,
    // stripe: false,
    border: 'inner',
    // round: false,
    emptyText: '暂无数据',
    rowConfig: {
      isHover: true,
      isCurrent: true,
      // 行数据的唯一主键字段名
      keyField: '_VXE_ID'
    },
    columnConfig: {
      resizable: false
    },
    align: 'center',
    headerAlign: 'center'
  },
  pager: {
    // size: "medium",
    /** 配套的样式 */
    perfect: false,
    pageSize: 10,
    pagerCount: 7,
    pageSizes: [10, 20, 50],
    layouts: [
      'Total',
      'PrevJump',
      'PrevPage',
      'Number',
      'NextPage',
      'NextJump',
      'Sizes',
      'FullJump'
    ]
  },
  modal: {
    minWidth: 500,
    minHeight: 400,
    lockView: true,
    mask: true,
    // duration: 3000,
    // marginSize: 20,
    dblclickZoom: false,
    showTitleOverflow: true,
    transfer: true,
    draggable: false
  }
})

// 将renderMap对象中的方法混入VXETable.renderer对象中
VXETable.renderer.mixin(renderMap)

export function loadVxeTable(app: App) {
  // 可选表格模块
  app.use(VxeTableFilterModule)
  // app.use(VxeTableEditModule)
  // app.use(VxeTableMenuModule)
  // app.use(VxeTableExportModule)
  // app.use(VxeTableKeyboardModule)
  // app.use(VxeTableValidatorModule)
  app.use(VxeTableCustomModule)

  // 可选组件
  app.use(VxeIcon)
  app.use(VxeTable)
  app.use(VxeColumn)
  // app.use(VxeColgroup)
  app.use(VxeGrid)
  app.use(VxeTooltip)
  app.use(VxeToolbar)
  app.use(VxePager)
  app.use(VxeForm)
  app.use(VxeFormItem)
  // app.use(VxeFormGather)
  app.use(VxeCheckbox)
  // app.use(VxeCheckboxGroup)
  // app.use(VxeRadio)
  // app.use(VxeRadioGroup)
  // app.use(VxeRadioButton)
  // app.use(VxeSwitch)
  // app.use(VxeInput)
  // app.use(VxeSelect)
  // app.use(VxeOptgroup)
  // app.use(VxeOption)
  // app.use(VxeTextarea)
  app.use(VxeButton)
  // app.use(VxeButtonGroup)
  app.use(VxeModal)
  // app.use(VxeDrawer)
  // app.use(VxeList)
  // app.use(VxePulldown)
}
