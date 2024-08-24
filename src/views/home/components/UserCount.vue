<template>
  <el-card class="user-count">
    <div ref="userCountDom" style="height: 100%;width: 100%">
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { addUserCountApi } from "@/api/chart/index";
import { useEchart } from "@/hooks/useEchart";
import { getLineOption } from "@/utils/echart/line";
import { ref } from "vue";

const userCountDom = ref()
const options = ref()
const { data } = await addUserCountApi()
const option = {
  xAxisData: data.days,
  seriesData: [
    { name: '新增用户数', data: data.adduserCounts },
    { name: '活跃用户数', data: data.activeuserCounts }
  ]
}
options.value = getLineOption({
  title: '用户统计',
  data: option
})
const chartInstance = useEchart(userCountDom, options)

</script>
<style lang="scss" scoped>
.user-count {
  flex: 1;
  min-height: 200px;
}
</style>