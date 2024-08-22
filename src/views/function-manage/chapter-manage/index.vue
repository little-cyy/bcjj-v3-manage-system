<template>
  <div class="main-view">
    <SearchBar :configs="configs.SearchConfigs" autoSearch @search="search" />
    <TableBox ref="tableBoxRef" v-bind="propsOp" />
  </div>
</template>
<script setup lang="ts">
import { addChapterApi, batchDelChapterApi, delChapterApi, editChapterApi, getChaptersApi } from '@/api/function-manage/chapter-manage'
import SearchBar from "@/components/SearchBar/index.vue"
import TableBox from "@/components/TableBox/index.vue"
import { reactive, ref, } from "vue"
import { useConfigs } from './index'

const configs = await useConfigs()

const tableBoxRef = ref()
const propsOp = reactive({
  columns: configs.columns,
  getTableDataApi: getChaptersApi,
  deleteTableDataApi: delChapterApi,
  batchDeleteTableDataApi: batchDelChapterApi,
  addTableDataApi: addChapterApi,
  editTableDataApi: editChapterApi,
  serachParams: { title: '' },
  modalWidth: 600,
  formItems: configs.formItems,
  formRules: configs.formRules,
  autoLoad: false,
  getDeleteTip: (row: any) => `确定 <strong style="color: var(--el-color-danger);"> 删除 </strong> 章节标题名称为 <strong style="color: var(--el-color-primary);"> ${row.title} </strong>的记录吗 ？`
})
const search = (searchForm: Record<string, any>) => {
  Object.keys(searchForm).forEach((key) => {
    propsOp.serachParams[key as keyof typeof propsOp.serachParams] = searchForm[key]
  })
  tableBoxRef.value.refresh()

}



</script>
<style lang="scss" scoped></style>