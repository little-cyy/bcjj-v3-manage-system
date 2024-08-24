<template>
  <el-card class="sex-info">
    <div ref="sexInfoDom" style="height: 100%;width: 100%">
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { sexApi } from "@/api/chart/index";
import { useEchart } from "@/hooks/useEchart";
import { getPieOption } from "@/utils/echart/pie";
import { ref } from "vue";

const sexInfoDom = ref()
const options = ref()
const { data } = await sexApi()
options.value = getPieOption({
  title: '性别占比',
  data: data
})
const chartInstance = useEchart(sexInfoDom, options)

</script>
<style lang="scss" scoped>
.sex-info {
  flex: 1;
  min-height: 200px;
}
</style>