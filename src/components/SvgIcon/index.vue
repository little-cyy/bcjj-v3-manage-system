<template>
  <!-- 定义一个svg图标，使用props中的className和iconName -->
  <svg class="svg-icon" :class="props.className" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script setup lang="ts">
// 引入vue中的defineProps和computed函数
import { computed } from "vue";
// 定义props，包含icon和className两个属性
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ""
  },
})

// 计算iconName，返回#icon-加上props中的icon
const iconName = computed(() => {
  return `#icon-${props.icon}`
})
</script>
<style lang="scss" scoped>
// 定义svg-icon的样式
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>