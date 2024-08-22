<template>
  <div class="search-box">
    <!-- 搜索框表单 -->
    <el-form class="search-box__form" :style="{ maxWidth: props.colWidth * spanNumber + 'px' }">
      <!-- 搜索框表单行 -->
      <el-row :gutter="10">

        <!-- 遍历预配置项 -->
        <template v-for="(item, index) in props.configs" :key="item.field">
          <el-col v-show="index < props.numberColumns || showMore" :span="24 / spanNumber">
            <!-- 输入框 -->
            <el-input v-if="item.type === 'input'" v-model="searchForm[item.field]" :placeholder="item.label"
              v-bind="item.elementConfig"></el-input>
            <!-- 下拉框 -->
            <el-select v-if="item.type === 'select'" v-model="searchForm[item.field]" :placeholder="item.label"
              v-bind="item.elementConfig">
              <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value">
              </el-option>
            </el-select>

          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 搜索框按钮 -->
    <div class="search-box__btn">
      <!-- 重置按钮 -->
      <el-button v-if="props.needReset" @click="reset">重置</el-button>
      <!-- 查询按钮 -->
      <el-button v-if="props.needSearch" @click="search" type="primary">查询</el-button>
      <!-- 导出按钮 -->
      <el-button v-if="props.needExport" @click="exportData" type="primary">导出</el-button>
      <!-- 展开按钮 -->
      <el-button v-if="needMore" text class="more-btn" @click="showMore = !showMore">
        {{ showMore ? '收起' : '展开' }}
        <!-- 图标 -->
        <SvgIcon :icon="showMore ? 'arrow-up' : 'arrow-down'" />
      </el-button>

    </div>
  </div>
</template>
<script setup lang="ts">
import { type SearchBoxConfigs } from '@/types/search-box';
import { computed, onMounted, reactive, ref } from "vue";
// 定义props
const props = defineProps({
  //表单项配置
  configs: {
    type: Array<SearchBoxConfigs>,
    required: true,
  },
  // 每行显示多少列
  numberColumns: {
    type: Number,
    default: 3,
  },
  // 是否需要重置按钮
  needReset: {
    type: Boolean,
    default: true,
  },
  // 是否需要查询按钮
  needSearch: {
    type: Boolean,
    default: true,
  },
  // 是否需要导出按钮
  needExport: {
    type: Boolean,
    default: false,
  },
  // 每列宽度
  colWidth: {
    type: Number,
    default: 300,
  },
  // 是否自动查询
  autoSearch: {
    type: Boolean,
    default: false
  }
})

// 定义搜索表单
const searchForm = reactive<Record<string, any>>({})
// 定义emit
const emit = defineEmits(['search', 'reset', 'export'])



// 计算是否需要展开
const needMore = computed(() => {
  return props.configs.length > props.numberColumns
})
// 计算每列的span数
const spanNumber = computed(() => {
  return needMore.value ? props.numberColumns : props.configs.length
})

// 定义展开状态
const showMore = ref(false)

// 重置函数
function reset() {
  props.configs.forEach((item: SearchBoxConfigs, index: number) => {
    searchForm[item.field] = props.configs[index].defaultValue || ''
  })
  emit('reset')
}
// 查询函数
function search() {
  emit('search', searchForm)
}
// 导出函数
function exportData() {
  emit('export')
}

onMounted(() => {
  /**初始化操作 */
  reset()
  props.autoSearch && search()
})
</script>
<style lang="scss" src="./index.scss" scoped></style>