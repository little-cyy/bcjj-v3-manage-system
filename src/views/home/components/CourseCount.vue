<template>
  <el-card class="user-count h100">
    <div ref="userCountDom" style="height: 100%;width: 100%">
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { courseCountApi } from "@/api/chart/index";
import { colorMap } from '@/config/color';
import { useEchart } from "@/hooks/useEchart";
import { getBarOption } from "@/utils/echart/bar";
import { ref } from "vue";
const userCountDom = ref()
const options = ref()
const { data } = await courseCountApi()
const option = {
  xAxisData: data.categories,
  seriesData: [
    {
      name: '课程数量', data: data.courseCounts,
      itemStyle: {
        color: function (params: Record<string, any>) {
          return colorMap[params.dataIndex];
        }
      }
    }
  ]
}
options.value = getBarOption({
  title: '课程数量',
  data: option,
  showLegend: false
})
const chartInstance = useEchart(userCountDom, options)

</script>
<style lang="scss" scoped>
.user-count {
  flex: 1;
  min-height: 200px;
}
</style>