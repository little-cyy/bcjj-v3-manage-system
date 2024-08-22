<template>
  <div class="main-view">
    <!-- 搜索栏组件，传入配置项和搜索事件 -->
    <SearchBar :configs="configs" @search="search" />
    <!-- 表格组件，传入propsOp对象 -->
    <TableBox ref="tableBoxRef" v-bind="propsOp" />
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, } from "vue"
// 引入配置项、列、表单项、表单规则
import SearchBar from "@/components/SearchBar/index.vue"
import TableBox from "@/components/TableBox/index.vue"
import { columns, configs, formItems, formRules } from './index'
// 引入接口
import { addCategoryApi, batchDelCategoryApi, delCategoryApi, editCategoryApi, getCategoriesApi } from '@/api/function-manage/category-manage'
// 定义表格组件的引用
const tableBoxRef = ref()
// 定义propsOp对象，传入表格组件
const propsOp = reactive({
  columns,
  getTableDataApi: getCategoriesApi,
  deleteTableDataApi: delCategoryApi,
  batchDeleteTableDataApi: batchDelCategoryApi,
  addTableDataApi: addCategoryApi,
  editTableDataApi: editCategoryApi,
  serachParams: { name: '' },
  formItems,
  formRules,
  disabledItems: ['name'],
  checkboxConfig: {
    checkMethod: ({ row }: { row: Record<string, any> }) => row.courseCount === 0
  },
  getDeleteTip: (row: any) => `确定 <strong style="color: var(--el-color-danger);"> 删除 </strong> 分类名称为 <strong style="color: var(--el-color-primary);"> ${row.name} </strong>的记录吗 ？`
})

// 定义搜索事件
const search = (searchForm: Record<string, any>) => {
  // 遍历搜索表单，将搜索条件传入propsOp对象
  Object.keys(searchForm).forEach((key) => {
    propsOp.serachParams[key as keyof typeof propsOp.serachParams] = searchForm[key]
  })
  // 刷新表格数据
  tableBoxRef.value.refresh()

}



</script>
<style lang="scss" scoped></style>