<template>
  <div class="main-view">
    <!-- 表格组件，传入propsOp对象 -->
    <TableBox ref="tableBoxRef" v-bind="propsOp" />
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, } from "vue";
// 引入配置项、列、表单项、表单规则
import TableBox from "@/components/TableBox/index.vue";
import { columns, formItems, formRules } from './index';
// 引入接口
import { editRoleApi, getRolesApi, } from '@/api/system-manage/permission-setting';
// 定义表格组件的引用
const tableBoxRef = ref()
// 定义propsOp对象，传入表格组件
const propsOp = reactive({
  columns,
  getTableDataApi: getRolesApi,
  editTableDataApi: editRoleApi,
  formItems,
  formRules,
  disabledItems: ['name'],
  showAddBtn: false,
  showBatchDelBtn: false,
  showDelBtn: false,
  needPager: false,
  modalWidth: 550,
})

</script>
<style lang="scss" scoped></style>