<template>
  <div class="scroll-container flex-align-center">
    <SvgIcon icon="arrow-left" @click="scrollTo('left')" />
    <el-scrollbar>
      <slot></slot>
    </el-scrollbar>
    <SvgIcon icon="arrow-right" @click="scrollTo('right')" />
  </div>
</template>
<script setup lang="ts">
const scrollTo = (direction: 'left' | 'right', distance: number = 200) => {
  const container = document.querySelector('.el-scrollbar__wrap') as HTMLElement
  if (direction === 'left') {
    container.scrollLeft -= distance
  } else {
    container.scrollLeft += distance
  }
}
</script>
<style lang="scss" scoped>
.scroll-container {
  flex-grow: 1;
  width: calc(100% - 28px);
  gap: 10px;

  .svg-icon {
    flex-shrink: 0;
    color: var(--el-text-color-regular);
  }

  .el-scrollbar {
    flex-grow: 1;
  }
}
</style>