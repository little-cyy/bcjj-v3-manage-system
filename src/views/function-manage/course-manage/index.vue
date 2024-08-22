<template>
  <div class="main-view">
    <SearchBar :configs="configs.SearchConfigs" @search="search" />
    <TableBox ref="tableBoxRef" v-bind="propsOp" />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, } from "vue"
import { useConfigs } from './index'
import SearchBar from "@/components/SearchBar/index.vue"
import TableBox from "@/components/TableBox/index.vue"
import { getCoursesApi, delCourseApi, addCourseApi, editCourseApi, batchDelCourseApi } from '@/api/function-manage/course-manage'
const tableBoxRef = ref()
const configs = await useConfigs()
const propsOp = reactive({
  columns: configs.columns,
  getTableDataApi: getCoursesApi,
  deleteTableDataApi: delCourseApi,
  batchDeleteTableDataApi: batchDelCourseApi,
  addTableDataApi: addCourseApi,
  editTableDataApi: editCourseApi,
  serachParams: { name: '' },
  modalWidth: 600,
  formItems: configs.formItems,
  formRules: configs.formRules,
  // disabledItems: ['name'],
  checkboxConfig: {
    checkMethod: ({ row }: { row: Record<string, any> }) => row.actuaChapterCount === 0
  },
  getDeleteTip: (row: any) => `确定 <strong style="color: var(--el-color-danger);"> 删除 </strong> 课程名称为 <strong style="color: var(--el-color-primary);"> ${row.name} </strong>的记录吗 ？`
})

const search = (searchForm: Record<string, any>) => {
  Object.keys(searchForm).forEach((key) => {
    propsOp.serachParams[key as keyof typeof propsOp.serachParams] = searchForm[key]
  })
  tableBoxRef.value.refresh()

}



</script>
<style lang="scss" scoped></style>