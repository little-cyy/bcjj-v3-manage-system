<template>
  <div class="app-container">
    <!-- 表格 -->
    <vxe-grid ref="xGridDom" v-bind="xGridOpt" height="auto" :class="{ noPager: !props.needPager }">
      <!-- 左侧按钮列表 -->
      <template #toolbar-btns>
        <slot></slot>
        <el-button v-if="props.showAddBtn" type="primary" :icon="Plus" @click="crudStore.onShowModal()">新增</el-button>
        <el-button v-if="props.showBatchDelBtn" type="danger" :icon="Delete" @click="crudStore.onBatchDelete()"
          status="danger">批量删除</el-button>
        <slot name="custom-btn"></slot>
      </template>
      <!-- 操作 -->
      <template #row-operate="params">
        <el-button link type="primary" v-if="props.showEditBtn" :disabled="params.row.editDisabled"
          @click="crudStore.onShowModal(params.row)">修改</el-button>
        <el-button link type="danger" v-if="props.showDelBtn" :disabled="params.row.delDisabled"
          @click="crudStore.onDelete(params.row)">删除</el-button>
        <slot name="row-operate-other" v-bind="params"></slot>
      </template>
    </vxe-grid>
    <!-- 弹窗 -->
    <ModalForm ref="modalFormDom" v-bind="modalFormOpt" v-on="modalFormEvents" />
  </div>
</template>

<script lang="ts" setup>
import ModalForm from "@/components/ModalForm/index.vue"
import { type TableResponseData } from "@/types/table-box"
import { Delete, Plus } from '@element-plus/icons-vue'
import { type ElMessageBoxOptions, ElMessage, ElMessageBox } from "element-plus"
import { reactive, ref } from "vue"
import {
  type VxeFormPropTypes,
  type VxeGridInstance,
  type VxeGridProps,
  type VxeGridPropTypes
} from "vxe-table"


interface Props {
  // 表格列配置
  columns: VxeGridPropTypes.Columns
  // 表单配置
  formItems: VxeFormPropTypes.Items
  // 表单验证规则
  formRules?: VxeFormPropTypes.Rules
  // 获取表格数据接口
  getTableDataApi: Function
  // 根据id获取表格详情数据接口
  getTableDataByIdApi?: Function
  // 删除表格数据接口
  deleteTableDataApi?: Function
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
  showBatchDelBtn?: boolean,
  // 是否显示编辑按钮
  showEditBtn?: boolean
  // 是否显示删除按钮
  showDelBtn?: boolean
  // 禁用表单项
  disabledItems?: string[]
  // 表单新增提交接口
  addTableDataApi?: Function
  // 表单修改提交接口
  editTableDataApi?: Function
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
const props = withDefaults(defineProps<Props>(), {
  showAddBtn: true,
  showBatchDelBtn: true,
  showEditBtn: true,
  showDelBtn: true,
  autoLoad: true,
  needPager: true

})
const emits = defineEmits(['onAddOrEditSumbit', 'onDeleteSumbit', 'onBatchDeleteSumbit'])

//#region vxe-grid
const xGridDom = ref<VxeGridInstance>()
const xGridOpt: VxeGridProps = reactive({
  loading: true,
  zIndex: 100,
  autoResize: true,
  border: true,
  /** 分页配置项 */
  pagerConfig: {
    enabled: props.needPager,
    align: "right"
  },
  /** 工具栏配置 */
  toolbarConfig: {
    refresh: true,
    custom: true,
    slots: { buttons: "toolbar-btns" }
  },
  /** 自定义列配置项 */
  customConfig: props.customConfig || {
    /** 是否允许列选中  */
    checkMethod: () => true
  },
  /** 复选框配置项 */
  checkboxConfig: props.checkboxConfig || {
    /** 是否允许列选中  */
    checkMethod: () => true
  },
  /** 单选框配置项 */
  radioConfig: props.radioConfig || {
    /** 是否允许列选中  */
    checkMethod: () => true
  },
  /**树形结构配置项*/
  treeConfig: props.treeConfig || {},
  /** 列配置 */
  columns: props.columns,
  /** 数据代理配置项（基于 Promise API） */
  proxyConfig: {
    /** 启用动态序号代理 */
    seq: true,
    /** 是否代理表单 */
    form: true,
    /** 是否自动加载，默认为 true */
    autoLoad: props.autoLoad,
    props: {
      total: "total"
    },
    ajax: {
      query: ({ page, form }) => {
        xGridOpt.loading = true
        crudStore.clearTable()
        return new Promise((resolve) => {
          let total = 0
          let result: Record<string, any>[] = []
          /** 加载数据 */
          const callback = (res: TableResponseData) => {
            if (res?.data) {
              // 总数
              total = res.data?.total
              // 列表数据
              result = res.data.list
            }
            xGridOpt.loading = false
            // 返回值有格式要求，详情见 vxe-table 官方文档
            const params = props.needPager ? { total, result } : result
            resolve(params)
          }

          /** 接口需要的参数 */
          const params = {
            ...props.serachParams,
            paegSize: page.pageSize,
            currentPage: page.currentPage
          }
          /** 调用接口 */
          props.getTableDataApi(params).then(callback).catch(callback)
        })
      }
    }
  }
})
//#endregion

//#region modalForm
const modalFormDom = ref()
const modalFormOpt = reactive({
  // 表单配置
  formItems: props.formItems,
  // 表单验证规则
  formRules: props.formRules,
  //表单提交接口
  submitApi: undefined,
  // 模态框标题
  modalTitle: '修改',
  // 模态框宽度
  modalWidth: props.modalWidth,
  //异步获取formData
  asyncFormData: false,
})
const modalFormEvents = {
  async asyncGetFormData(row: Record<string, any>, callback: (data: Record<string, any>) => void) {
    const { data } = props.getTableDataByIdApi ? await props.getTableDataByIdApi({ id: row.id }) : { data: {} }
    callback(data)
  },
  sumbitForm(formData: Record<string, any>, callback: (isSuccess?: boolean) => void) {
    const submitApi = crudStore.isUpdate ? props.editTableDataApi : props.addTableDataApi
    const callbackFn = (isSuccess?: boolean) => {
      callback(isSuccess)
      if (isSuccess) {
        !crudStore.isUpdate && crudStore.afterInsert()
        crudStore.commitQuery()
      }
    }
    if (submitApi) {
      submitApi(formData).then(() => {
        callback()
      }).catch(() => {
        callback(false)
      })
    } else {
      emits('onAddOrEditSumbit', formData, crudStore.isUpdate ? 'edit' : 'add', callbackFn)
    }
  },
  submitSuccess() {
    refresh()
  }
}
//endregion

//#region 增删改查
const crudStore = reactive({
  /** 表单类型，true 表示修改，false 表示新增 */
  isUpdate: true,
  /** 加载表格数据 */
  commitQuery: () => xGridDom.value?.commitProxy("query"),
  /** 清空表格数据 */
  clearTable: () => xGridDom.value?.reloadData([]),
  /** 点击显示弹窗 */
  onShowModal: async (row?: Record<string, any>) => {
    let formData = {}
    modalFormOpt.asyncFormData = false
    if (row) {
      crudStore.isUpdate = true
      modalFormOpt.modalTitle = "修改"
      if (props.getTableDataByIdApi) {
        modalFormOpt.asyncFormData = true
      }
      formData = JSON.parse(JSON.stringify(row))
    } else {
      crudStore.isUpdate = false
      modalFormOpt.modalTitle = "新增"
      formData = {}
    }
    // 禁用表单项
    props?.disabledItems?.forEach((item) => {
      const formProps = modalFormOpt.formItems?.find((i) => i.field === item)?.itemRender?.props
      formProps && (formProps.disabled = crudStore.isUpdate)
    })
    modalFormDom.value?.onShowModal(formData, modalFormOpt.asyncFormData)
  },
  /** 新增后是否跳入最后一页 */
  afterInsert: () => {
    const pager = xGridDom.value?.getProxyInfo()?.pager
    if (pager) {
      const currentTotal = pager.currentPage * pager.pageSize
      if (currentTotal === pager.total) {
        ++pager.currentPage
      }
    }
  },
  /** 单条记录删除 */
  onDelete: (row: Record<string, any>) => {
    const tip = props.getDeleteTip ? props.getDeleteTip(row) : `确定 <strong style="color: var(--el-color-danger);"> 删除 </strong>Id为  <strong style="color: var(--el-color-primary);"> ${row.id} </strong>的记录吗 ？`
    const config: ElMessageBoxOptions = {
      type: "warning",
      showClose: true,
      closeOnClickModal: true,
      closeOnPressEscape: true,
      cancelButtonText: "取消",
      confirmButtonText: "确定",
      dangerouslyUseHTMLString: true,
      beforeClose: (action, instance, done) => {
        const callback = (isSuccess: boolean = true) => {
          instance.confirmButtonLoading = false;
          if (!isSuccess) return
          ElMessage.success("删除成功")
          crudStore.afterDelete()
          crudStore.commitQuery()
          done()
        }
        if (action === 'confirm') {
          if (props.deleteTableDataApi) {
            instance.confirmButtonLoading = true
            props.deleteTableDataApi({ id: row.id }).then(() => {
              callback()
            }).catch(() => {
              callback(false)
            })
          } else {
            emits('onDeleteSumbit', row, callback)
          }
        }
        else {
          done()
        }
      }
    }
    ElMessageBox.confirm(tip, "提示", config).catch(() => { })
  },
  /** 批量删除 */
  onBatchDelete: () => {
    const checkDatas = xGridDom.value!.getCheckboxRecords()
    if (!checkDatas.length) return ElMessage.warning("请选择要删除的数据")
    const tip = `确定 <strong style="color: var(--el-color-danger);"> 批量删除 </strong>选中的记录吗 ？`
    const config: ElMessageBoxOptions = {
      type: "warning",
      showClose: true,
      closeOnClickModal: true,
      closeOnPressEscape: true,
      cancelButtonText: "取消",
      confirmButtonText: "确定",
      dangerouslyUseHTMLString: true,
      beforeClose: (action, instance, done) => {
        const callback = (isSuccess: boolean = true) => {
          instance.confirmButtonLoading = false;
          if (!isSuccess) return
          ElMessage.success("批量删除成功")
          crudStore.afterDelete()
          crudStore.commitQuery()
          done()
        }
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          const ids = checkDatas.map(item => item.id)
          /** 批量删除 */
          if (props.batchDeleteTableDataApi) {
            props.batchDeleteTableDataApi({ ids }).then(() => {
              callback()
            }).catch(() => {
              callback(false)
            })
          } else {
            emits('onBatchDeleteSumbit', checkDatas, callback)
          }
        }
        else {
          done()
        }

      }
    }
    ElMessageBox.confirm(tip, "提示", config).catch(() => { })

  },
  /** 删除后是否返回上一页 */
  afterDelete: () => {
    const tableData: Record<string, any>[] = xGridDom.value!.getData()
    const pager = xGridDom.value?.getProxyInfo()?.pager
    if (pager && pager.currentPage > 1 && tableData.length === 1) {
      --pager.currentPage
    }
  },
  /** 更多自定义方法 */
  // 更多操作
  moreFn: () => { },
})
//#endregion

// 手动触发刷新
const refresh = () => {
  crudStore.commitQuery()
}

defineExpose({
  refresh
})

</script>

<style lang="scss" scoped>
.app-container {
  flex: 1;
  padding: 8px 16px 0px 16px;
  margin: 0;
  background-color: var(--el-bg-color);
  overflow: hidden;
  overflow: hidden;

  .vxe-grid {
    height: 100%;
    display: flex;
    flex-direction: column;

    :deep(.vxe-grid--toolbar-wrapper) {
      .vxe-toolbar {
        padding-top: 8px;
        padding-bottom: 16px;
      }
    }

    .vxe-table {
      flex: 1;
      overflow: hidden;
    }

    :deep(.vxe-grid--pager-wrapper) {
      padding-top: 9px;
    }

    &.noPager {
      padding-bottom: 8px;
    }
  }
}
</style>