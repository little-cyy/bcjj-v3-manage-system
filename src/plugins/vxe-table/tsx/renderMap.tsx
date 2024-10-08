// 导入ElTreeSelect组件和RendererOptions类型
import TreeSelect from '@/components/TreeSelect/index.vue'
import { type RendererOptions } from 'vxe-table'

// 定义renderMap对象，用于存储渲染器选项
const renderMap: { [name: string]: RendererOptions } = {
  // 定义TreeSelect渲染器选项
  ElTreeSelect: {
    // 定义renderItemContent方法，用于渲染TreeSelect组件
    renderItemContent(renderOpts, params) {
      // 获取params中的data和field属性
      const { data, field } = params
      // 获取renderOpts中的props属性
      const { props, options } = renderOpts
      // 返回渲染TreeSelect组件的代码
      return [<TreeSelect v-model={data[field]} options={options} {...props}></TreeSelect>]
    }
  },
  // 定义StateTag渲染器选项
  StateTag: {
    renderDefault(renderOpts, params) {
      const { row, column } = params
      const { field } = column
      const { options } = renderOpts
      const item = (options as Array<{ value: string; label: string; color: string }>).find(
        (item) => item.value === row[field]
      )
      if (item)
        return [<span class={`el-tag el-tag--${item.color} el-tag--plain`}>{item.label}</span>]
      return [<span></span>]
    }
  }
}

// 导出renderMap对象
export default renderMap
