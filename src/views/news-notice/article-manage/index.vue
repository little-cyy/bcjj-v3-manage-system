<template>
  <div class="main-view">
    <!-- 搜索栏组件，传入配置项和搜索事件 -->
    <SearchBar :configs="configs" @search="search" />
    <!-- 表格组件，传入propsOp对象 -->
    <TableBox ref="tableBoxRef" v-bind="propsOp">
      <template #row-operate-other="{ row }">
        <el-button link :type="row.state ? 'danger' : 'primary'" @click="updateState(row)">{{ row.state ?
          '撤回' : '发布'
          }}</el-button>
      </template>
    </TableBox>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, } from "vue"
// 引入配置项、列、表单项、表单规则
import SearchBar from "@/components/SearchBar/index.vue"
import TableBox from "@/components/TableBox/index.vue"
import { columns, configs, formItems, formRules } from './index'
// 引入接口
import { addArticleApi, batchDelArticleApi, delArticleApi, editArticleApi, getArticlesApi } from '@/api/news-notice/article-manage'
import { useMessageBox } from '@/hooks/useMessageBox'
const { confirmBox } = useMessageBox()

// 定义表格组件的引用
const tableBoxRef = ref()
// 定义propsOp对象，传入表格组件
const propsOp = reactive({
  columns,
  getTableDataApi: getArticlesApi,
  deleteTableDataApi: delArticleApi,
  batchDeleteTableDataApi: batchDelArticleApi,
  addTableDataApi: addArticleApi,
  editTableDataApi: editArticleApi,
  serachParams: { name: '' },
  formItems,
  formRules,
  getDeleteTip: (row: any) => `确定 <strong style="color: var(--el-color-danger);"> 删除 </strong> 文章标题为 <strong style="color: var(--el-color-primary);"> ${row.title} </strong>的记录吗 ？`
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

const updateState = (row: Record<string, any>) => {
  const operate = row.state === 1 ? '撤回' : '发布'
  const type = row.state === 1 ? 'danger' : 'success'
  const tip = `确定 <strong style="color: var(--el-color-${type});">${operate}</strong> 文章标题为<strong style="color: var(--el-color-primary);"> ${row.title} </strong>的记录吗 ？`
  confirmBox(tip, {
    onConfirm: () => {
      editArticleApi({ id: row.id, state: row.state === 1 ? 0 : 1 }).then(() => {
        tableBoxRef.value.refresh()
      })
    }
  })
}

</script>
<style lang="scss" scoped></style>