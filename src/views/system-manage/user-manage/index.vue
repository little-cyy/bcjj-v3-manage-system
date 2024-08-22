<template>
  <div class="main-view">
    <!-- 搜索栏组件，传入配置项和搜索事件 -->
    <SearchBar :configs="configs" @search="search" />
    <!-- 表格组件，传入propsOp对象 -->
    <TableBox ref="tableBoxRef" v-bind="propsOp" v-on="tableBoxEvents">
      <template #row-operate-other="{ row }">
        <el-button :disabled="row.editDisabled" link type="primary" @click="updatePwdClick(row)">更新密码</el-button>
      </template>
    </TableBox>
    <ModalForm ref="modalFormDom" v-bind="modalFormOpt" />

  </div>

</template>
<script setup lang="ts">
import { addUserApi, editUserApi, getUsersApi } from '@/api/system-manage/user-manage'
import ModalForm from "@/components/ModalForm/index.vue"
import SearchBar from "@/components/SearchBar/index.vue"
import TableBox from "@/components/TableBox/index.vue"
import { INIT_DEFAULT_PWD } from '@/config/pwd'
import { reactive, ref } from "vue"
import { columns, configs, formItems, formRules, updatePwdFormItems, updatePwdFormRules } from './index'
//#region tableBox
const tableBoxRef = ref()
// 定义propsOp对象，传入表格组件
const propsOp = reactive({
  columns,
  getTableDataApi: getUsersApi,
  editTableDataApi: editUserApi,
  serachParams: { name: '', title: '' },
  formItems,
  formRules,
  disabledItems: ['title'],
  showBatchDelBtn: false,
  showDelBtn: false,
  modalWidth: 600,
  treeConfig: {
    transform: true,
    rowField: 'id',
    parentField: 'pId'
  },
})
const tableBoxEvents = {
  onAddOrEditSumbit(formData: Record<string, any>, type: 'add' | 'edit', callback: (isSuccess?: boolean) => void) {
    if (type === 'add') {
      addUserApi({ ...formData, password: INIT_DEFAULT_PWD }).then(() => {
        callback()
      }).catch(() => {
        callback(false)
      })
    }
  }
}
//#endregion

//#region modalForm
const modalFormDom = ref()
const modalFormOpt = reactive({
  // 表单配置
  formItems: updatePwdFormItems,
  // 表单验证规则
  formRules: updatePwdFormRules,
  //表单提交接口
  submitApi: editUserApi,
  // 模态框标题
  modalTitle: '更新密码',
})
//endregion


function search(searchForm: Record<string, any>) {
  // 遍历搜索表单，将搜索条件传入propsOp对象
  Object.keys(searchForm).forEach((key) => {
    propsOp.serachParams[key as keyof typeof propsOp.serachParams] = searchForm[key]
  })
  // 刷新表格数据
  tableBoxRef.value.refresh()
}

function updatePwdClick(row: Record<string, any>) {
  const { id, username } = JSON.parse(JSON.stringify(row))
  modalFormDom.value?.onShowModal({ id, username, password: '' })
}



</script>
<style lang="scss" scoped></style>